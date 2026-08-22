'use strict';

/*
 * Yig'ilgan sahifani `app://` sxemasi orqali beradi.
 *
 * Nega `file://` emas:
 *   • `file://` sahifasining "origin" i `null` bo'ladi. Backend ulanganda
 *     har bir `fetch` so'roviga `Origin: null` ketadi — serverda CORS ni
 *     to'g'rilash deyarli imkonsiz. `app://` esa haqiqiy origin beradi.
 *   • `file://` da absolyut yo'llar (`/assets/…`) diskning ildiziga ishora
 *     qiladi, shuning uchun Vite'ni nisbiy `base` ga o'tkazish kerak bo'lardi.
 *   • Xavfsizlik siyosati (`secure` sxema) va `fetch` API ni qo'llash.
 *
 * Nega lokal HTTP server ham emas: Windows brandmaueri birinchi ishga
 * tushirishda "ruxsat berasizmi?" oynasini chiqaradi — kiosk mashinasida
 * uni bosadigan odam yo'q. Custom sxema port ham, ruxsat ham talab qilmaydi.
 */

const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const { Readable } = require('node:stream');
const { protocol } = require('electron');
const log = require('./logger.cjs');

const SCHEME = 'app';
const HOST = 'kiosk';
const ORIGIN = `${SCHEME}://${HOST}`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

/**
 * Sxemani "imtiyozli" qilib ro'yxatdan o'tkazish.
 * `app.whenReady()` dan OLDIN chaqirilishi shart — keyin kech bo'ladi.
 */
function registerScheme() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: SCHEME,
      privileges: {
        standard: true, // to'liq origin bo'lsin (CORS uchun)
        secure: true, // https kabi ishonchli kontekst: WebGL, media, storage
        supportFetchAPI: true,
        corsEnabled: true,
        stream: true, // <video> uchun Range so'rovlari
      },
    },
  ]);
}

/** `bytes=0-1023` ni ajratadi. Noto'g'ri bo'lsa `null`. */
function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header?.trim() ?? '');
  if (!match) return null;

  const [, rawStart, rawEnd] = match;
  if (rawStart === '' && rawEnd === '') return null;

  // `bytes=-500` — oxirgi 500 bayt
  const start = rawStart === '' ? Math.max(0, size - Number(rawEnd)) : Number(rawStart);
  const end = rawStart === '' || rawEnd === '' ? size - 1 : Math.min(Number(rawEnd), size - 1);

  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= size) return null;
  return { start, end };
}

/**
 * URL yo'lini disk yo'liga o'giradi.
 * Papkadan tashqariga chiqishga (`../../`) yo'l qo'yilmaydi.
 */
function resolveInside(root, urlPath) {
  const decoded = decodeURIComponent(urlPath).split('?')[0].split('#')[0];
  const target = path.resolve(root, `.${path.posix.normalize(decoded)}`);
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;
  return target === root || target.startsWith(rootWithSep) ? target : null;
}

function bodyFrom(file, start, end) {
  const stream = fs.createReadStream(file, { start, end });
  // Node oqimini Web oqimiga o'girish — `Response` shuni kutadi
  return Readable.toWeb(stream);
}

/**
 * `app://kiosk/...` so'rovlariga javob beradigan ishlovchi.
 * `root` — yig'ilgan renderer papkasi.
 */
function createHandler(root) {
  const indexFile = path.join(root, 'index.html');

  return async function handle(request) {
    const url = new URL(request.url);
    let file = resolveInside(root, url.pathname === '/' ? '/index.html' : url.pathname);

    if (!file) {
      log.warn('protokol: papkadan tashqaridagi yo\'l rad etildi:', url.pathname);
      return new Response('Forbidden', { status: 403 });
    }

    let stat = await fsp.stat(file).catch(() => null);

    /* Fayl topilmasa — SPA zaxirasi: index.html qaytariladi. Bu kelajakda
       ekranga ichki yo'llar qo'shilsa (`/ekran2/tadbirlar` kabi) kerak
       bo'ladi. Statik resurslar (kengaytmasi borlar) uchun esa halol 404. */
    if (!stat || stat.isDirectory()) {
      if (path.extname(file)) return new Response('Not found', { status: 404 });
      file = indexFile;
      stat = await fsp.stat(file).catch(() => null);
      if (!stat) return new Response('Not found', { status: 404 });
    }

    const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
    const headers = {
      'content-type': type,
      'accept-ranges': 'bytes',
      /* Ilova ichidagi fayllar build bilan birga yangilanadi — brauzer
         keshi eski chunk'ni ushlab qolmasin. */
      'cache-control': 'no-cache',
    };

    const range = parseRange(request.headers.get('range'), stat.size);
    if (range) {
      // 206: video oldinga-orqaga sakraganda Chromium aynan shuni so'raydi
      return new Response(bodyFrom(file, range.start, range.end), {
        status: 206,
        headers: {
          ...headers,
          'content-range': `bytes ${range.start}-${range.end}/${stat.size}`,
          'content-length': String(range.end - range.start + 1),
        },
      });
    }

    return new Response(bodyFrom(file, 0, Math.max(stat.size - 1, 0)), {
      status: 200,
      headers: { ...headers, 'content-length': String(stat.size) },
    });
  };
}

/** `app.whenReady()` dan KEYIN chaqiriladi. */
function serveRenderer(root) {
  protocol.handle(SCHEME, createHandler(root));
  log.info(`protokol tayyor: ${ORIGIN}/ → ${root}`);
}

module.exports = { SCHEME, HOST, ORIGIN, registerScheme, serveRenderer, createHandler };

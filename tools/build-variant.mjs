/*
 * Bitta yuza uchun Windows exe yig'adi.
 *
 *   node tools/build-variant.mjs interface
 *   node tools/build-variant.mjs map --dir      (paketlanmagan papka, tez sinash)
 *
 * Uch qadam:
 *   1. sahifani `SURFACE=<yuza>` bilan yig'ish — vite.config.ts o'sha
 *      yuzaning assetlarinigina ko'chiradi, App.tsx qolganini tashlab yuboradi;
 *   2. exe yoniga qo'yiladigan `config.json` ga `route` ni qotirish;
 *   3. `electron-builder` ni variantga xos appId/nom bilan chaqirish.
 *
 * appId har variantda boshqacha (`tools/surfaces.mjs`) — aks holda
 * Windows ularni bitta ilova deb biladi va o'rnatuvchilar bir-birining
 * ustidan yozadi.
 */

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

import { SURFACE_NAMES, requireSurface } from './surfaces.mjs';

const require = createRequire(import.meta.url);
const { DEFAULTS } = require('../electron/config.cjs');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const [name, ...rest] = process.argv.slice(2);
if (!name) {
  console.error(`Yuza nomi kerak. Mavjudlari: ${SURFACE_NAMES.join(', ')}`);
  process.exit(1);
}

let surface;
try {
  surface = requireSurface(name);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

/** Paketlanmagan papka (`--dir`) yoki to'liq o'rnatuvchi. */
const packOnly = rest.includes('--dir');

function run(cmd, args, env = {}) {
  const res = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    /* `shell: false` ataylab: quyida `-c.productName=Milliy Kutubxona Kiosk`
       kabi BO'SHLIQLI argumentlar uzatiladi. Windows'da shell orqali
       yuborilsa ular bo'linib ketardi va nom "Milliy" bo'lib qolardi. */
    env: { ...process.env, ...env },
  });
  if (res.error) throw res.error;
  if (res.status !== 0) process.exit(res.status ?? 1);
}

console.log(`\n▸ ${surface.product}  (route=${surface.route})\n`);

/* Vite ham, electron-builder ham `node <cli>` ko'rinishida chaqiriladi:
   `npm`/`npx` Windows'da `.cmd` bo'lgani uchun shell talab qilardi — u esa
   bo'shliqli argumentlarni buzadi. */
const bin = (pkg, file) => resolve(root, 'node_modules', pkg, file);

// 1 — sahifa
run(process.execPath, [bin('vite', 'bin/vite.js'), 'build', '--mode', 'electron'], {
  SURFACE: surface.name,
});

/* 2 — sozlama namunasi.
   `write-config-template.mjs` dan farqi shundaki, bu yerda `route`
   variantga qotiriladi: exe faqat bitta yuza uchun yig'ilgan, boshqasiga
   o'tkazib bo'lmaydi va sozlamada ham shu ko'rinib tursin. */
const config = { ...DEFAULTS, route: surface.route };
const configPath = resolve(root, 'build/config.json');
writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
console.log(`\n▸ config.json  route=${surface.route}`);

// 3 — paketlash
const target = packOnly ? ['--dir'] : ['--win', '--x64', '--publish', 'never'];
run(
  process.execPath,
  [
    bin('electron-builder', 'out/cli/cli.js'),
    ...target,
    `-c.appId=${surface.appId}`,
    `-c.productName=${surface.product}`,
    `-c.nsis.shortcutName=${surface.product}`,
    `-c.win.artifactName=MilliyKutubxona-${surface.slug}-\${version}-\${arch}.\${ext}`,
    `-c.portable.artifactName=MilliyKutubxona-${surface.slug}-portable-\${version}.\${ext}`,
  ],
  // Sahifa yuqorida yig'ildi — beforePack qayta yig'masin (u SURFACE ni bilmaydi)
  { SKIP_RENDERER_BUILD: '1' },
);

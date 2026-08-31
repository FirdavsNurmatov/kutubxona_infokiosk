import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { SHARED_ASSETS, requireSurface } from './tools/surfaces.mjs';

/*
 * Uchta chiqish:
 *
 *   vite build                              → dist/  (Netlify, brauzer, hamma ekran)
 *   vite build --mode electron              → dist-electron/  (hamma yuza bitta ilovada)
 *   SURFACE=map vite build --mode electron  → dist-electron/  (faqat xarita)
 *
 * `SURFACE` qo'yilmaganda hech narsa o'zgarmaydi: eski, hammasi bitta
 * bundledagi build. Qo'yilganda esa `src/App.tsx` boshqa yuzalarni
 * bundledan chiqarib tashlaydi, bu yerdagi `surfaceAssets` esa ularning
 * media fayllarini `dist-electron/` ga umuman ko'chirmaydi.
 * Qaysi variant nimani oladi — `tools/surfaces.mjs` da.
 */

const root = dirname(fileURLToPath(import.meta.url));

/**
 * Yig'ilgan `electron.html` ni `index.html` ga aylantiradi.
 *
 * Nega: Vite chiqish faylini kirish nuqtasi nomi bilan ataydi, Electron
 * tomonida esa `index.html` kutiladi (protokolning SPA zaxirasi ham shunga
 * ishora qiladi). Fayl nomini build ichida o'zgartirish `mv`/`ren`
 * farqidan xoli — bir xil buyruq Linux'da ham, Windows'da ham ishlaydi.
 */
function htmlAsIndex(): Plugin {
  return {
    name: 'electron-html-as-index',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['electron.html'];
      if (!html) return;
      delete bundle['electron.html'];
      html.fileName = 'index.html';
      bundle['index.html'] = html;
    },
  };
}

/**
 * `images/*.jpg` kabi oddiy shablonni yoyadi. Faqat oxirgi bo'g'inda
 * bitta `*` qo'llab-quvvatlanadi — assetlar ro'yxatiga shundan ortig'i
 * kerak emas, `node:fs` ning `globSync` i esa hali tajribaviy.
 */
function expand(publicDir: string, pattern: string): string[] {
  if (!pattern.includes('*')) return existsSync(join(publicDir, pattern)) ? [pattern] : [];

  const slash = pattern.lastIndexOf('/');
  const dir = slash === -1 ? '' : pattern.slice(0, slash);
  const glob = pattern.slice(slash + 1);
  const [prefix, suffix] = glob.split('*');
  const from = join(publicDir, dir);
  if (!existsSync(from)) return [];

  return readdirSync(from, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.startsWith(prefix) && e.name.endsWith(suffix))
    .map((e) => (dir ? `${dir}/${e.name}` : e.name));
}

/**
 * `public/` ni Vite o'rniga o'zimiz, tanlab ko'chiramiz.
 *
 * Vite `publicDir` ni butunligicha nusxalaydi — 89 MB. Variantli buildda
 * bizga uning bir qismi kerak, shuning uchun `publicDir: false` qilib
 * ko'chirishni shu yerda bajaramiz. Ro'yxatdagi yo'l papka ham, fayl ham,
 * `images/*.jpg` kabi shablon ham bo'lishi mumkin.
 */
function surfaceAssets(paths: string[]): Plugin {
  return {
    name: 'surface-assets',
    enforce: 'post',
    apply: 'build',
    // `writeBundle` — fayllar diskka tushgandan keyin, ya'ni `emptyOutDir`
    // papkani tozalab bo'lgach. `generateBundle` da ko'chirsak, o'chib ketardi.
    writeBundle(options) {
      const outDir = options.dir ?? resolve(root, 'dist-electron');
      const publicDir = resolve(root, 'public');
      let copied = 0;

      for (const pattern of paths) {
        const matches = expand(publicDir, pattern);
        if (matches.length === 0) {
          this.warn(`asset topilmadi: public/${pattern}`);
          continue;
        }
        for (const match of matches) {
          const from = join(publicDir, match);
          if (!existsSync(from)) continue;
          const to = join(outDir, match);
          mkdirSync(dirname(to), { recursive: true });
          cpSync(from, to, { recursive: true });
          copied += 1;
        }
      }

      this.info?.(`surface-assets: ${copied} ta yo'l ko'chirildi`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const electron = mode === 'electron';
  /* Faqat Electron buildida ma'noga ega: brauzer nusxasi (Netlify) har doim
     hamma yuzani beradi — u yerda alohida-alohida joylashtirish shart emas. */
  const surface = electron && process.env.SURFACE ? requireSurface(process.env.SURFACE) : null;

  const plugins: PluginOption[] = [react()];
  if (electron) plugins.push(htmlAsIndex());
  if (surface) plugins.push(surfaceAssets([...SHARED_ASSETS, ...surface.assets]));

  return {
    plugins,
    // Variantda `public/` ni surfaceAssets ko'chiradi — Vite aralashmasin
    ...(surface ? { publicDir: false as const } : {}),
    define: {
      /* Satr build vaqtida kodga qotib kiradi. `src/App.tsx` dagi
         solishtirishlar shu sababli oddiy konstantaga aylanadi va
         keraksiz `import()` lar bundledan butunlay tushib qoladi. */
      'import.meta.env.VITE_SURFACE': JSON.stringify(surface?.name ?? ''),
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: electron
      ? {
          outDir: 'dist-electron',
          emptyOutDir: true,
          // Electron 33 = Chrome 130; transpilyatsiya va polifillga hojat yo'q
          target: 'chrome128',
          // Ekran offlayn ishlaydi — xarita fayllari ishlab chiqarishda ortiqcha
          sourcemap: false,
          rollupOptions: {
            input: fileURLToPath(new URL('./electron.html', import.meta.url)),
          },
        }
      : {},
  };
});

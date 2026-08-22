import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * Ikkita chiqish:
 *
 *   vite build                  → dist/           (Netlify, brauzer, hamma ekranlar)
 *   vite build --mode electron  → dist-electron/  (Windows ilovasi, faqat /ekran2)
 *
 * Ikkinchisi alohida `electron.html` kirish nuqtasidan yig'iladi, shuning
 * uchun kiosk, xarita va `/interface` kodi Windows nusxasiga tushmaydi.
 */

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

export default defineConfig(({ mode }) => {
  const electron = mode === 'electron';

  return {
    plugins: electron ? [react(), htmlAsIndex()] : [react()],
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

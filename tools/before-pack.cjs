'use strict';

/*
 * electron-builder paketlashdan OLDIN sahifani qaytadan yig'adi.
 *
 * Nega kerak: `electron-builder` faqat `dist-electron/` da nima yotgan
 * bo'lsa, o'shani asar ichiga soladi. Uni to'g'ridan-to'g'ri (npm skriptsiz)
 * chaqirilganda `src/**` dagi eng oxirgi o'zgarish exe ga tushmay qolardi —
 * va buni sezish qiyin: build muvaffaqiyatli tugaydi, faqat ilova eski
 * sahifani ko'rsatadi.
 *
 * Endi qaysi buyruq ishlatilishidan qat'i nazar sahifa yangi bo'ladi:
 *   npx electron-builder --win
 *   npm run electron:build:win
 *   npm run electron:pack
 *
 * npm skriptlari qo'sh ish qilmasin uchun ular `SKIP_RENDERER_BUILD=1` bilan
 * yuradi (ular yig'ishni o'zlari bajaradi).
 */

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

module.exports = async function beforePack() {
  if (process.env.SKIP_RENDERER_BUILD === '1') {
    console.log('  • renderer allaqachon yig\'ilgan — o\'tkazib yuborildi');
    return;
  }

  console.log('  • renderer yig\'ilmoqda  script=build:electron');
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const res = spawnSync(npm, ['run', 'build:electron'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });

  if (res.error) throw res.error;
  if (res.status !== 0) {
    /* Yig'ilmagan sahifa bilan paketlashdan ko'ra to'xtagan ma'qul:
       aks holda eski `dist-electron/` jimgina exe ga tushib ketadi. */
    throw new Error(`renderer yig'ilmadi (build:electron → ${res.status})`);
  }
};

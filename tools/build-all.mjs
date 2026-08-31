/*
 * Hamma variantni ketma-ket yig'adi — kutubxonaga bir yo'la to'liq
 * to'plam kerak bo'lganda (`npm run build:win:all`).
 *
 * Ketma-ket, parallel emas: har bir variant `dist-electron/` va
 * `build/config.json` ni qaytadan yozadi, ular esa umumiy. Parallel
 * ishlaganda variantlar bir-birining fayllarini ustidan yozib yuborardi.
 */

import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

import { SURFACE_NAMES } from './surfaces.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const extra = process.argv.slice(2);

for (const name of SURFACE_NAMES) {
  const res = spawnSync(process.execPath, ['tools/build-variant.mjs', name, ...extra], {
    cwd: root,
    stdio: 'inherit',
  });
  if (res.status !== 0) {
    console.error(`\n✗ "${name}" yig'ilmadi — to'xtatildi`);
    process.exit(res.status ?? 1);
  }
}

console.log(`\n✓ ${SURFACE_NAMES.length} ta variant tayyor — release/ ga qarang`);

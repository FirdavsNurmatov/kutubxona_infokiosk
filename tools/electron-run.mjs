/*
 * Electron'ni toza muhitda ishga tushiradi.
 *
 * `ELECTRON_RUN_AS_NODE` — VS Code (o'zi ham Electron ilovasi) integratsiyalangan
 * terminalida qo'yib ketadigan o'zgaruvchi. U bo'lsa `electron .` buyrug'i
 * grafik oyna ochmaydi, oddiy Node skripti bo'lib ishlaydi va `require('electron')`
 * API o'rniga fayl yo'lini qaytaradi:
 *
 *     TypeError: Cannot read properties of undefined (reading 'isPackaged')
 *
 * Shuning uchun Electron har doim shu skript orqali ochiladi.
 */

import { spawn } from 'node:child_process';
import process from 'node:process';

/** VS Code va shunga o'xshash muhitlar qoldirgan izlarni tozalaydi. */
export function cleanEnv(extra = {}) {
  const env = { ...process.env, ...extra };
  delete env.ELECTRON_RUN_AS_NODE;
  return env;
}

export function launchElectron(args = [], extraEnv = {}) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  return spawn(npx, ['electron', '.', ...args], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: cleanEnv(extraEnv),
  });
}

// To'g'ridan-to'g'ri chaqirilsa (`npm run electron:start`) — shu yerda ochamiz
if (import.meta.url === `file://${process.argv[1]}`) {
  const child = launchElectron(process.argv.slice(2));
  child.on('exit', (code) => process.exit(code ?? 0));
}

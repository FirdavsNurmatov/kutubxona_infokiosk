/*
 * `npm run electron:dev` — ishlab chiqish rejimi.
 *
 * Vite dev serverini ko'taradi, u javob bera boshlagach Electron'ni ochadi.
 * Kutish shart: Electron bo'sh portga ulansa "sahifa topilmadi" ekrani
 * chiqadi va tiklanish sikli behuda ishlaydi.
 *
 * `concurrently` kabi qo'shimcha paket ataylab qo'shilmadi — bu 40 qator
 * skript Windows'da ham, Linux'da ham bir xil ishlaydi.
 */

import { spawn } from 'node:child_process';
import process from 'node:process';
import { cleanEnv, launchElectron } from './electron-run.mjs';

const HOST = process.env.VITE_DEV_HOST ?? 'http://localhost:5173';
const URL_TO_OPEN = `${HOST}/ekran2`;
const TIMEOUT_MS = 60_000;
const POLL_MS = 300;

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const children = [];

function run(command, args, extraEnv = {}) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: cleanEnv(extraEnv),
  });
  children.push(child);
  return child;
}

function stopAll(code) {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exit(code);
}

async function waitForServer() {
  const deadline = Date.now() + TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(HOST, { method: 'HEAD' });
      if (response.ok || response.status === 404) return true;
    } catch {
      /* hali ko'tarilmadi */
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_MS));
  }
  return false;
}

run(npx, ['vite', '--port', '5173', '--strictPort']);

if (!(await waitForServer())) {
  console.error('Vite dev serveri 60 sekundda ko\'tarilmadi');
  stopAll(1);
}

/* Qo'shimcha argumentlar Electron'ga o'tkaziladi:
   `npm run electron:dev -- --fullscreen` — to'liq ekranni sinash uchun. */
const electron = launchElectron(process.argv.slice(2), { VITE_DEV_SERVER_URL: URL_TO_OPEN });
children.push(electron);
electron.on('exit', (code) => stopAll(code ?? 0));

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));

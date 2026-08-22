'use strict';

/*
 * Kiosk logi.
 *
 * Nega fayl kerak: ekran zalda, klaviaturasiz, oylab ishlaydi. Nimadir
 * bo'lsa (video ochilmadi, renderer qotdi, GPU qulab tushdi) buni ko'rishning
 * yagona yo'li — mashinaga borib log faylni ochish. DevTools konsoli
 * yopilgan oynada yo'q, `console.log` esa hech qayerga yozilmaydi.
 *
 * Hajmi cheklangan: 2 MB dan oshsa fayl bitta `.old` nusxaga siljiydi.
 * Ya'ni diskda ko'pi bilan 4 MB — kiosk diski to'lib qolmaydi.
 */

const fs = require('node:fs');
const path = require('node:path');

const MAX_BYTES = 2 * 1024 * 1024;

let stream = null;
let file = null;
let toConsole = true;

function rotate() {
  try {
    if (fs.statSync(file).size < MAX_BYTES) return;
  } catch {
    return; // fayl hali yo'q — aylantirishga hojat yo'q
  }
  try {
    fs.rmSync(`${file}.old`, { force: true });
    fs.renameSync(file, `${file}.old`);
  } catch {
    /* log yozilmagani ilovani to'xtatmasligi kerak */
  }
}

function format(value) {
  if (typeof value === 'string') return value;
  if (value instanceof Error) return `${value.message}\n${value.stack ?? ''}`;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function write(level, parts) {
  const line = `${new Date().toISOString()} [${level}] ${parts.map(format).join(' ')}\n`;
  if (toConsole) process.stdout.write(line);
  if (!stream) return;
  try {
    stream.write(line);
  } catch {
    /* disk to'lgan bo'lishi mumkin — ekran baribir ishlashda davom etsin */
  }
}

/** Log fayli qayerda turishini belgilaydi (odatda `userData/logs`). */
function init(dir, { console: alsoConsole = true } = {}) {
  toConsole = alsoConsole;
  try {
    fs.mkdirSync(dir, { recursive: true });
    file = path.join(dir, 'kiosk.log');
    rotate();
    stream = fs.createWriteStream(file, { flags: 'a' });
  } catch (error) {
    stream = null;
    write('warn', ['log fayli ochilmadi:', error]);
  }
  return file;
}

module.exports = {
  init,
  path: () => file,
  info: (...args) => write('info', args),
  warn: (...args) => write('warn', args),
  error: (...args) => write('error', args),
};

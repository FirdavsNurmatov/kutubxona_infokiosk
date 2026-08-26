'use strict';

/*
 * Kiosk sozlamalari.
 *
 * Muhim tamoyil: ekranni sozlash uchun ilovani QAYTA YIG'ISH kerak emas.
 * Kutubxona xodimi `config.json` ni Notepad'da ochib, API manzilini yoki
 * qaysi monitorda chiqishini o'zgartira oladi. Shuning uchun sozlama
 * `.env` da emas (u build vaqtida qotib qoladi), balki exe yonidagi
 * oddiy JSON faylda.
 *
 * Qidirish tartibi (birinchi topilgani ishlatiladi):
 *   1. `--config=<yo'l>` buyruq qatori argumenti
 *   2. exe yonidagi `config.json`      — portativ nusxa uchun
 *   3. `%APPDATA%/<ilova>/config.json` — o'rnatilgan nusxa uchun
 *
 * Fayl bo'lmasa yoki buzilgan bo'lsa — standart qiymatlar bilan ishlaydi.
 * Ekran hech qachon sozlama xatosi tufayli ochilmay qolmasligi kerak.
 */

const fs = require('node:fs');
const path = require('node:path');
const log = require('./logger.cjs');

/** Sozlamalarning standart qiymatlari — hujjat vazifasini ham bajaradi. */
const DEFAULTS = {
  /**
   * Pleylistdagi video ovozi bilan ijro etilsinmi.
   *
   * Standart holatda O'CHIQ: zalda ovoz kerak bo'lmasligi mumkin. Yoqilganda
   * Electron ovozli avtomatik ijroga ruxsat beradi (brauzerda buning uchun
   * maxsus flag kerak bo'lardi). Ovoz kartasi va tovush balandligini tizim
   * darajasida ham tekshirish kerak.
   */
  videoSound: false,

  /** Backend manzili. Bo'sh bo'lsa ekran ichki (mock) ma'lumot bilan ishlaydi. */
  apiUrl: '',
  /** Ma'lumot necha soniyada bir yangilanadi (API ulanganda). */
  apiRefreshSeconds: 300,
  /** API so'rovi shuncha ms da javob bermasa — ichki ma'lumotga qaytiladi. */
  apiTimeoutMs: 8000,
  /** O'z-o'zidan imzolangan sertifikatli ichki serverga ulanishga ruxsat. */
  allowInsecureTls: false,

  /**
   * Ilova qaysi yuzani ochadi. Yo'llar `src/App.tsx` dagi jadval bilan bir xil:
   *   '/'         → asosiy sahifa (App.tsx da nima turgan bo'lsa)
   *   '/interface'→ 1080x1920 infokiosk bo'limi
   *   '/ekran2'   → zal ekrani (signage pleyeri)
   *   '/ekran'    → zal ekranining birinchi versiyasi
   *   '/map'      → bino xaritasi
   * Yuzalar ro'yxatiga tegilmagan bo'lsa, bu yerni o'zgartirish shart emas:
   * standart '/' App.tsx qaysi ekranni asosiy qilib qo'ysa, o'shani ochadi.
   */
  route: '/',

  /** Qaysi monitorda ochilsin (0 — asosiy). Ikki ekranli mashinada muhim. */
  displayIndex: 0,
  /**
   * To'liq ekran. `false` — oddiy oyna (sinash yoki nostandart o'rnatish
   * uchun; masalan ekran boshqa dastur bilan bo'lishilganda).
   */
  fullscreen: true,
  /** Haqiqiy kiosk rejimi: chiqib bo'lmaydigan to'liq ekran. */
  kiosk: true,
  /** Boshqa oynalar ustida turishi. */
  alwaysOnTop: true,
  /** Sichqoncha ko'rsatkichini yashirish. */
  hideCursor: true,
  /**
   * Windows displey masshtabini (125% / 150%) inobatga olmaslik.
   * Aks holda 4K panelda maket kattalashib, matn ekranga sig'may qoladi.
   */
  forceScaleFactor: 1,
  /** Qo'shimcha masshtab — panel juda uzoqdan ko'rilsa 1.1 qilish mumkin. */
  zoomFactor: 1,

  /** Windows'ga kirganda avtomatik ishga tushsin. */
  autoLaunch: true,
  /**
   * Har kuni shu soatda ilova qaytadan ishga tushadi (0–23; -1 — o'chirilgan).
   * Kechasi 04:00 — zal bo'sh payt. Sabab: drayver va dekoder xotirasi
   * haftalab uzluksiz ishlaganda asta-sekin to'planadi.
   */
  dailyRestartHour: 4,
  /** 'relaunch' — ilovani butunlay qayta ishga tushirish, 'reload' — sahifani. */
  dailyRestartMode: 'relaunch',

  /** Grafik tezlatkichni o'chirish. Eski/muammoli videokartalarda yordam beradi. */
  disableHardwareAcceleration: false,
  /**
   * Pleyerni bitta bo'limda ushlab turish: 'intro' | 'books' | 'events' |
   * 'ambient' | 'video' yoki pleylistdagi raqam. Bo'sh bo'lsa ssenariy
   * odatdagidek aylanadi. LED panel ranglarini sozlashda qulay.
   */
  pinnedSlide: '',

  /** DevTools va tuzatish uchun tugmalar ochiq bo'lsin. */
  debug: false,
};

/** Foydalanuvchi tahrirlaydigan fayl namunasi. */
function template() {
  return `${JSON.stringify(DEFAULTS, null, 2)}\n`;
}

function readJson(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    if (error.code !== 'ENOENT') log.warn(`config o'qilmadi (${file}):`, error.message);
    return null;
  }
}

function argConfigPath(argv) {
  const arg = argv.find((value) => value.startsWith('--config='));
  return arg ? arg.slice('--config='.length) : null;
}

/**
 * Sozlamani o'qiydi va standart qiymatlar bilan birlashtiradi.
 * Qaysi fayldan o'qilgani `source` da qaytadi — logda ko'rinsin.
 */
function loadConfig({ exeDir, userDataDir, argv = process.argv }) {
  const candidates = [
    argConfigPath(argv),
    path.join(exeDir, 'config.json'),
    path.join(userDataDir, 'config.json'),
  ].filter(Boolean);

  for (const file of candidates) {
    const found = readJson(file);
    if (found) return { ...DEFAULTS, ...found, source: file };
  }

  /* Hech qayerda yo'q — foydalanuvchi tahrirlashi uchun namuna yozib qo'yamiz.
     Yozib bo'lmasa ham (masalan `Program Files` ga ruxsat yo'q) ilova
     standart qiymatlar bilan ishlayveradi. */
  const target = path.join(userDataDir, 'config.json');
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(target, template(), 'utf8');
    log.info(`config.json yaratildi: ${target}`);
  } catch (error) {
    log.warn('config.json yozilmadi:', error.message);
  }
  return { ...DEFAULTS, source: null };
}

/*
 * Holat — sozlamadan farqli, ilovaning O'ZI yozadigan narsalar.
 * Masalan: GPU ikki marta qulab tushdi, demak keyingi safar grafik
 * tezlatkichsiz ochilsin. Foydalanuvchining `config.json` iga tegmaymiz.
 */
function statePath(userDataDir) {
  return path.join(userDataDir, 'state.json');
}

function readState(userDataDir) {
  return readJson(statePath(userDataDir)) ?? {};
}

function writeState(userDataDir, patch) {
  const next = { ...readState(userDataDir), ...patch };
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(statePath(userDataDir), JSON.stringify(next, null, 2), 'utf8');
  } catch (error) {
    log.warn('state.json yozilmadi:', error.message);
  }
  return next;
}

module.exports = { DEFAULTS, loadConfig, readState, writeState, template };

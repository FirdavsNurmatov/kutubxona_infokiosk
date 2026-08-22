'use strict';

/*
 * Preload — renderer bilan main process orasidagi yagona ko'prik.
 *
 * Renderer'da Node yo'q (`nodeIntegration: false`, `sandbox: true`), shuning
 * uchun sahifa faqat shu yerda ochilgan funksiyalarni ko'radi. Ochilgani ham
 * kam: sozlama, log va qayta yuklash. Ekranga bundan ortig'i kerak emas.
 */

const { contextBridge, ipcRenderer } = require('electron');

/** Main process sozlamani argument sifatida uzatadi — sinxron o'qiladi. */
const PREFIX = '--kiosk-config=';
/** Watchdog uchun "tirikman" signali. */
const HEARTBEAT_MS = 5000;

function bootConfig() {
  const arg = process.argv.find((value) => value.startsWith(PREFIX));
  if (!arg) return {};
  try {
    // base64 emas, URI kodlash: sandbox'da `Buffer` bo'lmasligi mumkin
    return JSON.parse(decodeURIComponent(arg.slice(PREFIX.length)));
  } catch {
    return {};
  }
}

const config = Object.freeze(bootConfig());

/*
 * Watchdog signali preload'da turadi, renderer kodida emas.
 *
 * Sabab ikkita: birinchidan, ilova kodiga hech narsa qo'shish shart emas;
 * ikkinchidan, bu taymer sahifaning ASOSIY JS oqimida ishlaydi — React
 * cheksiz siklga tushib qolsa yoki sahifa qotsa, signal ham to'xtaydi va
 * main process buni sezadi.
 */
const beat = () => ipcRenderer.send('kiosk:heartbeat');
beat();
setInterval(beat, HEARTBEAT_MS);

/* Sahifadagi xatolar log fayliga tushsin — kioskda konsolni ochadigan
   odam yo'q. `window` DOM obyekti izolyatsiyalangan kontekstda ham umumiy,
   shuning uchun asosiy dunyodagi xatolar shu yerda ham eshitiladi. */
try {
  window.addEventListener('error', (event) => {
    ipcRenderer.send('kiosk:log', 'error', `renderer: ${event.message} @ ${event.filename}:${event.lineno}`);
  });
  window.addEventListener('unhandledrejection', (event) => {
    ipcRenderer.send('kiosk:log', 'error', `renderer promise: ${event.reason}`);
  });
} catch {
  /* juda erta bo'lsa — muhim emas, ilova baribir ishlaydi */
}

contextBridge.exposeInMainWorld('kiosk', {
  /** Ekran Electron ichida ishlayotganini bilish uchun. */
  isElectron: true,
  /** `config.json` dan olingan qiymatlar (faqat rendererga keraklilari). */
  config,
  /** Ilovani/sahifani qayta yuklash — favqulodda holat uchun. */
  reload: () => ipcRenderer.send('kiosk:reload'),
  /** Ilova logiga yozish. */
  log: (level, message) => ipcRenderer.send('kiosk:log', String(level), String(message)),
  /** Versiyalar — diagnostika uchun. */
  versions: async () => ipcRenderer.invoke('kiosk:versions'),
});

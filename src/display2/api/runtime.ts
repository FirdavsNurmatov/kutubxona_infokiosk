/*
 * Ish vaqtidagi sozlama.
 *
 * Ekran ikki xil muhitda ishlaydi va ikkalasida ham sozlama boshqa joydan
 * keladi:
 *
 *   brauzer  → `.env` dagi VITE_API_URL (build vaqtida qotadi)
 *   Electron → exe yonidagi `config.json` (istalgan payt tahrirlanadi)
 *
 * Ikkinchisi kiosk uchun muhim: kutubxona serverining manzili o'zgarsa,
 * dasturchi kerak bo'lmasligi kerak — xodim faylni ochib tahrirlaydi va
 * ilovani qaytadan ishga tushiradi.
 */

/** API manzili. Bo'sh satr — backend yo'q, ichki ma'lumot ishlatiladi. */
export function apiUrl(): string {
  const fromBridge = window.kiosk?.config?.apiUrl;
  const value = (fromBridge ?? import.meta.env.VITE_API_URL ?? '').trim();
  // Oxiridagi `/` ni olib tashlaymiz — yo'llar `/` bilan boshlanadi
  return value.replace(/\/+$/, '');
}

/** Ma'lumot necha ms da bir yangilanadi. */
export function refreshMs(): number {
  const seconds = window.kiosk?.config?.apiRefreshSeconds;
  return Math.max(30, Number(seconds) || 300) * 1000;
}

/** So'rovning eng uzun kutish vaqti. */
export function timeoutMs(): number {
  const value = window.kiosk?.config?.apiTimeoutMs;
  return Math.max(1000, Number(value) || 8000);
}

/**
 * Pleylistdagi video ovozi bilan ijro etilsinmi.
 *
 * Standart — yo'q. Brauzerda buni yoqib ham bo'lmaydi (avtomatik ijro
 * bloklanadi), Electron'da esa `config.json` dagi `videoSound` kaliti
 * hal qiladi — ilovani qayta yig'ish kerak emas.
 */
export function videoSound(): boolean {
  return window.kiosk?.config?.videoSound === true;
}

/**
 * Log. Electron'da fayl logiga tushadi, brauzerda — konsolga.
 * Zaldagi ekranda konsolni ochadigan odam yo'q, shuning uchun bu yagona iz.
 */
export function report(level: 'info' | 'warn' | 'error', message: string) {
  if (window.kiosk) {
    window.kiosk.log(level, message);
    return;
  }
  const write = level === 'error' ? console.error : level === 'warn' ? console.warn : console.info;
  write(`[signage] ${message}`);
}

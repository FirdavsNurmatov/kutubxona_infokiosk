import type { CSSProperties } from 'react';

/**
 * Karusel "uyalari" — markazdan chetga qarab joylashuv.
 *
 * Har bir uyaning ko'rinishi (siljish, masshtab, shaffoflik, blur) CSS'da
 * `[data-slot]` bo'yicha belgilanadi. Sabab: ultra-keng LED panelda uyalar
 * kengroq yoyiladi va uchinchi juftlik ham ko'rinadi — buni media so'rovi
 * bilan hal qilish JS'da ekran nisbatini kuzatishdan ancha sodda va arzon.
 *
 * Bu yerda faqat ikkita narsa hisoblanadi: uyaning **chuqurligi** (markazdan
 * necha qadam uzoqda) va **yo'nalishi** (chapmi yoki o'ngmi).
 */

/**
 * Chapga va o'ngga nechta uya chiziladi.
 *
 * 0…2 — doim ko'rinadi (jami 5 ta element)
 * 3    — ultra-keng panelda (≈3:1 dan keng) ochiladi va sahifada 7 ta element
 *        bo'ladi — KITOBLARDA ham, TADBIRLARDA ham. Tor ekranda yopiq qoladi:
 *        u yerda buncha element uchun joy yo'q (`display2.css`, media so'rovi)
 * 4    — ko'rinmas zaxira: yangi element shu yerda paydo bo'lib, keyingi
 *        qadamda ko'rinishga suriladi, shuning uchun aylanish uzluksiz
 *        tuyuladi va hech qayerda sakrash bo'lmaydi.
 */
export const SLOT_RANGE = 4;

export interface SlotAttrs {
  'data-slot': string;
  'data-side': 'l' | 'r';
  style: CSSProperties;
}

/**
 * Kartochkaga uya raqamini va yo'nalishini biriktiradi.
 *
 * `data-side` kerak, chunki KITOBLAR sahifasida joylashuv nosimmetrik:
 * tanlangan kitobning o'ng yonida ma'lumot paneli turadi, shuning uchun
 * o'ngdagi kitoblar chapdagilarga qaraganda uzoqroqqa suriladi.
 */
export function slotAttrs(offset: number): SlotAttrs {
  const depth = Math.min(Math.abs(offset), SLOT_RANGE);
  return {
    'data-slot': String(depth),
    'data-side': offset < 0 ? 'l' : 'r',
    // Manfiy tomon uchun siljish oynaga qarab teskari buriladi
    style: { '--slot-dir': offset < 0 ? -1 : 1 } as CSSProperties,
  };
}

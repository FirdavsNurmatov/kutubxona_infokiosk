import { useEffect, useState } from 'react';

/**
 * Karusel bo'limlar orasida qayerda to'xtaganini eslab qoladi.
 *
 * Bo'lim (masalan KITOBLAR) qayta ochilganda ro'yxat boshidan emas, oldingi
 * joyidan davom etadi — shunda 20 ta kitobning hammasi kun davomida navbat
 * bilan ko'rinadi, birinchi yettitasi emas.
 */
const cursors = new Map<string, number>();

export interface AutoCarousel {
  /** To'xtovsiz o'suvchi hisoblagich — React kalitlari uchun. */
  cursor: number;
  /** Ro'yxat ichidagi haqiqiy indeks. */
  index: number;
}

/**
 * Avtomatik aylanuvchi karusel.
 *
 * Foydalanuvchi aralashuvi yo'q: bo'lim faol bo'lsa, har `intervalMs` da
 * keyingi elementga o'tadi. Bo'lim ko'rinmay qolsa taymer to'xtaydi va
 * tozalanadi.
 */
export function useAutoCarousel(
  key: string,
  length: number,
  intervalMs: number,
  active: boolean,
): AutoCarousel {
  const [cursor, setCursor] = useState(() => cursors.get(key) ?? 0);

  useEffect(() => {
    cursors.set(key, cursor);
  }, [key, cursor]);

  useEffect(() => {
    if (!active || length < 2) return undefined;
    const id = window.setInterval(() => setCursor((c) => c + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [active, length, intervalMs]);

  const index = length > 0 ? ((cursor % length) + length) % length : 0;
  return { cursor, index };
}

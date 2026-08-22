/*
 * Ekran ma'lumotining yagona manbasi.
 *
 * Slaydlar `data/books.ts` dan to'g'ridan-to'g'ri import qilmaydi — faqat shu
 * yerdagi funksiyalarni chaqiradi. Shu sababli backend ulanishi komponentlarga
 * umuman tegmaydi: `config.json` da `apiUrl` ko'rsatilsa, o'sha zahoti HTTP
 * yo'li ishga tushadi.
 *
 * Signage uchun eng muhim qoida shu faylda: **ekran hech qachon bo'sh
 * qolmaydi**. Server o'chgan, tarmoq uzilgan, javob buzilgan — farqi yo'q,
 * har qanday xatolikda ichki ro'yxat qaytadi va ekran ishlashda davom etadi.
 * Xatolik faqat logga yoziladi.
 */

import { signageBooks } from '../data/books';
import { buildSignageEvents } from '../data/events';
import { signagePlaylist } from '../data/playlist';
import type { SignageBook, SignageEvent, SignageSlide } from '../data/types';
import { apiUrl, report, timeoutMs } from './runtime';

/** Kutilgan shakl kelmasa (bo'sh ro'yxat, `null`, HTML sahifasi) — zaxira. */
function usable<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Bitta so'rov. Hech qachon `throw` qilmaydi.
 *
 * Kutish vaqti cheklangan: sekin server ekranni ushlab turmasligi kerak.
 * Signage'da eski ma'lumot — muzlab qolgan ekrandan yaxshiroq.
 */
async function fetchList<T>(path: string, fallback: T[]): Promise<T[]> {
  const base = apiUrl();
  if (!base) return fallback;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs());

  try {
    const response = await fetch(`${base}${path}`, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
      // Ekran uzoq ishlaydi — brauzer keshi eski afishani ko'rsatmasin
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: unknown = await response.json();
    if (!usable<T>(data)) throw new Error("javob bo'sh yoki kutilgan shaklda emas");

    return data;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    report('warn', `${path}: ${reason} — ichki ma'lumot ishlatiladi`);
    return fallback;
  } finally {
    window.clearTimeout(timer);
  }
}

/** Ekranda ko'rsatiladigan kitoblar. */
export function getSignageBooks(): Promise<SignageBook[]> {
  return fetchList<SignageBook>('/signage/books', signageBooks);
}

/**
 * Afishaga tushadigan tadbirlar.
 *
 * Sana serverga ham uzatiladi: ekran haftalab qayta yuklanmaydi, shuning
 * uchun "bugun" tushunchasi har kuni yangilanib turishi kerak.
 */
export function getSignageEvents(today: string): Promise<SignageEvent[]> {
  return fetchList<SignageEvent>(`/signage/events?from=${today}`, buildSignageEvents(today));
}

/**
 * Ssenariy — bo'limlar tartibi va davomiyligi.
 *
 * Kelajakda kutubxona xodimi admin panelidan tartibni o'zgartira oladi:
 * masalan tadbir kuni videoni oldinga surish. Shakli `SignageSlide` bilan
 * bir xil bo'lishi shart, aks holda zaxira ro'yxat ishlatiladi.
 */
export function getSignagePlaylist(): Promise<SignageSlide[]> {
  return fetchList<SignageSlide>('/signage/playlist', signagePlaylist).then((slides) => {
    const valid = slides.filter(isSlide);
    if (valid.length === slides.length) return slides;
    report('warn', `pleylistda ${slides.length - valid.length} ta noto'g'ri bo'lim tashlab yuborildi`);
    return valid.length > 0 ? valid : signagePlaylist;
  });
}

const SLIDE_TYPES = new Set(['intro', 'books', 'events', 'ambient', 'video']);

function isSlide(value: unknown): value is SignageSlide {
  if (!value || typeof value !== 'object') return false;
  const slide = value as Partial<SignageSlide> & { type?: unknown };
  if (typeof slide.type !== 'string' || !SLIDE_TYPES.has(slide.type)) return false;
  // Videodan tashqari har bir bo'limda davomiylik bo'lishi shart —
  // aks holda pleyer o'sha bo'limda abadiy qotib qoladi
  if (slide.type === 'video') return typeof (slide as { src?: unknown }).src === 'string';
  return typeof slide.duration === 'number' && slide.duration > 0;
}

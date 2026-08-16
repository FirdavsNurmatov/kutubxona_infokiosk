import type { SignageSlide } from './types';

/**
 * Ekran ssenariysi.
 *
 * Vaqtlar bitta joyda turadi — komponentlar ichida `setTimeout` yo'q.
 * Keyinchalik bu ro'yxat `GET /api/signage/playlist` dan kelishi mumkin.
 *
 * Ikki bosqichli vaqt: bu yerdagi `duration` — butun bo'lim uzunligi,
 * karusel ichidagi har bir kitob/tadbir esa o'z vaqtiga ega (BOOK_INTERVAL,
 * EVENT_INTERVAL).
 */

/** Bitta kitob diqqat markazida turadigan vaqt. */
export const BOOK_INTERVAL = 6000;
/** Bitta tadbir diqqat markazida turadigan vaqt. */
export const EVENT_INTERVAL = 6500;

/**
 * Kutubxona videolari. Fayl `public/videos/` ga qo'yilgach shu yerga yoziladi
 * — pleylistga avtomatik qo'shiladi. Ro'yxat bo'sh bo'lsa video bo'limi
 * umuman ko'rsatilmaydi.
 */
const videoSources: string[] = [];

export const signagePlaylist: SignageSlide[] = [
  { type: 'intro', duration: 13000 },
  { type: 'books', duration: 35000 },
  { type: 'ambient', duration: 18000 },
  { type: 'events', duration: 30000 },
  ...videoSources.map((src): SignageSlide => ({ type: 'video', src })),
];

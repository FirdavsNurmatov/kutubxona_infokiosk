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
 * Ekran ssenariysi — bo'limlar shu tartibda aylanadi.
 *
 * VIDEO ham oddiy bo'lim: faylni `public/videos/` ga qo'yib,
 * `{ type: 'video', src: '/videos/fayl.mp4' }` qatorini ro'yxatning KERAKLI
 * JOYIGA yozish kifoya — pastdagi qatorni ko'chirsangiz video shu o'rinda
 * ijro etiladi. Bir nechta video bo'lsa har biri o'z joyida turadi.
 *
 * Videoda `duration` berilmasa — videoning o'z uzunligi bo'lim davomiyligi
 * bo'ladi: tugagach pleyer o'zi keyingisiga o'tadi. Berilsa, video shu vaqtda
 * kesiladi.
 *
 * Videolar OVOZI BILAN ijro etiladi — kiosk brauzeri
 * `--autoplay-policy=no-user-gesture-required` bilan ochilishi shart
 * (`src/display2/signage/VideoSlide.tsx`).
 */
export const signagePlaylist: SignageSlide[] = [
  { type: 'ambient', duration: 18000 },
  { type: 'intro', duration: 13000 },
  { type: 'video', src: '/videos/Маданият Вазирлигидан.mp4' },
  { type: 'books', duration: 35000 },
  { type: 'events', duration: 30000 },
];

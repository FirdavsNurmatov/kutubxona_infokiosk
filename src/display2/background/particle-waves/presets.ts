import type { SignageMode } from '../../data/types';

/**
 * Har bir bo'lim to'lqinning o'z kayfiyatini belgilaydi.
 *
 * Umumiy qoida: ko'k — asosiy rang, oltin — kam va nozik; harakat sekin.
 * INTRO va AMBIENT da fonda yana kinematik sahna (bino/kitob) turadi, shuning
 * uchun to'lqin pastroq yorqinlikda ishlaydi; KITOBLAR va TADBIRLAR da esa
 * to'lqin yagona fon bo'lgani uchun biroz ko'proq ko'rinadi.
 */
export interface WavePreset {
  /** To'lqin balandligi. */
  amplitude: number;
  /** Oqish tezligi (rad/sek). */
  speed: number;
  /** Zarracha o'lchami (CSS piksel). */
  pointSize: number;
  /** Umumiy yorqinlik. */
  intensity: number;
  /** Markazni tinchlantirish kuchi: 0 — bir tekis, 1 — markaz deyarli tinch. */
  calm: number;
  /**
   * Gorizont darajasi (NDC, -1 = kadr pasti, +1 = tepasi). Shu chiziqdan
   * yuqorida to'lqin so'nadi — kadrning ustki qismi toza qoladi.
   */
  horizon: number;
}

export const WAVE_PRESETS: Record<SignageMode, WavePreset> = {
  /* Kinematik me'moriy kayfiyat — to'lqin fonning bir qismi bo'lib qoladi */
  /* Bino qahramon: to'lqin faqat yer sathi bo'ylab, past yorqinlikda oqadi */
  intro: { amplitude: 8, speed: 0.13, pointSize: 12, intensity: 0.3, calm: 0.5, horizon: -0.34 },

  /* Muqovalar qahramon: markaz tinch, chetlarda yumshoq oqim */
  books: { amplitude: 14, speed: 0.2, pointSize: 15, intensity: 0.88, calm: 0.72, horizon: 0.1 },

  /* Tadbirlarda kompozitsiya biroz boshqacha: kengroq va sekinroq to'lqin */
  events: { amplitude: 17, speed: 0.24, pointSize: 16, intensity: 0.85, calm: 0.66, horizon: 0.1 },

  /* Ma'lumot yo'q — to'lqin to'liq kuchida "bilim oqimi" bo'lib ochiladi */
  /* Rasmning o'zida to'lqinlar bor — WebGL qatlami ularni faqat quvvatlaydi */
  ambient: { amplitude: 14, speed: 0.18, pointSize: 14, intensity: 0.42, calm: 0.4, horizon: -0.28 },

  /* Video butun ekranni egallaydi — to'lqin to'xtatiladi */
  video: { amplitude: 10, speed: 0.15, pointSize: 13, intensity: 0, calm: 0.6, horizon: 0 },
};

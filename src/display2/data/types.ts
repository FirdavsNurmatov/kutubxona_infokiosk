import type { Localized } from '../../i18n/translations';

/**
 * Signage ma'lumot tuzilmalari.
 *
 * Interfeys ma'lumot qayerdan kelishini bilmaydi: hozir mock, keyinchalik
 * Koha API (`GET /api/signage/books`, `/events`, `/playlist`). Shu sababli
 * tuzilmalar iloji boricha sodda — faqat ekranda ko'rinadigan maydonlar.
 *
 * Matn maydonlari ko'p tilli: kutubxona ekrani uch tilda ishlaydi va API ham
 * shu shaklda qaytaradi.
 */

export interface SignageBook {
  id: string;
  title: Localized;
  author: Localized;
  genre: Localized;
  cover: string;
  /** Asl nashr yili — tanlangan kitob panelida ko'rsatiladi. */
  year?: number;
  /** Sahifalar soni (odatiy nashr bo'yicha). Koha ulanganda aniq qiymat keladi. */
  pages?: number;
  /** Bir-ikki qatorli tavsif — uzoqdan o'qish uchun qisqa bo'lishi shart. */
  summary?: Localized;
}

export interface SignageEvent {
  id: string;
  title: Localized;
  /** ISO sana: 'YYYY-MM-DD' — kun va oy nomi tilga qarab hosil qilinadi. */
  date: string;
  time: string;
  location: Localized;
  /** Tadbir turi (ixtiyoriy): konferensiya, ko'rgazma va h.k. */
  type?: Localized;
  image: string;
}

/* ── Pleylist ───────────────────────────────────────────────── */

export type SignageSlide =
  | { type: 'intro'; duration: number }
  | { type: 'books'; duration: number }
  | { type: 'events'; duration: number }
  | { type: 'ambient'; duration: number }
  /** `duration` berilmasa, videoning o'z uzunligi slayd davomiyligini belgilaydi. */
  | { type: 'video'; src: string; duration?: number };

export type SignageMode = SignageSlide['type'];

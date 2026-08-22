import type { Localized } from '../../i18n/translations';

/**
 * Signage ma'lumot tuzilmalari.
 *
 * Interfeys ma'lumot qayerdan kelishini bilmaydi: hozir mock, keyinchalik
 * Koha API (`GET /api/signage/books`, `/events`, `/playlist`). Shu sababli
 * tuzilmalar iloji boricha sodda — faqat ekranda ko'rinadigan maydonlar.
 *
 * Tadbir matnlari ko'p tilli (`Localized`), kitob matnlari esa o'zbekcha
 * oddiy satr: kitoblar ro'yxati `public/books.json` dan keladi va u yerda
 * tarjima yo'q.
 */

export interface SignageBook {
  id: string;
  /** Nom, muallif va janr — `public/books.json` dagidek o'zbekcha. */
  title: string;
  author: string;
  genre: string;
  /** Muqova yo'li. Bo'lmasa ekran tipografik muqova chizadi. */
  cover?: string;
  /** Asl nashr yili — tanlangan kitob panelida ko'rsatiladi. */
  year?: number;
  /** Sahifalar soni (odatiy nashr bo'yicha). Koha ulanganda aniq qiymat keladi. */
  pages?: number;
  /** Qisqacha annotatsiya — panelda uch qatorgacha ko'rinadi. */
  summary?: string;
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

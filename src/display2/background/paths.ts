/**
 * AMBIENT sahifasidagi yorug'lik oqimlarining yo'llari.
 *
 * Koordinatalar 0…1000 oralig'idagi virtual kvadratda beriladi va ekran
 * o'lchamiga cho'ziladi (x → x/1000·W, y → y/1000·H).
 *
 * Egri chiziqlar ochiq kitob rasmidagi ko'k va oltin to'lqinlar ustiga
 * tushadi: ular kitobning ikki yonidan chiqib, kadr chetlariga taraladi.
 * Shuning uchun yo'llar ekranning o'rta-pastki qismida (y ≈ 0.5…0.75)
 * joylashgan — aynan rasmdagi to'lqinlar bo'ylab.
 */

export type TrailTone = 'gold' | 'blue';

export interface TrailPath {
  /** SVG "d" — faqat M va C buyruqlari (MotionPathPlugin o'qiydi). */
  d: string;
  tone: TrailTone;
  /** 0 = eng uzoq qatlam, 1 = eng yaqin. Chuqurlik siljishini belgilaydi. */
  depth: number;
  /** Zarrachalar soni (sifat koeffitsientiga ko'paytiriladi). */
  density: number;
  /** Bazaviy tezlik — yo'lning ulushi/sekundiga. */
  speed: number;
  /** Umumiy yorqinlik (0…1). */
  intensity: number;
}

export const TRAIL_PATHS: TrailPath[] = [
  /* ── Chap tomon: kitobdan chetga taraladigan to'lqinlar ───── */
  {
    d: 'M-20,545 C90,530 180,556 265,592 C345,626 400,668 470,676',
    tone: 'blue',
    depth: 0.55,
    density: 16,
    speed: 0.03,
    intensity: 1,
  },
  {
    d: 'M-20,600 C100,572 200,566 290,590 C370,612 420,652 480,664',
    tone: 'gold',
    depth: 0.7,
    density: 18,
    speed: 0.036,
    intensity: 1,
  },
  {
    d: 'M-20,660 C110,648 210,630 300,632 C390,634 440,660 490,678',
    tone: 'blue',
    depth: 0.85,
    density: 12,
    speed: 0.045,
    intensity: 0.6,
  },

  /* ── O'ng tomon: shu to'lqinlarning ko'zgudagi aksi ───────── */
  {
    d: 'M1020,545 C910,530 820,556 735,592 C655,626 600,668 530,676',
    tone: 'blue',
    depth: 0.55,
    density: 16,
    speed: 0.028,
    intensity: 1,
  },
  {
    d: 'M1020,600 C900,572 800,566 710,590 C630,612 580,652 520,664',
    tone: 'gold',
    depth: 0.7,
    density: 18,
    speed: 0.034,
    intensity: 1,
  },
  {
    d: 'M1020,660 C890,648 790,630 700,632 C610,634 560,660 510,678',
    tone: 'blue',
    depth: 0.85,
    density: 12,
    speed: 0.042,
    intensity: 0.6,
  },

  /* ── Pol bo'ylab aks etgan nur ────────────────────────────── */
  {
    d: 'M-20,806 C160,790 340,772 500,764 C660,772 840,790 1020,806',
    tone: 'gold',
    depth: 1,
    density: 10,
    speed: 0.022,
    intensity: 0.45,
  },
];

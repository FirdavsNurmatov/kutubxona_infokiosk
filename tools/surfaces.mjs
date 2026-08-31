/*
 * Variantlar jadvali — "qaysi yuza qaysi exe ga tushadi" degan yagona manba.
 *
 * Nega kerak: bitta exe hamma yuzani (kiosk, ekran, ekran2, xarita,
 * interface) va ularning HAMMA media faylini ko'tarib yurardi — 164 MB.
 * Qora infokioskda `/interface` ishlaganda 26 MB video, 9.7 MB ekran2
 * rasmi va 4.7 MB xarita bekorga yotardi.
 *
 * Endi `npm run build:win -- interface` faqat o'sha yuzani va uning
 * assetlarini yig'adi. Kod bazasi bitta qoladi — bo'linish faqat build
 * vaqtida sodir bo'ladi.
 *
 * Bu fayl `vite.config.ts` (assetlarni saralash) va
 * `tools/build-variant.mjs` (paketlash) tomonidan o'qiladi.
 */

/**
 * Hamma variantga tushadigan fayllar.
 *
 * `src/data/mockData.ts` barcha yuzada ishlatiladi va u kitob muqovalari
 * bilan mualliflar suratlariga murojaat qiladi — shuning uchun ular
 * umumiy ro'yxatda. Yo'q rasm kioskda ko'rinadigan xato, 8 MB esa
 * jimgina yotgan videodan ancha arzon.
 */
export const SHARED_ASSETS = [
  'favicon.svg',
  'books.json',
  'images/books',
  'images/authors',
  // images/ ildizidagi yakka fayllar: logo, hero, hall, desk va h.k. (~840 KB)
  'images/*.jpg',
  'images/*.png',
];

/**
 * Har bir variant:
 *   route    — `config.json` ga yoziladigan yo'l (main.cjs shuni ochadi)
 *   assets   — SHARED_ASSETS ustiga qo'shiladigan `public/` yo'llari
 *   appId    — Windows uchun alohida identifikator; alohida bo'lmasa
 *              o'rnatuvchilar bir-birini ustidan yozadi
 *   product  — Boshlash menyusi va yorliqda ko'rinadigan nom
 *   slug     — exe fayl nomidagi qism
 */
export const SURFACES = {
  kiosk: {
    route: '/',
    assets: [],
    appId: 'uz.natlib.kiosk',
    product: 'Milliy Kutubxona Kiosk',
    slug: 'Kiosk',
  },
  ekran: {
    route: '/ekran',
    assets: ['videos'],
    appId: 'uz.natlib.ekran',
    product: 'Milliy Kutubxona Ekran',
    slug: 'Ekran',
  },
  ekran2: {
    route: '/ekran2',
    assets: ['videos', 'images/ekran2'],
    appId: 'uz.natlib.ekran2',
    product: 'Milliy Kutubxona Ekran 2',
    slug: 'Ekran2',
  },
  map: {
    route: '/map',
    assets: ['images/map'],
    appId: 'uz.natlib.map',
    product: 'Milliy Kutubxona Xarita',
    slug: 'Xarita',
  },
  interface: {
    route: '/interface',
    assets: ['interface'],
    appId: 'uz.natlib.interface',
    product: 'Milliy Kutubxona Infokiosk',
    slug: 'Infokiosk',
  },
};

/** Buyruq qatorida yoziladigan nomlar ro'yxati — xato xabari uchun. */
export const SURFACE_NAMES = Object.keys(SURFACES);

/**
 * Nomni tekshirib, variantni qaytaradi. Noto'g'ri nom yozilganda build
 * jimgina "hammasi" variantiga tushib ketmasligi kerak — shuning uchun
 * xato tashlanadi.
 */
export function requireSurface(name) {
  const found = SURFACES[name];
  if (!found) {
    throw new Error(
      `noma'lum yuza: "${name}". Mavjudlari: ${SURFACE_NAMES.join(', ')}`,
    );
  }
  return { name, ...found };
}

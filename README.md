# Milliy kutubxona — Infokiosk (frontend)

O'zbekiston Milliy kutubxonasi binosidagi sensorli infokiosk uchun frontend.
Hozircha barcha ma'lumot `src/data/mockData.ts` dagi mock ma'lumotdan olinadi.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ ga yig'adi
npm run preview    # yig'ilgan versiyani ko'rish
npm run typecheck  # TypeScript tekshiruvi
npm run lint       # ESLint
```

## Netlify'ga chiqarish

`netlify.toml` tayyor: `npm run build` → `dist`, SPA uchun redirect va kesh sarlavhalari yozilgan.

- **Git orqali:** repozitoriyni Netlify'ga ulash kifoya, qolgan sozlamalar `netlify.toml` dan olinadi.
- **CLI orqali:** `npx netlify-cli deploy --prod`
- **Qo'lda:** `npm run build` dan keyin `dist/` papkasini Netlify'ga sudrab tashlash.

## Tuzilishi

```
public/
  images/        tadbir va kitob rasmlari (lokal)
  favicon.svg
src/
  i18n/          uz / ru / en tarjimalari, til konteksti, sana formatlari
  data/          mock ma'lumot (kitob, tadbir, xizmat, aloqa)
  components/    qayta ishlatiladigan bloklar (header, footer, panel, modal)
  views/         ekranlar (bosh sahifa, katalog, tadbirlar, xizmatlar, aloqa, qidiruv)
  types.ts       ekran (View) turlari
```

### Offline ishlash

Kiosk internetsiz ham to'liq ishlaydi — **hech qanday tashqi so'rov yo'q**:

- Shrift: `@fontsource-variable/inter` loyiha ichida (Google Fonts CDN emas).
  Brauzer faqat kerakli subsetni oladi — lotin ~48 KB, kirill ~19 KB.
- Rasmlar: `public/images/` da (manba Pexels, bepul litsenziya). Keyinchalik
  kutubxonaning o'z rasmlariga almashtirish uchun shu papkadagi fayllarni
  o'zgartirish kifoya — yo'llar `src/data/mockData.ts` dagi `IMG` da.
- QR kod SVG sifatida brauzerda chiziladi, tashqi xizmat ishlatilmaydi.

Yagona tashqaridagi narsa — footer'dagi ijtimoiy tarmoq havolalari (bosilganda
ochiladi, bu tabiiy).

### Til

Uchta til to'liq qo'llab-quvvatlanadi: **uz / ru / en**. Interfeys matnlari
`src/i18n/translations.ts` da, ma'lumotdagi matnlar esa `Localized`
(`{ uz, ru, en }`) ko'rinishida saqlanadi. Tanlangan til `localStorage`
(`mk-kiosk-lang`) da eslab qolinadi va `<html lang>` bilan sahifa sarlavhasi
avtomatik yangilanadi.

Yangi matn qo'shish: `Translation` interfeysiga kalit qo'shiladi — TypeScript
uchala tilda ham to'ldirilishini majburlaydi.

### Responsive

Barcha o'lchamlar `src/index.css` dagi CSS o'zgaruvchilari orqali boshqariladi:

| Ekran | Ko'rinish |
|---|---|
| ≥ 1101px | 3 ustun (afisha · yangi kitoblar · tavsiyalar) |
| ≤ 1100px | 2 ustun, afisha tepada to'liq kenglikda — portret kiosk (1080×1920) shu holatda |
| ≤ 780px | 1 ustun, header vertikal, footer ikki qatorga o'raladi |
| balandligi ≤ 820px / ≤ 660px | header, footer va panel sarlavhalari siqiladi |
| ≥ 2000px | 4K kiosk uchun hamma narsa kattalashadi |

## Backend'ga ulanganda

`src/data/mockData.ts` dagi eksportlarni API chaqiruvlari bilan almashtirish
kifoya — komponentlar faqat `LibraryEvent`, `Book`, `Service` turlariga bog'liq.

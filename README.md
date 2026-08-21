# Milliy kutubxona — Infokiosk (frontend)

O'zbekiston Milliy kutubxonasi uchun frontend. Bitta build **ikkita qurilmaga**
xizmat qiladi:

| Yo'l | Qurilma | Ko'rinish |
|---|---|---|
| `/` | Sensorli infokiosk | Och mavzu, chap menyu, katta qidiruv, kitob katalogi |
| `/ekran` | Devordagi katta ekran | To'q mavzu, afisha, TOP-10 ro'yxatlar, statistika va diagrammalar |
| `/ekran2` | O'sha ekranning kinematik fonli versiyasi | GSAP + WebGL to'lqin maydoni |
| `/map` | Binoning interaktiv xaritasi | Qavatlar va xonalar |
| `/interface` | **1080×1920 portret infokiosk** | Yetti mustaqil bo'lim, har biri o'z mavzusida |

## `/interface` — portret infokiosk bo'limlari

`kutubxona_rasmlar_interfeysi_1/` dagi maketlar asosida qurilgan. Har bir modul
o'z yo'liga ega va alohida chunk bo'lib yuklanadi:

| Yo'l | Modul | Nima qiladi |
|---|---|---|
| `/interface` | Bosh sahifa | Qavat tanlagich, tezkor xizmatlar, bugungi tadbirlar, bo'limlarga o'tish |
| `/interface/meros` | Nodir meros | Qo'lyozma va noyob kitoblar katalogi, raqamli varaqlagich |
| `/interface/allomalar` | Buyuk allomalar | Alloma karuseli, bo'limlar bo'yicha to'liq maqola |
| `/interface/siymolar` | 100 siymo | Kategoriyalar, qidiruv, sevimlilar, to'liq maqola |
| `/interface/tarix` | O'zbekiston tarixi | Vaqt lentasi, davr paneli, voqealar, xarita |
| `/interface/kecha-bugun` | Kecha va bugun | Suriladigan "oldin/hozir" solishtirgichi, shahar tanlagich |
| `/interface/viktorina` | Bilimingizni sinang | Kategoriyalar, taymerli test, natija ekrani |
| `/interface/bolalar` | Bolalar bo'limi | Mavzular, yulduz to'plash, xotira va so'z o'yinlari |

### Bo'limlar orasida yurish

URL yozish shart emas. Har bir sahifaning yuqori chap burchagida **menyu tugmasi**
bor — bosilganda sakkizta bo'lim ro'yxati ochiladi, joriy bo'lim ajratib
ko'rsatiladi (`src/interface/shell/ModuleMenu.tsx`). Bundan tashqari:

- Bosh sahifadagi "BO'LIMLAR" setkasi — hamma modulga
- Har bir modulda "Orqaga" va pastki paneldagi "Bosh sahifa" — hub'ga

Menyuning pastida, **faqat `npm run dev` da**, boshqa qurilma ekranlariga
(`/`, `/ekran`, `/ekran2`, `/map`) havolalar chiqadi — demo ko'rsatishda qulay.
`npm run build` da bu blok tushib qoladi (`import.meta.env.DEV`).

### Ma'lumot qayerdan keladi

Modullar ma'lumotni **faqat `src/interface/api`** orqali oladi. Hozircha uni
`src/interface/data/*` dagi mock adapter qaytaradi, lekin har bir funksiya
`Promise` qaytargani uchun backendga o'tish komponentlarga tegmaydi:

```bash
# .env
VITE_API_URL=http://localhost:8000/api
```

Shu o'zgaruvchi qo'yilsa, `src/interface/api/index.ts` dagi `fetchJson` yo'li
ishga tushadi. Backend qaytarishi kerak bo'lgan shakl — `src/interface/api/types.ts`.

### Ekran o'lchami

Sahna aynan `1080×1920 px` da quriladi va `transform: scale()` bilan ekranga
moslashadi (`.if-stage`, `src/interface/interface.css`). Shuning uchun kioskda
piksel-aniq chiqadi, boshqa ekranlarda esa nisbatini saqlab ko'rinadi.

### Kiosk uchun qo'shilgan narsalar

- **Ekran klaviaturasi** — qidiruv maydoni bosilganda ochiladi, o'zbek lotin /
  rus kirill / ingliz layoutlari (`src/interface/shell/OnScreenKeyboard.tsx`)
- **Bo'shlik taymeri** — 90 soniya tegilmasa bosh sahifaga qaytadi
  (`src/interface/shell/useIdleReset.ts`)
- Tegish maydonlari ≥ 88 px, hover holatlari o'rniga `:active`

### Rasmlar

`public/interface/` dagi 71 ta `.webp` maketlardan kesib olingan. Qayta yig'ish:

```bash
./tools/crop-assets.sh   # ImageMagick kerak
```

Koordinatalar shu skript ichida — maket o'zgarsa, faqat shu fayl tahrirlanadi.

> **Diqqat:** maketlardagi alloma portretlari va "1910-yil" arxiv surati
> sun'iy intellekt tomonidan chizilgan, haqiqiy tarixiy hujjat emas. Ommaviy
> ishga tushirishdan oldin ular kutubxonaning real arxiv materiallariga
> almashtirilishi kerak.

Ikkalasi umumiy i18n va mock ma'lumotdan foydalanadi. Hozircha barcha ma'lumot
`src/data/mockData.ts` dan olinadi.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ ga yig'adi
npm run preview    # yig'ilgan versiyani ko'rish
npm run typecheck  # TypeScript tekshiruvi
npm run lint       # ESLint
```

### Katta ekranni kioskda ochish (ovoz bilan)

`/ekran2` pleylistidagi videolar **ovozi bilan** ijro etiladi. Brauzerlar ovozli
videoni foydalanuvchi bosmasdan avtomatik ijro etishga ruxsat bermaydi, shuning
uchun kiosk mashinasida Chrome shu flag bilan ochilishi kerak:

```bash
google-chrome \
  --kiosk \
  --autoplay-policy=no-user-gesture-required \
  --start-fullscreen \
  http://localhost:5173/ekran2
```

Flag bo'lmasa ekran qotib qolmaydi — video ovozsiz ijro etiladi
(`src/display2/signage/VideoSlide.tsx`). Ovoz kartasi tizim darajasida ochiq va
tovush balandligi 0 bo'lmasligini ham tekshirish kerak.

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
  App.tsx        yo'lga qarab kiosk yoki katta ekranni tanlaydi
  i18n/          uz / ru / en tarjimalari, til konteksti, sana formatlari
  data/          mock ma'lumot — ikkala ekran uchun umumiy

  kiosk/         SENSORLI INFOKIOSK (/)
    KioskApp.tsx
    components/        chap menyu, kitob kartochkasi, modal, detallar
    views/             bosh sahifa, kitob ro'yxati, janrlar, mualliflar,
                       tadbirlar, filiallar

  display/       KATTA EKRAN (/ekran)
    DisplayApp.tsx
  components/      katta ekran bloklari (header, footer, panel, modal)
    dashboard/     statistika, diagrammalar, QR, tez xizmatlar
  views/           katta ekran sahifalari (bosh, katalog, tadbirlar, aloqa…)
  types.ts       katta ekran View turlari
```

### Mavzu va ranglar

Mavzu `document.body[data-app]` orqali almashadi (`kiosk` yoki `display`) —
`src/App.tsx` uni yo'lga qarab qo'yadi.

**Infokiosk** (`/`) — och mavzu, asosiy rang indigo `#4F52F6`, chap panel
navy `#0B1848`. Klasslari `src/index.css` da `k-` prefiksi bilan
(`.k-root`, `.k-side`, `.k-tile`, `.k-card` …).

**Katta ekran** (`/ekran`) — to'q (navy/cyan) mavzu. Palitra
`tailwind.config.js` da nomlangan:
`ink` (fon va sirtlar), `cyan` (afisha), `azure` (yangi kitoblar), `iris`
(tavsiyalar), `amber` (reyting), `paper` (och matn va kartochkalar).
O'lchamlar esa `src/index.css` dagi CSS o'zgaruvchilarida.

### Diagrammalar

Recharts ishlatiladi (`src/components/dashboard/`). Doiraviy diagramma ranglari
tasodifiy tanlanmagan — rang ko'rligi (protan/deutan) va oddiy ko'rish uchun
qo'shni bo'laklar farqlanishi tekshirilgan, eng yomon juftlik ΔE 19.1 (me'yor
≥ 8). `src/data/mockData.ts` dagi `categoryShares` tartibini o'zgartirmang;
yangi toifa qo'shsangiz, ranglarni qaytadan tekshirish kerak.

Har bir bo'lak legendada nomi va foizi bilan yozilgan, shuning uchun ma'no
faqat rangga bog'liq emas.

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

### Infokiosk bo'limlari

Chap menyu: **Bosh sahifa · Kitob qidirish · Janrlar · Mualliflar · Yangi
kelganlar · Mashhur kitoblar · Mavjud kitoblar**.

Tadbirlar va Kutubxonalar sahifalari menyuda emas — ularga bosh sahifadagi
«Tadbirlar → Barchasi» havolasi va «Kitobni topish» plitkasi orqali o'tiladi.

Kiosk umumiy foydalanishda bo'lgani uchun shaxsiy ro'yxat (hisob, saqlangan
kitoblar) yo'q — keyingi tashrifchi oldingisining ma'lumotini ko'rmaydi.

- **Mualliflar** — `books` dan joriy tildagi muallif nomi bo'yicha guruhlanadi,
  asarlar soni va o'rtacha baho ko'rsatiladi. Muallif rangi ismidan hisoblanadi,
  shuning uchun har safar bir xil bo'ladi.
- **Mavjud kitoblar** — `copies > 0` bo'lganlari, nusxasi ko'plari tepada.

### Qidiruv va fasetli filtrlar

Chapda filtr ustuni (`src/kiosk/components/KioskFilters.tsx`): **saralash,
faqat mavjudlari, janr, nashr yili**. Holat `src/kiosk/filterTypes.ts` da.

Ikkita muhim xulq marketplace'lardagidek:

1. **Har bir variant yonidagi son** o'sha fasetning *o'z* filtri hisobga
   olinmasdan hisoblanadi. Ya'ni «Badiiy adabiyot» tanlangan bo'lsa ham,
   «Tarix» yonida uni tanlaganda nechta chiqishi ko'rinadi.
2. **Nol natijali janr ko'rsatilmaydi** — foydalanuvchi hech qachon bo'sh
   ekranga tushmaydi. (Yil guruhlari ko'rsatiladi, chunki ular doimiy.)

So'rov bo'sh bo'lsa butun katalog ko'rsatiladi — filtrlar orqali ko'rib
chiqish (brauzing) rejimi.

Panel `≤1024px` da yig'iladi va «Filtrlarni ko'rsatish» tugmasi paydo bo'ladi;
faol filtr bo'lsa tugmada nuqta chiqadi.

#### Elasticsearch'ga o'tkazishda

Bu tuzilma ES agregatsiyalariga bevosita mos tushadi:

| Frontend | Elasticsearch |
|---|---|
| Janr sonlari | `terms` agregatsiyasi `category.keyword` bo'yicha |
| Nashr yili guruhlari | `range` agregatsiyasi `year` bo'yicha |
| «Faqat mavjudlari» | `filter: { range: { copies: { gt: 0 } } }` |
| Matnli qidiruv | `multi_match` — `title.*`, `author.*`, `category.*`, `isbn` |

Filtrlarni `must` emas, **`filter` kontekstida** yuboring — ular keshlanadi va
ball hisoblanmaydi.

Ko'p tillilik uchun har til alohida analiz qilinadigan maydon bo'lsin
(`title.uz` / `title.ru` / `title.en`), faset uchun `.keyword` sub-maydon.
O'zbek tili uchun lotin↔kirill transliteratsiyasi va `asciifolding` kerak:
«Bobur» so'rovi «Boburnoma» ni ham, «Бабур-наме» ni ham topishi shart —
hozir frontendda bu uchala tilda qidirish bilan hal qilingan
(`KioskSearch.tsx` dagi `matches()`).

### Responsive — infokiosk (`/`)

| Ekran | Ko'rinish |
|---|---|
| ≥ 1281px | Chap menyu 200px, 5 ta plitka bir qatorda |
| ≤ 1280px | Plitkalar 3 ustunda, menyu 176px |
| ≤ 900px | Menyu 132px, ikonka ustida yozuv; plitkalar 2 ustunda |
| ≤ 680px | Menyu tepaga gorizontal qatorga o'tadi |
| balandligi ≥ 1200px | Mashhur kitoblar karuseli qatorlarga o'raladi, yangiliklar va tadbirlar ro'yxati uzayadi — portret kioskda bo'sh joy qolmaydi |

### Responsive — katta ekran (`/ekran`)

Barcha o'lchamlar `src/index.css` dagi CSS o'zgaruvchilari orqali boshqariladi:

| Ekran | Ko'rinish |
|---|---|
| ≥ 1151px | 3 panel bir qatorda, pastda dashboard 4 blok |
| ≤ 1150px | afisha tepada to'liq kenglikda, kitoblar 2 ustun, dashboard 2×2 — portret kiosk (1080×1920) shu holatda |
| ≤ 900px | ob-havo bloki yashiriladi, footer ikonkalari vertikal |
| ≤ 780px | 1 ustun, header uch qatorga bo'linadi, footer o'raladi |
| balandligi ≤ 900px / ≤ 760px | header, footer, dashboard va panel sarlavhalari siqiladi |
| ≥ 2000px | 4K kiosk uchun hamma narsa kattalashadi |

> Bosh sahifadagi panellar to'g'ridan-to'g'ri to'r elementi bo'lishi kerak —
> ular `div` ichiga o'ralsa, bitta ustunli holatda qator balandligi 0 ga tushib
> qoladi va panellar bir-birining ustiga chiqadi.

## Backend'ga ulanganda

`src/data/mockData.ts` dagi eksportlarni API chaqiruvlari bilan almashtirish
kifoya — komponentlar faqat `LibraryEvent`, `Book`, `Service` turlariga bog'liq.

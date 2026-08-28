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

Har bir modul o'z yo'liga ega va alohida chunk bo'lib yuklanadi:

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

## `/ekran2` — Windows ilovasi (Electron)

Zaldagi katta ekran brauzerda emas, **alohida Windows ilovasi** sifatida
ishlaydi. Sabab uchta:

1. **Ovoz.** Brauzer foydalanuvchi bosmaguncha ovozli videoni ijro etmaydi —
   zalda esa bosadigan odam yo'q. Ilovada ruxsat o'zida
   (`autoplay-policy=no-user-gesture-required`).
2. **Barqarorlik.** Ekran haftalab uzluksiz ishlaydi. Brauzer qotib qolsa yoki
   yopilib ketsa, uni qayta ochadigan odam yo'q — quyidagi tiklanish
   mexanizmlari shuning uchun.
3. **Boshqaruv.** Qaysi monitor, qaysi API manzil — `config.json` da,
   ilovani qayta yig'masdan.

Ilova faqat `/ekran2` ni o'z ichiga oladi: kirish nuqtasi `electron.html` →
`src/display2/main.tsx`. Kiosk, xarita va `/interface` kodi bundlega tushmaydi.

### Buyruqlar

```bash
npm run electron:dev              # Vite dev server + Electron (1280×720 oyna)
npm run electron:dev -- --fullscreen   # to'liq ekranni sinash
npm run electron:start            # yig'ilgan sahifani paketlamasdan ochish
npm run electron:build:win        # release/ ga Windows o'rnatuvchi va portativ exe
```

> **VS Code terminalida:** `ELECTRON_RUN_AS_NODE=1` o'zgaruvchisi Electron'ni
> oddiy Node sifatida ishga tushiradi va ilova ochilmaydi. Yuqoridagi
> skriptlar uni o'zi tozalaydi (`tools/electron-run.mjs`), lekin qo'lda
> `npx electron .` yozsangiz shu xatoga duch kelasiz.

Windows o'rnatuvchisi **Windows mashinasida** yig'ilgani ma'qul. Linux'da
yig'ish uchun wine kerak (yoki `electronuserland/builder:wine` Docker obrazi).

### Sozlash — `config.json`

Fayl exe yonida turadi (o'rnatilgan nusxada `C:\Program Files\...`,
portativda exe bilan bir papkada). Topilmasa `%APPDATA%` dagi nusxa olinadi,
u ham bo'lmasa ilova birinchi ishga tushganda namunani o'zi yozadi.

| Kalit | Standart | Nima qiladi |
|---|---|---|
| `apiUrl` | `""` | Backend manzili. Bo'sh — ichki (mock) ma'lumot |
| `apiRefreshSeconds` | `300` | Ma'lumot necha soniyada bir yangilanadi |
| `apiTimeoutMs` | `8000` | So'rov kutish vaqti; oshsa ichki ma'lumotga qaytiladi |
| `allowInsecureTls` | `false` | O'z-o'zidan imzolangan sertifikatga ruxsat |
| `videoSound` | `false` | Pleylist videosi ovozi bilan ijro etilsinmi |
| `displayIndex` | `0` | Qaysi monitor (ikki ekranli mashinada muhim) |
| `fullscreen` | `true` | To'liq ekran. `false` — oddiy oyna (sinash uchun) |
| `kiosk` | `true` | Chiqib bo'lmaydigan to'liq ekran |
| `alwaysOnTop` | `true` | Bildirishnomalar ekranni to'smasin |
| `hideCursor` | `true` | Sichqoncha ko'rsatkichini yashirish |
| `forceScaleFactor` | `1` | Windows displey masshtabini (125%/150%) inobatga olmaslik |
| `zoomFactor` | `1` | Qo'shimcha masshtab — uzoqdan ko'riladigan panel uchun |
| `autoLaunch` | `true` | Windows'ga kirganda avtomatik ishga tushish |
| `dailyRestartHour` | `4` | Har kuni shu soatda qayta ishga tushadi (`-1` — o'chiq) |
| `dailyRestartMode` | `relaunch` | `relaunch` — ilova, `reload` — faqat sahifa |
| `disableHardwareAcceleration` | `false` | Muammoli videokartada yoqiladi |
| `pinnedSlide` | `""` | Bitta bo'limda qotirib qo'yish: `intro`/`books`/`events`/`ambient` |
| `debug` | `false` | DevTools (Ctrl+Alt+D) va kontekst menyusi |

O'zgartirilgandan keyin ilovani qayta ishga tushirish kerak.

### Tugmalar

| Birikma | Nima qiladi |
|---|---|
| `Ctrl + Alt + Q` | Ilovani yopish (kiosk rejimida yagona chiqish yo'li) |
| `Ctrl + Alt + R` | Sahifani qayta yuklash |
| `Ctrl + Alt + D` | DevTools — faqat `debug: true` da |

### Barqarorlik: nima qanday tiklanadi

| Muammo | Ilova nima qiladi |
|---|---|
| Renderer jarayoni qulab tushdi | Sahifa qayta yuklanadi |
| Sahifa qotdi (`unresponsive`) | Oyna yopilib, yangisi ochiladi |
| Sahifa "tirikman" signalini 45 s yubormadi | Watchdog oynani qayta yaratadi |
| 5 daqiqada 3 marta tiklandi | Ilovaning o'zi qaytadan ishga tushadi |
| GPU ikki marta qulab tushdi | Grafik tezlatkichsiz qayta ishga tushadi (`state.json` da eslab qolinadi) |
| Monitor uzildi yoki qo'shildi | Oyna to'g'ri ekranda qaytadan ochiladi |
| Sahifa ochilmadi (fayl, tarmoq) | 3 sekunddan keyin qayta urinadi |
| Har kuni 04:00 | Profilaktika uchun qayta ishga tushadi |

Ekran uxlab qolmaydi (`powerSaveBlocker`), taymerlar sekinlashmaydi, ikkinchi
nusxa ochilmaydi. Hamma narsa logga yoziladi:
`%APPDATA%\Milliy Kutubxona Ekran\logs\kiosk.log` (2 MB dan oshsa aylanadi).

### Sahifa qanday beriladi

Yig'ilgan fayllar `app://kiosk/…` custom protokoli orqali beriladi
(`electron/protocol.cjs`), `file://` orqali emas. Sabablari:

- `file://` sahifasining origini `null` — backend ulanganda CORS ni serverda
  to'g'rilash imkonsiz bo'lardi;
- `app://` — "ishonchli kontekst": WebGL, media va `localStorage` cheklovsiz
  ishlaydi;
- lokal HTTP server ham qo'yilmadi: Windows brandmaueri birinchi ishga
  tushirishda ruxsat so'raydi, kioskda esa uni bosadigan odam yo'q.

Protokol Range so'rovlarini qo'llab-quvvatlaydi, shuning uchun `<video>`
oldinga-orqaga sakray oladi. Videolar asar arxividan tashqarida saqlanadi
(`asarUnpack`) — dekoder ular bilan to'g'ridan-to'g'ri ishlaydi.

### Xavfsizlik

`contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`. Sahifa
Node API ni ko'rmaydi; unga `preload.cjs` faqat to'rtta narsani beradi:
sozlama, log, qayta yuklash va versiyalar. Boshqa manzilga o'tish, yangi oyna
ochish va har qanday ruxsat so'rovi (kamera, joylashuv) bloklanadi.

### Ma'lumot: mock'dan backendga

Slaydlar ma'lumotni faqat `src/display2/api/` orqali oladi:

| Funksiya | So'rov | Zaxira |
|---|---|---|
| `getSignageBooks()` | `GET {apiUrl}/signage/books` | `data/books.ts` |
| `getSignageEvents(today)` | `GET {apiUrl}/signage/events?from=YYYY-MM-DD` | `data/events.ts` |
| `getSignagePlaylist()` | `GET {apiUrl}/signage/playlist` | `data/playlist.ts` |

Javob shakli — `src/display2/data/types.ts` dagi `SignageBook`,
`SignageEvent`, `SignageSlide`. Matn maydonlari uch tilli: `{ uz, ru, en }`.

**Ekran hech qachon bo'sh qolmaydi.** Server o'chgan, tarmoq uzilgan, javob
buzilgan — farqi yo'q: ichki ro'yxat ishlatiladi va xato faqat logga yoziladi.
Boshlang'ich qiymat ham ichki ro'yxat, shuning uchun "yuklanmoqda" holati
umuman yo'q — ekran birinchi kadrdanoq to'la ko'rinadi. Ma'lumot keyin
sezdirmay almashadi va har `apiRefreshSeconds` da yangilanadi.

Brauzer nusxasi uchun manzil `.env` dan olinadi (`VITE_API_URL`), Electron
nusxasi uchun `config.json` dan — kod ikkalasida bir xil.

### Brauzerda ochish (zaxira usul)

Ilova o'rnatilmagan bo'lsa ekranni Chrome orqali ham ochish mumkin:

```bash
google-chrome --kiosk --start-fullscreen \
  --autoplay-policy=no-user-gesture-required \
  http://localhost:5173/ekran2
```

Bu holda yuqoridagi tiklanish mexanizmlari ishlamaydi.

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

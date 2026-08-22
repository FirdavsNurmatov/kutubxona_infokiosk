import { report } from '../api/runtime';
import type { SignageBook } from './types';

/**
 * Ekranda ko'rsatiladigan kitoblar.
 *
 * Yagona manba — `public/books.json`: kutubxona ro'yxatni o'sha faylda
 * yuritadi, bu yerda esa faqat ekran tushunadigan shaklga (`SignageBook`)
 * o'giriladi. Yangi kitob qo'shish uchun JSON ga qator yozish kifoya.
 *
 * Fayl `public/` da turgani uchun u JS ga import QILINMAYDI (Vite ruxsat
 * bermaydi va bermagani to'g'ri: shunda ro'yxat build ichiga qotib qolardi).
 * Uning o'rniga sahifa ochilganda bir marta o'qiladi — Electron'da ham,
 * brauzerda ham bu lokal fayl, so'rov bir necha millisekund oladi.
 *
 * Matnlar o'zbekcha: ro'yxat o'zbek kitoblariniki va tarjimalari yo'q,
 * shuning uchun ru/en tillarida ham nom, muallif va janr asl holida qoladi
 * (hech narsa o'ylab topilmaydi).
 *
 * Koha ulanganda shu ro'yxat `GET /api/signage/books` javobiga almashtiriladi —
 * komponentlar o'zgarmaydi. Karusel ro'yxat uzunligiga bog'liq emas:
 * 3 ta ham, 50 ta ham bir xil ishlaydi.
 */

interface BookRecord {
  id: number;
  author: string;
  title: string;
  genre: string;
  year: number;
  pages: number;
  annotation: string;
}

/**
 * Muqovalar — `public/images/books/`.
 *
 * Kalit — `public/books.json` dagi `id`. Ro'yxatda yo'q kitob muqovasiz
 * qoladi va ekranda uning o'rniga nomi yozilgan tipografik muqova chiziladi
 * (`BookCard`) — begona kitobning muqovasi ishlatilmaydi.
 *
 * Manba: 26 tasi asaxiy.uz kitob do'koni katalogidan olingan (har biri
 * sarlavha va muallif bo'yicha qo'lda tekshirilgan), 13 tasi loyihada
 * ilgaridan bor edi. Shu sababli ekranda kichkina "Muqovalar: asaxiy.uz"
 * yozuvi turadi (`BooksSlide`). Yangi muqova qo'shilsa — faylni shu papkaga
 * tashlab, pastga bitta qator yozish kifoya.
 */
const COVERS: Record<number, string> = {
  1: 'hozirgi-zamon.jpg',
  2: 'yangi-ozbekiston-strategiyasi.jpg',
  3: 'qorqma.jpg',
  4: 'lolazor.jpg',
  5: 'muhammad-yusuf-saylanma.jpg',
  6: 'qorakoz-majnun.jpg',
  7: 'odamiylik-mulki.jpg',
  8: 'odam-bolish-qiyin.jpg',
  9: 'oq-kema.jpg',
  10: 'asrga-tatigulik-kun.jpg',
  11: 'besh-bolali-yigitcha.jpg',
  12: 'liderlar-kitobi.jpg',
  13: 'chinor.jpg',
  14: 'sohibqiron.jpg',
  15: 'turkiston-qaygusi.jpg',
  16: 'ozbegim.jpg',
  19: 'jayhun-ustida-bulutlar.jpg',
  21: 'kafansiz-komilganlar.jpg',
  24: 'otkan-kunlar.jpg',
  25: 'mehrobdan-chayon.jpg',
  26: 'kecha-va-kunduz.jpg',
  27: 'turkiy-guliston.jpg',
  28: 'oila-yoki-oilani-boshqarish.jpg',
  29: 'padarkush.jpg',
  30: 'navoiy-roman.jpg',
  31: 'sarob.jpg',
  32: 'sinchalak.jpg',
  33: 'dunyoning-ishlari.jpg',
  34: 'yulduzli-tunlar.jpg',
  35: 'ulugbek-xazinasi.jpg',
  36: 'ufq.jpg',
  37: 'mahbub-ul-qulub.jpg',
  38: 'boburnoma.jpg',
  39: 'yaldo-kechasi.jpg',
  44: 'puankare.jpg',
  46: 'tirilish.jpg',
  47: 'urush-va-tinchlik.jpg',
  49: 'faust.jpg',
  50: 'parij-bibi-maryam.jpg',
};
/**
 * Kitoblar ro'yxati.
 *
 * JSON o'qilgach massiv butunlay ALMASHTIRILADI (`let`), ichiga qo'shilmaydi.
 * Bu muhim: `BooksSlide` shu ro'yxatni React holatining boshlang'ich qiymati
 * qilib oladi, va agar biz o'sha massivning ICHINI to'ldirsak, React uchun
 * "eski" va "yangi" qiymat bitta obyekt bo'lib qoladi — ekran qayta
 * chizilmaydi va kitoblar bo'limi bo'sh turaveradi.
 */
export let signageBooks: SignageBook[] = [];

function toSignageBook(book: BookRecord): SignageBook {
  const cover = COVERS[book.id];
  return {
    id: String(book.id),
    title: book.title,
    author: book.author,
    genre: book.genre,
    cover: cover ? `/images/books/${cover}` : undefined,
    year: book.year,
    pages: book.pages,
    summary: book.annotation,
  };
}

function isRecord(value: unknown): value is BookRecord {
  const book = value as Partial<BookRecord> | null;
  return (
    !!book &&
    typeof book === 'object' &&
    typeof book.id === 'number' &&
    typeof book.title === 'string' &&
    typeof book.author === 'string'
  );
}

/**
 * `public/books.json` ni bir marta o'qiydi.
 *
 * Modul yuklanganda darhol ishga tushadi: kitoblar bo'limi ssenariyda
 * birinchi emas, shuning uchun navbat kelguncha ro'yxat allaqachon to'la
 * bo'ladi. Xatolik bo'lsa ekran o'chib qolmaydi — ro'yxat bo'sh qoladi va
 * bo'lim "hozircha kitob yo'q" holatini ko'rsatadi.
 */
async function loadLocalBooks(): Promise<SignageBook[]> {
  try {
    const url = new URL('books.json', document.baseURI).href;
    const response = await fetch(url, { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error('kutilgan shaklda emas');

    const books = data.filter(isRecord).map(toSignageBook);
    if (books.length === 0) throw new Error("ro'yxat bo'sh");
    signageBooks = books;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    report('warn', `books.json: ${reason}`);
  }
  return signageBooks;
}

/** O'qish tugaganini kutish uchun (`api/index.ts`). */
export const localBooksReady = loadLocalBooks();

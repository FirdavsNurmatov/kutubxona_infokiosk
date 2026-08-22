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
 * Haqiqiy muqovalar (`public/images/books/`) — faqat nashri aniq topilganlari.
 *
 * Ro'yxatda yo'q kitob muqovasiz qoladi va ekranda uning o'rniga nomi
 * yozilgan tipografik muqova chiziladi (`BookCard`) — begona muqova
 * ishlatilmaydi.
 */
const COVERS: Record<number, string> = {
  9: 'oq-kema.jpg',
  10: 'asrga-tatigulik-kun.jpg',
  24: 'otkan-kunlar.jpg',
  25: 'mehrobdan-chayon.jpg',
  26: 'kecha-va-kunduz.jpg',
  27: 'turkiy-guliston.jpg',
  30: 'navoiy-roman.jpg',
  33: 'dunyoning-ishlari.jpg',
  34: 'yulduzli-tunlar.jpg',
  35: 'ulugbek-xazinasi.jpg',
  36: 'ufq.jpg',
  38: 'boburnoma.jpg',
  47: 'urush-va-tinchlik.jpg',
};

/**
 * Kitoblar ro'yxati.
 *
 * Ataylab o'zgaruvchan massiv: JSON o'qilgach elementlar SHU massivga
 * qo'shiladi. Shu sababli uni sinxron boshlang'ich qiymat sifatida ishlatsa
 * bo'ladi (`BooksSlide` → `useSignageResource`) — ekran hech qachon
 * "yuklanmoqda" holatini ko'rsatmaydi.
 */
export const signageBooks: SignageBook[] = [];

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

    signageBooks.push(...data.filter(isRecord).map(toSignageBook));
    if (signageBooks.length === 0) throw new Error("ro'yxat bo'sh");
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    report('warn', `books.json: ${reason}`);
  }
  return signageBooks;
}

/** O'qish tugaganini kutish uchun (`api/index.ts`). */
export const localBooksReady = loadLocalBooks();

import type { SignageBook } from './types';

/**
 * Ekranda ko'rsatiladigan kitoblar.
 *
 * Muqovalar — Open Library ochiq arxividan olingan **haqiqiy** muqovalar
 * (`public/images/books/`), nomlari esa kitoblarning o'zbek tilidagi
 * rasmiy tarjimalari. Hech bir muqova o'ylab topilmagan: agar kitobning
 * haqiqiy muqovasi topilmasa, u ro'yxatga umuman kiritilmagan.
 *
 * Koha ulanganda shu fayl `GET /api/signage/books` javobiga almashtiriladi —
 * komponentlar o'zgarmaydi, chunki ular faqat `SignageBook` shaklini biladi.
 * Karusel ro'yxat uzunligiga bog'liq emas: 3 ta ham, 50 ta ham bir xil ishlaydi.
 */
export const signageBooks: SignageBook[] = [
  {
    id: 'sapiens',
    title: {
      uz: 'Sapiens: Odamzodning qisqa tarixi',
      ru: 'Sapiens: Краткая история человечества',
      en: 'Sapiens: A Brief History of Humankind',
    },
    author: { uz: 'Yuval Noy Harari', ru: 'Юваль Ной Харари', en: 'Yuval Noah Harari' },
    genre: { uz: 'Ilmiy-ommabop', ru: 'Научно-популярная', en: 'Popular science' },
    cover: '/images/books/sapiens.jpg',
    year: 2011,
    pages: 512,
    summary: {
      uz: "Insoniyatning paydo bo'lishidan bugungi kungacha bo'lgan yo'li — biologiya, tarix va iqtisod kesishmasida.",
      ru: 'Путь человечества от появления вида до наших дней — на стыке биологии, истории и экономики.',
      en: 'The story of humankind from the first humans to today, across biology, history and economics.',
    },
  },
  {
    id: 'atomic-habits',
    title: { uz: 'Atom odatlar', ru: 'Атомные привычки', en: 'Atomic Habits' },
    author: { uz: 'Jeyms Klir', ru: 'Джеймс Клир', en: 'James Clear' },
    genre: { uz: 'Shaxsiy rivojlanish', ru: 'Саморазвитие', en: 'Self-development' },
    cover: '/images/books/atom-odatlar.jpg',
    year: 2018,
    pages: 320,
    summary: {
      uz: 'Kichik, kundalik odatlar qanday qilib katta natijalarga aylanishi haqida amaliy tizim.',
      ru: 'Практическая система о том, как небольшие ежедневные привычки приводят к большим результатам.',
      en: 'A practical system for how small daily habits compound into remarkable results.',
    },
  },
  {
    id: '1984',
    title: { uz: '1984', ru: '1984', en: 'Nineteen Eighty-Four' },
    author: { uz: 'Jorj Oruell', ru: 'Джордж Оруэлл', en: 'George Orwell' },
    genre: { uz: 'Distopiya', ru: 'Антиутопия', en: 'Dystopia' },
    cover: '/images/books/1984.jpg',
    year: 1949,
    pages: 328,
    summary: {
      uz: "Totalitar nazorat va haqiqatning buzib ko'rsatilishi haqidagi klassik distopiya.",
      ru: 'Классическая антиутопия о тотальном контроле и искажении правды.',
      en: 'The classic dystopia of total surveillance and the distortion of truth.',
    },
  },
  {
    id: 'crime-and-punishment',
    title: { uz: 'Jinoyat va jazo', ru: 'Преступление и наказание', en: 'Crime and Punishment' },
    author: { uz: 'Fyodor Dostoyevskiy', ru: 'Фёдор Достоевский', en: 'Fyodor Dostoevsky' },
    genre: { uz: 'Jahon klassikasi', ru: 'Мировая классика', en: 'World classics' },
    cover: '/images/books/jinoyat-va-jazo.jpg',
    year: 1866,
    pages: 671,
    summary: {
      uz: 'Jinoyat sodir etgan talabaning vijdon azobi va axloqiy tanlovi haqida roman.',
      ru: 'Роман о муках совести и нравственном выборе студента, совершившего преступление.',
      en: 'A student commits murder and is undone by conscience and moral reckoning.',
    },
  },
  {
    id: 'hundred-years',
    title: { uz: 'Yuz yillik tanholik', ru: 'Сто лет одиночества', en: 'One Hundred Years of Solitude' },
    author: { uz: 'Gabriel Garsia Markes', ru: 'Габриэль Гарсиа Маркес', en: 'Gabriel García Márquez' },
    genre: { uz: 'Badiiy adabiyot', ru: 'Художественная литература', en: 'Fiction' },
    cover: '/images/books/yuz-yillik-yolgizlik.jpg',
    year: 1967,
    pages: 417,
    summary: {
      uz: 'Buendia oilasining yetti avlodi va Makondo shahrining sehrli tarixi.',
      ru: 'Магическая история семи поколений семьи Буэндиа и города Макондо.',
      en: 'Seven generations of the Buendía family and the magical history of Macondo.',
    },
  },
  {
    id: 'little-prince',
    title: { uz: 'Kichkina shahzoda', ru: 'Маленький принц', en: 'The Little Prince' },
    author: { uz: 'Antuan de Sent-Ekzyuperi', ru: 'Антуан де Сент-Экзюпери', en: 'Antoine de Saint-Exupéry' },
    genre: { uz: 'Bolalar adabiyoti', ru: 'Детская литература', en: "Children's literature" },
    cover: '/images/books/kichkina-shahzoda.jpg',
    year: 1943,
    pages: 96,
    summary: {
      uz: 'Kichkina sayyoradan kelgan shahzoda haqida — kattalar uchun yozilgan ertak.',
      ru: 'Сказка для взрослых о принце с маленькой планеты.',
      en: 'A fable for grown-ups about a prince from a tiny planet.',
    },
  },
  {
    id: 'thinking-fast-slow',
    title: { uz: 'Tez va sekin fikrlash', ru: 'Думай медленно… решай быстро', en: 'Thinking, Fast and Slow' },
    author: { uz: 'Daniel Kaneman', ru: 'Даниэль Канеман', en: 'Daniel Kahneman' },
    genre: { uz: 'Psixologiya', ru: 'Психология', en: 'Psychology' },
    cover: '/images/books/tez-va-sekin-fikrlash.jpg',
    year: 2011,
    pages: 499,
    summary: {
      uz: 'Tafakkurning ikki tizimi: tez va sezgiga asoslangan hamda sekin va mantiqiy.',
      ru: 'Две системы мышления: быстрая интуитивная и медленная логическая.',
      en: 'Two systems of thought: fast and intuitive, slow and deliberate.',
    },
  },
  {
    id: 'anna-karenina',
    title: { uz: 'Anna Karenina', ru: 'Анна Каренина', en: 'Anna Karenina' },
    author: { uz: 'Lev Tolstoy', ru: 'Лев Толстой', en: 'Leo Tolstoy' },
    genre: { uz: 'Jahon klassikasi', ru: 'Мировая классика', en: 'World classics' },
    cover: '/images/books/anna-karenina.jpg',
    year: 1878,
    pages: 864,
    summary: {
      uz: "Sevgi, oila va jamiyat qonunlari o'rtasida qolgan ayol fojiasi.",
      ru: 'Трагедия женщины между любовью, семьёй и законами общества.',
      en: 'A woman caught between love, family and the laws of society.',
    },
  },
  {
    id: 'brave-new-world',
    title: { uz: 'Ajoyib yangi dunyo', ru: 'О дивный новый мир', en: 'Brave New World' },
    author: { uz: 'Oldos Haksli', ru: 'Олдос Хаксли', en: 'Aldous Huxley' },
    genre: { uz: 'Distopiya', ru: 'Антиутопия', en: 'Dystopia' },
    cover: '/images/books/ajoyib-yangi-dunyo.jpg',
    year: 1932,
    pages: 311,
    summary: {
      uz: "Baxt majburiy bo'lgan, erkinlik esa ortiqcha sanalgan kelajak haqida.",
      ru: 'О будущем, где счастье обязательно, а свобода — лишняя.',
      en: 'A future where happiness is compulsory and freedom is surplus.',
    },
  },
  {
    id: 'great-gatsby',
    title: { uz: 'Buyuk Getsbi', ru: 'Великий Гэтсби', en: 'The Great Gatsby' },
    author: { uz: 'Frensis Skott Fitsjerald', ru: 'Фрэнсис Скотт Фицджеральд', en: 'F. Scott Fitzgerald' },
    genre: { uz: 'Badiiy adabiyot', ru: 'Художественная литература', en: 'Fiction' },
    cover: '/images/books/buyuk-getsbi.jpg',
    year: 1925,
    pages: 180,
    summary: {
      uz: "Amerika orzusi va uning ortidagi bo'shliq haqidagi jaz davri romani.",
      ru: 'Роман эпохи джаза об американской мечте и пустоте за ней.',
      en: 'A Jazz Age novel about the American dream and the void behind it.',
    },
  },
  {
    id: 'don-quixote',
    title: { uz: 'Don Kixot', ru: 'Дон Кихот', en: 'Don Quixote' },
    author: { uz: 'Migel de Servantes', ru: 'Мигель де Сервантес', en: 'Miguel de Cervantes' },
    genre: { uz: 'Jahon klassikasi', ru: 'Мировая классика', en: 'World classics' },
    cover: '/images/books/don-kixot.jpg',
    year: 1605,
    pages: 1072,
    summary: {
      uz: "Ritsarlik romanlariga berilib, haqiqatni o'zgacha ko'rgan idalgo sarguzashtlari.",
      ru: 'Приключения идальго, начитавшегося рыцарских романов.',
      en: 'The adventures of a gentleman who read too many chivalric romances.',
    },
  },
];

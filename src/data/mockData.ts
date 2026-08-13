import type { Localized } from '../i18n/translations';

export interface LibraryEvent {
  id: number;
  /** ISO sana: 'YYYY-MM-DD' — kun/oy nomi tilga qarab hosil qilinadi. */
  date: string;
  time: string;
  endTime: string;
  title: Localized;
  location: Localized;
  description: Localized;
  image: string;
}

export interface Book {
  id: number;
  rank: number;
  title: Localized;
  author: Localized;
  category: Localized;
  description: Localized;
  publisher: Localized;
  year: number;
  pages: number;
  isbn: string;
  /** Ayni paytda javondagi nusxalar soni. */
  copies: number;
  cover: string;
  collections: ('new' | 'recommended')[];
}

/* Rasmlar loyiha ichida (public/images) — kiosk internetsiz ham ishlashi kerak.
   Manba: Pexels (bepul litsenziya), keyinchalik kutubxonaning o'z rasmlariga almashtiriladi. */
const IMG = {
  meeting: '/images/meeting.jpg',
  books: '/images/books.jpg',
  hall: '/images/hall.jpg',
  kids: '/images/kids.jpg',
  desk: '/images/desk.jpg',
  shelf: '/images/shelf.jpg',
  open: '/images/open.jpg',
  stack: '/images/stack.jpg',
  reading: '/images/reading.jpg',
};

const CAT = {
  prose: { uz: 'Badiiy adabiyot', ru: 'Художественная литература', en: 'Fiction' },
  history: { uz: 'Tarix', ru: 'История', en: 'History' },
  science: { uz: 'Ilmiy-ommabop', ru: 'Научно-популярная', en: 'Popular science' },
  poetry: { uz: "She'riyat", ru: 'Поэзия', en: 'Poetry' },
  psychology: { uz: 'Psixologiya', ru: 'Психология', en: 'Psychology' },
  religion: { uz: 'Diniy adabiyot', ru: 'Религиозная литература', en: 'Religious studies' },
  children: { uz: 'Bolalar adabiyoti', ru: 'Детская литература', en: "Children's literature" },
  philosophy: { uz: 'Falsafa', ru: 'Философия', en: 'Philosophy' },
};

const PUB = {
  sharq: { uz: 'Sharq NMAK', ru: 'ИПАК «Шарк»', en: 'Sharq Publishing' },
  yangiAsr: { uz: 'Yangi asr avlodi', ru: '«Янги аср авлоди»', en: 'Yangi Asr Avlodi' },
  gafurGulom: { uz: "G'afur G'ulom NMIU", ru: 'Изд. им. Гафура Гуляма', en: 'Gafur Gulom Publishing' },
  akademnashr: { uz: 'Akademnashr', ru: '«Академнашр»', en: 'Akademnashr' },
  hilol: { uz: 'Hilol-nashr', ru: '«Хилол-нашр»', en: 'Hilol-Nashr' },
};

export const events: LibraryEvent[] = [
  {
    id: 1,
    date: '2026-08-27',
    time: '11:00',
    endTime: '13:00',
    title: {
      uz: "Kitobxonlar klubi yig'ilishi",
      ru: 'Заседание книжного клуба',
      en: 'Book Club Meeting',
    },
    location: { uz: 'Anjumanlar zali', ru: 'Зал собраний', en: 'Assembly Hall' },
    description: {
      uz: "Oyning tanlangan kitobi muhokamasi. Ishtirok bepul, oldindan ro'yxatdan o'tish shart emas.",
      ru: 'Обсуждение книги месяца. Участие бесплатное, предварительная регистрация не требуется.',
      en: 'Discussion of the book of the month. Free entry, no registration required.',
    },
    image: IMG.meeting,
  },
  {
    id: 2,
    date: '2026-08-28',
    time: '14:00',
    endTime: '16:00',
    title: {
      uz: 'Yozuvchilar bilan uchrashuv',
      ru: 'Встреча с писателями',
      en: 'Meeting with Writers',
    },
    location: { uz: 'Konferensiya zali', ru: 'Конференц-зал', en: 'Conference Hall' },
    description: {
      uz: "Zamonaviy o'zbek adabiyoti vakillari bilan ochiq suhbat va avtograf sessiyasi.",
      ru: 'Открытая беседа с представителями современной узбекской литературы и автограф-сессия.',
      en: 'An open conversation with contemporary Uzbek authors, followed by a signing session.',
    },
    image: IMG.books,
  },
  {
    id: 3,
    date: '2026-08-30',
    time: '11:00',
    endTime: '12:30',
    title: { uz: "Ma'naviyat soati", ru: 'Час духовности', en: 'Spirituality Hour' },
    location: { uz: 'Nodir kitoblar zali', ru: 'Зал редких книг', en: 'Rare Books Hall' },
    description: {
      uz: "Nodir qo'lyozmalar ko'rgazmasi va mutaxassis rahbarligidagi ekskursiya.",
      ru: 'Выставка редких рукописей и экскурсия под руководством специалиста.',
      en: 'An exhibition of rare manuscripts with a guided tour by a curator.',
    },
    image: IMG.hall,
  },
  {
    id: 4,
    date: '2026-08-31',
    time: '10:30',
    endTime: '12:00',
    title: {
      uz: 'Bolalar uchun ertakxonlik',
      ru: 'Сказки для детей',
      en: 'Storytelling for Children',
    },
    location: {
      uz: 'Bolalar adabiyoti zali',
      ru: 'Зал детской литературы',
      en: "Children's Literature Hall",
    },
    description: {
      uz: "5–10 yoshli bolalar uchun ovoz chiqarib o'qish va ijodiy mashg'ulot.",
      ru: 'Чтение вслух и творческое занятие для детей 5–10 лет.',
      en: 'Read-aloud session and a creative workshop for children aged 5–10.',
    },
    image: IMG.kids,
  },
  {
    id: 5,
    date: '2026-09-02',
    time: '14:00',
    endTime: '15:30',
    title: {
      uz: 'Kutubxonachi bilan suhbat',
      ru: 'Беседа с библиотекарем',
      en: 'Talk with the Librarian',
    },
    location: {
      uz: "«O'zbekiston tarixi» zali",
      ru: 'Зал «История Узбекистана»',
      en: '"History of Uzbekistan" Hall',
    },
    description: {
      uz: "Elektron katalogdan foydalanish va manba izlash bo'yicha amaliy dars.",
      ru: 'Практическое занятие по работе с электронным каталогом и поиску источников.',
      en: 'A hands-on session on using the electronic catalog and finding sources.',
    },
    image: IMG.desk,
  },
  {
    id: 6,
    date: '2026-09-05',
    time: '16:00',
    endTime: '18:00',
    title: {
      uz: 'Ilmiy-amaliy konferensiya',
      ru: 'Научно-практическая конференция',
      en: 'Research Conference',
    },
    location: { uz: 'Katta zal', ru: 'Большой зал', en: 'Main Hall' },
    description: {
      uz: "«Raqamli kutubxona va yangi avlod kitobxoni» mavzusidagi konferensiya.",
      ru: 'Конференция на тему «Цифровая библиотека и читатель нового поколения».',
      en: 'A conference on "The digital library and the next-generation reader".',
    },
    image: IMG.reading,
  },
  {
    id: 7,
    date: '2026-09-09',
    time: '10:00',
    endTime: '17:00',
    title: {
      uz: "Kitob ko'rgazmasi — kuz mavsumi",
      ru: 'Книжная выставка — осенний сезон',
      en: 'Book Fair — Autumn Season',
    },
    location: { uz: 'Markaziy foye', ru: 'Центральное фойе', en: 'Central Foyer' },
    description: {
      uz: "Yil davomida kelib tushgan eng yaxshi nashrlar ko'rgazmasi.",
      ru: 'Выставка лучших поступлений за год.',
      en: 'An exhibition of the best acquisitions of the year.',
    },
    image: IMG.shelf,
  },
];

export const books: Book[] = [
  {
    id: 1,
    rank: 1,
    title: { uz: 'Ikki eshik orasi', ru: 'Между двух дверей', en: 'Between Two Doors' },
    author: { uz: "O'tkir Hoshimov", ru: 'Уткир Хашимов', en: "O'tkir Hoshimov" },
    category: CAT.prose,
    description: {
      uz: "Urush va urushdan keyingi avlod taqdiri haqidagi mashhur roman.",
      ru: 'Знаменитый роман о судьбе военного и послевоенного поколения.',
      en: 'A celebrated novel about the fate of the wartime and post-war generation.',
    },
    publisher: PUB.sharq,
    year: 2023,
    pages: 512,
    isbn: '978-9943-26-114-2',
    copies: 6,
    cover: IMG.shelf,
    collections: ['new'],
  },
  {
    id: 2,
    rank: 2,
    title: { uz: 'Sevgi istirobi', ru: 'Муки любви', en: 'The Torment of Love' },
    author: { uz: "Erkin A'zam", ru: 'Эркин Аъзам', en: "Erkin A'zam" },
    category: CAT.prose,
    description: {
      uz: "Zamonaviy o'zbek nasrining yorqin namunasi — qissa va hikoyalar to'plami.",
      ru: 'Яркий образец современной узбекской прозы — сборник повестей и рассказов.',
      en: 'A vivid example of modern Uzbek prose — a collection of novellas and stories.',
    },
    publisher: PUB.yangiAsr,
    year: 2022,
    pages: 288,
    isbn: '978-9943-27-441-8',
    copies: 4,
    cover: IMG.open,
    collections: ['new'],
  },
  {
    id: 3,
    rank: 3,
    title: { uz: 'Boburnoma', ru: 'Бабур-наме', en: 'Baburnama' },
    author: {
      uz: 'Zahiriddin Muhammad Bobur',
      ru: 'Захириддин Мухаммад Бабур',
      en: 'Zahiriddin Muhammad Babur',
    },
    category: CAT.history,
    description: {
      uz: "Bobur qalamiga mansub, jahon adabiyotidagi eng mashhur memuarlardan biri.",
      ru: 'Одни из самых известных мемуаров мировой литературы, написанные Бабуром.',
      en: "One of world literature's most famous memoirs, written by Babur himself.",
    },
    publisher: PUB.gafurGulom,
    year: 2021,
    pages: 448,
    isbn: '978-9943-03-882-9',
    copies: 9,
    cover: IMG.stack,
    collections: ['new'],
  },
  {
    id: 4,
    rank: 4,
    title: { uz: 'Notiq haqida', ru: 'Об ораторе', en: 'On the Orator' },
    author: { uz: 'Mark Tulliy Tsitseron', ru: 'Марк Туллий Цицерон', en: 'Marcus Tullius Cicero' },
    category: CAT.philosophy,
    description: {
      uz: "Notiqlik san'ati haqidagi klassik asar, o'zbek tiliga tarjima.",
      ru: 'Классический труд об искусстве красноречия в переводе.',
      en: 'The classic treatise on the art of rhetoric, in translation.',
    },
    publisher: PUB.akademnashr,
    year: 2020,
    pages: 336,
    isbn: '978-9943-49-227-0',
    copies: 3,
    cover: IMG.reading,
    collections: ['new'],
  },
  {
    id: 5,
    rank: 5,
    title: {
      uz: 'Sapiens: Odamzodning qisqa tarixi',
      ru: 'Sapiens: Краткая история человечества',
      en: 'Sapiens: A Brief History of Humankind',
    },
    author: { uz: 'Yuval Noy Harari', ru: 'Юваль Ной Харари', en: 'Yuval Noah Harari' },
    category: CAT.science,
    description: {
      uz: "Insoniyat tarixiga yangicha nazar tashlaydigan xalqaro bestseller.",
      ru: 'Международный бестселлер, по-новому смотрящий на историю человечества.',
      en: 'An international bestseller that reframes the history of humankind.',
    },
    publisher: PUB.akademnashr,
    year: 2024,
    pages: 464,
    isbn: '978-9943-49-501-1',
    copies: 12,
    cover: IMG.meeting,
    collections: ['new'],
  },
  {
    id: 6,
    rank: 6,
    title: { uz: 'Atom odatlar', ru: 'Атомные привычки', en: 'Atomic Habits' },
    author: { uz: 'Jeyms Klir', ru: 'Джеймс Клир', en: 'James Clear' },
    category: CAT.psychology,
    description: {
      uz: "Kichik odatlarni katta natijaga aylantirish bo'yicha amaliy qo'llanma.",
      ru: 'Практическое руководство о том, как малые привычки дают большие результаты.',
      en: 'A practical guide to turning small habits into remarkable results.',
    },
    publisher: PUB.akademnashr,
    year: 2024,
    pages: 320,
    isbn: '978-9943-49-612-4',
    copies: 15,
    cover: IMG.desk,
    collections: ['new'],
  },
  {
    id: 7,
    rank: 7,
    title: { uz: '1984', ru: '1984', en: '1984' },
    author: { uz: 'Jorj Oruell', ru: 'Джордж Оруэлл', en: 'George Orwell' },
    category: CAT.prose,
    description: {
      uz: "Totalitar tuzum haqidagi XX asr distopiyasi klassikasi.",
      ru: 'Классическая антиутопия XX века о тоталитарном строе.',
      en: 'The classic twentieth-century dystopia about totalitarian rule.',
    },
    publisher: PUB.yangiAsr,
    year: 2023,
    pages: 352,
    isbn: '978-9943-27-810-2',
    copies: 7,
    cover: IMG.hall,
    collections: ['new'],
  },
  {
    id: 8,
    rank: 8,
    title: { uz: 'Ufq', ru: 'Горизонт', en: 'The Horizon' },
    author: { uz: 'Said Ahmad', ru: 'Саид Ахмад', en: 'Said Ahmad' },
    category: CAT.prose,
    description: {
      uz: "Uch kitobdan iborat trilogiya — qishloq hayoti va urush yillari manzarasi.",
      ru: 'Трилогия из трёх книг — картина сельской жизни и военных лет.',
      en: 'A trilogy in three books portraying village life and the war years.',
    },
    publisher: PUB.gafurGulom,
    year: 2019,
    pages: 720,
    isbn: '978-9943-03-441-8',
    copies: 5,
    cover: IMG.books,
    collections: ['new'],
  },
  {
    id: 9,
    rank: 9,
    title: { uz: 'Diyonat', ru: 'Совесть', en: 'Conscience' },
    author: { uz: 'Odil Yoqubov', ru: 'Адыл Якубов', en: 'Odil Yoqubov' },
    category: CAT.prose,
    description: {
      uz: "Ma'naviy tanlov va mas'uliyat haqidagi ijtimoiy roman.",
      ru: 'Социальный роман о нравственном выборе и ответственности.',
      en: 'A social novel about moral choice and responsibility.',
    },
    publisher: PUB.sharq,
    year: 2021,
    pages: 400,
    isbn: '978-9943-26-055-8',
    copies: 4,
    cover: IMG.kids,
    collections: ['new'],
  },
  {
    id: 10,
    rank: 10,
    title: { uz: 'Tanlangan asarlar', ru: 'Избранные произведения', en: 'Selected Works' },
    author: { uz: 'Abdulla Oripov', ru: 'Абдулла Орипов', en: 'Abdulla Oripov' },
    category: CAT.poetry,
    description: {
      uz: "O'zbekiston Qahramoni, xalq shoiri she'rlaridan saylanma.",
      ru: 'Избранные стихотворения народного поэта, Героя Узбекистана.',
      en: 'Selected poems by the People’s Poet and Hero of Uzbekistan.',
    },
    publisher: PUB.gafurGulom,
    year: 2022,
    pages: 264,
    isbn: '978-9943-03-990-1',
    copies: 8,
    cover: IMG.open,
    collections: ['new'],
  },

  {
    id: 11,
    rank: 1,
    title: { uz: 'Alkimyogar', ru: 'Алхимик', en: 'The Alchemist' },
    author: { uz: 'Paulo Koelo', ru: 'Пауло Коэльо', en: 'Paulo Coelho' },
    category: CAT.prose,
    description: {
      uz: "O'z taqdirini izlab yo'lga chiqqan cho'pon haqidagi falsafiy qissa.",
      ru: 'Философская притча о пастухе, отправившемся на поиски своей судьбы.',
      en: 'A philosophical tale of a shepherd who sets out in search of his destiny.',
    },
    publisher: PUB.yangiAsr,
    year: 2023,
    pages: 208,
    isbn: '978-9943-27-333-6',
    copies: 11,
    cover: IMG.stack,
    collections: ['recommended'],
  },
  {
    id: 12,
    rank: 2,
    title: { uz: 'Mayda-chuyda voqealar', ru: 'Мелочи жизни', en: 'Trifles of Life' },
    author: { uz: 'Anton Chexov', ru: 'Антон Чехов', en: 'Anton Chekhov' },
    category: CAT.prose,
    description: {
      uz: "Rus adabiyoti klassigining qisqa hikoyalar to'plami.",
      ru: 'Сборник коротких рассказов классика русской литературы.',
      en: 'A collection of short stories by the Russian master of the form.',
    },
    publisher: PUB.sharq,
    year: 2020,
    pages: 240,
    isbn: '978-9943-26-201-9',
    copies: 6,
    cover: IMG.reading,
    collections: ['recommended'],
  },
  {
    id: 13,
    rank: 3,
    title: { uz: "O'tkan kunlar", ru: 'Минувшие дни', en: 'Bygone Days' },
    author: { uz: 'Abdulla Qodiriy', ru: 'Абдулла Кадыри', en: 'Abdulla Qodiriy' },
    category: CAT.prose,
    description: {
      uz: "O'zbek adabiyotidagi birinchi realistik roman — Otabek va Kumush qissasi.",
      ru: 'Первый реалистический роман узбекской литературы — история Отабека и Кумуш.',
      en: 'The first realist novel in Uzbek literature — the story of Otabek and Kumush.',
    },
    publisher: PUB.gafurGulom,
    year: 2022,
    pages: 384,
    isbn: '978-9943-03-771-6',
    copies: 14,
    cover: IMG.shelf,
    collections: ['recommended'],
  },
  {
    id: 14,
    rank: 4,
    title: { uz: 'Jinoyat va jazo', ru: 'Преступление и наказание', en: 'Crime and Punishment' },
    author: { uz: 'Fyodor Dostoyevskiy', ru: 'Фёдор Достоевский', en: 'Fyodor Dostoevsky' },
    category: CAT.prose,
    description: {
      uz: "Vijdon, gunoh va tavba haqidagi jahon adabiyoti durdonasi.",
      ru: 'Шедевр мировой литературы о совести, преступлении и раскаянии.',
      en: 'A masterpiece of world literature on conscience, guilt and redemption.',
    },
    publisher: PUB.sharq,
    year: 2021,
    pages: 608,
    isbn: '978-9943-26-330-6',
    copies: 5,
    cover: IMG.meeting,
    collections: ['recommended'],
  },
  {
    id: 15,
    rank: 5,
    title: { uz: 'Mehrobdan chayon', ru: 'Скорпион из алтаря', en: 'The Scorpion from the Altar' },
    author: { uz: 'Abdulla Qodiriy', ru: 'Абдулла Кадыри', en: 'Abdulla Qodiriy' },
    category: CAT.history,
    description: {
      uz: "Xudoyorxon saroyi hayoti asosidagi tarixiy roman.",
      ru: 'Исторический роман о жизни двора Худояр-хана.',
      en: "A historical novel set in the court of Khudayar Khan.",
    },
    publisher: PUB.gafurGulom,
    year: 2022,
    pages: 336,
    isbn: '978-9943-03-778-5',
    copies: 7,
    cover: IMG.desk,
    collections: ['recommended'],
  },
  {
    id: 16,
    rank: 6,
    title: {
      uz: 'Garri Potter va faylasuf toshi',
      ru: 'Гарри Поттер и философский камень',
      en: "Harry Potter and the Philosopher's Stone",
    },
    author: { uz: 'Joan Rouling', ru: 'Джоан Роулинг', en: 'J. K. Rowling' },
    category: CAT.children,
    description: {
      uz: "Sehrgarlik maktabiga yo'l olgan bola haqidagi mashhur seriyaning birinchi kitobi.",
      ru: 'Первая книга знаменитой серии о мальчике, попавшем в школу волшебства.',
      en: 'The first book in the famous series about a boy bound for a school of magic.',
    },
    publisher: PUB.yangiAsr,
    year: 2024,
    pages: 352,
    isbn: '978-9943-27-905-5',
    copies: 18,
    cover: IMG.hall,
    collections: ['recommended'],
  },
  {
    id: 17,
    rank: 7,
    title: { uz: 'Don Kixot', ru: 'Дон Кихот', en: 'Don Quixote' },
    author: { uz: 'Migel de Servantes', ru: 'Мигель де Сервантес', en: 'Miguel de Cervantes' },
    category: CAT.prose,
    description: {
      uz: "Yevropa romanchiligining asoschisi hisoblangan sarguzasht asari.",
      ru: 'Приключенческий роман, считающийся родоначальником европейского романа.',
      en: 'The adventure novel widely regarded as the first modern European novel.',
    },
    publisher: PUB.sharq,
    year: 2019,
    pages: 864,
    isbn: '978-9943-26-018-3',
    copies: 3,
    cover: IMG.books,
    collections: ['recommended'],
  },
  {
    id: 18,
    rank: 8,
    title: {
      uz: "Qur'on ma'nolari tarjimasi",
      ru: 'Перевод смыслов Корана',
      en: 'Translation of the Meanings of the Quran',
    },
    author: {
      uz: 'Muhammad Sodiq Muhammad Yusuf',
      ru: 'Мухаммад Содик Мухаммад Юсуф',
      en: 'Muhammad Sodiq Muhammad Yusuf',
    },
    category: CAT.religion,
    description: {
      uz: "Keng tarqalgan izohli tarjima nashri.",
      ru: 'Широко распространённое издание перевода с комментариями.',
      en: 'A widely used annotated translation edition.',
    },
    publisher: PUB.hilol,
    year: 2023,
    pages: 656,
    isbn: '978-9943-38-114-7',
    copies: 10,
    cover: IMG.kids,
    collections: ['recommended'],
  },
  {
    id: 19,
    rank: 9,
    title: { uz: 'Payg’ambar', ru: 'Пророк', en: 'The Prophet' },
    author: { uz: 'Halil Jibron', ru: 'Халиль Джебран', en: 'Kahlil Gibran' },
    category: CAT.philosophy,
    description: {
      uz: "Sevgi, mehnat va erkinlik haqidagi she'riy falsafiy asar.",
      ru: 'Поэтико-философское произведение о любви, труде и свободе.',
      en: 'A poetic, philosophical work on love, work and freedom.',
    },
    publisher: PUB.akademnashr,
    year: 2021,
    pages: 176,
    isbn: '978-9943-49-118-1',
    copies: 6,
    cover: IMG.open,
    collections: ['recommended'],
  },
  {
    id: 20,
    rank: 10,
    title: { uz: "Inson qal'asi", ru: 'Цитадель', en: 'The Wisdom of the Sands' },
    author: {
      uz: 'Antuan de Sent-Ekzyuperi',
      ru: 'Антуан де Сент-Экзюпери',
      en: 'Antoine de Saint-Exupéry',
    },
    category: CAT.philosophy,
    description: {
      uz: "Muallifning tugallanmagan falsafiy vasiyatnomasi.",
      ru: 'Незавершённое философское завещание автора.',
      en: "The author's unfinished philosophical testament.",
    },
    publisher: PUB.akademnashr,
    year: 2020,
    pages: 512,
    isbn: '978-9943-49-077-1',
    copies: 2,
    cover: IMG.stack,
    collections: ['recommended'],
  },
];

export const newBooks = books.filter((b) => b.collections.includes('new'));
export const recommendedBooks = books.filter((b) => b.collections.includes('recommended'));

/** Katalog filtri uchun kategoriyalar ro'yxati (takrorlanmagan). */
export const categories: Localized[] = Object.values(CAT);

export interface Service {
  id: number;
  icon: 'book' | 'wifi' | 'printer' | 'monitor' | 'users' | 'graduation';
  title: Localized;
  description: Localized;
  detail: Localized;
}

export const services: Service[] = [
  {
    id: 1,
    icon: 'book',
    title: { uz: 'Kitob berish', ru: 'Книговыдача', en: 'Book lending' },
    description: {
      uz: "Abonement orqali uyga olish va o'qish zallarida foydalanish.",
      ru: 'Выдача на дом по абонементу и работа в читальных залах.',
      en: 'Home lending by subscription and use in the reading rooms.',
    },
    detail: {
      uz: "Bir vaqtning o'zida 5 tagacha nashr, muddat 14 kun. Uzaytirish mumkin.",
      ru: 'До 5 изданий одновременно, срок 14 дней. Возможно продление.',
      en: 'Up to 5 items at a time for 14 days. Renewals available.',
    },
  },
  {
    id: 2,
    icon: 'monitor',
    title: { uz: 'Elektron katalog', ru: 'Электронный каталог', en: 'Electronic catalog' },
    description: {
      uz: "Fonddagi 6 mln.dan ortiq nashrni onlayn qidirish.",
      ru: 'Онлайн-поиск более 6 млн изданий фонда.',
      en: 'Online search across more than 6 million holdings.',
    },
    detail: {
      uz: "Kutubxona ichida bepul, uydan ro'yxatdan o'tgan foydalanuvchilar uchun.",
      ru: 'Бесплатно в здании библиотеки, из дома — для зарегистрированных пользователей.',
      en: 'Free on site; remote access for registered users.',
    },
  },
  {
    id: 3,
    icon: 'wifi',
    title: { uz: 'Bepul Wi-Fi', ru: 'Бесплатный Wi-Fi', en: 'Free Wi-Fi' },
    description: {
      uz: "Barcha zallarda tezkor simsiz internet.",
      ru: 'Быстрый беспроводной интернет во всех залах.',
      en: 'Fast wireless internet in every hall.',
    },
    detail: {
      uz: "Tarmoq nomi: NLU-Guest. Parol kutubxonachidan olinadi.",
      ru: 'Сеть: NLU-Guest. Пароль можно получить у библиотекаря.',
      en: 'Network: NLU-Guest. Ask a librarian for the password.',
    },
  },
  {
    id: 4,
    icon: 'printer',
    title: { uz: 'Nusxa ko’chirish va skanerlash', ru: 'Копирование и сканирование', en: 'Copying and scanning' },
    description: {
      uz: "Hujjat va nashrlardan nusxa olish, raqamli skaner xizmati.",
      ru: 'Копирование документов и изданий, услуги цифрового сканирования.',
      en: 'Photocopying of documents and publications, digital scanning service.',
    },
    detail: {
      uz: "A4 — 1 000 so'm, A3 — 1 500 so'm. Nodir nashrlar faqat skanerlanadi.",
      ru: 'A4 — 1 000 сум, A3 — 1 500 сум. Редкие издания только сканируются.',
      en: 'A4 — 1,000 UZS, A3 — 1,500 UZS. Rare items are scan-only.',
    },
  },
  {
    id: 5,
    icon: 'users',
    title: { uz: 'Zal va anjuman', ru: 'Залы и мероприятия', en: 'Halls and events' },
    description: {
      uz: "Konferensiya, taqdimot va uchrashuvlar uchun zallar.",
      ru: 'Залы для конференций, презентаций и встреч.',
      en: 'Halls for conferences, presentations and meetings.',
    },
    detail: {
      uz: "Buyurtma ariza asosida, kamida 5 ish kuni oldin beriladi.",
      ru: 'Бронирование по заявке не позднее чем за 5 рабочих дней.',
      en: 'Booking by request, at least 5 working days in advance.',
    },
  },
  {
    id: 6,
    icon: 'graduation',
    title: { uz: 'Ilmiy yordam', ru: 'Научная помощь', en: 'Research support' },
    description: {
      uz: "Bibliograf yordamida manba tanlash va ro'yxat tuzish.",
      ru: 'Подбор источников и составление списков с помощью библиографа.',
      en: 'Source selection and bibliography compilation with a librarian.',
    },
    detail: {
      uz: "Dushanbadan jumagacha, 10:00–17:00. Oldindan yozilish tavsiya etiladi.",
      ru: 'Понедельник–пятница, 10:00–17:00. Рекомендуется предварительная запись.',
      en: 'Monday to Friday, 10:00–17:00. Booking recommended.',
    },
  },
];

export interface AboutFact {
  value: string;
  label: Localized;
}

export const aboutFacts: AboutFact[] = [
  { value: '1870', label: { uz: 'Tashkil etilgan', ru: 'Год основания', en: 'Founded' } },
  { value: '6 000 000+', label: { uz: 'Fond birligi', ru: 'Единиц хранения', en: 'Items in stock' } },
  { value: '30', label: { uz: "O'qish zali", ru: 'Читальных залов', en: 'Reading rooms' } },
  { value: '2 000', label: { uz: "Kunlik tashrif", ru: 'Посещений в день', en: 'Daily visitors' } },
];

export const aboutText: Localized = {
  uz: "Alisher Navoiy nomidagi O'zbekiston Milliy kutubxonasi — mamlakatning eng yirik kutubxonasi. Fondda o'zbek, rus va chet tillaridagi kitoblar, davriy nashrlar, nodir qo'lyozmalar va elektron resurslar saqlanadi. Kutubxona ilmiy-tadqiqot, axborot-resurs va madaniy-ma'rifiy markaz sifatida faoliyat yuritadi.",
  ru: 'Национальная библиотека Узбекистана имени Алишера Навои — крупнейшая библиотека страны. В фонде хранятся книги на узбекском, русском и иностранных языках, периодика, редкие рукописи и электронные ресурсы. Библиотека работает как научно-исследовательский, информационно-ресурсный и культурно-просветительский центр.',
  en: 'The Alisher Navoi National Library of Uzbekistan is the largest library in the country. Its holdings include books in Uzbek, Russian and foreign languages, periodicals, rare manuscripts and electronic resources. The library serves as a research, information-resource and cultural-educational centre.',
};

export interface ContactInfo {
  address: Localized;
  phone: string;
  email: string;
  website: string;
  schedule: { days: Localized; hours: Localized }[];
}

export const contact: ContactInfo = {
  address: {
    uz: "Toshkent sh., Navoiy ko'chasi, 1-uy",
    ru: 'г. Ташкент, улица Навои, дом 1',
    en: '1 Navoi Street, Tashkent',
  },
  phone: '+998 (71) 232-83-89',
  email: 'info@natlib.uz',
  website: 'natlib.uz',
  schedule: [
    {
      days: { uz: 'Dushanba – Juma', ru: 'Понедельник – Пятница', en: 'Monday – Friday' },
      hours: { uz: '09:00 – 20:00', ru: '09:00 – 20:00', en: '09:00 – 20:00' },
    },
    {
      days: { uz: 'Shanba', ru: 'Суббота', en: 'Saturday' },
      hours: { uz: '09:00 – 17:00', ru: '09:00 – 17:00', en: '09:00 – 17:00' },
    },
    {
      days: { uz: 'Yakshanba', ru: 'Воскресенье', en: 'Sunday' },
      hours: { uz: 'Dam olish kuni', ru: 'Выходной', en: 'Closed' },
    },
  ],
};

export const socialLinks = [
  { id: 'telegram', label: 'Telegram', url: 'https://t.me/natlibuz' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/natlib.uz' },
  { id: 'facebook', label: 'Facebook', url: 'https://facebook.com/natlib.uz' },
  { id: 'youtube', label: 'YouTube', url: 'https://youtube.com/@natlibuz' },
] as const;

export const SITE_URL = 'https://natlib.uz';

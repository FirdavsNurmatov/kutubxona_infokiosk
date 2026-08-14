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
  /** O'quvchilar bahosi (5 ballik) va baho bergan kishilar soni. */
  rating: number;
  ratingCount: number;
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

/* Tadbir sanalari bugunga nisbatan hisoblanadi — demo qaysi kunda ochilmasin,
   afisha dolzarb ko'rinadi. Backend ulanganda bu yordamchi olib tashlanadi. */
function dayOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  // Mahalliy sana (toISOString UTC ga o'tkazib, kechqurun kunni surib yuboradi)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Bugungi sana — tadbir sanalari bilan bir xil (mahalliy) formatda. */
export const todayISO = (): string => dayOffset(0);

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
    date: dayOffset(0),
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
    date: dayOffset(0),
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
    date: dayOffset(0),
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
    date: dayOffset(1),
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
    date: dayOffset(3),
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
    date: dayOffset(6),
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
    date: dayOffset(10),
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
  {
    id: 8,
    date: dayOffset(1),
    time: '15:00',
    endTime: '17:00',
    title: {
      uz: 'Ingliz tili suhbat klubi',
      ru: 'Разговорный клуб английского языка',
      en: 'English Conversation Club',
    },
    location: { uz: 'Til markazi, 2-qavat', ru: 'Языковой центр, 2 этаж', en: 'Language centre, floor 2' },
    description: {
      uz: "Har hafta o'tkaziladigan bepul suhbat mashg'uloti. Boshlang'ich daraja ham mumkin.",
      ru: 'Еженедельное бесплатное занятие по разговорной практике. Начальный уровень тоже подойдёт.',
      en: 'A free weekly speaking practice session. Beginners welcome.',
    },
    image: IMG.meeting,
  },
  {
    id: 9,
    date: dayOffset(2),
    time: '11:00',
    endTime: '13:00',
    title: {
      uz: 'Xattotlik ustaxonasi',
      ru: 'Мастерская каллиграфии',
      en: 'Calligraphy Workshop',
    },
    location: { uz: "Nodir kitoblar zali", ru: 'Зал редких книг', en: 'Rare Books Hall' },
    description: {
      uz: "Arab yozuvi va nasta'liq uslubi bo'yicha amaliy mashg'ulot.",
      ru: 'Практическое занятие по арабской письменности и стилю насталик.',
      en: 'A hands-on session on Arabic script and the nastaliq style.',
    },
    image: IMG.stack,
  },
  {
    id: 10,
    date: dayOffset(4),
    time: '13:00',
    endTime: '15:00',
    title: {
      uz: 'Raqamli savodxonlik darsi',
      ru: 'Урок цифровой грамотности',
      en: 'Digital Literacy Class',
    },
    location: { uz: 'Kompyuter zali', ru: 'Компьютерный зал', en: 'Computer room' },
    description: {
      uz: "Keksa yoshdagilar uchun internet va elektron xizmatlardan foydalanish.",
      ru: 'Интернет и электронные услуги для людей старшего возраста.',
      en: 'Using the internet and e-services, aimed at older visitors.',
    },
    image: IMG.desk,
  },
  {
    id: 11,
    date: dayOffset(5),
    time: '10:00',
    endTime: '12:00',
    title: {
      uz: "She'riyat kechasi",
      ru: 'Вечер поэзии',
      en: 'Poetry Evening',
    },
    location: { uz: 'Anjumanlar zali', ru: 'Зал собраний', en: 'Assembly Hall' },
    description: {
      uz: "Navoiy g'azallari va zamonaviy she'riyatdan namunalar o'qiladi.",
      ru: 'Прозвучат газели Навои и образцы современной поэзии.',
      en: 'Readings of Navoi\u2019s ghazals and contemporary poetry.',
    },
    image: IMG.open,
  },
  {
    id: 12,
    date: dayOffset(8),
    time: '14:00',
    endTime: '16:30',
    title: {
      uz: 'Kutubxona bo\u2018ylab ekskursiya',
      ru: 'Экскурсия по библиотеке',
      en: 'Guided Library Tour',
    },
    location: { uz: 'Markaziy foye', ru: 'Центральное фойе', en: 'Central Foyer' },
    description: {
      uz: "Fond, o'qish zallari va saqlash bo'limlari bilan tanishtiruv sayohati.",
      ru: 'Знакомство с фондом, читальными залами и хранилищами.',
      en: 'An introduction to the collection, reading rooms and stacks.',
    },
    image: IMG.hall,
  },
];

const coreBooks: Book[] = [
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
    rating: 4.7,
    ratingCount: 1420,
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
    rating: 4.5,
    ratingCount: 640,
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
    rating: 4.8,
    ratingCount: 1980,
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
    year: 2009,
    pages: 336,
    isbn: '978-9943-49-227-0',
    copies: 0,
    rating: 4.4,
    ratingCount: 380,
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
    rating: 4.8,
    ratingCount: 2460,
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
    rating: 4.7,
    ratingCount: 3120,
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
    rating: 4.6,
    ratingCount: 1740,
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
    rating: 4.5,
    ratingCount: 820,
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
    rating: 4.4,
    ratingCount: 560,
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
    rating: 4.7,
    ratingCount: 1180,
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
    rating: 4.8,
    ratingCount: 1250,
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
    year: 2007,
    pages: 240,
    isbn: '978-9943-26-201-9',
    copies: 6,
    rating: 4.7,
    ratingCount: 980,
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
    rating: 4.6,
    ratingCount: 870,
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
    rating: 4.8,
    ratingCount: 1540,
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
    rating: 4.5,
    ratingCount: 760,
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
    rating: 4.9,
    ratingCount: 2100,
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
    year: 1998,
    pages: 864,
    isbn: '978-9943-26-018-3',
    copies: 0,
    rating: 4.6,
    ratingCount: 1100,
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
    rating: 4.9,
    ratingCount: 1850,
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
    rating: 4.7,
    ratingCount: 900,
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
    year: 1999,
    pages: 512,
    isbn: '978-9943-49-077-1',
    copies: 0,
    rating: 4.6,
    ratingCount: 830,
    cover: IMG.stack,
    collections: ['recommended'],
  },
];


/* ── Fondning qolgan qismi ────────────────────────────────
   Yuqoridagi 20 ta kitob TOP-10 ro'yxatlarini to'ldiradi;
   quyidagilar katalog, janrlar va qidiruv uchun (collections bo'sh). */
const moreBooks: Book[] = [
  /* ─ Tarix ─ */
  {
    id: 21, rank: 11,
    title: { uz: 'Temur tuzuklari', ru: 'Уложение Темура', en: 'The Institutes of Temur' },
    author: { uz: 'Amir Temur', ru: 'Амир Темур', en: 'Amir Temur' },
    category: CAT.history,
    description: {
      uz: "Sohibqironning davlat boshqaruvi va harbiy san'at haqidagi vasiyatlari.",
      ru: 'Заветы Сахибкирана об управлении государством и военном искусстве.',
      en: "Temur's precepts on statecraft and the art of war.",
    },
    publisher: PUB.gafurGulom, year: 2021, pages: 368, isbn: '978-9943-03-812-6',
    copies: 12, rating: 4.8, ratingCount: 2240, cover: IMG.stack, collections: [],
  },
  {
    id: 22, rank: 12,
    title: { uz: 'Yulduzli tunlar', ru: 'Звёздные ночи', en: 'Starry Nights' },
    author: { uz: 'Pirimqul Qodirov', ru: 'Пиримкул Кадыров', en: 'Pirimqul Qodirov' },
    category: CAT.history,
    description: {
      uz: 'Bobur hayoti va Boburiylar saltanati haqidagi tarixiy roman.',
      ru: 'Исторический роман о жизни Бабура и империи Бабуридов.',
      en: 'A historical novel about Babur and the Mughal empire.',
    },
    publisher: PUB.sharq, year: 2022, pages: 544, isbn: '978-9943-26-401-3',
    copies: 8, rating: 4.7, ratingCount: 1310, cover: IMG.shelf, collections: [],
  },
  {
    id: 23, rank: 13,
    title: { uz: 'Ipak yo‘llari', ru: 'Шёлковый путь', en: 'The Silk Roads' },
    author: { uz: 'Piter Frankopan', ru: 'Питер Франкопан', en: 'Peter Frankopan' },
    category: CAT.history,
    description: {
      uz: "Dunyo tarixiga Sharq nuqtai nazaridan qaraydigan yangicha tadqiqot.",
      ru: 'Новый взгляд на мировую историю с точки зрения Востока.',
      en: 'A new history of the world seen from the East.',
    },
    publisher: PUB.akademnashr, year: 2023, pages: 704, isbn: '978-9943-49-388-8',
    copies: 5, rating: 4.6, ratingCount: 890, cover: IMG.books, collections: [],
  },
  {
    id: 24, rank: 14,
    title: { uz: 'Firdavs ul-iqbol', ru: 'Фирдавс ул-икбол', en: 'Firdaws al-Iqbal' },
    author: { uz: 'Shermuhammad Munis', ru: 'Шермухаммад Мунис', en: 'Shermuhammad Munis' },
    category: CAT.history,
    description: {
      uz: 'Xiva xonligi tarixiga oid muhim manba.',
      ru: 'Важный источник по истории Хивинского ханства.',
      en: 'A key source on the history of the Khanate of Khiva.',
    },
    publisher: PUB.gafurGulom, year: 2003, pages: 456, isbn: '978-9943-03-522-4',
    copies: 0, rating: 4.4, ratingCount: 210, cover: IMG.hall, collections: [],
  },

  /* ─ Ilmiy-ommabop ─ */
  {
    id: 25, rank: 15,
    title: { uz: 'Homo Deus', ru: 'Homo Deus', en: 'Homo Deus' },
    author: { uz: 'Yuval Noy Harari', ru: 'Юваль Ной Харари', en: 'Yuval Noah Harari' },
    category: CAT.science,
    description: {
      uz: "Insoniyat kelajagi va texnologiya haqidagi bashoratli tadqiqot.",
      ru: 'Прогноз о будущем человечества и технологий.',
      en: 'A brief history of tomorrow — humankind and technology.',
    },
    publisher: PUB.akademnashr, year: 2024, pages: 448, isbn: '978-9943-49-540-0',
    copies: 9, rating: 4.6, ratingCount: 1480, cover: IMG.desk, collections: [],
  },
  {
    id: 26, rank: 16,
    title: { uz: 'Vaqtning qisqacha tarixi', ru: 'Краткая история времени', en: 'A Brief History of Time' },
    author: { uz: 'Stiven Xoking', ru: 'Стивен Хокинг', en: 'Stephen Hawking' },
    category: CAT.science,
    description: {
      uz: "Koinot, qora tuynuklar va vaqt haqida sodda tilda.",
      ru: 'О Вселенной, чёрных дырах и времени простым языком.',
      en: 'The universe, black holes and time explained simply.',
    },
    publisher: PUB.akademnashr, year: 2022, pages: 256, isbn: '978-9943-49-241-6',
    copies: 7, rating: 4.7, ratingCount: 1620, cover: IMG.reading, collections: [],
  },
  {
    id: 27, rank: 17,
    title: { uz: 'Xudbin gen', ru: 'Эгоистичный ген', en: 'The Selfish Gene' },
    author: { uz: 'Richard Dokinz', ru: 'Ричард Докинз', en: 'Richard Dawkins' },
    category: CAT.science,
    description: {
      uz: 'Evolyutsiyaga genlar nuqtai nazaridan qarash.',
      ru: 'Взгляд на эволюцию с точки зрения генов.',
      en: 'Evolution seen from the point of view of the gene.',
    },
    publisher: PUB.akademnashr, year: 2021, pages: 384, isbn: '978-9943-49-165-5',
    copies: 4, rating: 4.5, ratingCount: 640, cover: IMG.open, collections: [],
  },
  {
    id: 28, rank: 18,
    title: { uz: 'Nima uchun uxlaymiz', ru: 'Зачем мы спим', en: 'Why We Sleep' },
    author: { uz: 'Metyu Uoker', ru: 'Мэттью Уокер', en: 'Matthew Walker' },
    category: CAT.science,
    description: {
      uz: 'Uyqu va tush ko‘rishning inson salomatligidagi o‘rni.',
      ru: 'Роль сна и сновидений для здоровья человека.',
      en: 'The role of sleep and dreams in human health.',
    },
    publisher: PUB.akademnashr, year: 2024, pages: 368, isbn: '978-9943-49-604-9',
    copies: 11, rating: 4.6, ratingCount: 1050, cover: IMG.meeting, collections: [],
  },

  /* ─ She'riyat ─ */
  {
    id: 29, rank: 19,
    title: { uz: 'Xamsa', ru: 'Хамса', en: 'Khamsa' },
    author: { uz: 'Alisher Navoiy', ru: 'Алишер Навои', en: 'Alisher Navoi' },
    category: CAT.poetry,
    description: {
      uz: "Besh dostondan iborat, o'zbek adabiyotining cho'qqisi.",
      ru: 'Пятерица поэм — вершина узбекской литературы.',
      en: 'A quintet of epic poems — the summit of Uzbek literature.',
    },
    publisher: PUB.gafurGulom, year: 1991, pages: 880, isbn: '978-9943-03-601-6',
    copies: 15, rating: 4.9, ratingCount: 3180, cover: IMG.stack, collections: [],
  },
  {
    id: 30, rank: 20,
    title: { uz: 'Ruhlar isyoni', ru: 'Восстание душ', en: 'The Revolt of Souls' },
    author: { uz: 'Erkin Vohidov', ru: 'Эркин Вахидов', en: 'Erkin Vohidov' },
    category: CAT.poetry,
    description: {
      uz: "Xalq shoirining eng mashhur dostoni va she'rlari.",
      ru: 'Самая известная поэма народного поэта и его стихи.',
      en: "The People's Poet's best-known epic poem and verses.",
    },
    publisher: PUB.gafurGulom, year: 2021, pages: 296, isbn: '978-9943-03-744-0',
    copies: 9, rating: 4.8, ratingCount: 1420, cover: IMG.open, collections: [],
  },
  {
    id: 31, rank: 21,
    title: { uz: 'Ishq kelganda', ru: 'Когда приходит любовь', en: 'When Love Comes' },
    author: { uz: 'Muhammad Yusuf', ru: 'Мухаммад Юсуф', en: 'Muhammad Yusuf' },
    category: CAT.poetry,
    description: {
      uz: "Sodda va samimiy tildagi zamonaviy o'zbek she'riyati.",
      ru: 'Современная узбекская поэзия простым и искренним языком.',
      en: 'Modern Uzbek poetry in a plain, heartfelt voice.',
    },
    publisher: PUB.yangiAsr, year: 2023, pages: 208, isbn: '978-9943-27-702-0',
    copies: 6, rating: 4.7, ratingCount: 980, cover: IMG.kids, collections: [],
  },
  {
    id: 32, rank: 22,
    title: { uz: 'Ruboiylar', ru: 'Рубаи', en: 'Rubaiyat' },
    author: { uz: 'Umar Xayyom', ru: 'Омар Хайям', en: 'Omar Khayyam' },
    category: CAT.poetry,
    description: {
      uz: 'Hayot, vaqt va donolik haqidagi to‘rtliklar.',
      ru: 'Четверостишия о жизни, времени и мудрости.',
      en: 'Quatrains on life, time and wisdom.',
    },
    publisher: PUB.sharq, year: 2008, pages: 176, isbn: '978-9943-26-090-9',
    copies: 8, rating: 4.7, ratingCount: 1240, cover: IMG.reading, collections: [],
  },
  {
    id: 33, rank: 23,
    title: { uz: 'Sonetlar', ru: 'Сонеты', en: 'Sonnets' },
    author: { uz: 'Uilyam Shekspir', ru: 'Уильям Шекспир', en: 'William Shakespeare' },
    category: CAT.poetry,
    description: {
      uz: 'Jahon she’riyatining klassik namunasi.',
      ru: 'Классика мировой поэзии.',
      en: 'A classic of world poetry.',
    },
    publisher: PUB.sharq, year: 2005, pages: 192, isbn: '978-9943-26-044-2',
    copies: 0, rating: 4.5, ratingCount: 520, cover: IMG.books, collections: [],
  },

  /* ─ Psixologiya ─ */
  {
    id: 34, rank: 24,
    title: { uz: 'Tez va sekin fikrlash', ru: 'Думай медленно… решай быстро', en: 'Thinking, Fast and Slow' },
    author: { uz: 'Deniel Kaneman', ru: 'Даниэль Канеман', en: 'Daniel Kahneman' },
    category: CAT.psychology,
    description: {
      uz: 'Qaror qabul qilishdagi tafakkurning ikki tizimi.',
      ru: 'Две системы мышления при принятии решений.',
      en: 'The two systems that drive the way we think.',
    },
    publisher: PUB.akademnashr, year: 2023, pages: 512, isbn: '978-9943-49-455-7',
    copies: 10, rating: 4.7, ratingCount: 1890, cover: IMG.desk, collections: [],
  },
  {
    id: 35, rank: 25,
    title: { uz: "Ta'sir psixologiyasi", ru: 'Психология влияния', en: 'Influence' },
    author: { uz: 'Robert Chialdini', ru: 'Роберт Чалдини', en: 'Robert Cialdini' },
    category: CAT.psychology,
    description: {
      uz: 'Odamlar nima uchun «ha» deyishining ilmiy izohi.',
      ru: 'Научное объяснение того, почему люди говорят «да».',
      en: 'The science of why people say yes.',
    },
    publisher: PUB.akademnashr, year: 2022, pages: 400, isbn: '978-9943-49-302-4',
    copies: 7, rating: 4.6, ratingCount: 1130, cover: IMG.meeting, collections: [],
  },
  {
    id: 36, rank: 26,
    title: { uz: 'Hayot ma’nosini izlab', ru: 'Человек в поисках смысла', en: "Man's Search for Meaning" },
    author: { uz: 'Viktor Frankl', ru: 'Виктор Франкл', en: 'Viktor Frankl' },
    category: CAT.psychology,
    description: {
      uz: 'Konslager tajribasidan tug‘ilgan logoterapiya asoslari.',
      ru: 'Основы логотерапии, рождённые опытом концлагеря.',
      en: 'The foundations of logotherapy, born of the camps.',
    },
    publisher: PUB.akademnashr, year: 2021, pages: 224, isbn: '978-9943-49-198-3',
    copies: 13, rating: 4.9, ratingCount: 2470, cover: IMG.shelf, collections: [],
  },
  {
    id: 37, rank: 27,
    title: { uz: 'Emotsional intellekt', ru: 'Эмоциональный интеллект', en: 'Emotional Intelligence' },
    author: { uz: 'Deniel Goulman', ru: 'Дэниел Гоулман', en: 'Daniel Goleman' },
    category: CAT.psychology,
    description: {
      uz: 'Hissiyotlarni boshqarish nega aqldan muhimroq.',
      ru: 'Почему управление эмоциями важнее IQ.',
      en: 'Why managing emotions can matter more than IQ.',
    },
    publisher: PUB.akademnashr, year: 2023, pages: 384, isbn: '978-9943-49-478-6',
    copies: 6, rating: 4.5, ratingCount: 860, cover: IMG.hall, collections: [],
  },

  /* ─ Diniy adabiyot ─ */
  {
    id: 38, rank: 28,
    title: { uz: 'Sahihi Buxoriy', ru: 'Сахих аль-Бухари', en: 'Sahih al-Bukhari' },
    author: { uz: 'Imom al-Buxoriy', ru: 'Имам аль-Бухари', en: 'Imam al-Bukhari' },
    category: CAT.religion,
    description: {
      uz: 'Hadis ilmining eng ishonchli to‘plamlaridan biri.',
      ru: 'Один из самых достоверных сборников хадисов.',
      en: 'One of the most authoritative collections of hadith.',
    },
    publisher: PUB.hilol, year: 2022, pages: 912, isbn: '978-9943-38-070-6',
    copies: 8, rating: 4.9, ratingCount: 1760, cover: IMG.stack, collections: [],
  },
  {
    id: 39, rank: 29,
    title: { uz: 'Kimyoi saodat', ru: 'Эликсир счастья', en: 'The Alchemy of Happiness' },
    author: { uz: 'Imom G‘azzoliy', ru: 'Имам аль-Газали', en: 'Imam al-Ghazali' },
    category: CAT.religion,
    description: {
      uz: 'Ma’naviy kamolot va axloq haqidagi klassik asar.',
      ru: 'Классический труд о духовном совершенствовании и нравственности.',
      en: 'A classic work on spiritual growth and ethics.',
    },
    publisher: PUB.hilol, year: 2021, pages: 448, isbn: '978-9943-38-011-9',
    copies: 5, rating: 4.7, ratingCount: 640, cover: IMG.open, collections: [],
  },
  {
    id: 40, rank: 30,
    title: { uz: 'Qisasi Rabg‘uziy', ru: 'Кисаси Рабгузи', en: 'Qisas al-Rabghuzi' },
    author: { uz: 'Nosiruddin Rabg‘uziy', ru: 'Насируддин Рабгузи', en: 'Nasiruddin Rabghuzi' },
    category: CAT.religion,
    description: {
      uz: 'Payg‘ambarlar qissalarining turkiy tildagi mashhur bayoni.',
      ru: 'Известное тюркоязычное изложение историй пророков.',
      en: 'The celebrated Turkic retelling of the stories of the prophets.',
    },
    publisher: PUB.gafurGulom, year: 2004, pages: 528, isbn: '978-9943-03-655-9',
    copies: 4, rating: 4.6, ratingCount: 410, cover: IMG.books, collections: [],
  },

  /* ─ Bolalar adabiyoti ─ */
  {
    id: 41, rank: 31,
    title: { uz: 'Kichkina shahzoda', ru: 'Маленький принц', en: 'The Little Prince' },
    author: { uz: 'Antuan de Sent-Ekzyuperi', ru: 'Антуан де Сент-Экзюпери', en: 'Antoine de Saint-Exupéry' },
    category: CAT.children,
    description: {
      uz: 'Kattalar uchun ham yozilgan mashhur ertak-qissa.',
      ru: 'Знаменитая сказка, написанная и для взрослых.',
      en: 'The famous tale written for grown-ups too.',
    },
    publisher: PUB.yangiAsr, year: 2023, pages: 128, isbn: '978-9943-27-655-9',
    copies: 20, rating: 4.9, ratingCount: 3420, cover: IMG.kids, collections: [],
  },
  {
    id: 42, rank: 32,
    title: { uz: 'Sariq devni minib', ru: 'Оседлав жёлтого дива', en: 'Riding the Yellow Div' },
    author: { uz: 'Xudoyberdi To‘xtaboyev', ru: 'Худайберды Тухтабаев', en: 'Xudoyberdi Toxtaboyev' },
    category: CAT.children,
    description: {
      uz: 'Sehrli qalpoqcha topib olgan Hoshimjonning sarguzashtlari.',
      ru: 'Приключения Хошимджона, нашедшего волшебную шапку.',
      en: 'The adventures of a boy who finds a magic cap.',
    },
    publisher: PUB.gafurGulom, year: 2022, pages: 320, isbn: '978-9943-03-880-5',
    copies: 16, rating: 4.8, ratingCount: 2180, cover: IMG.reading, collections: [],
  },
  {
    id: 43, rank: 33,
    title: { uz: 'Alisaning mo‘jizalar mamlakatidagi sarguzashtlari', ru: 'Алиса в Стране чудес', en: "Alice's Adventures in Wonderland" },
    author: { uz: 'Lyuis Kerroll', ru: 'Льюис Кэрролл', en: 'Lewis Carroll' },
    category: CAT.children,
    description: {
      uz: 'Quyon inidan boshlangan aql bovar qilmas sayohat.',
      ru: 'Невероятное путешествие, начавшееся с кроличьей норы.',
      en: 'An impossible journey that begins down a rabbit hole.',
    },
    publisher: PUB.yangiAsr, year: 2021, pages: 192, isbn: '978-9943-27-401-2',
    copies: 11, rating: 4.6, ratingCount: 1290, cover: IMG.meeting, collections: [],
  },
  {
    id: 44, rank: 34,
    title: { uz: 'Tom Soyerning sarguzashtlari', ru: 'Приключения Тома Сойера', en: 'The Adventures of Tom Sawyer' },
    author: { uz: 'Mark Tven', ru: 'Марк Твен', en: 'Mark Twain' },
    category: CAT.children,
    description: {
      uz: 'Missisipi bo‘yidagi shaharchada yashovchi shumtaka bola qissasi.',
      ru: 'История озорного мальчишки из городка на Миссисипи.',
      en: 'The story of a mischievous boy on the Mississippi.',
    },
    publisher: PUB.sharq, year: 2006, pages: 288, isbn: '978-9943-26-166-1',
    copies: 9, rating: 4.5, ratingCount: 940, cover: IMG.shelf, collections: [],
  },
  {
    id: 45, rank: 35,
    title: { uz: 'Chipollinoning sarguzashtlari', ru: 'Приключения Чиполлино', en: 'The Adventures of Cipollino' },
    author: { uz: 'Janni Rodari', ru: 'Джанни Родари', en: 'Gianni Rodari' },
    category: CAT.children,
    description: {
      uz: 'Piyoz bola va uning do‘stlari haqidagi ertak.',
      ru: 'Сказка о мальчике-луковке и его друзьях.',
      en: 'A tale of a little onion boy and his friends.',
    },
    publisher: PUB.gafurGulom, year: 1996, pages: 224, isbn: '978-9943-03-490-6',
    copies: 12, rating: 4.4, ratingCount: 760, cover: IMG.hall, collections: [],
  },

  /* ─ Falsafa ─ */
  {
    id: 46, rank: 36,
    title: { uz: 'O‘zim bilan suhbatlar', ru: 'Размышления', en: 'Meditations' },
    author: { uz: 'Mark Avreliy', ru: 'Марк Аврелий', en: 'Marcus Aurelius' },
    category: CAT.philosophy,
    description: {
      uz: 'Rim imperatorining o‘ziga yozgan stoik qaydlari.',
      ru: 'Стоические записи римского императора для самого себя.',
      en: 'The stoic notes a Roman emperor wrote to himself.',
    },
    publisher: PUB.akademnashr, year: 2022, pages: 256, isbn: '978-9943-49-288-1',
    copies: 8, rating: 4.8, ratingCount: 1560, cover: IMG.desk, collections: [],
  },
  {
    id: 47, rank: 37,
    title: { uz: 'Davlat', ru: 'Государство', en: 'The Republic' },
    author: { uz: 'Aflotun', ru: 'Платон', en: 'Plato' },
    category: CAT.philosophy,
    description: {
      uz: 'Adolat va ideal davlat tuzumi haqidagi dialog.',
      ru: 'Диалог о справедливости и идеальном государстве.',
      en: 'A dialogue on justice and the ideal state.',
    },
    publisher: PUB.akademnashr, year: 2002, pages: 512, isbn: '978-9943-49-155-6',
    copies: 0, rating: 4.5, ratingCount: 620, cover: IMG.stack, collections: [],
  },

  /* ─ Badiiy adabiyot ─ */
  {
    id: 48, rank: 38,
    title: { uz: 'Kecha va kunduz', ru: 'Ночь и день', en: 'Night and Day' },
    author: { uz: 'Cho‘lpon', ru: 'Чулпан', en: 'Cho‘lpon' },
    category: CAT.prose,
    description: {
      uz: 'Zebi taqdiri orqali XX asr boshidagi jamiyat manzarasi.',
      ru: 'Картина общества начала XX века через судьбу Зеби.',
      en: 'A portrait of early twentieth-century society through one woman’s fate.',
    },
    publisher: PUB.gafurGulom, year: 2022, pages: 336, isbn: '978-9943-03-838-6',
    copies: 10, rating: 4.8, ratingCount: 1680, cover: IMG.open, collections: [],
  },
  {
    id: 49, rank: 39,
    title: { uz: 'Shaytanat', ru: 'Шайтанат', en: 'Shaytanat' },
    author: { uz: 'Tohir Malik', ru: 'Тахир Малик', en: 'Tohir Malik' },
    category: CAT.prose,
    description: {
      uz: 'Jinoyat olami va vijdon kurashi haqidagi ko‘p jildli roman.',
      ru: 'Многотомный роман о преступном мире и борьбе совести.',
      en: 'A multi-volume novel about the criminal world and conscience.',
    },
    publisher: PUB.sharq, year: 2023, pages: 640, isbn: '978-9943-26-522-5',
    copies: 14, rating: 4.7, ratingCount: 2890, cover: IMG.books, collections: [],
  },
  {
    id: 50, rank: 40,
    title: { uz: 'Chol va dengiz', ru: 'Старик и море', en: 'The Old Man and the Sea' },
    author: { uz: 'Ernest Xeminguey', ru: 'Эрнест Хемингуэй', en: 'Ernest Hemingway' },
    category: CAT.prose,
    description: {
      uz: 'Keksa baliqchining ulkan baliq bilan olishuvi.',
      ru: 'Схватка старого рыбака с огромной рыбой.',
      en: "An old fisherman's struggle with a great fish.",
    },
    publisher: PUB.yangiAsr, year: 2021, pages: 144, isbn: '978-9943-27-388-6',
    copies: 7, rating: 4.6, ratingCount: 1170, cover: IMG.reading, collections: [],
  },
  {
    id: 51, rank: 41,
    title: { uz: 'Buyuk Getsbi', ru: 'Великий Гэтсби', en: 'The Great Gatsby' },
    author: { uz: 'Frensis Skott Fitsjerald', ru: 'Фрэнсис Скотт Фицджеральд', en: 'F. Scott Fitzgerald' },
    category: CAT.prose,
    description: {
      uz: '«Jaz asri» Amerikasidagi orzular va yolg‘izlik haqida.',
      ru: 'О мечтах и одиночестве Америки «века джаза».',
      en: 'Dreams and loneliness in Jazz Age America.',
    },
    publisher: PUB.akademnashr, year: 2023, pages: 224, isbn: '978-9943-49-511-0',
    copies: 6, rating: 4.4, ratingCount: 830, cover: IMG.kids, collections: [],
  },
];

export const books: Book[] = [...coreBooks, ...moreBooks];

export const newBooks = books.filter((b) => b.collections.includes('new'));
export const recommendedBooks = books.filter((b) => b.collections.includes('recommended'));

/** Katalog filtri uchun kategoriyalar ro'yxati (takrorlanmagan). */
export const categories: Localized[] = Object.values(CAT);

/* Ustunlarda ko'rinadigan qisqa toifa nishoni. CAT obyektlari barcha kitoblarda
   bir xil havola bo'lgani uchun Map kalit sifatida havolaning o'zini ishlatadi. */
const BADGES = new Map<Localized, Localized>([
  [CAT.prose, { uz: 'ROMAN', ru: 'РОМАН', en: 'FICTION' }],
  [CAT.history, { uz: 'TARIX', ru: 'ИСТОРИЯ', en: 'HISTORY' }],
  [CAT.science, { uz: 'ILM-FAN', ru: 'НАУКА', en: 'SCIENCE' }],
  [CAT.poetry, { uz: "SHE'RIYAT", ru: 'ПОЭЗИЯ', en: 'POETRY' }],
  [CAT.psychology, { uz: 'RIVOJLANISH', ru: 'САМОРАЗВИТИЕ', en: 'SELF-HELP' }],
  [CAT.religion, { uz: 'DINIY', ru: 'РЕЛИГИЯ', en: 'RELIGION' }],
  [CAT.children, { uz: 'BOLALAR', ru: 'ДЕТСКАЯ', en: 'CHILDREN' }],
  [CAT.philosophy, { uz: 'FALSAFA', ru: 'ФИЛОСОФИЯ', en: 'PHILOSOPHY' }],
]);

export function badgeFor(book: Book): Localized {
  return BADGES.get(book.category) ?? book.category;
}

/* ══ Bosh sahifadagi dashboard ma'lumotlari ═══════════════
   Hammasi mock. Backend ulanganda shu tuzilmalar API javobiga almashtiriladi. */

export interface StatTile {
  id: 'visitors' | 'seats' | 'newBooks' | 'events' | 'catalog';
  icon: 'users' | 'armchair' | 'book' | 'calendar' | 'library';
  value: number;
  accent: 'cyan' | 'emerald' | 'amber' | 'iris' | 'azure';
}

/** Bugun bo'ladigan tadbirlar soni — statistika ham, e'lon qatori ham shundan oladi. */
export function todayEventCount(): number {
  const today = todayISO();
  return events.filter((e) => e.date === today).length;
}

export const todayStats: StatTile[] = [
  { id: 'visitors', icon: 'users', value: 512, accent: 'cyan' },
  { id: 'seats', icon: 'armchair', value: 248, accent: 'emerald' },
  { id: 'newBooks', icon: 'book', value: 86, accent: 'amber' },
  { id: 'events', icon: 'calendar', value: todayEventCount(), accent: 'iris' },
  { id: 'catalog', icon: 'library', value: 1235784, accent: 'azure' },
];

export interface CategoryShare {
  /** i18n kaliti emas — to'g'ridan-to'g'ri toifa nomi. */
  label: Localized;
  percent: number;
  color: string;
}

/* Ranglar bitta cyan ohangining olti bosqichi (OKLCH hue 210), ulush bo'yicha
   yorug'dan to'qqa. Tekshirilgan: monoton yorqinlik, qo'shni ΔL >= 0.06,
   fonga kontrast >= 2:1. Tartibni o'zgartirmang — u ma'no tashiydi. */
export const categoryShares: CategoryShare[] = [
  { label: CAT.prose, percent: 38, color: '#93EFFF' },
  { label: CAT.science, percent: 20, color: '#13DCF6' },
  { label: CAT.history, percent: 14, color: '#17C0D6' },
  { label: CAT.philosophy, percent: 10, color: '#19A4B7' },
  { label: CAT.children, percent: 9, color: '#028A9B' },
  {
    label: { uz: 'Boshqalar', ru: 'Прочее', en: 'Other' },
    percent: 9,
    color: '#06707E',
  },
];

export interface DayVisits {
  /** 0 = yakshanba … 6 = shanba (Date.getDay() bilan bir xil). */
  weekday: number;
  visits: number;
}

export const weeklyVisits: DayVisits[] = [
  { weekday: 1, visits: 420 },
  { weekday: 2, visits: 510 },
  { weekday: 3, visits: 470 },
  { weekday: 4, visits: 560 },
  { weekday: 5, visits: 650 },
  { weekday: 6, visits: 720 },
  { weekday: 0, visits: 610 },
];

export interface QuickService {
  id: 'wifi' | 'audio' | 'catalog' | 'kids' | 'events' | 'membership';
  icon: 'wifi' | 'headphones' | 'monitor' | 'kids' | 'calendar' | 'card';
  accent: string;
}

export const quickServices: QuickService[] = [
  { id: 'wifi', icon: 'wifi', accent: '#22C3E6' },
  { id: 'audio', icon: 'headphones', accent: '#F0AB2A' },
  { id: 'catalog', icon: 'monitor', accent: '#378ACF' },
  { id: 'kids', icon: 'kids', accent: '#3FBF9F' },
  { id: 'events', icon: 'calendar', accent: '#E8688A' },
  { id: 'membership', icon: 'card', accent: '#8B7FD4' },
];

/** Ob-havo — hozircha mock. API ulash uchun shu obyektni almashtirish kifoya. */
export interface Weather {
  tempC: number;
  condition: 'clear' | 'partly' | 'cloudy' | 'rain' | 'snow';
  city: Localized;
}

export const weather: Weather = {
  tempC: 34,
  condition: 'partly',
  city: { uz: 'Toshkent', ru: 'Ташкент', en: 'Tashkent' },
};

/** Hozir binoda turgan kishilar soni (mock). */
export const peopleInside = 512;

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

/* ══ Sensorli infokiosk uchun qo'shimcha ma'lumotlar ══════ */

/** Mashhur kitoblar — reyting bo'yicha saralangan. */
export const popularBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 24);

/** Kioskdagi "yangi kelganlar": to'plamdagilar oldinda, qolgan joyni
    eng so'nggi nashr yilidagi kitoblar to'ldiradi. */
export const latestBooks = [
  ...newBooks,
  ...books.filter((b) => !b.collections.includes('new')).sort((a, b) => b.year - a.year),
].slice(0, 24);

export interface Genre {
  id: string;
  label: Localized;
  /** Shu janrga tegishli kitoblar toifasi. */
  category: Localized;
  icon: 'book' | 'history' | 'science' | 'poetry' | 'brain' | 'mosque' | 'kids' | 'think';
  color: string;
}

export const genres: Genre[] = [
  { id: 'prose', label: CAT.prose, category: CAT.prose, icon: 'book', color: '#4F52F6' },
  { id: 'history', label: CAT.history, category: CAT.history, icon: 'history', color: '#0E9F6E' },
  { id: 'science', label: CAT.science, category: CAT.science, icon: 'science', color: '#F59E0B' },
  { id: 'poetry', label: CAT.poetry, category: CAT.poetry, icon: 'poetry', color: '#EC4899' },
  { id: 'psychology', label: CAT.psychology, category: CAT.psychology, icon: 'brain', color: '#8B5CF6' },
  { id: 'religion', label: CAT.religion, category: CAT.religion, icon: 'mosque', color: '#0EA5E9' },
  { id: 'children', label: CAT.children, category: CAT.children, icon: 'kids', color: '#EF4444' },
  { id: 'philosophy', label: CAT.philosophy, category: CAT.philosophy, icon: 'think', color: '#14B8A6' },
];

export interface NewsItem {
  id: number;
  date: string;
  title: Localized;
  summary: Localized;
  image: string;
}

export const news: NewsItem[] = [
  {
    id: 1,
    date: dayOffset(2),
    title: {
      uz: 'Xalqaro oila kuni',
      ru: 'Международный день семьи',
      en: 'International Day of Families',
    },
    summary: {
      uz: "Kutubxonamizda maxsus kitob ko'rgazmasi va tadbirlar bo'lib o'tadi.",
      ru: 'В библиотеке пройдёт специальная книжная выставка и мероприятия.',
      en: 'A special book exhibition and events will be held at the library.',
    },
    image: IMG.hall,
  },
  {
    id: 2,
    date: dayOffset(5),
    title: {
      uz: 'Raqamli fond kengaymoqda',
      ru: 'Цифровой фонд расширяется',
      en: 'The digital collection is growing',
    },
    summary: {
      uz: "Elektron katalogga 12 000 dan ortiq yangi nashr qo'shildi.",
      ru: 'В электронный каталог добавлено более 12 000 новых изданий.',
      en: 'More than 12,000 new titles have been added to the electronic catalog.',
    },
    image: IMG.reading,
  },
  {
    id: 3,
    date: dayOffset(9),
    title: {
      uz: 'Bolalar zonasi yangilandi',
      ru: 'Детская зона обновлена',
      en: "The children's zone has been renewed",
    },
    summary: {
      uz: "Bolalar uchun yangi o'qish burchagi va ijodiy maydon ochildi.",
      ru: 'Открыты новый читальный уголок и творческая площадка для детей.',
      en: 'A new reading corner and creative area for children have opened.',
    },
    image: IMG.kids,
  },
  {
    id: 4,
    date: dayOffset(12),
    title: {
      uz: 'Nodir qo\u2018lyozmalar raqamlashtirildi',
      ru: 'Редкие рукописи оцифрованы',
      en: 'Rare manuscripts digitised',
    },
    summary: {
      uz: "XV–XIX asrlarga oid 340 ta qo'lyozma elektron shaklda saqlandi.",
      ru: '340 рукописей XV–XIX веков сохранены в электронном виде.',
      en: '340 manuscripts from the 15th–19th centuries are now preserved digitally.',
    },
    image: IMG.stack,
  },
  {
    id: 5,
    date: dayOffset(15),
    title: {
      uz: 'Talabalar uchun tungi o\u2018qish zali',
      ru: 'Ночной читальный зал для студентов',
      en: 'Night reading room for students',
    },
    summary: {
      uz: "Imtihon davrida zal 24:00 gacha ochiq bo'ladi.",
      ru: 'В период экзаменов зал работает до 24:00.',
      en: 'During the exam period the hall stays open until midnight.',
    },
    image: IMG.desk,
  },
  {
    id: 6,
    date: dayOffset(18),
    title: {
      uz: 'Audio kitoblar to\u2018plami kengaydi',
      ru: 'Коллекция аудиокниг расширена',
      en: 'The audiobook collection has grown',
    },
    summary: {
      uz: "O'zbek adabiyotidan 200 dan ortiq audio kitob qo'shildi.",
      ru: 'Добавлено более 200 аудиокниг узбекской литературы.',
      en: 'Over 200 Uzbek-literature audiobooks have been added.',
    },
    image: IMG.reading,
  },
];

/** Bosh sahifadagi "Tezkor qidiruvlar" ro'yxati. */
export const quickSearches: Localized[] = [
  { uz: 'Alisher Navoiy asarlari', ru: 'Произведения Алишера Навои', en: 'Works of Alisher Navoi' },
  { uz: 'Tarixiy romanlar', ru: 'Исторические романы', en: 'Historical novels' },
  { uz: 'Dasturlash kitoblari', ru: 'Книги по программированию', en: 'Programming books' },
  { uz: 'Bolalar adabiyoti', ru: 'Детская литература', en: "Children's literature" },
  { uz: 'Psixologiya', ru: 'Психология', en: 'Psychology' },
];

export interface Branch {
  id: number;
  name: Localized;
  address: Localized;
  phone: string;
  hours: Localized;
  /** Binodagi qavat yoki hudud — kioskda yo'l ko'rsatish uchun. */
  floor: Localized;
  seats: number;
}

export const branches: Branch[] = [
  {
    id: 1,
    name: { uz: 'Asosiy bino', ru: 'Главное здание', en: 'Main building' },
    address: { uz: "Navoiy ko'chasi, 1-uy", ru: 'улица Навои, 1', en: '1 Navoi Street' },
    phone: '+998 (71) 232-83-89',
    hours: { uz: '09:00 – 20:00', ru: '09:00 – 20:00', en: '09:00 – 20:00' },
    floor: { uz: '1–4 qavat', ru: '1–4 этаж', en: 'Floors 1–4' },
    seats: 640,
  },
  {
    id: 2,
    name: { uz: 'Nodir kitoblar bo‘limi', ru: 'Отдел редких книг', en: 'Rare books department' },
    address: { uz: "Navoiy ko'chasi, 1-uy", ru: 'улица Навои, 1', en: '1 Navoi Street' },
    phone: '+998 (71) 232-84-12',
    hours: { uz: '10:00 – 17:00', ru: '10:00 – 17:00', en: '10:00 – 17:00' },
    floor: { uz: '3-qavat, sharqiy qanot', ru: '3 этаж, восточное крыло', en: 'Floor 3, east wing' },
    seats: 48,
  },
  {
    id: 3,
    name: { uz: 'Bolalar adabiyoti zali', ru: 'Зал детской литературы', en: "Children's literature hall" },
    address: { uz: "Navoiy ko'chasi, 1-uy", ru: 'улица Навои, 1', en: '1 Navoi Street' },
    phone: '+998 (71) 232-84-30',
    hours: { uz: '09:00 – 18:00', ru: '09:00 – 18:00', en: '09:00 – 18:00' },
    floor: { uz: '1-qavat', ru: '1 этаж', en: 'Floor 1' },
    seats: 120,
  },
  {
    id: 4,
    name: { uz: 'Chilonzor filiali', ru: 'Филиал Чиланзар', en: 'Chilanzar branch' },
    address: { uz: "Chilonzor tumani, Bunyodkor shoh ko'chasi, 12", ru: 'Чиланзарский район, проспект Бунёдкор, 12', en: '12 Bunyodkor Avenue, Chilanzar' },
    phone: '+998 (71) 276-11-04',
    hours: { uz: '09:00 – 18:00', ru: '09:00 – 18:00', en: '09:00 – 18:00' },
    floor: { uz: 'Alohida bino', ru: 'Отдельное здание', en: 'Separate building' },
    seats: 180,
  },
  {
    id: 5,
    name: { uz: 'Yunusobod filiali', ru: 'Филиал Юнусабад', en: 'Yunusabad branch' },
    address: { uz: "Yunusobod tumani, Amir Temur ko'chasi, 108", ru: 'Юнусабадский район, улица Амира Темура, 108', en: '108 Amir Temur Street, Yunusabad' },
    phone: '+998 (71) 235-77-21',
    hours: { uz: '09:00 – 18:00', ru: '09:00 – 18:00', en: '09:00 – 18:00' },
    floor: { uz: 'Alohida bino', ru: 'Отдельное здание', en: 'Separate building' },
    seats: 150,
  },
];

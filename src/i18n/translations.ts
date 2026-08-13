export type Lang = 'uz' | 'ru' | 'en';

/** Ma'lumotlar (kitob nomi, tadbir sarlavhasi va h.k.) uchun ko'p tilli qiymat. */
export type Localized = Record<Lang, string>;

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'uz', label: "O'Z" },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export const DEFAULT_LANG: Lang = 'uz';

interface NavEntry {
  label: string;
  sublabel?: string;
}

export interface Translation {
  documentTitle: string;
  libraryName: [string, string, string];
  tagline: string;
  searchPlaceholder: string;
  eventsTitle: string;
  eventsButton: string;
  newBooksTitle: string;
  newBooksButton: string;
  recommendedTitle: string;
  recommendedButton: string;
  top10: string;
  socialText: string;
  nav: {
    home: NavEntry;
    catalog: NavEntry;
    about: NavEntry;
    services: NavEntry;
    contact: NavEntry;
  };
  aria: {
    language: string;
    search: string;
    clearSearch: string;
    qrCode: string;
    close: string;
    social: (network: string) => string;
  };
  /** Ichki sahifalar sarlavhalari va umumiy boshqaruv matnlari. */
  page: {
    back: string;
    catalog: string;
    events: string;
    about: string;
    services: string;
    contact: string;
    search: string;
  };
  filter: {
    all: string;
    new: string;
    recommended: string;
    category: string;
  };
  results: (count: number) => string;
  emptyResults: string;
  emptyResultsHint: string;
  searchPrompt: string;
  bookInfo: {
    author: string;
    category: string;
    publisher: string;
    year: string;
    pages: string;
    isbn: string;
    availability: string;
    inStock: (count: number) => string;
    outOfStock: string;
    description: string;
  };
  eventInfo: {
    when: string;
    where: string;
    description: string;
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    website: string;
    schedule: string;
    qrHint: string;
  };
  days: string[];
  monthsShort: string[];
}

export const translations: Record<Lang, Translation> = {
  uz: {
    documentTitle: "O'zbekiston Milliy kutubxonasi — Infokiosk",
    libraryName: ["O'ZBEKISTON", 'MILLIY', 'KUTUBXONASI'],
    tagline: "BILIMGA YO'L — MA'RIFATGA YO'L",
    searchPlaceholder: 'Qidirish...',
    eventsTitle: "AFISHA – TADBIRLAR RO'YXATI",
    eventsButton: 'BARCHA TADBIRLAR',
    newBooksTitle: 'YANGI KELGAN KITOBLAR',
    newBooksButton: 'BARCHA YANGI KITOBLAR',
    recommendedTitle: 'TAVSIYA ETILGAN KITOBLAR',
    recommendedButton: 'BARCHA TAVSIYALAR',
    top10: 'TOP 10',
    socialText: 'Bizni ijtimoiy tarmoqlarda kuzating',
    nav: {
      home: { label: 'BOSH SAHIFA' },
      catalog: { label: 'ELEKTRON', sublabel: 'KATALOG' },
      about: { label: 'KUTUBXONA', sublabel: 'HAQIDA' },
      services: { label: 'XIZMATLAR' },
      contact: { label: 'MANZIL VA', sublabel: 'ALOQA' },
    },
    aria: {
      language: 'Tilni tanlash',
      search: 'Kitob va tadbirlarni qidirish',
      clearSearch: 'Qidiruvni tozalash',
      qrCode: 'Kutubxona saytiga QR kod',
      close: 'Yopish',
      social: (network) => `${network} sahifamiz`,
    },
    page: {
      back: 'ORQAGA',
      catalog: 'ELEKTRON KATALOG',
      events: 'BARCHA TADBIRLAR',
      about: 'KUTUBXONA HAQIDA',
      services: 'XIZMATLAR',
      contact: 'MANZIL VA ALOQA',
      search: 'QIDIRUV NATIJALARI',
    },
    filter: {
      all: 'HAMMASI',
      new: 'YANGI KELGAN',
      recommended: 'TAVSIYA ETILGAN',
      category: 'Yo‘nalish',
    },
    results: (count) => `${count} ta natija`,
    emptyResults: 'Hech narsa topilmadi',
    emptyResultsHint: "So'rovni o'zgartirib yoki qisqartirib ko'ring.",
    searchPrompt: 'Kitob nomi yoki muallifni kiriting',
    bookInfo: {
      author: 'Muallif',
      category: "Yo'nalish",
      publisher: 'Nashriyot',
      year: 'Nashr yili',
      pages: 'Sahifalar',
      isbn: 'ISBN',
      availability: 'Holati',
      inStock: (count) => `Javonda ${count} nusxa bor`,
      outOfStock: 'Hozircha band',
      description: 'Qisqacha',
    },
    eventInfo: {
      when: 'Vaqti',
      where: 'Manzil',
      description: 'Tavsif',
    },
    contactInfo: {
      address: 'Manzil',
      phone: 'Telefon',
      email: 'Elektron pochta',
      website: 'Veb-sayt',
      schedule: 'Ish vaqti',
      qrHint: 'Saytni telefoningizda ochish uchun QR kodni skanerlang',
    },
    days: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
    monthsShort: ['YAN', 'FEV', 'MAR', 'APR', 'MAY', 'IYN', 'IYL', 'AVG', 'SEN', 'OKT', 'NOY', 'DEK'],
  },

  ru: {
    documentTitle: 'Национальная библиотека Узбекистана — Инфокиоск',
    libraryName: ['НАЦИОНАЛЬНАЯ', 'БИБЛИОТЕКА', 'УЗБЕКИСТАНА'],
    tagline: 'ПУТЬ К ЗНАНИЯМ — ПУТЬ К ПРОСВЕЩЕНИЮ',
    searchPlaceholder: 'Поиск...',
    eventsTitle: 'АФИША – СПИСОК МЕРОПРИЯТИЙ',
    eventsButton: 'ВСЕ МЕРОПРИЯТИЯ',
    newBooksTitle: 'НОВЫЕ ПОСТУПЛЕНИЯ',
    newBooksButton: 'ВСЕ НОВЫЕ КНИГИ',
    recommendedTitle: 'РЕКОМЕНДУЕМЫЕ КНИГИ',
    recommendedButton: 'ВСЕ РЕКОМЕНДАЦИИ',
    top10: 'ТОП 10',
    socialText: 'Следите за нами в социальных сетях',
    nav: {
      home: { label: 'ГЛАВНАЯ' },
      catalog: { label: 'ЭЛЕКТРОННЫЙ', sublabel: 'КАТАЛОГ' },
      about: { label: 'О', sublabel: 'БИБЛИОТЕКЕ' },
      services: { label: 'УСЛУГИ' },
      contact: { label: 'АДРЕС И', sublabel: 'КОНТАКТЫ' },
    },
    aria: {
      language: 'Выбор языка',
      search: 'Поиск книг и мероприятий',
      clearSearch: 'Очистить поиск',
      qrCode: 'QR-код на сайт библиотеки',
      close: 'Закрыть',
      social: (network) => `Наша страница в ${network}`,
    },
    page: {
      back: 'НАЗАД',
      catalog: 'ЭЛЕКТРОННЫЙ КАТАЛОГ',
      events: 'ВСЕ МЕРОПРИЯТИЯ',
      about: 'О БИБЛИОТЕКЕ',
      services: 'УСЛУГИ',
      contact: 'АДРЕС И КОНТАКТЫ',
      search: 'РЕЗУЛЬТАТЫ ПОИСКА',
    },
    filter: {
      all: 'ВСЕ',
      new: 'НОВЫЕ',
      recommended: 'РЕКОМЕНДУЕМЫЕ',
      category: 'Направление',
    },
    results: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod10 === 1 && mod100 !== 11) return `${count} результат`;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} результата`;
      return `${count} результатов`;
    },
    emptyResults: 'Ничего не найдено',
    emptyResultsHint: 'Попробуйте изменить или сократить запрос.',
    searchPrompt: 'Введите название книги или имя автора',
    bookInfo: {
      author: 'Автор',
      category: 'Направление',
      publisher: 'Издательство',
      year: 'Год издания',
      pages: 'Страниц',
      isbn: 'ISBN',
      availability: 'Наличие',
      inStock: (count) => `На полке ${count} экз.`,
      outOfStock: 'Сейчас занято',
      description: 'Кратко',
    },
    eventInfo: {
      when: 'Время',
      where: 'Место',
      description: 'Описание',
    },
    contactInfo: {
      address: 'Адрес',
      phone: 'Телефон',
      email: 'Электронная почта',
      website: 'Веб-сайт',
      schedule: 'Режим работы',
      qrHint: 'Отсканируйте QR-код, чтобы открыть сайт на телефоне',
    },
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    monthsShort: ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'],
  },

  en: {
    documentTitle: 'National Library of Uzbekistan — Infokiosk',
    libraryName: ['NATIONAL', 'LIBRARY OF', 'UZBEKISTAN'],
    tagline: 'THE PATH TO KNOWLEDGE — THE PATH TO ENLIGHTENMENT',
    searchPlaceholder: 'Search...',
    eventsTitle: 'EVENTS – WHAT’S ON',
    eventsButton: 'ALL EVENTS',
    newBooksTitle: 'NEW ARRIVALS',
    newBooksButton: 'ALL NEW BOOKS',
    recommendedTitle: 'RECOMMENDED BOOKS',
    recommendedButton: 'ALL RECOMMENDATIONS',
    top10: 'TOP 10',
    socialText: 'Follow us on social media',
    nav: {
      home: { label: 'HOME' },
      catalog: { label: 'ELECTRONIC', sublabel: 'CATALOG' },
      about: { label: 'ABOUT THE', sublabel: 'LIBRARY' },
      services: { label: 'SERVICES' },
      contact: { label: 'ADDRESS &', sublabel: 'CONTACT' },
    },
    aria: {
      language: 'Select language',
      search: 'Search books and events',
      clearSearch: 'Clear search',
      qrCode: 'QR code to the library website',
      close: 'Close',
      social: (network) => `Our ${network} page`,
    },
    page: {
      back: 'BACK',
      catalog: 'ELECTRONIC CATALOG',
      events: 'ALL EVENTS',
      about: 'ABOUT THE LIBRARY',
      services: 'SERVICES',
      contact: 'ADDRESS & CONTACT',
      search: 'SEARCH RESULTS',
    },
    filter: {
      all: 'ALL',
      new: 'NEW ARRIVALS',
      recommended: 'RECOMMENDED',
      category: 'Subject',
    },
    results: (count) => (count === 1 ? '1 result' : `${count} results`),
    emptyResults: 'Nothing found',
    emptyResultsHint: 'Try changing or shortening your query.',
    searchPrompt: 'Enter a book title or an author name',
    bookInfo: {
      author: 'Author',
      category: 'Subject',
      publisher: 'Publisher',
      year: 'Year',
      pages: 'Pages',
      isbn: 'ISBN',
      availability: 'Availability',
      inStock: (count) => `${count} ${count === 1 ? 'copy' : 'copies'} on the shelf`,
      outOfStock: 'Currently on loan',
      description: 'Summary',
    },
    eventInfo: {
      when: 'When',
      where: 'Where',
      description: 'Description',
    },
    contactInfo: {
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      schedule: 'Opening hours',
      qrHint: 'Scan the QR code to open the website on your phone',
    },
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthsShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  },
};

/** Sana ichida ishlatiladigan to'liq oy nomlari (har til o'z grammatikasiga ko'ra). */
const MONTHS_LONG: Record<Lang, string[]> = {
  uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

/** Har bir tilning o'z sana formati: 13-avgust, 2026 / 13 августа 2026 г. / August 13, 2026 */
export function formatDate(date: Date, lang: Lang): string {
  const day = date.getDate();
  const month = MONTHS_LONG[lang][date.getMonth()];
  const year = date.getFullYear();

  if (lang === 'ru') return `${day} ${month} ${year} г.`;
  if (lang === 'en') return `${month} ${day}, ${year}`;
  return `${pad(day)}-${month}, ${year}`;
}

export function formatDayName(date: Date, lang: Lang): string {
  return translations[lang].days[date.getDay()];
}

export function formatMonthShort(date: Date, lang: Lang): string {
  return translations[lang].monthsShort[date.getMonth()];
}

export function formatTime(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

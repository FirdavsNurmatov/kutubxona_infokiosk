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
    /** Kartochkalardagi qisqa shakl. */
    copiesShort: (count: number) => string;
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
  /** Bosh sahifadagi dashboard bloklari. */
  dash: {
    statsTitle: string;
    categoriesTitle: string;
    weeklyTitle: string;
    servicesTitle: string;
    qrTitle: string;
    qrHint: string;
    stat: {
      visitors: string;
      seats: string;
      newBooks: string;
      events: string;
      catalog: string;
    };
    quick: {
      wifi: string;
      audio: string;
      catalog: string;
      kids: string;
      events: string;
      membership: string;
    };
    /** "Bugun kutubxonamizda N ta tadbir bo'lib o'tadi!" */
    todayEvents: (count: number) => string;
    visitsAxis: string;
  };
  weather: {
    peopleInside: (count: number) => string;
    condition: {
      clear: string;
      partly: string;
      cloudy: string;
      rain: string;
      snow: string;
    };
  };
  /** Sensorli infokiosk ekrani (/ yo'li). */
  kiosk: {
    brand: [string, string];
    welcome: string;
    welcomeSub: string;
    searchPlaceholder: string;
    searchButton: string;
    help: string;
    tapToStart: string;
    seeAll: string;
    quickSearches: string;
    /** Bosh sahifa pastidagi maslahat paneli. */
    hint: string;
    /** Chap menyu bo'limlari. */
    menu: {
      home: string;
      search: string;
      genres: string;
      authors: string;
      newArrivals: string;
      popular: string;
      available: string;
      events: string;
      branches: string;
    };
    /** Bosh sahifadagi 6 ta qidiruv kartochkasi (sarlavha + izoh). */
    tiles: {
      search: [string, string];
      authors: [string, string];
      genres: [string, string];
      newArrivals: [string, string];
      popular: [string, string];
      available: [string, string];
    };
    /** Mualliflar sahifasi. */
    authors: {
      subtitle: string;
      bookCount: (n: number) => string;
    };
    /** Mavjud kitoblar sahifasi. */
    available: {
      subtitle: string;
    };
    /** Qidiruv sahifasidagi chap filtr paneli. */
    filters: {
      title: string;
      clear: string;
      genre: string;
      year: string;
      availableOnly: string;
      sort: string;
      show: string;
      hide: string;
      sortBy: {
        relevance: string;
        newest: string;
        popular: string;
        title: string;
      };
      years: {
        recent: string;
        y2010: string;
        y2000: string;
        older: string;
      };
      found: (n: number) => string;
    };
    branches: {
      floor: string;
      seats: string;
      phone: string;
      hours: string;
    };
    helpText: string[];
  };
  /** Devordagi katta ekranning ikkinchi versiyasi — signage pleyer (/ekran2). */
  screen2: {
    /** 01-bo'lim yorlig'i (maketdagi "WELCOME"). */
    welcome: string;
    eventsTitle: string;
    /** Faqat WELCOME bo'limida ko'rinadigan ko'rsatkichlar. */
    stat: {
      catalog: string;
      visitors: string;
      events: string;
    };
    /** Tanlangan kitob panelidagi qo'shimcha ko'rsatkichlar. */
    meta: {
      year: string;
      pages: string;
    };
    /** Ma'lumot bo'lmaganda ham ekran chiroyli qolishi kerak. */
    empty: {
      books: string;
      events: string;
    };
  };
  /** Haftaning qisqartirilgan nomlari (0 = yakshanba). */
  daysShort: string[];
  days: string[];
  monthsShort: string[];
}

export const translations: Record<Lang, Translation> = {
  uz: {
    documentTitle: "O'zbekiston Milliy kutubxonasi — Infokiosk",
    libraryName: ["O'zbekiston", 'Milliy', 'Kutubxonasi'],
    tagline: 'Bilim — kelajak poydevori!',
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
      copiesShort: (count) => `${count} nusxa`,
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
    dash: {
      statsTitle: "BUGUNGI KO'RSATKICHLAR",
      categoriesTitle: 'KITOBLAR TOIFALARI',
      weeklyTitle: 'HAFTALIK TASHRIF DINAMIKASI',
      servicesTitle: 'XIZMATLAR',
      qrTitle: 'Elektron katalog va mobil ilova',
      qrHint: 'QR kodni skanerlang yoki natlib.uz ga kiring',
      stat: {
        visitors: 'Bugungi tashrifchilar',
        seats: "Mavjud o'rinlar",
        newBooks: 'Oyda yangi kitob',
        events: 'Faol tadbirlar',
        catalog: 'Umumiy katalog',
      },
      quick: {
        wifi: 'Wi-Fi',
        audio: 'Audio kitoblar',
        catalog: 'Elektron katalog',
        kids: 'Bolalar zonasi',
        events: 'Tadbirlar',
        membership: "A'zolik",
      },
      todayEvents: (count) => `Bugun kutubxonamizda ${count} ta tadbir bo'lib o'tadi!`,
      visitsAxis: 'Tashriflar',
    },
    weather: {
      peopleInside: (count) => `${count} kishi`,
      condition: {
        clear: 'Ochiq',
        partly: 'Bulutli ochiq',
        cloudy: 'Bulutli',
        rain: "Yog'ingarchilik",
        snow: 'Qor',
      },
    },
    kiosk: {
      brand: ['MILLIY', 'KUTUBXONA'],
      welcome: 'Kitobingizni toping',
      welcomeSub: 'Kutubxona katalogidan qidiring',
      searchPlaceholder: "Kitob nomi, muallif, ISBN yoki mavzu bo'yicha qidiring...",
      searchButton: 'Qidirish',
      help: 'Yordam',
      tapToStart: 'Ekranga teging',
      seeAll: 'Barchasi',
      quickSearches: 'Tezkor qidiruv',
      hint: "Kerakli kitobni topish uchun yuqoridagi qidiruvdan foydalaning yoki bo'limlarni tanlang",
      menu: {
        home: 'Bosh sahifa',
        search: 'Kitob qidirish',
        genres: 'Janrlar',
        authors: 'Mualliflar',
        newArrivals: 'Yangi kelganlar',
        popular: 'Mashhur kitoblar',
        available: 'Mavjud kitoblar',
        events: 'Tadbirlar',
        branches: 'Kutubxonalar',
      },
      tiles: {
        search: ['Kitob nomi', "Kitob nomi bo'yicha qidirish"],
        authors: ['Muallif', "Muallif nomi bo'yicha qidirish"],
        genres: ['Janrlar', 'Sevimli janringizni tanlang'],
        newArrivals: ['Yangi kelganlar', 'Yangi kitoblar bilan tanishing'],
        popular: ['Mashhur kitoblar', "Eng ko'p o'qilgan kitoblar"],
        available: ['Mavjud kitoblar', "Hozir mavjud kitoblarni ko'rish"],
      },
      authors: {
        subtitle: 'Muallif tanlang va uning asarlarini ko‘ring',
        bookCount: (n) => `${n} ta asar`,
      },
      available: {
        subtitle: "Hozir javonda turgan, darhol olish mumkin bo'lgan kitoblar",
      },
      filters: {
        title: 'Filtrlar',
        clear: 'Tozalash',
        genre: 'Janr',
        year: 'Nashr yili',
        availableOnly: 'Faqat mavjudlari',
        sort: 'Saralash',
        show: "Filtrlarni ko'rsatish",
        hide: 'Filtrlarni yashirish',
        sortBy: {
          relevance: "Mosligi bo'yicha",
          newest: 'Avval yangilari',
          popular: 'Eng mashhur',
          title: "Nomi bo'yicha (A–Z)",
        },
        years: {
          recent: '2020 – hozir',
          y2010: '2010 – 2019',
          y2000: '2000 – 2009',
          older: '2000 gacha',
        },
        found: (n) => `${n} ta kitob topildi`,
      },
      branches: {
        floor: 'Joylashuvi',
        seats: "O'rinlar",
        phone: 'Telefon',
        hours: 'Ish vaqti',
      },
      helpText: [
        "Yuqoridagi qatorga kitob nomi, muallif yoki ISBN raqamini yozing va «Qidirish» tugmasini bosing.",
        "Chap menyu va bosh sahifadagi kartochkalar orqali janrlar, mualliflar, yangi kelgan, mashhur hamda javonda mavjud kitoblarga o'tasiz.",
        "Qidiruv sahifasida chapdagi filtrlar yordamida natijalarni janr, nashr yili va mavjudligi bo'yicha saralang.",
        "Kitob ustiga bossangiz, qisqacha tavsifi, nashr ma'lumotlari va javondagi nusxalari soni ko'rinadi.",
        "Qo'shimcha yordam kerak bo'lsa, xizmat ko'rsatish stoliga murojaat qiling.",
      ],
    },
    screen2: {
      welcome: 'XUSH KELIBSIZ',
      eventsTitle: 'YAQINLASHAYOTGAN TADBIRLAR',
      stat: {
        catalog: 'Katalogdagi nashrlar',
        visitors: 'Bugungi tashrifchilar',
        events: 'Faol tadbirlar',
      },
      meta: { year: 'Nashr yili', pages: 'Sahifalar' },
      empty: {
        books: 'Hozircha yangi kitoblar mavjud emas.',
        events: 'Hozircha yaqin tadbirlar mavjud emas.',
      },
    },
    daysShort: ['YAK', 'DUS', 'SES', 'CHO', 'PAY', 'JUM', 'SHA'],
    days: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
    monthsShort: ['YAN', 'FEV', 'MAR', 'APR', 'MAY', 'IYN', 'IYL', 'AVG', 'SEN', 'OKT', 'NOY', 'DEK'],
  },

  ru: {
    documentTitle: 'Национальная библиотека Узбекистана — Инфокиоск',
    libraryName: ['Национальная', 'библиотека', 'Узбекистана'],
    tagline: 'Знание — фундамент будущего!',
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
      copiesShort: (count) => `${count} экз.`,
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
    dash: {
      statsTitle: 'СЕГОДНЯШНИЕ ПОКАЗАТЕЛИ',
      categoriesTitle: 'КАТЕГОРИИ КНИГ',
      weeklyTitle: 'ДИНАМИКА ПОСЕЩЕНИЙ ЗА НЕДЕЛЮ',
      servicesTitle: 'УСЛУГИ',
      qrTitle: 'Электронный каталог и мобильное приложение',
      qrHint: 'Отсканируйте QR-код или зайдите на natlib.uz',
      stat: {
        visitors: 'Посетителей сегодня',
        seats: 'Свободных мест',
        newBooks: 'Новых книг за месяц',
        events: 'Активных мероприятий',
        catalog: 'Всего в каталоге',
      },
      quick: {
        wifi: 'Wi-Fi',
        audio: 'Аудиокниги',
        catalog: 'Электронный каталог',
        kids: 'Детская зона',
        events: 'Мероприятия',
        membership: 'Читательский билет',
      },
      todayEvents: (count) => {
        const mod10 = count % 10;
        const mod100 = count % 100;
        const word =
          mod10 === 1 && mod100 !== 11
            ? 'мероприятие'
            : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
              ? 'мероприятия'
              : 'мероприятий';
        return `Сегодня в библиотеке пройдёт ${count} ${word}!`;
      },
      visitsAxis: 'Посещения',
    },
    weather: {
      peopleInside: (count) => `${count} чел.`,
      condition: {
        clear: 'Ясно',
        partly: 'Переменная облачность',
        cloudy: 'Облачно',
        rain: 'Дождь',
        snow: 'Снег',
      },
    },
    kiosk: {
      brand: ['НАЦИОНАЛЬНАЯ', 'БИБЛИОТЕКА'],
      welcome: 'Найдите свою книгу',
      welcomeSub: 'Ищите в каталоге библиотеки',
      searchPlaceholder: 'Поиск по названию, автору, ISBN или теме...',
      searchButton: 'Найти',
      help: 'Помощь',
      tapToStart: 'Коснитесь экрана',
      seeAll: 'Все',
      quickSearches: 'Быстрый поиск',
      hint: 'Чтобы найти нужную книгу, воспользуйтесь поиском выше или выберите раздел',
      menu: {
        home: 'Главная',
        search: 'Поиск книг',
        genres: 'Жанры',
        authors: 'Авторы',
        newArrivals: 'Новые поступления',
        popular: 'Популярные книги',
        available: 'Есть в наличии',
        events: 'Мероприятия',
        branches: 'Библиотеки',
      },
      tiles: {
        search: ['Название книги', 'Поиск по названию книги'],
        authors: ['Автор', 'Поиск по имени автора'],
        genres: ['Жанры', 'Выберите любимый жанр'],
        newArrivals: ['Новые поступления', 'Познакомьтесь с новинками'],
        popular: ['Популярные книги', 'Самые читаемые книги'],
        available: ['Есть в наличии', 'Книги, доступные прямо сейчас'],
      },
      authors: {
        subtitle: 'Выберите автора и посмотрите его произведения',
        bookCount: (n) => {
          const mod10 = n % 10;
          const mod100 = n % 100;
          if (mod10 === 1 && mod100 !== 11) return `${n} произведение`;
          if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} произведения`;
          return `${n} произведений`;
        },
      },
      available: {
        subtitle: 'Книги, которые сейчас на полке и доступны сразу',
      },
      filters: {
        title: 'Фильтры',
        clear: 'Сбросить',
        genre: 'Жанр',
        year: 'Год издания',
        availableOnly: 'Только в наличии',
        sort: 'Сортировка',
        show: 'Показать фильтры',
        hide: 'Скрыть фильтры',
        sortBy: {
          relevance: 'По релевантности',
          newest: 'Сначала новые',
          popular: 'Самые популярные',
          title: 'По названию (А–Я)',
        },
        years: {
          recent: '2020 – сейчас',
          y2010: '2010 – 2019',
          y2000: '2000 – 2009',
          older: 'До 2000',
        },
        found: (n) => {
          const mod10 = n % 10;
          const mod100 = n % 100;
          if (mod10 === 1 && mod100 !== 11) return `Найдена ${n} книга`;
          if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `Найдено ${n} книги`;
          return `Найдено ${n} книг`;
        },
      },
      branches: {
        floor: 'Расположение',
        seats: 'Мест',
        phone: 'Телефон',
        hours: 'Режим работы',
      },
      helpText: [
        'Введите название книги, автора или ISBN в строку поиска вверху и нажмите «Найти».',
        'Меню слева и карточки на главной странице ведут к жанрам, авторам, новинкам, популярным и доступным сейчас книгам.',
        'На странице поиска фильтры слева отбирают книги по жанру, году издания и наличию.',
        'Нажмите на книгу, чтобы увидеть описание, выходные данные и количество экземпляров на полке.',
        'Если нужна дополнительная помощь, обратитесь к стойке обслуживания.',
      ],
    },
    screen2: {
      welcome: 'ДОБРО ПОЖАЛОВАТЬ',
      eventsTitle: 'БЛИЖАЙШИЕ МЕРОПРИЯТИЯ',
      stat: {
        catalog: 'Изданий в каталоге',
        visitors: 'Посетителей сегодня',
        events: 'Активных мероприятий',
      },
      meta: { year: 'Год издания', pages: 'Страниц' },
      empty: {
        books: 'Пока нет новых поступлений.',
        events: 'Пока нет ближайших мероприятий.',
      },
    },
    daysShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    monthsShort: ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'],
  },

  en: {
    documentTitle: 'National Library of Uzbekistan — Infokiosk',
    libraryName: ['National', 'Library of', 'Uzbekistan'],
    tagline: 'Knowledge — the foundation of the future!',
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
      copiesShort: (count) => `${count} ${count === 1 ? 'copy' : 'copies'}`,
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
    dash: {
      statsTitle: "TODAY'S FIGURES",
      categoriesTitle: 'BOOK CATEGORIES',
      weeklyTitle: 'WEEKLY VISITOR TREND',
      servicesTitle: 'SERVICES',
      qrTitle: 'Electronic catalog and mobile app',
      qrHint: 'Scan the QR code or visit natlib.uz',
      stat: {
        visitors: 'Visitors today',
        seats: 'Seats available',
        newBooks: 'New books this month',
        events: 'Active events',
        catalog: 'Items in catalog',
      },
      quick: {
        wifi: 'Wi-Fi',
        audio: 'Audiobooks',
        catalog: 'Electronic catalog',
        kids: "Children's zone",
        events: 'Events',
        membership: 'Membership',
      },
      todayEvents: (count) =>
        `${count} ${count === 1 ? 'event takes' : 'events take'} place in the library today!`,
      visitsAxis: 'Visits',
    },
    weather: {
      peopleInside: (count) => `${count} people`,
      condition: {
        clear: 'Clear',
        partly: 'Partly cloudy',
        cloudy: 'Cloudy',
        rain: 'Rain',
        snow: 'Snow',
      },
    },
    kiosk: {
      brand: ['NATIONAL', 'LIBRARY'],
      welcome: 'Find your book',
      welcomeSub: 'Search the library catalogue',
      searchPlaceholder: 'Search by title, author, ISBN or subject...',
      searchButton: 'Search',
      help: 'Help',
      tapToStart: 'Touch the screen',
      seeAll: 'See all',
      quickSearches: 'Quick search',
      hint: 'Use the search above or pick a section to find the book you need',
      menu: {
        home: 'Home',
        search: 'Find a book',
        genres: 'Genres',
        authors: 'Authors',
        newArrivals: 'New arrivals',
        popular: 'Popular books',
        available: 'On the shelf',
        events: 'Events',
        branches: 'Libraries',
      },
      tiles: {
        search: ['Book title', 'Search by book title'],
        authors: ['Author', 'Search by author name'],
        genres: ['Genres', 'Pick your favourite genre'],
        newArrivals: ['New arrivals', 'Discover the latest books'],
        popular: ['Popular books', 'The most read titles'],
        available: ['On the shelf', 'Books you can borrow right now'],
      },
      authors: {
        subtitle: 'Pick an author and browse their works',
        bookCount: (n) => `${n} ${n === 1 ? 'work' : 'works'}`,
      },
      available: {
        subtitle: 'Books currently on the shelf and ready to borrow',
      },
      filters: {
        title: 'Filters',
        clear: 'Clear',
        genre: 'Genre',
        year: 'Year published',
        availableOnly: 'On the shelf only',
        sort: 'Sort',
        show: 'Show filters',
        hide: 'Hide filters',
        sortBy: {
          relevance: 'Best match',
          newest: 'Newest first',
          popular: 'Most popular',
          title: 'Title (A–Z)',
        },
        years: {
          recent: '2020 – now',
          y2010: '2010 – 2019',
          y2000: '2000 – 2009',
          older: 'Before 2000',
        },
        found: (n) => `${n} ${n === 1 ? 'book' : 'books'} found`,
      },
      branches: {
        floor: 'Location',
        seats: 'Seats',
        phone: 'Phone',
        hours: 'Opening hours',
      },
      helpText: [
        'Type a title, author or ISBN into the search bar at the top and press "Search".',
        'The menu on the left and the cards on the home page open genres, authors, new arrivals, popular books and titles on the shelf.',
        'On the search page, the filters on the left narrow results by genre, publication year and availability.',
        'Tap a book to see its summary, publication details and how many copies are on the shelf.',
        'If you need more help, please ask at the service desk.',
      ],
    },
    screen2: {
      welcome: 'WELCOME',
      eventsTitle: 'UPCOMING EVENTS',
      stat: {
        catalog: 'Titles in the catalogue',
        visitors: 'Visitors today',
        events: 'Active events',
      },
      meta: { year: 'Published', pages: 'Pages' },
      empty: {
        books: 'No new arrivals at the moment.',
        events: 'No upcoming events at the moment.',
      },
    },
    daysShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
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

/** Katta sonlarni ajratib ko'rsatadi: 1235784 → "1 235 784" (uchala tilda bir xil). */
export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

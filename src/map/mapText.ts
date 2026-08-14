import type { Lang } from '../i18n/translations';
import type { RoomCategory } from './types';

/**
 * /map bo'limining interfeys matnlari.
 * Umumiy translations.ts ni shishirmaslik uchun shu bo'limga tegishli
 * matnlar alohida saqlanadi — tuzilishi bir xil: uz / ru / en.
 */
export interface MapText {
  brand: [string, string];
  documentTitle: string;
  nav: {
    map: string;
    about: string;
    rooms: string;
  };
  floor: (n: number) => string;
  floorPlanSubtitle: string;
  welcome: {
    title: string;
    body: string;
    action: string;
  };
  /** Chapdagi "shu qavatdagi xonalar" ro'yxati sarlavhasi. */
  roomListTitle: string;
  /** Chizmadagi kiosk nuqtasi yozuvi. */
  youAreHere: string;
  /** Xona kartochkasidagi yo'nalish bo'limi sarlavhasi. */
  directionsTitle: string;
  hours: {
    title: string;
    weekdaysLabel: string;
    weekdays: string;
    sundayLabel: string;
    sunday: string;
    note: string;
  };
  stats: {
    title: string;
    books: string;
    readers: string;
    rooms: string;
    seats: string;
    computers: string;
  };
  /** O'ng ustundagi "tezkor o'tish" kartochkasi sarlavhasi. */
  shortcutsTitle: string;
  hint: string;
  rooms: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    empty: string;
    onFloor: (n: number) => string;
    countOnFloor: (n: number) => string;
  };
  filters: Record<'all' | RoomCategory, string>;
  about: {
    title: string;
    subtitle: string;
    factLabels: {
      books: string;
      readers: string;
      floors: string;
      rooms: string;
      seats: string;
      computers: string;
    };
    features: { title: string; body: string }[];
    amenitiesTitle: string;
    amenities: string[];
    directions: string;
    qrHint: string;
    contactTitle: string;
    quote: string;
    quoteAuthor: string;
  };
  detail: {
    seats: (n: number) => string;
    features: string;
    showOnMap: string;
    close: string;
  };
  aria: {
    selectFloor: string;
    roomList: string;
    language: string;
  };
}

const uz: MapText = {
  brand: ['MILLIY KUTUBXONA', 'AXBOROT – MA’RIFAT MASKANI'],
  documentTitle: 'Kutubxona xaritasi',
  nav: {
    map: 'Xarita',
    about: 'Kutubxona haqida',
    rooms: 'Xonalar va xizmatlar',
  },
  floor: (n) => `${n}-QAVAT`,
  floorPlanSubtitle: 'XONALAR VA JOYLASHUV',
  welcome: {
    title: 'XUSH KELIBSIZ!',
    body: 'Qavatni tanlang, so‘ng quyidagi ro‘yxatdan xonani bosing — u haqidagi to‘liq ma’lumot o‘ng tomonda ochiladi.',
    action: 'Barcha xonalar',
  },
  roomListTitle: 'SHU QAVATDAGI XONALAR',
  youAreHere: 'Siz shu yerdasiz',
  directionsTitle: 'Qanday borish',
  hours: {
    title: 'ISH VAQTI',
    weekdaysLabel: 'Dushanba – Shanba',
    weekdays: '09:00 – 19:00',
    sundayLabel: 'Yakshanba',
    sunday: '10:00 – 18:00',
    note: 'Har oyning oxirgi juma kuni — sanitariya kuni (kutubxona yopiq).',
  },
  stats: {
    title: 'ASOSIY MA’LUMOT',
    books: 'JAMI KITOBLAR',
    readers: 'O‘QUVCHILAR',
    rooms: 'XONALAR SONI',
    seats: 'O‘RINLAR SONI',
    computers: 'KOMPYUTERLAR',
  },
  shortcutsTitle: 'TEZKOR O‘TISH',
  hint: 'Qavatni tanlang va chapdagi ro‘yxatdan kerakli xonani bosing',
  rooms: {
    title: 'XONALAR VA XIZMATLAR',
    subtitle:
      'Kutubxonaning har bir xonasi bilim olish, izlanish va ijod qilish uchun qulay muhit yaratadi.',
    searchPlaceholder: 'Xona nomi bo‘yicha qidirish...',
    empty: 'Bunday xona topilmadi',
    onFloor: (n) => `${n}-qavat`,
    countOnFloor: (n) => `${n} ta xona`,
  },
  filters: {
    all: 'Barcha xonalar',
    reading: 'O‘qish zallari',
    collection: 'Fond va ko‘rgazma',
    tech: 'Texnologiya',
    kids: 'Bolalar uchun',
    service: 'Xizmat xonalari',
    relax: 'Dam olish',
    facility: 'Infratuzilma',
  },
  about: {
    title: 'KUTUBXONA HAQIDA',
    subtitle: 'BILIM, MA’RIFAT VA INNOVATSIYA MASKANI',
    factLabels: {
      books: 'JAMI KITOBLAR VA NASHRLAR',
      readers: 'FAOL O‘QUVCHILAR',
      floors: 'QAVATLI BINO',
      rooms: 'XONALAR SONI',
      seats: 'O‘RINLAR SONI',
      computers: 'KOMPYUTERLAR',
    },
    features: [
      {
        title: 'Bilim ombori',
        body: 'Noyob qo‘lyozmalar, qadimiy nashrlar va zamonaviy adabiyotlar jamlangan bebaho boyliklar xazinasi.',
      },
      {
        title: 'Zamonaviy xizmatlar',
        body: 'Elektron kutubxona, onlayn katalog, Wi-Fi, kompyuterlar va boshqa zamonaviy imkoniyatlar.',
      },
      {
        title: 'O‘quv zonalari',
        body: 'Qulay muhitda mustaqil ta’lim olish, izlanish va ijod qilish uchun barcha sharoitlar yaratilgan.',
      },
      {
        title: 'Madaniy va ma’rifiy markaz',
        body: 'Ko‘rgazmalar, uchrashuvlar, seminar va boshqa tadbirlar orqali ma’rifat va madaniyatni rivojlantiramiz.',
      },
    ],
    amenitiesTitle: 'KUTUBXONA IMKONIYATLARI',
    amenities: [
      'Elektron kutubxona',
      'Onlayn katalog',
      'Wi-Fi internet',
      'Kompyuter zali',
      'Nashrlar ko‘chirmasi',
      'Skaner va printer',
      'Nogironlar uchun sharoit',
      'Kafe va dam olish zonalari',
      'Avtoturargoh',
      'Guruhli ish xonalari',
    ],
    directions: 'Yo‘nalishni telefoningizga oling',
    qrHint: 'QR kodni skanerlang — manzil telefoningizdagi xaritada ochiladi.',
    contactTitle: 'BIZ BILAN BOG‘LANING',
    quote: 'Kitob — eng yaxshi do‘st, eng sabrli ustoz va eng samimiy insondir.',
    quoteAuthor: 'Alisher Navoiy',
  },
  detail: {
    seats: (n) => `${n} o‘rin`,
    features: 'Imkoniyatlar',
    showOnMap: 'Batafsil',
    close: 'Yopish',
  },
  aria: { selectFloor: 'Qavatni tanlash', roomList: 'Xonalar ro‘yxati', language: 'Til' },
};

const ru: MapText = {
  brand: ['НАЦИОНАЛЬНАЯ БИБЛИОТЕКА', 'ЦЕНТР ЗНАНИЙ И ПРОСВЕЩЕНИЯ'],
  documentTitle: 'Карта библиотеки',
  nav: {
    map: 'Карта',
    about: 'О библиотеке',
    rooms: 'Залы и услуги',
  },
  floor: (n) => `${n}-Й ЭТАЖ`,
  floorPlanSubtitle: 'ЗАЛЫ И РАСПОЛОЖЕНИЕ',
  welcome: {
    title: 'ДОБРО ПОЖАЛОВАТЬ!',
    body: 'Выберите этаж, затем нажмите на зал в списке ниже — полная информация о нём появится справа.',
    action: 'Все залы',
  },
  roomListTitle: 'ЗАЛЫ ЭТОГО ЭТАЖА',
  youAreHere: 'Вы здесь',
  directionsTitle: 'Как пройти',
  hours: {
    title: 'РЕЖИМ РАБОТЫ',
    weekdaysLabel: 'Понедельник – Суббота',
    weekdays: '09:00 – 19:00',
    sundayLabel: 'Воскресенье',
    sunday: '10:00 – 18:00',
    note: 'Последняя пятница месяца — санитарный день (библиотека закрыта).',
  },
  stats: {
    title: 'ОСНОВНЫЕ СВЕДЕНИЯ',
    books: 'ВСЕГО КНИГ',
    readers: 'ЧИТАТЕЛЕЙ',
    rooms: 'КОЛИЧЕСТВО ЗАЛОВ',
    seats: 'КОЛИЧЕСТВО МЕСТ',
    computers: 'КОМПЬЮТЕРОВ',
  },
  shortcutsTitle: 'БЫСТРЫЙ ПЕРЕХОД',
  hint: 'Выберите этаж и нажмите нужный зал в списке слева',
  rooms: {
    title: 'ЗАЛЫ И УСЛУГИ',
    subtitle: 'Каждый зал библиотеки создаёт удобную среду для учёбы, исследований и творчества.',
    searchPlaceholder: 'Поиск по названию зала...',
    empty: 'Такой зал не найден',
    onFloor: (n) => `${n}-й этаж`,
    countOnFloor: (n) => `${n} залов`,
  },
  filters: {
    all: 'Все залы',
    reading: 'Читальные залы',
    collection: 'Фонд и выставки',
    tech: 'Технологии',
    kids: 'Для детей',
    service: 'Служебные залы',
    relax: 'Отдых',
    facility: 'Инфраструктура',
  },
  about: {
    title: 'О БИБЛИОТЕКЕ',
    subtitle: 'ЦЕНТР ЗНАНИЙ, ПРОСВЕЩЕНИЯ И ИННОВАЦИЙ',
    factLabels: {
      books: 'ВСЕГО КНИГ И ИЗДАНИЙ',
      readers: 'АКТИВНЫХ ЧИТАТЕЛЕЙ',
      floors: 'ЭТАЖА В ЗДАНИИ',
      rooms: 'КОЛИЧЕСТВО ЗАЛОВ',
      seats: 'КОЛИЧЕСТВО МЕСТ',
      computers: 'КОМПЬЮТЕРОВ',
    },
    features: [
      {
        title: 'Хранилище знаний',
        body: 'Бесценная сокровищница редких рукописей, старопечатных изданий и современной литературы.',
      },
      {
        title: 'Современные услуги',
        body: 'Электронная библиотека, онлайн-каталог, Wi-Fi, компьютеры и другие современные возможности.',
      },
      {
        title: 'Учебные зоны',
        body: 'Созданы все условия для самостоятельного обучения, исследований и творчества в комфортной среде.',
      },
      {
        title: 'Культурно-просветительский центр',
        body: 'Развиваем просвещение и культуру через выставки, встречи, семинары и другие мероприятия.',
      },
    ],
    amenitiesTitle: 'ВОЗМОЖНОСТИ БИБЛИОТЕКИ',
    amenities: [
      'Электронная библиотека',
      'Онлайн-каталог',
      'Wi-Fi интернет',
      'Компьютерный зал',
      'Копирование изданий',
      'Сканер и принтер',
      'Условия для маломобильных',
      'Кафе и зоны отдыха',
      'Парковка',
      'Комнаты групповой работы',
    ],
    directions: 'Маршрут на ваш телефон',
    qrHint: 'Отсканируйте QR-код — адрес откроется в карте на вашем телефоне.',
    contactTitle: 'СВЯЖИТЕСЬ С НАМИ',
    quote: 'Книга — лучший друг, самый терпеливый учитель и самый искренний собеседник.',
    quoteAuthor: 'Алишер Навои',
  },
  detail: {
    seats: (n) => `${n} мест`,
    features: 'Возможности',
    showOnMap: 'Подробнее',
    close: 'Закрыть',
  },
  aria: { selectFloor: 'Выбор этажа', roomList: 'Список залов', language: 'Язык' },
};

const en: MapText = {
  brand: ['NATIONAL LIBRARY', 'A HOME OF KNOWLEDGE'],
  documentTitle: 'Library map',
  nav: {
    map: 'Map',
    about: 'About the library',
    rooms: 'Rooms and services',
  },
  floor: (n) => `FLOOR ${n}`,
  floorPlanSubtitle: 'ROOMS AND LAYOUT',
  welcome: {
    title: 'WELCOME!',
    body: 'Pick a floor, then tap a room in the list below — full details open on the right.',
    action: 'All rooms',
  },
  roomListTitle: 'ROOMS ON THIS FLOOR',
  youAreHere: 'You are here',
  directionsTitle: 'How to get there',
  hours: {
    title: 'OPENING HOURS',
    weekdaysLabel: 'Monday – Saturday',
    weekdays: '09:00 – 19:00',
    sundayLabel: 'Sunday',
    sunday: '10:00 – 18:00',
    note: 'The last Friday of every month is a maintenance day (library closed).',
  },
  stats: {
    title: 'KEY FACTS',
    books: 'TOTAL BOOKS',
    readers: 'READERS',
    rooms: 'ROOMS',
    seats: 'SEATS',
    computers: 'COMPUTERS',
  },
  shortcutsTitle: 'QUICK LINKS',
  hint: 'Choose a floor and tap the room you need in the list on the left',
  rooms: {
    title: 'ROOMS AND SERVICES',
    subtitle: 'Every room in the library is designed for comfortable study, research and creativity.',
    searchPlaceholder: 'Search by room name...',
    empty: 'No such room found',
    onFloor: (n) => `Floor ${n}`,
    countOnFloor: (n) => `${n} rooms`,
  },
  filters: {
    all: 'All rooms',
    reading: 'Reading rooms',
    collection: 'Collections and exhibits',
    tech: 'Technology',
    kids: 'For children',
    service: 'Service rooms',
    relax: 'Relaxation',
    facility: 'Facilities',
  },
  about: {
    title: 'ABOUT THE LIBRARY',
    subtitle: 'A HOME OF KNOWLEDGE, LEARNING AND INNOVATION',
    factLabels: {
      books: 'BOOKS AND PUBLICATIONS',
      readers: 'ACTIVE READERS',
      floors: 'FLOORS IN THE BUILDING',
      rooms: 'ROOMS',
      seats: 'SEATS',
      computers: 'COMPUTERS',
    },
    features: [
      {
        title: 'A store of knowledge',
        body: 'A priceless treasury of rare manuscripts, early printed books and contemporary literature.',
      },
      {
        title: 'Modern services',
        body: 'A digital library, online catalogue, Wi-Fi, computers and other up-to-date facilities.',
      },
      {
        title: 'Study zones',
        body: 'Everything is in place for independent study, research and creative work in a comfortable setting.',
      },
      {
        title: 'Cultural and educational hub',
        body: 'We advance learning and culture through exhibitions, meetings, seminars and other events.',
      },
    ],
    amenitiesTitle: 'WHAT THE LIBRARY OFFERS',
    amenities: [
      'Digital library',
      'Online catalogue',
      'Wi-Fi internet',
      'Computer room',
      'Copying service',
      'Scanner and printer',
      'Step-free access',
      'Café and lounge areas',
      'Car park',
      'Group study rooms',
    ],
    directions: 'Directions on your phone',
    qrHint: 'Scan the QR code — the address opens in the map app on your phone.',
    contactTitle: 'GET IN TOUCH',
    quote: 'A book is the best friend, the most patient teacher and the most sincere companion.',
    quoteAuthor: 'Alisher Navoi',
  },
  detail: {
    seats: (n) => `${n} seats`,
    features: 'Facilities',
    showOnMap: 'Details',
    close: 'Close',
  },
  aria: { selectFloor: 'Select floor', roomList: 'Room list', language: 'Language' },
};

export const MAP_TEXT: Record<Lang, MapText> = { uz, ru, en };

/* Interfeys modullarining o'z matnlari.
   Umumiy `src/i18n/translations.ts` kiosk va katta ekran uchun tuzilgan,
   bu yerdagi modullarga esa boshqa atamalar kerak — shuning uchun
   ular aralashtirilmaydi, alohida saqlanadi. */
import { useI18n } from '../i18n/context';
import type { Lang } from '../i18n/translations';

type Dict = Record<string, [string, string, string]>;

/** [uz, ru, en] tartibida. */
const TEXT: Dict = {
  back: ['Orqaga', 'Назад', 'Back'],
  home: ['Bosh sahifa', 'Главная', 'Home'],
  about: ['Kutubxona haqida', 'О библиотеке', 'About the library'],
  help: ['Yordam', 'Помощь', 'Help'],
  language: ['Til', 'Язык', 'Language'],
  search: ['Qidirish', 'Поиск', 'Search'],
  searchPlaceholder: ['Qidirish...', 'Поиск...', 'Search...'],
  seeAll: ['Barchasini ko‘rish', 'Показать все', 'See all'],
  more: ['Batafsil', 'Подробнее', 'Details'],
  moreView: ['Batafsil ko‘rish', 'Подробнее', 'View details'],
  view: ['Ko‘rish', 'Смотреть', 'View'],
  recommended: ['Tavsiya etilgan', 'Рекомендуем', 'Recommended'],
  nothingFound: ['Hech narsa topilmadi', 'Ничего не найдено', 'Nothing found'],
  loading: ['Yuklanmoqda...', 'Загрузка...', 'Loading...'],
  facts: ['Qiziqarli faktlar', 'Интересные факты', 'Fun facts'],
  categories: ['Kategoriyalar', 'Категории', 'Categories'],
  entries: ['ta yozuv', 'записей', 'entries'],

  close: ['Yopish', 'Закрыть', 'Close'],
  loadFailed: ['Ma’lumotni yuklab bo‘lmadi', 'Не удалось загрузить данные', 'Could not load the data'],
  loadFailedHint: [
    'Aloqani tekshirib, qayta urinib ko‘ring yoki kutubxona xodimiga murojaat qiling.',
    'Проверьте соединение и попробуйте снова или обратитесь к сотруднику библиотеки.',
    'Check the connection and try again, or ask a member of library staff.',
  ],
  retry: ['Qayta urinish', 'Повторить', 'Try again'],
  eventEnded: ['tugadi', 'завершилось', 'ended'],
  searchHint: [
    'Kamida ikki harf yozing — kutubxona bo‘limlari bo‘yicha qidiriladi.',
    'Введите хотя бы две буквы — поиск идёт по всем разделам библиотеки.',
    'Type at least two letters — the search covers every library section.',
  ],
  found: ['Topildi', 'Найдено', 'Found'],
  prev: ['Oldingi', 'Предыдущий', 'Previous'],
  clearChar: ['Belgini o‘chirish', 'Удалить символ', 'Delete character'],
  layout: ['Yozuv turini almashtirish', 'Сменить раскладку', 'Switch layout'],
  phone: ['Telefon', 'Телефон', 'Phone'],
  email: ['E-pochta', 'Эл. почта', 'Email'],
  website: ['Sayt', 'Сайт', 'Website'],
  schedule: ['Ish jadvali', 'График работы', 'Opening hours'],

  /* Pastki navigatsiya oynalari */
  helpIntro: [
    'Bu — sensorli infokiosk. Barcha bo‘limlar ekranga barmoq bilan tegib ochiladi, hech qanday sichqoncha yoki klaviatura kerak emas.',
    'Это сенсорный информационный киоск. Все разделы открываются касанием экрана — мышь и клавиатура не нужны.',
    'This is a touch information kiosk. Every section opens with a tap — no mouse or keyboard needed.',
  ],
  helpStep1: [
    'Kerakli bo‘lim kartochkasiga teging — u ochiladi.',
    'Коснитесь карточки нужного раздела — он откроется.',
    'Tap the card of the section you need to open it.',
  ],
  helpStep2: [
    'Yuqoridagi ☰ tugmasi barcha bo‘limlar ro‘yxatini ochadi, «Orqaga» esa bir qadam qaytaradi.',
    'Кнопка ☰ сверху открывает список всех разделов, «Назад» возвращает на шаг назад.',
    'The ☰ button at the top lists every section; “Back” returns one step.',
  ],
  helpStep3: [
    'UZ / RU / EN tugmalari orqali ekran tilini istalgan paytda almashtirish mumkin.',
    'Кнопки UZ / RU / EN в любой момент меняют язык экрана.',
    'The UZ / RU / EN buttons switch the screen language at any time.',
  ],
  helpStep4: [
    'Uzun ro‘yxatlarni barmoq bilan yuqoriga-pastga suring. Ekranga bir necha daqiqa tegilmasa, u o‘zi bosh sahifaga qaytadi.',
    'Длинные списки листайте пальцем вверх и вниз. Если экран не трогать несколько минут, он сам вернётся на главную.',
    'Swipe long lists up and down. If the screen is left untouched for a few minutes it returns to the home page by itself.',
  ],
  quizHelpTitle: ['Viktorina qanday o‘ynaladi?', 'Как проходит викторина?', 'How the quiz works'],
  quizHelp1: [
    'Kategoriyani tanlang yoki «O‘yinni boshlash» tugmasini bosing.',
    'Выберите категорию или нажмите «Начать игру».',
    'Pick a category or press “Start the game”.',
  ],
  quizHelp2: [
    'Har bir savolda bitta javobni tanlang. Javob bosilgach, to‘g‘risi yashil, xatosi qizil rangda ko‘rsatiladi va qisqacha izoh chiqadi.',
    'В каждом вопросе выберите один ответ. После нажатия правильный подсветится зелёным, неверный — красным, и появится пояснение.',
    'Choose one answer per question. Once you tap, the correct option turns green, a wrong one red, and a short explanation appears.',
  ],
  quizHelp3: [
    'Ba’zi to‘plamlarda umumiy taymer bo‘ladi — vaqt tugasa o‘yin avtomatik yakunlanadi va natija ko‘rsatiladi.',
    'В некоторых наборах есть общий таймер — когда время выйдет, игра завершится сама и покажет результат.',
    'Some sets have an overall timer — when it runs out the game ends by itself and shows your score.',
  ],

  /* Hub */
  hubTitle: ['Kutubxonani kashf et', 'Откройте библиотеку', 'Discover the library'],
  hubLead: [
    'Qavatlar, zallar va xizmatlar bilan tanishing hamda kerakli joyga yo‘nalish oling.',
    'Познакомьтесь с этажами, залами и услугами и найдите нужное место.',
    'Explore the floors, halls and services, and find your way around.',
  ],
  chooseFloor: ['QAVATLARNI TANLANG', 'ВЫБЕРИТЕ ЭТАЖ', 'CHOOSE A FLOOR'],
  quickServices: ['TEZKOR XIZMATLAR', 'БЫСТРЫЕ УСЛУГИ', 'QUICK SERVICES'],
  todayEvents: ['BUGUNGI TADBIRLAR', 'СЕГОДНЯШНИЕ МЕРОПРИЯТИЯ', 'TODAY’S EVENTS'],
  sections: ['BO‘LIMLAR', 'РАЗДЕЛЫ', 'SECTIONS'],
  floor: ['Qavat', 'Этаж', 'Floor'],
  openingHours: ['Ish vaqti', 'Часы работы', 'Opening hours'],
  address: ['Manzil', 'Адрес', 'Address'],

  /* Meros */
  merosLead: [
    'Nodir kitoblar, tarixiy qo‘lyozmalar va boshqa noyob fondlarni yuqori sifatda raqamli shaklda ko‘rish va varaqlash.',
    'Просматривайте редкие книги, исторические рукописи и уникальные фонды в высоком качестве.',
    'Browse rare books, historical manuscripts and unique collections in high quality.',
  ],
  openBook: ['Varaqlash', 'Листать', 'Browse pages'],
  page: ['Sahifa', 'Страница', 'Page'],
  sheets: ['varaq', 'листов', 'sheets'],
  zoomIn: ['Kattalashtirish', 'Увеличить', 'Zoom in'],
  zoomOut: ['Kichraytirish', 'Уменьшить', 'Zoom out'],
  flipHint: [
    'Varaqni burchagidan torting yoki bosing — kitob ochiladi',
    'Потяните страницу за угол или нажмите — книга перелистнётся',
    'Drag a page by its corner or tap it to turn',
  ],

  /* Allomalar */
  allomalarLead: [
    'Buyuk allomalarning hayoti, ilmiy ishlari va jahon ilm-faniga qo‘shgan hissasi.',
    'Жизнь великих учёных, их труды и вклад в мировую науку.',
    'The lives of great scholars, their works and their contribution to world science.',
  ],
  greatScholars: ['BUYUK ALLOMALAR', 'ВЕЛИКИЕ УЧЁНЫЕ', 'GREAT SCHOLARS'],

  /* Siymolar */
  siymolarLead: [
    'O‘zbekiston tarixidagi mashhur olimlar, adiblar, san’atkorlar, bastakorlar, me’morlar, sportchilar va boshqa taniqli shaxslar haqida multimedia ensiklopediyasi.',
    'Мультимедийная энциклопедия о выдающихся учёных, писателях, артистах, композиторах, зодчих и спортсменах Узбекистана.',
    'A multimedia encyclopaedia of Uzbekistan’s notable scholars, writers, artists, composers, architects and athletes.',
  ],
  mainDirections: ['Asosiy yo‘nalishlar', 'Основные направления', 'Main categories'],
  fullList: ['To‘liq ro‘yxat', 'Полный список', 'Full list'],
  figures: ['ta siymo', 'личностей', 'figures'],
  startJourney: ['Sayohatni boshlash', 'Начать путешествие', 'Start the journey'],
  favourites: ['Sevimlilar', 'Избранное', 'Favourites'],

  /* Tarix */
  tarixLead: [
    'Vaqt oralig‘ida sayohat qiling va buyuk tariximizni kashf eting!',
    'Путешествуйте во времени и открывайте нашу великую историю!',
    'Travel through time and discover our great history!',
  ],
  timeline: ['Vaqt lentasi', 'Лента времени', 'Timeline'],
  eras: ['Davrlar', 'Периоды', 'Eras'],
  keyEvents: ['Muhim voqealar', 'Важные события', 'Key events'],
  onMaps: ['O‘ZBEKISTON TARIXI XARITALARDA', 'ИСТОРИЯ УЗБЕКИСТАНА НА КАРТАХ', 'UZBEK HISTORY ON MAPS'],
  viewMap: ['Xaritani ko‘rish', 'Смотреть карту', 'View map'],
  studyMore: ['Batafsil o‘rganish', 'Изучить подробнее', 'Explore in detail'],
  currentEra: ['Hozirgi davr', 'Текущий период', 'Current era'],

  /* Kecha va bugun */
  kechaBugunLead: [
    'Shaharlar va tarixiy joylarning eski va zamonaviy suratlarini solishtiring',
    'Сравните старые и современные снимки городов и исторических мест',
    'Compare old and modern photographs of cities and historic sites',
  ],
  before: ['OLDIN', 'РАНЬШЕ', 'BEFORE'],
  after: ['HOZIR', 'СЕЙЧАС', 'NOW'],
  citiesPlaces: ['SHAHAR VA JOYLAR', 'ГОРОДА И МЕСТА', 'CITIES AND PLACES'],
  archives: ['ARXIV MATERIALLARI', 'АРХИВНЫЕ МАТЕРИАЛЫ', 'ARCHIVE MATERIALS'],
  dragToCompare: [
    'Solishtirish uchun ajratgichni suring',
    'Перетащите разделитель для сравнения',
    'Drag the divider to compare',
  ],

  /* Viktorina */
  viktorinaLead: [
    'Turli sohalarda bilimlaringizni sinab ko‘ring, yangi ma’lumotlarni o‘rganing va o‘z natijalaringizni yaxshilang!',
    'Проверьте знания в разных областях, узнайте новое и улучшайте результаты!',
    'Test your knowledge across fields, learn something new and improve your score!',
  ],
  startGame: ['O‘yinni boshlash', 'Начать игру', 'Start the game'],
  howToPlay: ['Qanday o‘ynaladi?', 'Как играть?', 'How to play?'],
  yourResults: ['SIZNING NATIJALARINGIZ', 'ВАШИ РЕЗУЛЬТАТЫ', 'YOUR RESULTS'],
  recommendedGame: ['TAVSIYA ETILGAN O‘YIN', 'РЕКОМЕНДУЕМАЯ ИГРА', 'RECOMMENDED GAME'],
  questions: ['savol', 'вопросов', 'questions'],
  minutes: ['daqiqa', 'минут', 'minutes'],
  difficulty: ['daraja', 'уровень', 'level'],
  easy: ['Oson', 'Лёгкий', 'Easy'],
  medium: ['O‘rta daraja', 'Средний', 'Medium'],
  hard: ['Qiyin', 'Сложный', 'Hard'],
  question: ['Savol', 'Вопрос', 'Question'],
  next: ['Keyingisi', 'Далее', 'Next'],
  finish: ['Yakunlash', 'Завершить', 'Finish'],
  correct: ['To‘g‘ri!', 'Верно!', 'Correct!'],
  wrong: ['Noto‘g‘ri', 'Неверно', 'Incorrect'],
  yourScore: ['Sizning natijangiz', 'Ваш результат', 'Your score'],
  playAgain: ['Yana o‘ynash', 'Играть снова', 'Play again'],
  correctAnswers: ['To‘g‘ri javoblar', 'Верные ответы', 'Correct answers'],
  timeLeft: ['Qolgan vaqt', 'Осталось времени', 'Time left'],
  gamesPlayed: ['O‘yinlar o‘ynaldi', 'Сыграно игр', 'Games played'],
  totalScore: ['Umumiy ball', 'Общий счёт', 'Total score'],
  bestPlace: ['Eng yaxshi o‘rin', 'Лучшее место', 'Best rank'],
  quizIntro: [
    'Har bir savol uchun bitta to‘g‘ri javob bor. Javobni tanlaganingizdan so‘ng izoh ko‘rsatiladi.',
    'У каждого вопроса один верный ответ. После выбора появится пояснение.',
    'Each question has one correct answer. An explanation appears after you choose.',
  ],

  /* Bolalar */
  bolalarLead: [
    'Qiziqarli savollar, o‘yinlar va yangi bilimlar olami!',
    'Увлекательные вопросы, игры и мир новых знаний!',
    'Fun questions, games and a world of new knowledge!',
  ],
  topics: ['MAVZULAR', 'ТЕМЫ', 'TOPICS'],
  myAchievements: ['MENING YUTUQLARIM', 'МОИ ДОСТИЖЕНИЯ', 'MY ACHIEVEMENTS'],
  dailyTask: ['KUNDALIK TOPSHIRIQ', 'ЕЖЕДНЕВНОЕ ЗАДАНИЕ', 'DAILY TASK'],
  miniGames: ['QIZIQARLI MINI-O‘YINLAR', 'ВЕСЁЛЫЕ МИНИ-ИГРЫ', 'FUN MINI-GAMES'],
  play: ['O‘yna', 'Играть', 'Play'],
  level: ['Darajam', 'Мой уровень', 'My level'],
  starsCollected: ['To‘plagan yulduzlarim', 'Собрано звёзд', 'Stars collected'],
  toNextLevel: ['Keyingi darajaga', 'До следующего уровня', 'To the next level'],
  todayTask: [
    '10 ta savolga javob bering va yulduzlarni qo‘lga kiriting!',
    'Ответьте на 10 вопросов и получите звёзды!',
    'Answer 10 questions and collect stars!',
  ],
  doIt: ['Bajarish', 'Выполнить', 'Do it'],
  memoryHint: [
    'Bir xil kitoblarni juftlab toping',
    'Найдите одинаковые книги парами',
    'Find the matching pairs of books',
  ],
  moves: ['Yurishlar', 'Ходы', 'Moves'],
  pairsFound: ['Topilgan juftliklar', 'Найдено пар', 'Pairs found'],
  wordHint: ['Harflardan so‘z yig‘ing', 'Соберите слово из букв', 'Build the word from letters'],
  wellDone: ['Barakalla!', 'Молодец!', 'Well done!'],
  tryAgain: ['Yana urinib ko‘ring', 'Попробуйте ещё раз', 'Try again'],
};

/* Modullarning katta hero sarlavhalari ikki (ba'zan uch) bo'lakdan iborat —
   har bir bo'lak o'z rangi bilan chiziladi, shuning uchun tayyor matn emas,
   bo'laklar ro'yxati saqlanadi. */
const TITLES: Record<string, [string[], string[], string[]]> = {
  hub: [
    ['Kutubxonani', 'kashf et'],
    ['Откройте', 'библиотеку'],
    ['Discover the', 'library'],
  ],
  meros: [
    ['NODIR', 'MEROS'],
    ['РЕДКОЕ', 'НАСЛЕДИЕ'],
    ['RARE', 'HERITAGE'],
  ],
  merosSub: [
    ['Qo‘lyozmalar va noyob kitoblar'],
    ['Рукописи и редкие книги'],
    ['Manuscripts and rare books'],
  ],
  allomalar: [
    ['BUYUK', 'ALLOMALAR'],
    ['ВЕЛИКИЕ', 'УЧЁНЫЕ'],
    ['GREAT', 'SCHOLARS'],
  ],
  allomalarSub: [
    ['Ilm-fan merosi'],
    ['Наследие науки'],
    ['The legacy of science'],
  ],
  siymolar: [
    ['O‘ZBEKISTONNING', '100', 'SIYMOSI'],
    ['УЗБЕКИСТАНА', '100', 'ЛИЧНОСТЕЙ'],
    ['UZBEKISTAN’S', '100', 'FIGURES'],
  ],
  siymolarTags: [
    ['TARIX • ILM • SAN’AT • MADANIYAT • SPORT'],
    ['ИСТОРИЯ • НАУКА • ИСКУССТВО • КУЛЬТУРА • СПОРТ'],
    ['HISTORY • SCIENCE • ART • CULTURE • SPORT'],
  ],
  siymolarMotto: [
    ['Buyuk insonlar — yorqin kelajak garovi'],
    ['Великие люди — залог светлого будущего'],
    ['Great people are the promise of a bright future'],
  ],
  siymolarQuote: [
    ['“Buyuk insonlar — kelajak avlodlar uchun eng bebaho merosdir.”'],
    ['«Великие люди — самое бесценное наследие для будущих поколений.»'],
    ['“Great people are the most precious legacy for future generations.”'],
  ],
  tarix: [
    ['O‘ZBEKISTON', 'TARIXI'],
    ['ИСТОРИЯ', 'УЗБЕКИСТАНА'],
    ['HISTORY OF', 'UZBEKISTAN'],
  ],
  kechabugun: [
    ['O‘ZBEKISTON:', 'KECHA', 'VA', 'BUGUN'],
    ['УЗБЕКИСТАН:', 'ВЧЕРА', 'И', 'СЕГОДНЯ'],
    ['UZBEKISTAN:', 'THEN', 'AND', 'NOW'],
  ],
  viktorina: [
    ['BILIMINGIZNI', 'SINANG!'],
    ['ПРОВЕРЬТЕ', 'ЗНАНИЯ!'],
    ['TEST YOUR', 'KNOWLEDGE!'],
  ],
  bolalarLevels: [
    ['Bilimdon', 'Zukko', 'Dono', 'Allomacha'],
    ['Знаток', 'Умник', 'Мудрец', 'Учёный'],
    ['Learner', 'Whiz', 'Sage', 'Scholar'],
  ],
  viktorinaSub: [
    ['Intellektual o‘yinlar olami'],
    ['Мир интеллектуальных игр'],
    ['A world of intellectual games'],
  ],
};

const ORDER: Record<Lang, 0 | 1 | 2> = { uz: 0, ru: 1, en: 2 };

export type TextKey = keyof typeof TEXT;
export type TitleKey = keyof typeof TITLES;

/** Interfeys matnlarini joriy tilda beruvchi hook. */
export function useText(): {
  s: (key: TextKey) => string;
  /** Hero sarlavhasining bo'laklari. */
  title: (key: TitleKey) => string[];
  lang: Lang;
  tr: (value: Record<Lang, string>) => string;
} {
  const { lang } = useI18n();
  return {
    lang,
    s: (key: TextKey) => TEXT[key][ORDER[lang]],
    title: (key: TitleKey) => TITLES[key][ORDER[lang]],
    tr: (value: Record<Lang, string>) => value[lang],
  };
}

/** "3-daraja" ko'rinishidagi daraja yozuvi. */
export function formatLevel(level: number, lang: Lang): string {
  if (lang === 'uz') return `${level}-daraja`;
  if (lang === 'ru') return `${level} уровень`;
  return `Level ${level}`;
}

/** "1910-yil" ko'rinishidagi yil yozuvi — tilga qarab qo'shimchasi o'zgaradi. */
export function formatYear(year: string, lang: Lang): string {
  if (lang === 'uz') return `${year}-yil`;
  if (lang === 'ru') return `${year} г.`;
  return year;
}

/* Bosh sahifa (navigatsiya) moduli uchun ma'lumot. */
import type { Floor, HubCard, HubEvent, HubService } from '../api/types';

const IMG = '/interface/hub';

export const floors: Floor[] = [
  {
    id: 'f5', level: '5',
    label: { uz: 'Qavat', ru: 'Этаж', en: 'Floor' },
    rooms: [
      { uz: 'Ilmiy tadqiqot zali', ru: 'Научно-исследовательский зал', en: 'Research hall' },
      { uz: 'Konferensiya zali', ru: 'Конференц-зал', en: 'Conference hall' },
      { uz: 'Nodir nashrlar bo‘limi', ru: 'Отдел редких изданий', en: 'Rare editions department' },
    ],
  },
  {
    id: 'f4', level: '4',
    label: { uz: 'Qavat', ru: 'Этаж', en: 'Floor' },
    rooms: [
      { uz: 'Xorijiy adabiyot zali', ru: 'Зал иностранной литературы', en: 'Foreign literature hall' },
      { uz: 'Multimedia xonasi', ru: 'Мультимедийная комната', en: 'Multimedia room' },
      { uz: 'Til markazlari', ru: 'Языковые центры', en: 'Language centres' },
    ],
  },
  {
    id: 'f3', level: '3',
    label: { uz: 'Qavat', ru: 'Этаж', en: 'Floor' },
    rooms: [
      { uz: 'Asosiy o‘quv zali', ru: 'Главный читальный зал', en: 'Main reading hall' },
      { uz: 'Davriy nashrlar', ru: 'Периодические издания', en: 'Periodicals' },
      { uz: 'Elektron katalog', ru: 'Электронный каталог', en: 'Electronic catalogue' },
    ],
  },
  {
    id: 'f2', level: '2',
    label: { uz: 'Qavat', ru: 'Этаж', en: 'Floor' },
    rooms: [
      { uz: 'Bolalar bo‘limi', ru: 'Детский отдел', en: 'Children’s department' },
      { uz: 'Kompyuter zali', ru: 'Компьютерный зал', en: 'Computer hall' },
      { uz: 'Ko‘rgazma zali', ru: 'Выставочный зал', en: 'Exhibition hall' },
    ],
  },
  {
    id: 'f1', level: '1',
    label: { uz: 'Qavat', ru: 'Этаж', en: 'Floor' },
    rooms: [
      { uz: 'Qabulxona va ro‘yxatdan o‘tish', ru: 'Приёмная и регистрация', en: 'Reception and registration' },
      { uz: 'Kafe va dam olish zonasi', ru: 'Кафе и зона отдыха', en: 'Café and lounge' },
      { uz: 'Kiyim ilgichi', ru: 'Гардероб', en: 'Cloakroom' },
    ],
  },
  {
    id: 'f-1', level: '–1',
    label: { uz: 'Qavat', ru: 'Этаж', en: 'Floor' },
    note: { uz: 'Qarzyer', ru: 'Хранилище', en: 'Depository' },
    rooms: [
      { uz: 'Asosiy kitob fondi', ru: 'Основной книжный фонд', en: 'Main book depository' },
      { uz: 'Restavratsiya ustaxonasi', ru: 'Реставрационная мастерская', en: 'Restoration workshop' },
    ],
  },
];

/* Har bir kartochka bosilganda tavsif oynasi ochiladi. Matnlar ataylab
   umumiy: qavat raqami, narx yoki Wi-Fi paroli kabi tez o'zgaradigan
   ma'lumot bu yerda yozilmaydi — tashrifchi xodimga yo'naltiriladi.
   `yordam` va `aloqa` esa bo'limning o'z oynalarini ochadi, shuning uchun
   ularda tavsif yo'q. */
export const hubServices: HubService[] = [
  {
    id: 'katalog', label: { uz: 'Elektron katalog', ru: 'Электронный каталог', en: 'Electronic catalogue' }, icon: 'BookMarked',
    description: {
      uz: 'Kutubxona fondidagi nashrlarni muallif, sarlavha yoki mavzu bo‘yicha qidirish mumkin. Katalog kutubxona veb-saytida va o‘quv zallaridagi terminallarda ochiq.',
      ru: 'Издания фонда можно искать по автору, названию или теме. Каталог доступен на сайте библиотеки и на терминалах в читальных залах.',
      en: 'Search the collection by author, title or subject. The catalogue is available on the library website and at the terminals in the reading halls.',
    },
  },
  { id: 'tadbir', label: { uz: 'Tadbirlar', ru: 'Мероприятия', en: 'Events' }, icon: 'CalendarDays' },
  {
    id: 'texnika', label: { uz: 'Kompyuterlar va texnika', ru: 'Компьютеры и техника', en: 'Computers and equipment' }, icon: 'Monitor',
    description: {
      uz: 'O‘quv zallarida kitobxonlar foydalanishi uchun kompyuterlar va raqamli ish o‘rinlari ajratilgan. Foydalanish tartibi bo‘yicha zal xodimiga murojaat qiling.',
      ru: 'В читальных залах выделены компьютеры и цифровые рабочие места для читателей. По порядку пользования обратитесь к сотруднику зала.',
      en: 'Computers and digital workstations are set aside for readers in the reading halls. Ask the hall attendant about how to use them.',
    },
  },
  {
    id: 'wifi', label: { uz: 'Wi-Fi va Internet', ru: 'Wi-Fi и интернет', en: 'Wi-Fi and internet' }, icon: 'Wifi',
    description: {
      uz: 'Kutubxona binosida kitobxonlar uchun simsiz internet ishlaydi. Ulanish ma’lumotlarini o‘quv zali xodimidan oling.',
      ru: 'В здании библиотеки работает беспроводной интернет для читателей. Данные для подключения получите у сотрудника читального зала.',
      en: 'Wireless internet is available to readers throughout the building. Ask the reading-hall attendant for the connection details.',
    },
  },
  {
    id: 'kafe', label: { uz: 'Kafe va dam olish', ru: 'Кафе и отдых', en: 'Café and lounge' }, icon: 'Coffee',
    description: {
      uz: 'Tanaffus uchun kafe va dam olish zonasi mavjud. U kutubxonaning umumiy ish vaqtida ochiq bo‘ladi.',
      ru: 'Для перерыва работают кафе и зона отдыха. Они открыты в общие часы работы библиотеки.',
      en: 'A café and lounge are available for breaks. They are open during the library’s general opening hours.',
    },
  },
  {
    id: 'imtiyoz', label: { uz: 'Imtiyozlar va qulayliklar', ru: 'Льготы и удобства', en: 'Accessibility' }, icon: 'Accessibility',
    description: {
      uz: 'Nogironligi bo‘lgan kitobxonlar uchun kirish yo‘llari va maxsus ish o‘rinlari tayyorlangan. Yordam kerak bo‘lsa, kutubxona xodimiga murojaat qiling.',
      ru: 'Для читателей с инвалидностью подготовлены пути доступа и специальные рабочие места. Если нужна помощь, обратитесь к сотруднику библиотеки.',
      en: 'Step-free routes and adapted workstations are provided for readers with disabilities. Ask a member of staff if you need assistance.',
    },
  },
  {
    id: 'bosma', label: { uz: 'Bosma xizmatlar', ru: 'Печатные услуги', en: 'Printing services' }, icon: 'Printer',
    description: {
      uz: 'Nusxa ko‘chirish, chop etish va skanerlash xizmatlari ko‘rsatiladi. Amaldagi narxlar va tartib bo‘yicha xodimga murojaat qiling.',
      ru: 'Оказываются услуги копирования, печати и сканирования. О действующих ценах и порядке спросите у сотрудника.',
      en: 'Copying, printing and scanning services are available. Ask a member of staff about current prices and procedure.',
    },
  },
  { id: 'yordam', label: { uz: 'Yordam', ru: 'Помощь', en: 'Help' }, icon: 'HelpCircle' },
  { id: 'aloqa', label: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' }, icon: 'PhoneCall' },
  {
    id: 'qr', label: { uz: 'QR skaner', ru: 'QR-сканер', en: 'QR scanner' }, icon: 'QrCode',
    description: {
      uz: 'Kitob javoni yoki ko‘rgazma yonidagi QR kodni telefoningiz kamerasi bilan skanerlang — nashr haqidagi qo‘shimcha ma’lumot ochiladi.',
      ru: 'Наведите камеру телефона на QR-код у стеллажа или выставки — откроется дополнительная информация об издании.',
      en: 'Point your phone camera at the QR code by a shelf or display — extra information about the item opens.',
    },
  },
];

export const hubEvents: HubEvent[] = [
  {
    id: 'e1', time: '11:00',
    title: { uz: 'Kitobxonlar klubi', ru: 'Клуб читателей', en: 'Readers’ club' },
    place: { uz: 'Asosiy o‘quv zali', ru: 'Главный читальный зал', en: 'Main reading hall' },
    image: `${IMG}/event-1.webp`,
    description: {
      uz: 'Kitobxonlar oyning tanlangan kitobini birgalikda muhokama qiladi. Ishtirok bepul, oldindan yozilish talab qilinmaydi.',
      ru: 'Читатели вместе обсуждают книгу месяца. Участие бесплатное, предварительная запись не требуется.',
      en: 'Readers discuss the book of the month together. Free to attend, no registration needed.',
    },
  },
  {
    id: 'e2', time: '14:00',
    title: { uz: 'Adabiy kecha', ru: 'Литературный вечер', en: 'Literary evening' },
    place: { uz: 'Konferensiya zali', ru: 'Конференц-зал', en: 'Conference hall' },
    image: `${IMG}/event-2.webp`,
    description: {
      uz: 'Shoir va yozuvchilar ishtirokidagi ijodiy uchrashuv, she’rxonlik va suhbat.',
      ru: 'Творческая встреча с поэтами и писателями, чтение стихов и беседа.',
      en: 'A creative meeting with poets and writers, with readings and conversation.',
    },
  },
  {
    id: 'e3', time: '16:00',
    title: { uz: 'Axborot savodxonligi darsi', ru: 'Урок информационной грамотности', en: 'Information literacy class' },
    place: { uz: 'Multimedia xonasi', ru: 'Мультимедийная комната', en: 'Multimedia room' },
    image: `${IMG}/event-3.webp`,
    description: {
      uz: 'Elektron katalog va raqamli manbalardan qanday foydalanishni o‘rgatuvchi amaliy mashg‘ulot.',
      ru: 'Практическое занятие о том, как пользоваться электронным каталогом и цифровыми ресурсами.',
      en: 'A practical session on using the electronic catalogue and digital resources.',
    },
  },
];

export const hubCards: HubCard[] = [
  {
    id: 'zallar',
    title: { uz: 'Zallar', ru: 'Залы', en: 'Halls' },
    description: { uz: 'O‘quv zallari va bo‘limlar haqida ma’lumot', ru: 'О читальных залах и отделах', en: 'About reading halls and departments' },
    image: `${IMG}/zallar.webp`,
    target: 'zallar',
    accent: '#0E4F44',
  },
  {
    id: 'xizmatlar',
    title: { uz: 'Xizmatlar', ru: 'Услуги', en: 'Services' },
    description: { uz: 'Kutubxona xizmatlari bilan tanishing', ru: 'Познакомьтесь с услугами библиотеки', en: 'Explore the library services' },
    image: `${IMG}/xizmatlar.webp`,
    target: 'xizmatlar',
    accent: '#3A2A6B',
  },
  {
    id: 'qavatlar',
    title: { uz: 'Qavatlar', ru: 'Этажи', en: 'Floors' },
    description: { uz: 'Har bir qavatdagi xonalar ro‘yxati', ru: 'Список помещений на каждом этаже', en: 'The rooms on every floor' },
    image: `${IMG}/qavatlar.webp`,
    target: 'qavatlar',
    accent: '#123C7A',
  },
];

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

export const hubServices: HubService[] = [
  { id: 'katalog', label: { uz: 'Elektron katalog', ru: 'Электронный каталог', en: 'Electronic catalogue' }, icon: 'BookMarked' },
  { id: 'tadbir', label: { uz: 'Tadbirlar', ru: 'Мероприятия', en: 'Events' }, icon: 'CalendarDays' },
  { id: 'texnika', label: { uz: 'Kompyuterlar va texnika', ru: 'Компьютеры и техника', en: 'Computers and equipment' }, icon: 'Monitor' },
  { id: 'wifi', label: { uz: 'Wi-Fi va Internet', ru: 'Wi-Fi и интернет', en: 'Wi-Fi and internet' }, icon: 'Wifi' },
  { id: 'kafe', label: { uz: 'Kafe va dam olish', ru: 'Кафе и отдых', en: 'Café and lounge' }, icon: 'Coffee' },
  { id: 'imtiyoz', label: { uz: 'Imtiyozlar va qulayliklar', ru: 'Льготы и удобства', en: 'Accessibility' }, icon: 'Accessibility' },
  { id: 'bosma', label: { uz: 'Bosma xizmatlar', ru: 'Печатные услуги', en: 'Printing services' }, icon: 'Printer' },
  { id: 'yordam', label: { uz: 'Yordam', ru: 'Помощь', en: 'Help' }, icon: 'HelpCircle' },
  { id: 'aloqa', label: { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' }, icon: 'PhoneCall' },
  { id: 'qr', label: { uz: 'QR skaner', ru: 'QR-сканер', en: 'QR scanner' }, icon: 'QrCode' },
];

export const hubEvents: HubEvent[] = [
  {
    id: 'e1', time: '11:00',
    title: { uz: 'Kitobxonlar klubi', ru: 'Клуб читателей', en: 'Readers’ club' },
    place: { uz: 'Asosiy o‘quv zali', ru: 'Главный читальный зал', en: 'Main reading hall' },
    image: `${IMG}/event-1.webp`,
  },
  {
    id: 'e2', time: '14:00',
    title: { uz: 'Adabiy kecha', ru: 'Литературный вечер', en: 'Literary evening' },
    place: { uz: 'Konferensiya zali', ru: 'Конференц-зал', en: 'Conference hall' },
    image: `${IMG}/event-2.webp`,
  },
  {
    id: 'e3', time: '16:00',
    title: { uz: 'Axborot savodxonligi darsi', ru: 'Урок информационной грамотности', en: 'Information literacy class' },
    place: { uz: 'Multimedia xonasi', ru: 'Мультимедийная комната', en: 'Multimedia room' },
    image: `${IMG}/event-3.webp`,
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
    description: { uz: 'Barcha qavatlarni 3D ko‘rinishda ko‘ring', ru: 'Посмотрите все этажи в 3D', en: 'View every floor in 3D' },
    image: `${IMG}/qavatlar.webp`,
    target: 'qavatlar',
    accent: '#123C7A',
  },
];

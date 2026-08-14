import {
  ArrowUpDown,
  Baby,
  Bath,
  BookOpen,
  Briefcase,
  Coffee,
  Cpu,
  DoorOpen,
  Footprints,
  Globe,
  GraduationCap,
  Image,
  Info,
  Laptop,
  Library,
  LogIn,
  Monitor,
  Presentation,
  Scroll,
  Sofa,
  User,
  Users,
  Video,
} from 'lucide-react';
import type { Floor, Room, RoomCategory } from '../types';

/* ══════════════════════════════════════════════════════════
   Xonalar ma'lumoti.

   hotspot koordinatalari 1672x941 o'lchamli 3D render ustidagi
   yorliqlarning haqiqiy o'rnidan olingan va foizga o'girilgan —
   shuning uchun rasm har qanday o'lchamda cho'zilsa ham nuqta
   yorliq ustida turadi. Rasm almashtirilsa, faqat shu
   koordinatalarni yangilash kifoya.
   ══════════════════════════════════════════════════════════ */

/** Xona turi uchun rang — nuqta, belgi va filtrda ishlatiladi. */
export const CATEGORY_COLOR: Record<RoomCategory, string> = {
  reading: '#3F6BE8',
  collection: '#B07A2B',
  tech: '#0E93A6',
  kids: '#DB4F98',
  service: '#6E52C7',
  relax: '#2E9E5B',
  facility: '#6B7A99',
};

const FLOOR_1: Room[] = [
  {
    id: 'kirish-zali',
    floor: 1,
    category: 'service',
    icon: DoorOpen,
    name: { uz: 'Kirish zali', ru: 'Входной зал', en: 'Entrance Hall' },
    tagline: {
      uz: 'Ro‘yxatdan o‘tish va kutubxona chiptasi',
      ru: 'Регистрация и читательский билет',
      en: 'Registration and library card',
    },
    description: {
      uz: 'Kutubxonaga birinchi marta kelganlar shu yerda ro‘yxatdan o‘tadi va kutubxona chiptasini oladi. Zalda navbat tizimi va o‘z-o‘ziga xizmat ko‘rsatish terminallari o‘rnatilgan.',
      ru: 'Здесь впервые пришедшие читатели проходят регистрацию и получают читательский билет. В зале работают система электронной очереди и терминалы самообслуживания.',
      en: 'First-time visitors register here and receive their library card. The hall has an electronic queue system and self-service terminals.',
    },
    seats: 24,
    features: [
      { uz: 'Ro‘yxatdan o‘tish', ru: 'Регистрация', en: 'Registration' },
      { uz: 'Kutubxona chiptasi', ru: 'Читательский билет', en: 'Library card' },
      { uz: 'Terminal orqali xizmat', ru: 'Самообслуживание', en: 'Self-service' },
    ],
    directions: {
      uz: 'Atriumdan chapga yuring — chap qanotdagi birinchi keng zal.',
      ru: 'Из атриума идите налево — первый просторный зал левого крыла.',
      en: 'From the atrium turn left; it is the first large hall in the left wing.',
    },
    hotspot: { x: 21.89, y: 29.86, w: 7.3, h: 4.68 },
  },
  {
    id: 'axborot-xizmati',
    floor: 1,
    category: 'service',
    icon: Info,
    name: { uz: 'Axborot xizmati', ru: 'Справочная служба', en: 'Information Desk' },
    tagline: {
      uz: 'Ma’lumot, yo‘naltirish va maslahat',
      ru: 'Справка, навигация и консультация',
      en: 'Guidance, navigation and advice',
    },
    description: {
      uz: 'Kutubxonachilar kitob topishda, katalogdan foydalanishda va xizmatlar bo‘yicha yo‘l ko‘rsatadi. Bibliografik so‘rovlar ham shu yerda qabul qilinadi.',
      ru: 'Библиотекари помогают найти книгу, работать с каталогом и ориентироваться в услугах. Здесь же принимаются библиографические запросы.',
      en: 'Librarians help you find books, use the catalogue and navigate the services. Bibliographic enquiries are also handled here.',
    },
    features: [
      { uz: 'Katalogdan foydalanish', ru: 'Работа с каталогом', en: 'Catalogue help' },
      { uz: 'Bibliografik so‘rov', ru: 'Библиографический запрос', en: 'Bibliographic enquiry' },
    ],
    directions: {
      uz: "Atriumdan to'g'riga yuring, markaziy zinapoyaning chap tomonida.",
      ru: 'Из атриума идите прямо; слева от центральной лестницы.',
      en: 'Go straight from the atrium; it is to the left of the central staircase.',
    },
    hotspot: { x: 36.66, y: 27.42, w: 8.85, h: 4.68 },
  },
  {
    id: 'sanuzel-1',
    floor: 1,
    category: 'facility',
    icon: Bath,
    name: { uz: 'Sanuzellar', ru: 'Санузлы', en: 'Restrooms' },
    tagline: {
      uz: 'Nogironlar aravachasi uchun ham qulay',
      ru: 'Доступно для маломобильных посетителей',
      en: 'Wheelchair accessible',
    },
    description: {
      uz: 'Markaziy zinapoya yonida joylashgan. Nogironligi bo‘lgan tashrifchilar va bolali oilalar uchun alohida xona ajratilgan.',
      ru: 'Расположены рядом с центральной лестницей. Есть отдельная комната для маломобильных посетителей и семей с детьми.',
      en: 'Located next to the central staircase, including an accessible room for visitors with disabilities and families with children.',
    },
    directions: {
      uz: "Atriumdan to'g'riga, markaziy zinapoyaning yonida.",
      ru: 'Прямо из атриума, рядом с центральной лестницей.',
      en: 'Straight ahead from the atrium, next to the central staircase.',
    },
    hotspot: { x: 50.24, y: 28.06, w: 5.02, h: 7.44 },
  },
  {
    id: 'kitob-xazinasi',
    floor: 1,
    category: 'collection',
    icon: Library,
    name: { uz: 'Asosiy kitob xazinasi', ru: 'Основное книгохранилище', en: 'Main Book Stacks' },
    tagline: {
      uz: 'Ochiq javonlarda 1 000 000+ nashr',
      ru: 'Более 1 000 000 изданий в открытом доступе',
      en: 'Over 1,000,000 items on open shelves',
    },
    description: {
      uz: 'Kutubxonaning asosiy fondi — badiiy, ilmiy va o‘quv adabiyoti ochiq javonlarda saqlanadi. Kitoblar UDK tizimi bo‘yicha tartiblangan, har bir javonda yo‘naltiruvchi belgilar bor.',
      ru: 'Основной фонд библиотеки: художественная, научная и учебная литература в открытом доступе. Книги расставлены по системе УДК, на каждом стеллаже есть указатели.',
      en: 'The library’s main collection — fiction, academic and educational literature on open shelves, arranged by the UDC system with signage on every stack.',
    },
    features: [
      { uz: 'Ochiq javon', ru: 'Открытый доступ', en: 'Open access' },
      { uz: 'Uyga berish', ru: 'Выдача на дом', en: 'Home loans' },
      { uz: 'O‘z-o‘ziga xizmat skaneri', ru: 'Сканер самообслуживания', en: 'Self-checkout scanner' },
    ],
    directions: {
      uz: "Atriumdan o'ngga yuring — baland javonlar turgan katta zal.",
      ru: 'Из атриума направо — большой зал с высокими стеллажами.',
      en: 'Turn right from the atrium; the large hall with tall stacks.',
    },
    hotspot: { x: 68.0, y: 27.21, w: 8.97, h: 5.31 },
  },
  {
    id: 'mamuriyat',
    floor: 1,
    category: 'service',
    icon: Briefcase,
    name: { uz: 'Ma’muriyat', ru: 'Администрация', en: 'Administration' },
    tagline: {
      uz: 'Rahbariyat va xodimlar xonalari',
      ru: 'Кабинеты руководства и сотрудников',
      en: 'Management and staff offices',
    },
    description: {
      uz: 'Kutubxona rahbariyati, kadrlar va hujjatlar bilan ishlash bo‘limi. Murojaat va takliflar shu yerda qabul qilinadi.',
      ru: 'Руководство библиотеки, отдел кадров и работы с документами. Здесь принимаются обращения и предложения.',
      en: 'Library management, HR and records office. Enquiries and suggestions are received here.',
    },
    directions: {
      uz: "Chap qanotga o'ting, kafedan yuqoriga qarab ikkinchi bo'lim.",
      ru: 'Пройдите в левое крыло; второй отдел выше кафе.',
      en: 'Head into the left wing; the second section above the café.',
    },
    hotspot: { x: 15.85, y: 43.46, w: 6.22, h: 4.04 },
  },
  {
    id: 'lift-1',
    floor: 1,
    category: 'facility',
    icon: ArrowUpDown,
    name: { uz: 'Lift', ru: 'Лифт', en: 'Elevator' },
    tagline: {
      uz: '2-qavatga ko‘tarilish',
      ru: 'Подъём на 2-й этаж',
      en: 'Access to the 2nd floor',
    },
    description: {
      uz: 'Ikki qavatni bog‘laydigan lift. Nogironlar aravachasi va yuk uchun mo‘ljallangan, ovozli e’lon tizimi bilan jihozlangan.',
      ru: 'Лифт связывает два этажа. Рассчитан на инвалидные коляски и грузы, оснащён системой звукового оповещения.',
      en: 'Connects both floors. Suitable for wheelchairs and goods, with an audio announcement system.',
    },
    directions: {
      uz: 'Atriumning chap tomonida, yon koridor boshida.',
      ru: 'Слева от атриума, в начале бокового коридора.',
      en: 'On the left side of the atrium, at the start of the side corridor.',
    },
    hotspot: { x: 33.67, y: 48.03, w: 3.59, h: 8.93 },
  },
  {
    id: 'oquv-zali',
    floor: 1,
    category: 'reading',
    icon: BookOpen,
    name: { uz: 'O‘quv zali', ru: 'Читальный зал', en: 'Reading Room' },
    tagline: {
      uz: 'Eng katta zal — 120 o‘rin',
      ru: 'Самый большой зал — 120 мест',
      en: 'The largest hall — 120 seats',
    },
    description: {
      uz: 'Keng va yorug‘ asosiy o‘quv zali. Umumiy fonddan olingan kitoblar bilan ishlash, mustaqil ta’lim va ilmiy izlanishlar uchun mo‘ljallangan.',
      ru: 'Просторный и светлый главный читальный зал для работы с книгами из общего фонда, самостоятельного обучения и научных изысканий.',
      en: 'A spacious, well-lit main reading room for working with the general collection, self-study and research.',
    },
    seats: 120,
    features: [
      { uz: 'Wi-Fi internet', ru: 'Wi-Fi интернет', en: 'Wi-Fi internet' },
      { uz: 'Har stolda rozetka', ru: 'Розетка у каждого стола', en: 'Power at every desk' },
      { uz: 'Sukunat zonasi', ru: 'Зона тишины', en: 'Quiet zone' },
    ],
    directions: {
      uz: "O'ng qanotga o'ting — qavatdagi eng katta zal.",
      ru: 'Пройдите в правое крыло — самый большой зал этажа.',
      en: 'Head into the right wing; the largest hall on this floor.',
    },
    hotspot: { x: 77.45, y: 45.06, w: 8.01, h: 4.89 },
  },
  {
    id: 'zina-1',
    floor: 1,
    category: 'facility',
    icon: Footprints,
    name: { uz: 'Zina', ru: 'Лестница', en: 'Staircase' },
    tagline: {
      uz: 'Qavatlararo yon zinapoya',
      ru: 'Боковая межэтажная лестница',
      en: 'Side staircase between floors',
    },
    description: {
      uz: 'Lift yonidagi yon zinapoya 1- va 2-qavatni bog‘laydi. Markaziy zinapoya esa atriumning orqa tomonida joylashgan.',
      ru: 'Боковая лестница рядом с лифтом соединяет 1-й и 2-й этажи. Центральная лестница расположена за атриумом.',
      en: 'The side staircase next to the elevator links floors 1 and 2. The central staircase is behind the atrium.',
    },
    directions: {
      uz: 'Chap koridorda, liftdan bir oz pastroqda.',
      ru: 'В левом коридоре, чуть ниже лифта.',
      en: 'In the left corridor, just past the elevator.',
    },
    hotspot: { x: 32.24, y: 63.23, w: 3.59, h: 8.93 },
  },
  {
    id: 'kafe',
    floor: 1,
    category: 'relax',
    icon: Coffee,
    name: { uz: 'Kafe', ru: 'Кафе', en: 'Café' },
    tagline: {
      uz: 'Choy, kofe va yengil taomlar',
      ru: 'Чай, кофе и лёгкие закуски',
      en: 'Tea, coffee and light meals',
    },
    description: {
      uz: 'O‘qish oralig‘ida dam olish uchun kafe. Ichimlik va yengil taomlar faqat shu zonada iste’mol qilinadi — o‘quv zallariga olib kirilmaydi.',
      ru: 'Кафе для отдыха между занятиями. Напитки и еду можно употреблять только здесь — в читальные залы вносить нельзя.',
      en: 'A café for breaks between study sessions. Food and drinks may only be consumed here — they are not allowed in the reading rooms.',
    },
    seats: 40,
    directions: {
      uz: 'Chap qanotning eng chekkasiga yuring, deraza tomonda.',
      ru: 'Идите в дальний конец левого крыла, у окон.',
      en: 'Walk to the far end of the left wing, by the windows.',
    },
    hotspot: { x: 8.97, y: 66.21, w: 5.98, h: 4.68 },
  },
  {
    id: 'bolalar-bolimi',
    floor: 1,
    category: 'kids',
    icon: Baby,
    name: { uz: 'Bolalar adabiyoti bo‘limi', ru: 'Отдел детской литературы', en: 'Children’s Department' },
    tagline: {
      uz: '3–14 yosh uchun kitob va o‘yin zonasi',
      ru: 'Книги и игровая зона для 3–14 лет',
      en: 'Books and play area for ages 3–14',
    },
    description: {
      uz: 'Bolalar uchun mo‘ljallangan past javonlar, rangli o‘quv zonasi va o‘yin maydonchasi. Ertak o‘qish uchrashuvlari va ijodiy mashg‘ulotlar muntazam o‘tkaziladi.',
      ru: 'Низкие стеллажи для детей, яркая учебная зона и игровая площадка. Регулярно проводятся чтения сказок и творческие занятия.',
      en: 'Low shelves for children, a colourful learning zone and a play area. Story readings and creative workshops are held regularly.',
    },
    seats: 40,
    features: [
      { uz: 'Ertak o‘qish soati', ru: 'Час сказки', en: 'Story hour' },
      { uz: 'Ijodiy mashg‘ulotlar', ru: 'Творческие занятия', en: 'Creative workshops' },
      { uz: 'Ota-onalar uchun joy', ru: 'Места для родителей', en: 'Seating for parents' },
    ],
    directions: {
      uz: "O'ng qanotga o'ting — rangli o'yin maydonchasi ko'rinadi.",
      ru: 'Пройдите в правое крыло — увидите яркую игровую площадку.',
      en: 'Head into the right wing; look for the colourful play area.',
    },
    hotspot: { x: 73.68, y: 65.68, w: 10.53, h: 5.53 },
  },
  {
    id: 'kompyuter-zali',
    floor: 1,
    category: 'tech',
    icon: Monitor,
    name: { uz: 'Kompyuter zali', ru: 'Компьютерный зал', en: 'Computer Room' },
    tagline: {
      uz: '30 kompyuter · elektron katalog',
      ru: '30 компьютеров · электронный каталог',
      en: '30 computers · e-catalogue',
    },
    description: {
      uz: 'Elektron katalog, onlayn resurslar va ma’lumot bazalari bilan ishlash uchun kompyuterlar. Chop etish va skanerlash xizmati ham shu yerda.',
      ru: 'Компьютеры для работы с электронным каталогом, онлайн-ресурсами и базами данных. Здесь же услуги печати и сканирования.',
      en: 'Computers for the e-catalogue, online resources and databases. Printing and scanning services are also available here.',
    },
    seats: 30,
    features: [
      { uz: 'Elektron katalog', ru: 'Электронный каталог', en: 'E-catalogue' },
      { uz: 'Chop etish va skaner', ru: 'Печать и сканирование', en: 'Printing and scanning' },
      { uz: 'Ma’lumot bazalari', ru: 'Базы данных', en: 'Databases' },
    ],
    directions: {
      uz: "O'ng qanotning eng chekkasida, bolalar bo'limidan keyin.",
      ru: 'В дальнем конце правого крыла, сразу за детским отделом.',
      en: "At the far end of the right wing, just past the children's department.",
    },
    hotspot: { x: 90.55, y: 69.18, w: 9.57, h: 4.89 },
  },
  {
    id: 'bosh-kirish',
    floor: 1,
    category: 'service',
    icon: LogIn,
    name: { uz: 'Bosh kirish', ru: 'Главный вход', en: 'Main Entrance' },
    tagline: {
      uz: 'Garderob va nazorat punkti',
      ru: 'Гардероб и контрольный пункт',
      en: 'Cloakroom and security desk',
    },
    description: {
      uz: 'Kutubxonaning bosh kirish eshigi. Yonida garderob, nazorat punkti va nogironlar aravachasi uchun pandus joylashgan.',
      ru: 'Главный вход в библиотеку. Рядом гардероб, контрольный пункт и пандус для инвалидных колясок.',
      en: 'The library’s main entrance, with a cloakroom, security desk and wheelchair ramp alongside.',
    },
    features: [
      { uz: 'Garderob', ru: 'Гардероб', en: 'Cloakroom' },
      { uz: 'Pandus', ru: 'Пандус', en: 'Ramp' },
    ],
    directions: {
      uz: 'Atriumdan pastga qarab yuring — zinapoyadan tashqariga chiqasiz.',
      ru: 'Идите от атриума вниз — выход по лестнице.',
      en: 'Walk down from the atrium; the stairs lead outside.',
    },
    hotspot: { x: 50.0, y: 83.0, w: 8.37, h: 5.1 },
  },
];

const FLOOR_2: Room[] = [
  {
    id: 'ilmiy-adabiyot',
    floor: 2,
    category: 'collection',
    icon: GraduationCap,
    name: { uz: 'Ilmiy adabiyotlar zali', ru: 'Зал научной литературы', en: 'Academic Literature Hall' },
    tagline: {
      uz: 'Dissertatsiya, monografiya va ilmiy jurnallar',
      ru: 'Диссертации, монографии и научные журналы',
      en: 'Dissertations, monographs and journals',
    },
    description: {
      uz: 'Oliy ta’lim va ilmiy izlanishlar uchun maxsus fond: dissertatsiyalar, monografiyalar, ilmiy to‘plam va jurnallar. Nashrlar zaldan tashqariga chiqarilmaydi.',
      ru: 'Специальный фонд для высшего образования и науки: диссертации, монографии, научные сборники и журналы. Издания не выдаются за пределы зала.',
      en: 'A dedicated collection for higher education and research: dissertations, monographs, academic collections and journals. Items may not be taken out of the hall.',
    },
    seats: 60,
    features: [
      { uz: 'Dissertatsiyalar fondi', ru: 'Фонд диссертаций', en: 'Dissertation collection' },
      { uz: 'Ilmiy jurnallar', ru: 'Научные журналы', en: 'Academic journals' },
    ],
    directions: {
      uz: "Lift yoki zina bilan 2-qavatga chiqing, so'ng chapga yuring.",
      ru: 'Поднимитесь на 2-й этаж на лифте или по лестнице, затем налево.',
      en: 'Take the elevator or stairs to floor 2, then turn left.',
    },
    hotspot: { x: 21.23, y: 22.95, w: 11.0, h: 5.1 },
  },
  {
    id: 'konferensiya',
    floor: 2,
    category: 'service',
    icon: Presentation,
    name: { uz: 'Konferensiya xonasi', ru: 'Конференц-зал', en: 'Conference Room' },
    tagline: {
      uz: 'Seminar va taqdimotlar · 80 o‘rin',
      ru: 'Семинары и презентации · 80 мест',
      en: 'Seminars and presentations · 80 seats',
    },
    description: {
      uz: 'Ma’ruza, seminar, kitob taqdimoti va uchrashuvlar uchun jihozlangan zal. Proyektor, ovoz kuchaytirgich va videoyozuv imkoniyati mavjud, oldindan band qilinadi.',
      ru: 'Зал для лекций, семинаров, презентаций книг и встреч. Есть проектор, звукоусиление и возможность видеозаписи; бронируется заранее.',
      en: 'Equipped for lectures, seminars, book launches and meetings. Projector, sound system and video recording available; booking required.',
    },
    seats: 80,
    features: [
      { uz: 'Proyektor va ekran', ru: 'Проектор и экран', en: 'Projector and screen' },
      { uz: 'Oldindan band qilish', ru: 'Предварительное бронирование', en: 'Advance booking' },
    ],
    directions: {
      uz: '2-qavatga chiqing — markaziy zinapoyaning chap tomonida.',
      ru: 'Поднимитесь на 2-й этаж; слева от центральной лестницы.',
      en: 'Go up to floor 2; it is to the left of the central staircase.',
    },
    hotspot: { x: 36.12, y: 26.99, w: 8.13, h: 5.31 },
  },
  {
    id: 'sanuzel-2',
    floor: 2,
    category: 'facility',
    icon: Bath,
    name: { uz: 'Sanuzellar', ru: 'Санузлы', en: 'Restrooms' },
    tagline: {
      uz: 'Markaziy zinapoya yonida',
      ru: 'Рядом с центральной лестницей',
      en: 'Next to the central staircase',
    },
    description: {
      uz: '2-qavat sanuzellari markaziy zinapoya yonida, 1-qavatdagi bilan bir vertikalda joylashgan.',
      ru: 'Санузлы 2-го этажа находятся рядом с центральной лестницей, по одной вертикали с санузлами 1-го этажа.',
      en: 'The second-floor restrooms sit beside the central staircase, directly above those on the first floor.',
    },
    directions: {
      uz: '2-qavatga chiqing, markaziy zinapoya yonida.',
      ru: 'Поднимитесь на 2-й этаж, рядом с центральной лестницей.',
      en: 'Go up to floor 2, next to the central staircase.',
    },
    hotspot: { x: 50.24, y: 28.06, w: 5.02, h: 7.44 },
  },
  {
    id: 'multimedia-zali',
    floor: 2,
    category: 'tech',
    icon: Video,
    name: { uz: 'Multimedia zali', ru: 'Мультимедийный зал', en: 'Multimedia Hall' },
    tagline: {
      uz: 'Video, audio va raqamli kontent',
      ru: 'Видео, аудио и цифровой контент',
      en: 'Video, audio and digital content',
    },
    description: {
      uz: 'Hujjatli film ko‘rish, audiokitob tinglash va raqamli kontent yaratish uchun zona. Katta ekran, naushniklar va yozib olish jihozlari bilan ta’minlangan.',
      ru: 'Зона для просмотра документальных фильмов, прослушивания аудиокниг и создания цифрового контента. Большой экран, наушники и записывающее оборудование.',
      en: 'A zone for documentary screenings, audiobooks and digital content creation, with a large screen, headphones and recording equipment.',
    },
    seats: 15,
    features: [
      { uz: 'Audiokitoblar', ru: 'Аудиокниги', en: 'Audiobooks' },
      { uz: 'Video yozib olish', ru: 'Видеозапись', en: 'Video recording' },
    ],
    directions: {
      uz: "2-qavatga chiqib o'ngga yuring — birinchi xona.",
      ru: 'Поднимитесь на 2-й этаж и направо — первое помещение.',
      en: 'Go up to floor 2 and turn right; it is the first room.',
    },
    hotspot: { x: 64.89, y: 23.49, w: 9.45, h: 5.1 },
  },
  {
    id: 'raqamli-kutubxona',
    floor: 2,
    category: 'tech',
    icon: Laptop,
    name: { uz: 'Raqamli kutubxona', ru: 'Цифровая библиотека', en: 'Digital Library' },
    tagline: {
      uz: 'Elektron nashrlar va xalqaro bazalar',
      ru: 'Электронные издания и мировые базы',
      en: 'E-publications and global databases',
    },
    description: {
      uz: 'Elektron kitoblar, raqamlashtirilgan noyob nashrlar va xalqaro ilmiy ma’lumot bazalariga ulanish nuqtasi. Fondni raqamlashtirish ishlari ham shu yerda olib boriladi.',
      ru: 'Точка доступа к электронным книгам, оцифрованным редким изданиям и международным научным базам. Здесь же ведётся оцифровка фонда.',
      en: 'Access point for e-books, digitised rare editions and international research databases. Collection digitisation is also carried out here.',
    },
    seats: 25,
    features: [
      { uz: 'Elektron kutubxona', ru: 'Электронная библиотека', en: 'E-library' },
      { uz: 'Xalqaro bazalar', ru: 'Международные базы', en: 'International databases' },
      { uz: 'Raqamlashtirish', ru: 'Оцифровка', en: 'Digitisation' },
    ],
    directions: {
      uz: "2-qavatga chiqing, o'ng qanotning yuqori chekkasida.",
      ru: 'Поднимитесь на 2-й этаж; в дальнем верхнем углу правого крыла.',
      en: 'Go up to floor 2; in the far upper corner of the right wing.',
    },
    hotspot: { x: 81.16, y: 27.63, w: 10.47, h: 5.1 },
  },
  {
    id: 'chet-tillar',
    floor: 2,
    category: 'collection',
    icon: Globe,
    name: { uz: 'Chet tillar adabiyoti zali', ru: 'Зал литературы на иностранных языках', en: 'Foreign Languages Hall' },
    tagline: {
      uz: 'Ingliz, rus, arab, fors va boshqa tillar',
      ru: 'Английский, русский, арабский, персидский и др.',
      en: 'English, Russian, Arabic, Persian and more',
    },
    description: {
      uz: 'Chet tillardagi badiiy va o‘quv adabiyoti, lug‘atlar hamda til o‘rganish materiallari. Til klublari uchrashuvlari ham shu zalda o‘tkaziladi.',
      ru: 'Художественная и учебная литература на иностранных языках, словари и материалы для изучения языков. Здесь же проходят встречи языковых клубов.',
      en: 'Fiction and coursebooks in foreign languages, dictionaries and language-learning materials. Language club meetings are also held here.',
    },
    seats: 45,
    features: [
      { uz: 'Lug‘atlar fondi', ru: 'Фонд словарей', en: 'Dictionary collection' },
      { uz: 'Til klublari', ru: 'Языковые клубы', en: 'Language clubs' },
    ],
    directions: {
      uz: "2-qavatga chiqib chap qanotga o'ting, ikkinchi zal.",
      ru: 'Поднимитесь на 2-й этаж и пройдите в левое крыло, второй зал.',
      en: 'Go up to floor 2 and into the left wing; the second hall.',
    },
    hotspot: { x: 16.39, y: 40.6, w: 11.96, h: 5.31 },
  },
  {
    id: 'lift-2',
    floor: 2,
    category: 'facility',
    icon: ArrowUpDown,
    name: { uz: 'Lift', ru: 'Лифт', en: 'Elevator' },
    tagline: {
      uz: '1-qavatga tushish',
      ru: 'Спуск на 1-й этаж',
      en: 'Access to the 1st floor',
    },
    description: {
      uz: 'Liftning 2-qavatdagi to‘xtash joyi — 1-qavatdagi lift bilan bir vertikalda.',
      ru: 'Остановка лифта на 2-м этаже — по одной вертикали с лифтом 1-го этажа.',
      en: 'The elevator’s second-floor landing, directly above the first-floor one.',
    },
    directions: {
      uz: "Liftning 2-qavatdagi to'xtash joyi — atriumning chap tomonida.",
      ru: 'Остановка лифта на 2-м этаже — слева от атриума.',
      en: "The elevator's second-floor landing, on the left of the atrium.",
    },
    hotspot: { x: 32.6, y: 48.03, w: 3.59, h: 8.93 },
  },
  {
    id: 'guruhli-ish',
    floor: 2,
    category: 'reading',
    icon: Users,
    name: { uz: 'Guruhli ish xonasi', ru: 'Комната групповой работы', en: 'Group Study Room' },
    tagline: {
      uz: 'Loyiha va guruh mashg‘ulotlari uchun',
      ru: 'Для проектов и групповых занятий',
      en: 'For projects and group work',
    },
    description: {
      uz: 'Talabalar va tadqiqotchilar birgalikda ishlashi uchun xona. Yumaloq stollar, doska va ekran bilan jihozlangan — bu yerda ovoz chiqarib muhokama qilish mumkin.',
      ru: 'Комната для совместной работы студентов и исследователей. Круглые столы, доска и экран — здесь можно обсуждать вслух.',
      en: 'A room for students and researchers to work together. Round tables, a whiteboard and a screen — talking aloud is allowed here.',
    },
    seats: 24,
    features: [
      { uz: 'Doska va ekran', ru: 'Доска и экран', en: 'Whiteboard and screen' },
      { uz: 'Muhokama ruxsat etilgan', ru: 'Разрешены обсуждения', en: 'Discussion allowed' },
    ],
    directions: {
      uz: "2-qavatga chiqing, chap qanotning o'rtasidagi xona.",
      ru: 'Поднимитесь на 2-й этаж; комната в середине левого крыла.',
      en: 'Go up to floor 2; the room in the middle of the left wing.',
    },
    hotspot: { x: 15.43, y: 56.0, w: 8.49, h: 4.89 },
  },
  {
    id: 'individual-oquv',
    floor: 2,
    category: 'reading',
    icon: User,
    name: { uz: 'Individual o‘quv zonasi', ru: 'Зона индивидуальной работы', en: 'Individual Study Zone' },
    tagline: {
      uz: 'Alohida kabinalar · to‘liq sukunat',
      ru: 'Отдельные кабины · полная тишина',
      en: 'Private carrels · full silence',
    },
    description: {
      uz: 'Har biri chiroq va rozetka bilan jihozlangan alohida ish kabinalari. Diqqatni jamlab ishlash uchun mo‘ljallangan sukunat zonasi.',
      ru: 'Отдельные рабочие кабины с лампой и розеткой. Зона тишины для сосредоточенной работы.',
      en: 'Individual carrels with a lamp and power socket each — a silent zone for focused work.',
    },
    seats: 50,
    features: [
      { uz: 'Sukunat zonasi', ru: 'Зона тишины', en: 'Silent zone' },
      { uz: 'Shaxsiy chiroq va rozetka', ru: 'Лампа и розетка', en: 'Lamp and power socket' },
    ],
    directions: {
      uz: "2-qavatga chiqib o'ng qanotga o'ting, atriumga qaragan tomon.",
      ru: 'Поднимитесь на 2-й этаж и в правое крыло, со стороны атриума.',
      en: 'Go up to floor 2 and into the right wing, on the atrium side.',
    },
    hotspot: { x: 78.47, y: 45.17, w: 10.29, h: 4.68 },
  },
  {
    id: 'zina-2',
    floor: 2,
    category: 'facility',
    icon: Footprints,
    name: { uz: 'Zina', ru: 'Лестница', en: 'Staircase' },
    tagline: {
      uz: '1-qavatga yon zinapoya',
      ru: 'Боковая лестница на 1-й этаж',
      en: 'Side staircase to the 1st floor',
    },
    description: {
      uz: 'Lift yonidagi yon zinapoya orqali 1-qavatga tushiladi. Favqulodda holatda evakuatsiya yo‘li sifatida ishlatiladi.',
      ru: 'По боковой лестнице рядом с лифтом можно спуститься на 1-й этаж. В чрезвычайной ситуации служит путём эвакуации.',
      en: 'The side staircase by the elevator leads down to the first floor and serves as an emergency evacuation route.',
    },
    directions: {
      uz: '2-qavatdagi yon zinapoya — liftdan bir oz pastroqda.',
      ru: 'Боковая лестница на 2-м этаже — чуть ниже лифта.',
      en: 'The side staircase on floor 2, just past the elevator.',
    },
    hotspot: { x: 31.7, y: 63.76, w: 3.59, h: 8.93 },
  },
  {
    id: 'nodir-qolyozmalar',
    floor: 2,
    category: 'collection',
    icon: Scroll,
    name: { uz: 'Nodir qo‘lyozmalar xonasi', ru: 'Зал редких рукописей', en: 'Rare Manuscripts Room' },
    tagline: {
      uz: 'Qo‘lyozma va qadimiy nashrlar · 10 o‘rin',
      ru: 'Рукописи и старопечатные издания · 10 мест',
      en: 'Manuscripts and early printed books · 10 seats',
    },
    description: {
      uz: 'Noyob qo‘lyozmalar va qadimiy toshbosma nashrlar saqlanadigan maxsus iqlim rejimli xona. Nashrlar bilan ishlash uchun oldindan ruxsat va kutubxonachi nazorati talab qilinadi.',
      ru: 'Помещение с особым климатическим режимом для редких рукописей и старопечатных изданий. Работа с ними требует предварительного разрешения и присутствия библиотекаря.',
      en: 'A climate-controlled room for rare manuscripts and early printed books. Access requires prior permission and librarian supervision.',
    },
    seats: 10,
    features: [
      { uz: 'Oldindan ruxsat kerak', ru: 'Требуется разрешение', en: 'Permission required' },
      { uz: 'Maxsus iqlim rejimi', ru: 'Особый климат-контроль', en: 'Climate controlled' },
    ],
    directions: {
      uz: "2-qavatga chiqing, o'ng qanotning eng chekkasida.",
      ru: 'Поднимитесь на 2-й этаж; в дальнем конце правого крыла.',
      en: 'Go up to floor 2; at the far end of the right wing.',
    },
    hotspot: { x: 89.83, y: 63.23, w: 13.16, h: 5.1 },
  },
  {
    id: 'korgazma-zali',
    floor: 2,
    category: 'collection',
    icon: Image,
    name: { uz: 'Ko‘rgazma zali', ru: 'Выставочный зал', en: 'Exhibition Hall' },
    tagline: {
      uz: 'Doimiy va vaqtinchalik ko‘rgazmalar',
      ru: 'Постоянные и временные выставки',
      en: 'Permanent and temporary exhibitions',
    },
    description: {
      uz: 'Kutubxona xazinasidagi noyob nashrlar, tasviriy san’at asarlari va mavzuli ko‘rgazmalar namoyish etiladigan zal. Ekspozitsiya har oy yangilanadi.',
      ru: 'Зал для показа редких изданий из фондов, произведений изобразительного искусства и тематических выставок. Экспозиция обновляется ежемесячно.',
      en: 'A hall showcasing rare items from the collection, fine art and themed exhibitions. The display changes monthly.',
    },
    features: [
      { uz: 'Kirish bepul', ru: 'Вход свободный', en: 'Free entry' },
      { uz: 'Har oy yangilanadi', ru: 'Обновляется ежемесячно', en: 'Updated monthly' },
    ],
    directions: {
      uz: "2-qavatga chiqib o'ng qanotning pastki qismiga yuring.",
      ru: 'Поднимитесь на 2-й этаж и идите в нижнюю часть правого крыла.',
      en: 'Go up to floor 2 and walk to the lower part of the right wing.',
    },
    hotspot: { x: 73.33, y: 72.69, w: 9.45, h: 5.31 },
  },
  {
    id: 'dam-olish',
    floor: 2,
    category: 'relax',
    icon: Sofa,
    name: { uz: 'Dam olish zonasi', ru: 'Зона отдыха', en: 'Lounge Area' },
    tagline: {
      uz: 'Yumshoq divanlar · atriumga qaragan',
      ru: 'Мягкие диваны · вид на атриум',
      en: 'Soft seating overlooking the atrium',
    },
    description: {
      uz: 'Atrium bo‘ylab joylashgan yumshoq o‘rindiqli zona. Uzoq o‘qish oralig‘ida dam olish, jurnal varaqlash va suhbatlashish uchun.',
      ru: 'Зона с мягкими креслами вдоль атриума — для отдыха между занятиями, просмотра журналов и общения.',
      en: 'Soft seating along the atrium for breaks between study sessions, browsing magazines and quiet conversation.',
    },
    seats: 30,
    directions: {
      uz: "2-qavatga chiqing — atrium bo'ylab yumshoq o'rindiqlar turadi.",
      ru: 'Поднимитесь на 2-й этаж — мягкие кресла вдоль атриума.',
      en: 'Go up to floor 2; the soft seating runs along the atrium.',
    },
    hotspot: { x: 50.6, y: 73.01, w: 9.21, h: 5.31 },
  },
  {
    id: 'it-oquv-xonasi',
    floor: 2,
    category: 'tech',
    icon: Cpu,
    name: { uz: 'IT o‘quv xonasi', ru: 'IT-учебный класс', en: 'IT Training Room' },
    tagline: {
      uz: 'Bepul kurslar va raqamli savodxonlik',
      ru: 'Бесплатные курсы и цифровая грамотность',
      en: 'Free courses and digital literacy',
    },
    description: {
      uz: 'Raqamli savodxonlik, dasturlash asoslari va onlayn resurslardan foydalanish bo‘yicha bepul mashg‘ulotlar o‘tkaziladigan sinf. Dars jadvali oyning boshida e’lon qilinadi.',
      ru: 'Класс для бесплатных занятий по цифровой грамотности, основам программирования и работе с онлайн-ресурсами. Расписание публикуется в начале месяца.',
      en: 'A classroom for free sessions on digital literacy, programming basics and using online resources. The schedule is published at the start of each month.',
    },
    seats: 20,
    features: [
      { uz: 'Bepul kurslar', ru: 'Бесплатные курсы', en: 'Free courses' },
      { uz: 'Guruh mashg‘ulotlari', ru: 'Групповые занятия', en: 'Group classes' },
    ],
    directions: {
      uz: "2-qavatga chiqib chap qanotning pastki chekkasiga o'ting.",
      ru: 'Поднимитесь на 2-й этаж и пройдите в нижний конец левого крыла.',
      en: 'Go up to floor 2 and head to the lower end of the left wing.',
    },
    hotspot: { x: 13.22, y: 74.39, w: 9.45, h: 4.68 },
  },
];

export const FLOORS: Floor[] = [
  {
    id: 1,
    image: '/images/map/kutubxona_map.png',
    // Kiosk atriumdagi qabulxona oldida, bosh kirishga qaragan holda turadi.
    // Qurilma boshqa joyga ko'chirilsa, faqat shu ikki son o'zgaradi.
    youAreHere: { x: 50.54, y: 70.99 },
    rooms: FLOOR_1,
  },
  { id: 2, image: '/images/map/kutubxona_map2.png', rooms: FLOOR_2 },
];

export const ALL_ROOMS: Room[] = [...FLOOR_1, ...FLOOR_2];

/** Umumiy sanoq — o'ng paneldagi raqamlar shundan hisoblanadi. */
export const ROOM_TOTALS = {
  rooms: ALL_ROOMS.filter((r) => r.category !== 'facility').length,
  seats: ALL_ROOMS.reduce((sum, r) => sum + (r.seats ?? 0), 0),
};

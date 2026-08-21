/* Buyuk allomalar moduli uchun mock ma'lumot.
   Rasmlar maket kesimlaridan: public/interface/allomalar/ */
import type { EncyclopediaCategory, EncyclopediaEntry } from '../api/types';

const IMG = '/interface/allomalar';

export const allomalarSections: EncyclopediaCategory[] = [
  {
    id: 'hayoti',
    name: { uz: 'Hayoti va davri', ru: 'Жизнь и эпоха', en: 'Life and era' },
    description: {
      uz: 'Tug‘ilgan yurti, ustozlari va yashagan davri',
      ru: 'Родина, учителя и эпоха',
      en: 'Homeland, teachers and era',
    },
    icon: 'BookOpen',
    count: 5,
    accent: '#D9A441',
  },
  {
    id: 'ilmiy',
    name: { uz: 'Ilmiy ishlari', ru: 'Научные труды', en: 'Scientific works' },
    description: {
      uz: 'Yozgan asarlari va risolalari',
      ru: 'Написанные труды и трактаты',
      en: 'Books and treatises',
    },
    icon: 'ScrollText',
    count: 5,
    accent: '#C9A227',
  },
  {
    id: 'hissa',
    name: { uz: 'Jahon ilm-faniga hissasi', ru: 'Вклад в мировую науку', en: 'Contribution to world science' },
    description: {
      uz: 'Jahon fanida qoldirgan izi',
      ru: 'След в мировой науке',
      en: 'Legacy in world science',
    },
    icon: 'Globe',
    count: 5,
    accent: '#E0B860',
  },
  {
    id: 'kashfiyot',
    name: { uz: 'Kashfiyotlari va asarlari', ru: 'Открытия и произведения', en: 'Discoveries and works' },
    description: {
      uz: 'Ilk bor kashf etgan qonuniyatlari',
      ru: 'Впервые открытые закономерности',
      en: 'Laws discovered first',
    },
    icon: 'FlaskConical',
    count: 5,
    accent: '#CFA13B',
  },
  {
    id: 'media',
    name: { uz: 'Multimedia', ru: 'Мультимедиа', en: 'Multimedia' },
    description: {
      uz: 'Video va audio materiallar',
      ru: 'Видео и аудио материалы',
      en: 'Video and audio materials',
    },
    icon: 'PlayCircle',
    count: 5,
    accent: '#E8C878',
  },
];

export const allomalar: EncyclopediaEntry[] = [
  {
    id: 'xorazmiy',
    name: { uz: 'Al-Xorazmiy', ru: 'Аль-Хорезми', en: 'Al-Khwarizmi' },
    subtitle: { uz: '783–850', ru: '783–850', en: '783–850' },
    categoryId: 'olim',
    image: `${IMG}/p-xorazmiy.webp`,
    summary: {
      uz: 'Algebra fanining asoschisi, “Hisob kitob al-jabr val-muqobala” asari muallifi. Uning ishlari zamonaviy matematika, algoritmlar va informatika fanlariga asos soldi.',
      ru: 'Основатель алгебры, автор труда «Китаб аль-джабр валь-мукабала». Его работы заложили основу современной математики, алгоритмов и информатики.',
      en: 'Founder of algebra, author of “Kitab al-jabr wa-l-muqabala”. His work laid the foundation of modern mathematics, algorithms and computer science.',
    },
    sections: [
      {
        id: 'hayoti',
        title: { uz: 'Hayoti va davri', ru: 'Жизнь и эпоха', en: 'Life and era' },
        body: [
          {
            uz: 'Muhammad ibn Muso al-Xorazmiy 783-yilda Xorazm o‘lkasida tug‘ilgan. Yoshligidanoq riyoziyot va astronomiyaga qiziqqan olim keyinchalik Bag‘doddagi “Bayt ul-hikma” — Donishmandlik uyiga taklif etiladi.',
            ru: 'Мухаммад ибн Муса аль-Хорезми родился в 783 году в Хорезме. С юности увлекался математикой и астрономией, позже был приглашён в багдадский «Байт аль-хикма» — Дом мудрости.',
            en: 'Muhammad ibn Musa al-Khwarizmi was born in 783 in Khorezm. Drawn to mathematics and astronomy from a young age, he was later invited to the House of Wisdom in Baghdad.',
          },
          {
            uz: 'Bayt ul-hikmada u yunon, hind va fors ilmiy merosini o‘rganib, ularni bir tizimga soldi va o‘z kashfiyotlari bilan boyitdi. Bu davr Sharq uyg‘onish davrining eng samarali bosqichlaridan biri hisoblanadi.',
            ru: 'В Доме мудрости он изучил греческое, индийское и персидское научное наследие, систематизировал его и обогатил собственными открытиями.',
            en: 'There he studied Greek, Indian and Persian scientific heritage, systematised it and enriched it with his own discoveries.',
          },
        ],
      },
      {
        id: 'ilmiy',
        title: { uz: 'Ilmiy ishlari', ru: 'Научные труды', en: 'Scientific works' },
        body: [
          {
            uz: '“Al-kitob al-muxtasar fi hisob al-jabr val-muqobala” — algebra fanining birinchi tizimli darsligi. Unda tenglamalarni yechishning umumiy usullari bayon etilgan.',
            ru: '«Краткая книга о восполнении и противопоставлении» — первый систематический учебник алгебры с общими методами решения уравнений.',
            en: '“The Compendious Book on Calculation by Completion and Balancing” — the first systematic algebra textbook, setting out general methods for solving equations.',
          },
          {
            uz: '“Kitob surat al-arz” asarida u Yer yuzining xaritasini tuzib, 2402 ta joyning koordinatalarini keltirgan. Astronomik jadvallari — “Zij al-Xorazmiy” asrlar davomida foydalanilgan.',
            ru: 'В «Книге картины Земли» он составил карту мира с координатами 2402 пунктов. Его астрономические таблицы «Зидж аль-Хорезми» использовались веками.',
            en: 'In “Book of the Description of the Earth” he mapped the world with coordinates for 2,402 places. His astronomical tables were used for centuries.',
          },
        ],
      },
      {
        id: 'hissa',
        title: { uz: 'Jahon ilm-faniga hissasi', ru: 'Вклад в мировую науку', en: 'Contribution to world science' },
        body: [
          {
            uz: 'Uning nomidan “algoritm” atamasi, asari nomidan esa “algebra” so‘zi kelib chiqqan. XII asrda lotin tiliga tarjima qilingan asarlari Yevropa matematikasining rivojiga bevosita turtki bergan.',
            ru: 'От его имени произошёл термин «алгоритм», а от названия труда — слово «алгебра». Латинские переводы XII века дали прямой толчок европейской математике.',
            en: 'The term “algorithm” comes from his name and “algebra” from his book’s title. Twelfth-century Latin translations directly propelled European mathematics.',
          },
        ],
      },
      {
        id: 'kashfiyot',
        title: { uz: 'Kashfiyotlari va asarlari', ru: 'Открытия и произведения', en: 'Discoveries and works' },
        body: [
          {
            uz: 'Kvadrat tenglamalarni yechishning oltita kanonik ko‘rinishi, hind raqamlari va nol tushunchasini islom olamiga olib kirish, quyosh soati va astrolyabiya bo‘yicha risolalar.',
            ru: 'Шесть канонических видов квадратных уравнений, введение индийских цифр и нуля в исламский мир, трактаты о солнечных часах и астролябии.',
            en: 'Six canonical forms of quadratic equations, the introduction of Indian numerals and zero to the Islamic world, treatises on sundials and the astrolabe.',
          },
        ],
      },
      {
        id: 'media',
        title: { uz: 'Multimedia', ru: 'Мультимедиа', en: 'Multimedia' },
        body: [
          {
            uz: 'Kutubxona fondida al-Xorazmiy asarlarining raqamli nusxalari, ilmiy-ommabop hujjatli filmlar va audio ma’ruzalar saqlanadi.',
            ru: 'В фонде библиотеки хранятся цифровые копии трудов аль-Хорезми, документальные фильмы и аудиолекции.',
            en: 'The library holds digital copies of al-Khwarizmi’s works, documentaries and audio lectures.',
          },
        ],
      },
    ],
    facts: [
      { uz: '“Algoritm” so‘zi uning ismidan kelib chiqqan.', ru: 'Слово «алгоритм» произошло от его имени.', en: 'The word “algorithm” derives from his name.' },
      { uz: 'Yer meridiani uzunligini o‘lchashda ishtirok etgan.', ru: 'Участвовал в измерении длины земного меридиана.', en: 'Took part in measuring the length of the Earth’s meridian.' },
      { uz: 'Oydagi krater uning nomi bilan atalgan.', ru: 'Кратер на Луне назван его именем.', en: 'A lunar crater is named after him.' },
    ],
  },
  {
    id: 'beruniy',
    name: { uz: 'Abu Rayhon Beruniy', ru: 'Абу Райхан Беруни', en: 'Abu Rayhan Biruni' },
    subtitle: { uz: '973–1048', ru: '973–1048', en: '973–1048' },
    categoryId: 'olim',
    image: `${IMG}/p-beruniy.webp`,
    summary: {
      uz: 'Qomusiy olim — astronomiya, geodeziya, mineralogiya, tarix va farmakologiya sohalarida 150 dan ortiq asar yozgan. Yer radiusini hayratlanarli aniqlikda o‘lchagan.',
      ru: 'Учёный-энциклопедист, автор более 150 трудов по астрономии, геодезии, минералогии, истории и фармакологии. С поразительной точностью измерил радиус Земли.',
      en: 'A polymath who wrote over 150 works on astronomy, geodesy, mineralogy, history and pharmacology. He measured the Earth’s radius with striking accuracy.',
    },
    sections: [
      {
        id: 'hayoti',
        title: { uz: 'Hayoti va davri', ru: 'Жизнь и эпоха', en: 'Life and era' },
        body: [
          {
            uz: '973-yilda Kot shahrida tug‘ilgan. Yoshligida Xorazmshohlar saroyida ilm olgan, keyinchalik Gurganj, G‘azna va Hindistonda ijod qilgan.',
            ru: 'Родился в 973 году в городе Кят. Учился при дворе хорезмшахов, затем работал в Гургандже, Газне и Индии.',
            en: 'Born in 973 in the city of Kath. He studied at the Khwarazmshah court, later working in Gurganj, Ghazna and India.',
          },
          {
            uz: 'Hindistonda o‘n yildan ortiq yashab, sanskrit tilini o‘rgangan va hind madaniyatini chuqur tadqiq etgan. Bu mehnat “Hindiston” asariga aylandi.',
            ru: 'Более десяти лет прожил в Индии, выучил санскрит и глубоко изучил индийскую культуру — так родился труд «Индия».',
            en: 'He lived in India for over a decade, learned Sanskrit and studied Indian culture in depth, producing his book “India”.',
          },
        ],
      },
      {
        id: 'ilmiy',
        title: { uz: 'Ilmiy ishlari', ru: 'Научные труды', en: 'Scientific works' },
        body: [
          {
            uz: '“Qadimgi xalqlardan qolgan yodgorliklar”, “Hindiston”, “Qonuni Ma’sudiy”, “Mineralogiya” — har biri o‘z sohasida asr asari.',
            ru: '«Памятники минувших поколений», «Индия», «Канон Масуда», «Минералогия» — каждый труд стал вехой в своей области.',
            en: '“The Remaining Signs of Past Centuries”, “India”, “The Mas‘udic Canon” and “Mineralogy” — each a landmark in its field.',
          },
        ],
      },
      {
        id: 'hissa',
        title: { uz: 'Jahon ilm-faniga hissasi', ru: 'Вклад в мировую науку', en: 'Contribution to world science' },
        body: [
          {
            uz: 'Yer radiusini 6339 km deb hisoblagan — bugungi aniq qiymatdan atigi 20 km farq qiladi. Qiyosiy dinshunoslik va etnografiya fanlarining ilk namunalarini yaratgan.',
            ru: 'Вычислил радиус Земли в 6339 км — всего на 20 км меньше современного значения. Создал первые образцы сравнительного религиоведения и этнографии.',
            en: 'He calculated the Earth’s radius as 6,339 km — just 20 km from the modern value — and pioneered comparative religious studies and ethnography.',
          },
        ],
      },
      {
        id: 'kashfiyot',
        title: { uz: 'Kashfiyotlari va asarlari', ru: 'Открытия и произведения', en: 'Discoveries and works' },
        body: [
          {
            uz: '18 xil qimmatbaho tosh va metallning solishtirma og‘irligini o‘lchagan. Yerning o‘z o‘qi atrofida aylanishi haqidagi fikrni Kopernikdan besh asr oldin bildirgan.',
            ru: 'Измерил удельный вес 18 драгоценных камней и металлов. Высказал мысль о вращении Земли вокруг оси за пять веков до Коперника.',
            en: 'He measured the specific gravity of 18 gems and metals, and proposed the Earth’s rotation on its axis five centuries before Copernicus.',
          },
        ],
      },
      {
        id: 'media',
        title: { uz: 'Multimedia', ru: 'Мультимедиа', en: 'Multimedia' },
        body: [
          {
            uz: 'Beruniy merosiga bag‘ishlangan hujjatli filmlar va raqamlashtirilgan qo‘lyozma nusxalari kutubxona fondida mavjud.',
            ru: 'В фонде библиотеки — документальные фильмы и оцифрованные копии рукописей Беруни.',
            en: 'The library holds documentaries and digitised manuscript copies of Biruni’s legacy.',
          },
        ],
      },
    ],
    facts: [
      { uz: '150 dan ortiq asar yozgan, 30 ga yaqini bizgacha yetib kelgan.', ru: 'Написал более 150 трудов, до нас дошли около 30.', en: 'He wrote over 150 works; about 30 survive.' },
      { uz: 'Sanskrit tilini mukammal bilgan.', ru: 'В совершенстве владел санскритом.', en: 'He had a full command of Sanskrit.' },
      { uz: 'Ibn Sino bilan yozishmalar olib borgan.', ru: 'Вёл переписку с Ибн Синой.', en: 'He corresponded with Ibn Sina.' },
    ],
  },
  {
    id: 'ibnsino',
    name: { uz: 'Ibn Sino', ru: 'Ибн Сина', en: 'Ibn Sina (Avicenna)' },
    subtitle: { uz: '980–1037', ru: '980–1037', en: '980–1037' },
    categoryId: 'olim',
    image: `${IMG}/p-ibnsino.webp`,
    summary: {
      uz: 'Tabobat va falsafa sultoni. “Tib qonunlari” asari Yevropa universitetlarida olti asr davomida asosiy darslik bo‘lib xizmat qilgan.',
      ru: 'Султан медицины и философии. Его «Канон врачебной науки» шесть веков служил основным учебником в европейских университетах.',
      en: 'A master of medicine and philosophy. His “Canon of Medicine” was the core textbook in European universities for six centuries.',
    },
    sections: [
      {
        id: 'hayoti',
        title: { uz: 'Hayoti va davri', ru: 'Жизнь и эпоха', en: 'Life and era' },
        body: [
          {
            uz: 'Buxoro yaqinidagi Afshona qishlog‘ida tug‘ilgan. O‘n yoshida Qur’onni yod olgan, o‘n olti yoshida tabib sifatida tanilgan va Somoniylar kutubxonasidan foydalanish huquqini qo‘lga kiritgan.',
            ru: 'Родился в селении Афшана под Бухарой. В десять лет знал Коран наизусть, в шестнадцать прославился как врач и получил доступ к библиотеке Саманидов.',
            en: 'Born in Afshona near Bukhara. He knew the Qur’an by heart at ten, was known as a physician at sixteen, and gained access to the Samanid library.',
          },
        ],
      },
      {
        id: 'ilmiy',
        title: { uz: 'Ilmiy ishlari', ru: 'Научные труды', en: 'Scientific works' },
        body: [
          {
            uz: '“Tib qonunlari” (Al-Qonun fit-tib) — besh kitobdan iborat tibbiy qomus. “Kitob ash-shifo” esa falsafa, mantiq, tabiiy fanlar va matematikani qamrab olgan.',
            ru: '«Канон врачебной науки» — медицинская энциклопедия в пяти книгах. «Книга исцеления» охватывает философию, логику, естественные науки и математику.',
            en: '“The Canon of Medicine” is a five-book medical encyclopaedia; “The Book of Healing” covers philosophy, logic, natural science and mathematics.',
          },
        ],
      },
      {
        id: 'hissa',
        title: { uz: 'Jahon ilm-faniga hissasi', ru: 'Вклад в мировую науку', en: 'Contribution to world science' },
        body: [
          {
            uz: 'Yuqumli kasalliklarning ko‘zga ko‘rinmas mavjudotlar orqali tarqalishini taxmin qilgan, klinik sinov tamoyillarini ta’riflagan va dorishunoslikni tizimga solgan.',
            ru: 'Предположил передачу инфекций невидимыми существами, описал принципы клинических испытаний и систематизировал фармакологию.',
            en: 'He suggested that infections spread via invisible organisms, described principles of clinical trials, and systematised pharmacology.',
          },
        ],
      },
      {
        id: 'kashfiyot',
        title: { uz: 'Kashfiyotlari va asarlari', ru: 'Открытия и произведения', en: 'Discoveries and works' },
        body: [
          {
            uz: '450 ga yaqin asar yozgan, 240 tasi saqlanib qolgan. Meningit, sariq kasalligi va qandli diabetning ilk aniq tavsiflari unga tegishli.',
            ru: 'Написал около 450 трудов, сохранились 240. Ему принадлежат первые точные описания менингита, желтухи и сахарного диабета.',
            en: 'He wrote some 450 works, 240 of which survive, including the first accurate descriptions of meningitis, jaundice and diabetes.',
          },
        ],
      },
      {
        id: 'media',
        title: { uz: 'Multimedia', ru: 'Мультимедиа', en: 'Multimedia' },
        body: [
          {
            uz: '“Tib qonunlari”ning raqamli nusxasi, tarixiy qo‘lyozma sahifalari va ilmiy-ommabop videolar mavjud.',
            ru: 'Доступны цифровая копия «Канона», страницы исторических рукописей и научно-популярные видео.',
            en: 'A digital copy of the “Canon”, historical manuscript pages and popular-science videos are available.',
          },
        ],
      },
    ],
    facts: [
      { uz: '“Tib qonunlari” 1650-yilgacha Yevropada o‘qitilgan.', ru: '«Канон» преподавался в Европе до 1650 года.', en: 'The “Canon” was taught in Europe until 1650.' },
      { uz: 'Falsafada Sharq peripatetizmining eng yirik namoyandasi.', ru: 'Крупнейший представитель восточного перипатетизма.', en: 'The foremost figure of Eastern Peripateticism.' },
      { uz: 'Shoir sifatida ham ruboiylar yozgan.', ru: 'Как поэт писал рубаи.', en: 'He also wrote quatrains as a poet.' },
    ],
  },
  {
    id: 'ulugbek',
    name: { uz: 'Mirzo Ulug‘bek', ru: 'Мирзо Улугбек', en: 'Mirzo Ulugh Beg' },
    subtitle: { uz: '1394–1449', ru: '1394–1449', en: '1394–1449' },
    categoryId: 'olim',
    image: `${IMG}/p-ulugbek.webp`,
    summary: {
      uz: 'Temuriylar sulolasidan chiqqan hukmdor-astronom. Samarqandda o‘z davrining eng yirik rasadxonasini qurdirib, 1018 ta yulduz katalogini tuzdi.',
      ru: 'Правитель-астроном из династии Тимуридов. Построил в Самарканде крупнейшую обсерваторию эпохи и составил каталог 1018 звёзд.',
      en: 'A ruler-astronomer of the Timurid dynasty. He built the era’s greatest observatory in Samarkand and compiled a catalogue of 1,018 stars.',
    },
    sections: [
      {
        id: 'hayoti',
        title: { uz: 'Hayoti va davri', ru: 'Жизнь и эпоха', en: 'Life and era' },
        body: [
          {
            uz: 'Amir Temurning nabirasi. 1409-yildan Samarqand hokimi, 1447-yildan Temuriylar davlatining hukmdori. Siyosatdan ko‘ra ilmga ko‘proq berilgan.',
            ru: 'Внук Амира Темура. С 1409 года — правитель Самарканда, с 1447 — глава государства Тимуридов. Науке отдавал больше сил, чем политике.',
            en: 'Grandson of Amir Temur. Ruler of Samarkand from 1409 and of the Timurid state from 1447, he devoted himself more to science than to politics.',
          },
        ],
      },
      {
        id: 'ilmiy',
        title: { uz: 'Ilmiy ishlari', ru: 'Научные труды', en: 'Scientific works' },
        body: [
          {
            uz: '“Ziji jadidi Ko‘ragoniy” — 1018 ta yulduzning o‘rni va harakati keltirilgan astronomik jadval. Bu asar Yevropada XVII asrgacha eng aniq katalog hisoblangan.',
            ru: '«Зидж-и джадид-и Гурагани» — астрономические таблицы с положением 1018 звёзд, точнейший каталог в Европе вплоть до XVII века.',
            en: '“Zij-i Sultani” — astronomical tables charting 1,018 stars, the most precise catalogue known in Europe until the 17th century.',
          },
        ],
      },
      {
        id: 'hissa',
        title: { uz: 'Jahon ilm-faniga hissasi', ru: 'Вклад в мировую науку', en: 'Contribution to world science' },
        body: [
          {
            uz: 'Yulduz yilining uzunligini 365 kun 6 soat 10 daqiqa 8 soniya deb aniqlagan — bugungi o‘lchovdan atigi bir necha soniya farq qiladi.',
            ru: 'Определил длину звёздного года в 365 дней 6 часов 10 минут 8 секунд — отличие от современных данных лишь в несколько секунд.',
            en: 'He determined the sidereal year as 365 days, 6 hours, 10 minutes, 8 seconds — only seconds off the modern value.',
          },
        ],
      },
      {
        id: 'kashfiyot',
        title: { uz: 'Kashfiyotlari va asarlari', ru: 'Открытия и произведения', en: 'Discoveries and works' },
        body: [
          {
            uz: 'Radiusi 40 metrli ulkan sekstant qurilgan rasadxona, Samarqand, Buxoro va G‘ijduvondagi madrasalar — uning ilmiy va me’moriy merosi.',
            ru: 'Обсерватория с гигантским секстантом радиусом 40 метров, медресе в Самарканде, Бухаре и Гиждуване — его научное и архитектурное наследие.',
            en: 'An observatory with a 40-metre-radius sextant, and madrasas in Samarkand, Bukhara and Gijduvan, form his scientific and architectural legacy.',
          },
        ],
      },
      {
        id: 'media',
        title: { uz: 'Multimedia', ru: 'Мультимедиа', en: 'Multimedia' },
        body: [
          {
            uz: 'Rasadxonaning 3D rekonstruksiyasi, yulduz katalogining raqamli nusxasi va hujjatli filmlar.',
            ru: '3D-реконструкция обсерватории, цифровая копия звёздного каталога и документальные фильмы.',
            en: 'A 3D reconstruction of the observatory, a digital copy of the star catalogue and documentaries.',
          },
        ],
      },
    ],
    facts: [
      { uz: '“Bilim olishga intilish har bir musulmonning burchidir” — madrasasi peshtoqidagi yozuv.', ru: '«Стремление к знанию — долг каждого» — надпись на портале его медресе.', en: '“The pursuit of knowledge is the duty of every believer” — inscribed on his madrasa portal.' },
      { uz: 'Rasadxona qoldiqlari 1908-yilda topilgan.', ru: 'Остатки обсерватории найдены в 1908 году.', en: 'The observatory’s remains were found in 1908.' },
      { uz: 'Oydagi krater va asteroid uning nomi bilan atalgan.', ru: 'Кратер на Луне и астероид названы его именем.', en: 'A lunar crater and an asteroid bear his name.' },
    ],
  },
  {
    id: 'fargoniy',
    name: { uz: 'Ahmad Farg‘oniy', ru: 'Ахмад Фергани', en: 'Ahmad al-Farghani' },
    subtitle: { uz: '797–865', ru: '797–865', en: '797–865' },
    categoryId: 'olim',
    image: `${IMG}/p-fargoniy.webp`,
    summary: {
      uz: 'Astronom va muhandis. Nil daryosidagi mashhur “Miqyos an-Nil” suv o‘lchagichini loyihalagan, astronomiya bo‘yicha asari Yevropada asrlar davomida o‘qitilgan.',
      ru: 'Астроном и инженер. Спроектировал знаменитый нилометр «Микьяс ан-Ниль», его труд по астрономии веками изучали в Европе.',
      en: 'Astronomer and engineer. He designed the famous Nilometer on the Nile; his astronomy treatise was studied in Europe for centuries.',
    },
    sections: [
      {
        id: 'hayoti',
        title: { uz: 'Hayoti va davri', ru: 'Жизнь и эпоха', en: 'Life and era' },
        body: [
          {
            uz: 'Farg‘ona vodiysida tug‘ilgan, Bag‘doddagi Bayt ul-hikmada al-Xorazmiy bilan bir davrda ishlagan. Keyinchalik Qohirada faoliyat yuritgan.',
            ru: 'Родился в Ферганской долине, работал в багдадском Доме мудрости в одно время с аль-Хорезми, позже — в Каире.',
            en: 'Born in the Fergana Valley, he worked at Baghdad’s House of Wisdom alongside al-Khwarizmi, later in Cairo.',
          },
        ],
      },
      {
        id: 'ilmiy',
        title: { uz: 'Ilmiy ishlari', ru: 'Научные труды', en: 'Scientific works' },
        body: [
          {
            uz: '“Kitob fi javomi‘ ilm an-nujum” — astronomiya asoslari bayon etilgan asar. Lotincha tarjimasi “Elementa astronomica” nomi bilan mashhur bo‘lgan.',
            ru: '«Книга о совокупности науки о звёздах» — изложение основ астрономии, известное в латинском переводе как «Elementa astronomica».',
            en: '“Compendium of the Science of the Stars”, known in Latin as “Elementa astronomica”, set out the foundations of astronomy.',
          },
        ],
      },
      {
        id: 'hissa',
        title: { uz: 'Jahon ilm-faniga hissasi', ru: 'Вклад в мировую науку', en: 'Contribution to world science' },
        body: [
          {
            uz: 'Yerning sharsimon ekanini asoslagan va uning o‘lchamini hisoblagan. Asarlari Dante va Kolumb kabi shaxslarga ta’sir ko‘rsatgan.',
            ru: 'Обосновал шарообразность Земли и вычислил её размеры. Его труды повлияли на Данте и Колумба.',
            en: 'He argued for a spherical Earth and calculated its size; his work influenced Dante and Columbus.',
          },
        ],
      },
      {
        id: 'kashfiyot',
        title: { uz: 'Kashfiyotlari va asarlari', ru: 'Открытия и произведения', en: 'Discoveries and works' },
        body: [
          {
            uz: '861-yilda qurilgan Nil suv o‘lchagichi — muhandislik durdonasi, u bugungi kunda ham saqlanib qolgan. Quyosh tutilishini oldindan hisoblab bergan.',
            ru: 'Нилометр 861 года — инженерный шедевр, сохранившийся до наших дней. Он предвычислял солнечные затмения.',
            en: 'The Nilometer of 861, an engineering masterpiece, still stands. He also predicted solar eclipses.',
          },
        ],
      },
      {
        id: 'media',
        title: { uz: 'Multimedia', ru: 'Мультимедиа', en: 'Multimedia' },
        body: [
          {
            uz: 'Nil suv o‘lchagichining 3D modeli va Farg‘oniy merosiga oid videolavhalar.',
            ru: '3D-модель нилометра и видеоматериалы о наследии Фергани.',
            en: 'A 3D model of the Nilometer and video material on al-Farghani’s legacy.',
          },
        ],
      },
    ],
    facts: [
      { uz: 'Yevropada “Alfraganus” nomi bilan tanilgan.', ru: 'В Европе известен как «Альфраганус».', en: 'Known in Europe as “Alfraganus”.' },
      { uz: 'Qohiradagi Nil suv o‘lchagichi hozir ham turibdi.', ru: 'Нилометр в Каире стоит до сих пор.', en: 'His Nilometer in Cairo still stands.' },
      { uz: 'Farg‘ona shahrida haykali o‘rnatilgan.', ru: 'В Фергане установлен памятник учёному.', en: 'A monument to him stands in Fergana.' },
    ],
  },
];

/* O'zbekiston tarixi moduli — davrlar va muhim voqealar. */
import type { Era, HistoryEvent } from '../api/types';

const IMG = '/interface/tarix';

export const eras: Era[] = [
  {
    id: 'qadimgi',
    name: { uz: 'Qadimgi davr', ru: 'Древний период', en: 'Ancient period' },
    period: { uz: 'Mil.avv. VI–IV asrlar', ru: 'VI–IV вв. до н.э.', en: '6th–4th c. BCE' },
    summary: {
      uz: 'Markaziy Osiyo hududlarida ilk davlatlarning paydo bo‘lishi.',
      ru: 'Появление первых государств на территории Центральной Азии.',
      en: 'The emergence of the first states in Central Asia.',
    },
    body: [
      {
        uz: 'Bu davrda Markaziy Osiyo hududlarida ilk davlat tuzilmalari shakllandi. Sug‘orish dehqonchiligi, hunarmandchilik va savdo rivojlandi. Ahamoniylar davlati kirib kelishi bilan hudud xalqaro savdo yo‘llariga qo‘shildi.',
        ru: 'В этот период сложились первые государственные образования. Развивалось орошаемое земледелие, ремесло и торговля. С приходом Ахеменидов регион вошёл в международные торговые пути.',
        en: 'The first state formations took shape in this period. Irrigated farming, crafts and trade developed, and with the Achaemenids the region joined international trade routes.',
      },
      {
        uz: 'Xorazm, Baqtriya va So‘g‘diyona — o‘sha davrning eng yirik madaniy va siyosiy markazlari edi. Zardushtiylik dini keng tarqaldi.',
        ru: 'Хорезм, Бактрия и Согдиана были крупнейшими культурными и политическими центрами. Широко распространился зороастризм.',
        en: 'Khorezm, Bactria and Sogdiana were the largest cultural and political centres, and Zoroastrianism spread widely.',
      },
    ],
    image: `${IMG}/era-1.webp`,
    detailImage: `${IMG}/hero.webp`,
    stats: [
      { label: { uz: 'Yirik voqealar', ru: 'Крупные события', en: 'Major events' }, value: 12, icon: 'Scroll' },
      { label: { uz: 'Tarixiy shaxslar', ru: 'Исторические лица', en: 'Historical figures' }, value: 18, icon: 'Users' },
      { label: { uz: 'Arxeologik yodgorliklar', ru: 'Археологические памятники', en: 'Archaeological sites' }, value: 32, icon: 'Landmark' },
    ],
  },
  {
    id: 'antik',
    name: { uz: 'Antik davr', ru: 'Античный период', en: 'Antiquity' },
    period: { uz: 'Mil.avv. IV asr – Mil. III asr', ru: 'IV в. до н.э. – III в. н.э.', en: '4th c. BCE – 3rd c. CE' },
    summary: {
      uz: 'Amudaryo va Sirdaryo oralig‘ida yuksak madaniyat va davlatlar.',
      ru: 'Высокая культура и государства между Амударьёй и Сырдарьёй.',
      en: 'Advanced culture and states between the Amu Darya and Syr Darya.',
    },
    body: [
      {
        uz: 'Iskandar Zulqarnayn yurishlaridan so‘ng yunon-baqtriya madaniyati shakllandi. Keyinchalik Kushon imperiyasi hududni birlashtirib, Buyuk ipak yo‘lining markaziga aylantirdi.',
        ru: 'После походов Александра Македонского сложилась греко-бактрийская культура. Позже Кушанская империя объединила регион и сделала его центром Великого шёлкового пути.',
        en: 'After Alexander’s campaigns a Greco-Bactrian culture formed. The Kushan Empire later united the region and made it a hub of the Silk Road.',
      },
    ],
    image: `${IMG}/era-2.webp`,
    detailImage: `${IMG}/wide-1.webp`,
    stats: [
      { label: { uz: 'Yirik voqealar', ru: 'Крупные события', en: 'Major events' }, value: 15, icon: 'Scroll' },
      { label: { uz: 'Tarixiy shaxslar', ru: 'Исторические лица', en: 'Historical figures' }, value: 21, icon: 'Users' },
      { label: { uz: 'Arxeologik yodgorliklar', ru: 'Археологические памятники', en: 'Archaeological sites' }, value: 47, icon: 'Landmark' },
    ],
  },
  {
    id: 'erta-orta',
    name: { uz: 'Erta o‘rta asrlar', ru: 'Раннее средневековье', en: 'Early Middle Ages' },
    period: { uz: 'IV–VIII asrlar', ru: 'IV–VIII века', en: '4th–8th centuries' },
    summary: {
      uz: 'Turkiy xoqonliklar, savdo yo‘llari va diniy-ma’rifiy taraqqiyot.',
      ru: 'Тюркские каганаты, торговые пути и духовно-просветительский подъём.',
      en: 'Turkic khaganates, trade routes and religious-educational growth.',
    },
    body: [
      {
        uz: 'So‘g‘d savdogarlari Buyuk ipak yo‘lining asosiy vositachilariga aylandi. Turkiy xoqonliklar hududni birlashtirdi, VIII asrda islom dini kirib keldi.',
        ru: 'Согдийские купцы стали главными посредниками Великого шёлкового пути. Тюркские каганаты объединили регион, в VIII веке пришёл ислам.',
        en: 'Sogdian merchants became the Silk Road’s chief intermediaries. Turkic khaganates united the region, and Islam arrived in the 8th century.',
      },
    ],
    image: `${IMG}/era-3.webp`,
    detailImage: `${IMG}/event-1.webp`,
    stats: [
      { label: { uz: 'Yirik voqealar', ru: 'Крупные события', en: 'Major events' }, value: 19, icon: 'Scroll' },
      { label: { uz: 'Tarixiy shaxslar', ru: 'Исторические лица', en: 'Historical figures' }, value: 26, icon: 'Users' },
      { label: { uz: 'Arxeologik yodgorliklar', ru: 'Археологические памятники', en: 'Archaeological sites' }, value: 38, icon: 'Landmark' },
    ],
  },
  {
    id: 'yuksalish',
    name: { uz: 'Yuksalish davri', ru: 'Период расцвета', en: 'Golden age' },
    period: { uz: 'IX–XII asrlar', ru: 'IX–XII века', en: '9th–12th centuries' },
    summary: {
      uz: 'Somoniylar, Qoraxoniylar va buyuk mutafakkirlar davri.',
      ru: 'Эпоха Саманидов, Караханидов и великих мыслителей.',
      en: 'The era of the Samanids, Karakhanids and great thinkers.',
    },
    body: [
      {
        uz: 'Sharq uyg‘onish davri — al-Xorazmiy, Beruniy, Ibn Sino va Farg‘oniy kabi allomalar yetishib chiqdi. Buxoro va Urganch jahon ilm-fanining markazlariga aylandi.',
        ru: 'Восточный Ренессанс: аль-Хорезми, Беруни, Ибн Сина, Фергани. Бухара и Ургенч стали центрами мировой науки.',
        en: 'The Eastern Renaissance produced al-Khwarizmi, Biruni, Ibn Sina and al-Farghani; Bukhara and Urgench became world centres of learning.',
      },
    ],
    image: `${IMG}/era-4.webp`,
    detailImage: `${IMG}/wide-2.webp`,
    stats: [
      { label: { uz: 'Yirik voqealar', ru: 'Крупные события', en: 'Major events' }, value: 24, icon: 'Scroll' },
      { label: { uz: 'Tarixiy shaxslar', ru: 'Исторические лица', en: 'Historical figures' }, value: 42, icon: 'Users' },
      { label: { uz: 'Arxeologik yodgorliklar', ru: 'Археологические памятники', en: 'Archaeological sites' }, value: 56, icon: 'Landmark' },
    ],
  },
  {
    id: 'temuriylar',
    name: { uz: 'Oltin O‘rda va Temuriylar', ru: 'Золотая Орда и Тимуриды', en: 'Golden Horde and Timurids' },
    period: { uz: 'XIII–XV asrlar', ru: 'XIII–XV века', en: '13th–15th centuries' },
    summary: {
      uz: 'Yirik imperiyalar va madaniy yuksalish, Amir Temur davlati.',
      ru: 'Великие империи и культурный подъём, держава Амира Темура.',
      en: 'Great empires and a cultural flowering under Amir Temur.',
    },
    body: [
      {
        uz: 'Amir Temur asos solgan saltanat Samarqandni jahon poytaxtiga aylantirdi. Mirzo Ulug‘bek rasadxonasi, Alisher Navoiy ijodi shu davrga to‘g‘ri keladi.',
        ru: 'Держава Амира Темура сделала Самарканд мировой столицей. К этому времени относятся обсерватория Улугбека и творчество Алишера Навои.',
        en: 'Amir Temur’s empire made Samarkand a world capital; Ulugh Beg’s observatory and Alisher Navoi’s work belong to this era.',
      },
    ],
    image: `${IMG}/era-5.webp`,
    detailImage: `${IMG}/event-4.webp`,
    stats: [
      { label: { uz: 'Yirik voqealar', ru: 'Крупные события', en: 'Major events' }, value: 31, icon: 'Scroll' },
      { label: { uz: 'Tarixiy shaxslar', ru: 'Исторические лица', en: 'Historical figures' }, value: 55, icon: 'Users' },
      { label: { uz: 'Arxeologik yodgorliklar', ru: 'Археологические памятники', en: 'Archaeological sites' }, value: 74, icon: 'Landmark' },
    ],
  },
  {
    id: 'xonliklar',
    name: { uz: 'Xonliklar davri', ru: 'Период ханств', en: 'Era of the khanates' },
    period: { uz: 'XVI–XIX asrlar', ru: 'XVI–XIX века', en: '16th–19th centuries' },
    summary: {
      uz: 'O‘zbekiston xonliklari, mustaqil davlatchilik va madaniyat.',
      ru: 'Узбекские ханства, самостоятельная государственность и культура.',
      en: 'The Uzbek khanates, independent statehood and culture.',
    },
    body: [
      {
        uz: 'Buxoro amirligi, Xiva va Qo‘qon xonliklari shakllandi. Me’morchilik, hunarmandchilik va adabiyot rivojlandi, madrasalar tarmog‘i kengaydi.',
        ru: 'Сложились Бухарский эмират, Хивинское и Кокандское ханства. Развивались архитектура, ремёсла и литература, росла сеть медресе.',
        en: 'The Bukhara Emirate and the Khiva and Kokand khanates formed; architecture, crafts and literature flourished as madrasas multiplied.',
      },
    ],
    image: `${IMG}/era-6.webp`,
    detailImage: `${IMG}/event-3.webp`,
    stats: [
      { label: { uz: 'Yirik voqealar', ru: 'Крупные события', en: 'Major events' }, value: 28, icon: 'Scroll' },
      { label: { uz: 'Tarixiy shaxslar', ru: 'Исторические лица', en: 'Historical figures' }, value: 47, icon: 'Users' },
      { label: { uz: 'Arxeologik yodgorliklar', ru: 'Археологические памятники', en: 'Archaeological sites' }, value: 63, icon: 'Landmark' },
    ],
  },
  {
    id: 'mustaqillik',
    name: { uz: 'Mustaqillik davri', ru: 'Период независимости', en: 'Independence' },
    period: { uz: 'XX–XXI asrlar', ru: 'XX–XXI века', en: '20th–21st centuries' },
    summary: {
      uz: 'Yangi O‘zbekiston — erkinlik, taraqqiyot va kelajak sari.',
      ru: 'Новый Узбекистан — свобода, развитие и путь в будущее.',
      en: 'New Uzbekistan — freedom, development and the road ahead.',
    },
    body: [
      {
        uz: '1991-yil 31-avgustda O‘zbekiston davlat mustaqilligini e’lon qildi. Milliy davlatchilik tiklandi, ta’lim, fan va iqtisodiyotda keng islohotlar boshlandi.',
        ru: '31 августа 1991 года Узбекистан провозгласил независимость. Восстановлена национальная государственность, начались реформы в образовании, науке и экономике.',
        en: 'On 31 August 1991 Uzbekistan declared independence, restoring national statehood and launching reforms in education, science and the economy.',
      },
    ],
    image: `${IMG}/era-7.webp`,
    detailImage: `${IMG}/event-5.webp`,
    stats: [
      { label: { uz: 'Yirik voqealar', ru: 'Крупные события', en: 'Major events' }, value: 44, icon: 'Scroll' },
      { label: { uz: 'Tarixiy shaxslar', ru: 'Исторические лица', en: 'Historical figures' }, value: 68, icon: 'Users' },
      { label: { uz: 'Yodgorliklar', ru: 'Памятники', en: 'Monuments' }, value: 29, icon: 'Landmark' },
    ],
  },
];

export const historyEvents: HistoryEvent[] = [
  {
    id: 'sogd',
    eraId: 'qadimgi',
    title: { uz: 'So‘g‘d davlatining yuksalishi', ru: 'Расцвет Согдийского государства', en: 'The rise of Sogdiana' },
    date: { uz: 'Mil.avv. VI–IV asrlar', ru: 'VI–IV вв. до н.э.', en: '6th–4th c. BCE' },
    image: `${IMG}/event-1.webp`,
    body: {
      uz: 'Zarafshon vodiysida shakllangan So‘g‘d davlati hunarmandchilik va savdo markaziga aylandi. So‘g‘d yozuvi butun Markaziy Osiyoga tarqaldi.',
      ru: 'Согдийское государство в долине Зарафшана стало центром ремесла и торговли. Согдийская письменность распространилась по всей Центральной Азии.',
      en: 'Sogdiana in the Zarafshan valley became a centre of crafts and trade, and its script spread across Central Asia.',
    },
  },
  {
    id: 'iskandar',
    eraId: 'antik',
    title: { uz: 'Iskandar Zulqarnayn yurishlari', ru: 'Походы Александра Македонского', en: 'Alexander’s campaigns' },
    date: { uz: 'Mil.avv. IV asr', ru: 'IV в. до н.э.', en: '4th c. BCE' },
    image: `${IMG}/event-2.webp`,
    body: {
      uz: 'Makedoniyalik Iskandarning yurishlari natijasida Sharq va G‘arb madaniyatlari qo‘shildi, yunon-baqtriya san’ati vujudga keldi.',
      ru: 'Походы Александра Македонского соединили культуры Востока и Запада, породив греко-бактрийское искусство.',
      en: 'Alexander’s campaigns fused Eastern and Western cultures, giving rise to Greco-Bactrian art.',
    },
  },
  {
    id: 'rasadxona',
    eraId: 'temuriylar',
    title: { uz: 'Ulug‘bek rasadxonasi qurilishi', ru: 'Строительство обсерватории Улугбека', en: 'Building of Ulugh Beg’s observatory' },
    date: { uz: 'XV asr', ru: 'XV век', en: '15th century' },
    image: `${IMG}/event-3.webp`,
    body: {
      uz: '1420-yillarda Samarqandda qurilgan rasadxona o‘z davrining eng aniq astronomik markazi bo‘ldi. Bu yerda 1018 ta yulduz katalogi tuzildi.',
      ru: 'Построенная в 1420-х годах обсерватория стала точнейшим астрономическим центром эпохи; здесь составлен каталог 1018 звёзд.',
      en: 'Built in the 1420s, the observatory was the most precise astronomical centre of its age, producing a catalogue of 1,018 stars.',
    },
  },
  {
    id: 'temur',
    eraId: 'temuriylar',
    title: { uz: 'Amir Temur davlatining tashkil topishi', ru: 'Образование державы Амира Темура', en: 'Founding of Amir Temur’s empire' },
    date: { uz: '1370-yil', ru: '1370 год', en: '1370' },
    image: `${IMG}/event-4.webp`,
    body: {
      uz: '1370-yilda Amir Temur Movarounnahrda hokimiyatni qo‘lga oldi va poytaxti Samarqand bo‘lgan buyuk saltanatga asos soldi.',
      ru: 'В 1370 году Амир Темур взял власть в Мавераннахре и основал великую державу со столицей в Самарканде.',
      en: 'In 1370 Amir Temur took power in Transoxiana and founded a great empire with Samarkand as its capital.',
    },
  },
  {
    id: 'mustaqillik-kuni',
    eraId: 'mustaqillik',
    title: { uz: 'O‘zbekiston mustaqillikka erishdi', ru: 'Узбекистан обрёл независимость', en: 'Uzbekistan gains independence' },
    date: { uz: '1991-yil 31-avgust', ru: '31 августа 1991 года', en: '31 August 1991' },
    image: `${IMG}/event-5.webp`,
    body: {
      uz: 'Oliy Kengash O‘zbekiston Respublikasining davlat mustaqilligi to‘g‘risidagi bayonotni qabul qildi. 1-sentyabr Mustaqillik kuni deb belgilandi.',
      ru: 'Верховный Совет принял заявление о государственной независимости Республики Узбекистан. 1 сентября объявлено Днём независимости.',
      en: 'The Supreme Council adopted the declaration of state independence; 1 September was proclaimed Independence Day.',
    },
  },
];

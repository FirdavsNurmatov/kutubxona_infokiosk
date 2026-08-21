/* "O'zbekistonning 100 siymosi" moduli.
   Portretlar public/images/authors/ dagi mavjud haqiqiy suratlardan olinadi —
   maket kesimlaridan ko'ra sifatliroq va ishonchliroq. */
import type { EncyclopediaCategory, EncyclopediaEntry, Localized } from '../api/types';

const IMG = '/interface/siymolar';
const P = '/images/authors';

export const siymoCategories: EncyclopediaCategory[] = [
  {
    id: 'olimlar',
    name: { uz: 'Olimlar', ru: 'Учёные', en: 'Scholars' },
    description: { uz: 'Ilm-fan namoyandalari', ru: 'Деятели науки', en: 'Figures of science' },
    icon: 'BookOpen', image: `${IMG}/cat-olimlar.webp`, count: 20, accent: '#1F4E8C',
  },
  {
    id: 'adiblar',
    name: { uz: 'Adiblar', ru: 'Писатели', en: 'Writers' },
    description: { uz: 'Yozuvchi va shoirlar', ru: 'Писатели и поэты', en: 'Writers and poets' },
    icon: 'Feather', image: `${IMG}/cat-adiblar.webp`, count: 18, accent: '#8A5A22',
  },
  {
    id: 'sanatkorlar',
    name: { uz: 'San’atkorlar', ru: 'Деятели искусства', en: 'Artists' },
    description: { uz: 'Rassom, aktyor va rejissyorlar', ru: 'Художники, актёры и режиссёры', en: 'Painters, actors and directors' },
    icon: 'Palette', image: `${IMG}/cat-sanat.webp`, count: 16, accent: '#6B3E8F',
  },
  {
    id: 'bastakorlar',
    name: { uz: 'Bastakorlar', ru: 'Композиторы', en: 'Composers' },
    description: { uz: 'Musiqa ijodkorlari', ru: 'Создатели музыки', en: 'Creators of music' },
    icon: 'Music', image: `${IMG}/cat-bastakor.webp`, count: 12, accent: '#155E52',
  },
  {
    id: 'memorlar',
    name: { uz: 'Me’morlar', ru: 'Архитекторы', en: 'Architects' },
    description: { uz: 'Bunyodkorlar va me’morchilar', ru: 'Зодчие и строители', en: 'Builders and architects' },
    icon: 'Landmark', image: `${IMG}/cat-memor.webp`, count: 10, accent: '#0E6E8C',
  },
  {
    id: 'sportchilar',
    name: { uz: 'Sportchilar', ru: 'Спортсмены', en: 'Athletes' },
    description: { uz: 'Jahon maydonlaridagi g‘oliblar', ru: 'Победители мировых арен', en: 'Champions on the world stage' },
    icon: 'Trophy', image: `${IMG}/cat-sport.webp`, count: 14, accent: '#9B2C2C',
  },
  {
    id: 'boshqa',
    name: { uz: 'Boshqa sohalar', ru: 'Другие сферы', en: 'Other fields' },
    description: { uz: 'Davlat va jamoat arboblari', ru: 'Государственные и общественные деятели', en: 'State and public figures' },
    icon: 'Star', image: `${IMG}/cat-boshqa.webp`, count: 10, accent: '#4A4458',
  },
];

/** Yozuv yaratishdagi takrorni kamaytiruvchi yordamchi. */
function makeEntry(o: {
  id: string;
  categoryId: string;
  image: string;
  name: Localized;
  subtitle: Localized;
  summary: Localized;
  hayoti: Localized;
  asarlari: Localized;
  meros: Localized;
  facts: Localized[];
}): EncyclopediaEntry {
  return {
    id: o.id,
    name: o.name,
    subtitle: o.subtitle,
    categoryId: o.categoryId,
    image: o.image,
    summary: o.summary,
    facts: o.facts,
    sections: [
      {
        id: 'hayoti',
        title: { uz: 'Hayoti va faoliyati', ru: 'Жизнь и деятельность', en: 'Life and work' },
        body: [o.hayoti],
      },
      {
        id: 'asarlari',
        title: { uz: 'Asarlari', ru: 'Произведения', en: 'Works' },
        body: [o.asarlari],
      },
      {
        id: 'meros',
        title: { uz: 'Merosi', ru: 'Наследие', en: 'Legacy' },
        body: [o.meros],
      },
    ],
  };
}

export const siymolar: EncyclopediaEntry[] = [
  makeEntry({
    id: 'navoiy', categoryId: 'adiblar', image: `${P}/alisher-navoiy.jpg`,
    name: { uz: 'Alisher Navoiy', ru: 'Алишер Навои', en: 'Alisher Navoi' },
    subtitle: { uz: '1441 – 1501', ru: '1441 – 1501', en: '1441 – 1501' },
    summary: {
      uz: 'O‘zbek adabiy tilining asoschisi, shoir, mutafakkir va davlat arbobi. “Xamsa” va “Xazoyin ul-maoniy” muallifi.',
      ru: 'Основоположник узбекского литературного языка, поэт, мыслитель и государственный деятель. Автор «Хамсы» и «Хазойин ул-маоний».',
      en: 'Founder of the Uzbek literary language — poet, thinker and statesman, author of the “Khamsa” and “Khazayin ul-maani”.',
    },
    hayoti: {
      uz: 'Hirotda tug‘ilgan, Husayn Boyqaro saroyida vazirlik lavozimida ishlagan. Butun umrini ilm, adabiyot va xayriya ishlariga bag‘ishlagan, yuzlab madrasa, masjid va shifoxonalar qurdirgan.',
      ru: 'Родился в Герате, служил визирем при дворе Хусейна Байкары. Всю жизнь посвятил науке, литературе и благотворительности, построил сотни медресе, мечетей и больниц.',
      en: 'Born in Herat, he served as vizier at the court of Husayn Bayqara, devoting his life to learning, literature and philanthropy and funding hundreds of madrasas, mosques and hospitals.',
    },
    asarlari: {
      uz: '“Xamsa” beshligi — “Hayrat ul-abror”, “Farhod va Shirin”, “Layli va Majnun”, “Sab’ai sayyor”, “Saddi Iskandariy”. “Muhokamat ul-lug‘atayn” asarida turkiy tilning boyligini isbotlagan.',
      ru: 'Пятерица «Хамса»: «Смятение праведных», «Фархад и Ширин», «Лейли и Меджнун», «Семь планет», «Стена Искандара». В «Мухокамат ул-лугатайн» доказал богатство тюркского языка.',
      en: 'The “Khamsa” quintet, and “Muhakamat al-Lughatayn”, in which he demonstrated the richness of the Turkic language.',
    },
    meros: {
      uz: 'O‘zbekiston Milliy kutubxonasi uning nomi bilan atalgan. Asarlari dunyoning o‘nlab tillariga tarjima qilingan.',
      ru: 'Национальная библиотека Узбекистана носит его имя. Его произведения переведены на десятки языков мира.',
      en: 'The National Library of Uzbekistan bears his name, and his works are translated into dozens of languages.',
    },
    facts: [
      { uz: '30 dan ortiq yirik asar yozgan.', ru: 'Написал более 30 крупных произведений.', en: 'He wrote over 30 major works.' },
      { uz: 'Turkiy tilda she’riyat yozishni ommalashtirgan.', ru: 'Популяризировал поэзию на тюркском языке.', en: 'He popularised poetry in the Turkic language.' },
    ],
  }),
  makeEntry({
    id: 'qodiriy', categoryId: 'adiblar', image: `${P}/abdulla-qodiriy.jpg`,
    name: { uz: 'Abdulla Qodiriy', ru: 'Абдулла Кадыри', en: 'Abdulla Qodiriy' },
    subtitle: { uz: '1894 – 1938', ru: '1894 – 1938', en: '1894 – 1938' },
    summary: {
      uz: 'O‘zbek romanchiligining asoschisi. “O‘tkan kunlar” va “Mehrobdan chayon” romanlari milliy adabiyotning cho‘qqisi hisoblanadi.',
      ru: 'Основоположник узбекского романа. «Минувшие дни» и «Скорпион из алтаря» — вершины национальной литературы.',
      en: 'Founder of the Uzbek novel; “Days Gone By” and “Scorpion from the Altar” are peaks of national literature.',
    },
    hayoti: {
      uz: 'Toshkentda tug‘ilgan. Jadidchilik harakatida faol qatnashgan, gazeta va jurnallarda ishlagan. 1938-yilda qatag‘on qurboni bo‘lgan, 1956-yilda oqlangan.',
      ru: 'Родился в Ташкенте, активно участвовал в джадидском движении, работал в газетах и журналах. Стал жертвой репрессий 1938 года, реабилитирован в 1956-м.',
      en: 'Born in Tashkent, he was active in the Jadid movement and worked in the press. A victim of the 1938 repressions, he was rehabilitated in 1956.',
    },
    asarlari: {
      uz: '“O‘tkan kunlar” (1926) — o‘zbek adabiyotidagi birinchi roman. “Mehrobdan chayon” (1929), “Obid ketmon” qissasi va ko‘plab hajviy hikoyalar.',
      ru: '«Минувшие дни» (1926) — первый узбекский роман. «Скорпион из алтаря» (1929), повесть «Обид кетмон» и множество сатирических рассказов.',
      en: '“Days Gone By” (1926) was the first Uzbek novel, followed by “Scorpion from the Altar” (1929) and many satirical stories.',
    },
    meros: {
      uz: 'Asarlari maktab dasturiga kiritilgan, “O‘tkan kunlar” bir necha bor ekranlashtirilgan.',
      ru: 'Его произведения включены в школьную программу, «Минувшие дни» неоднократно экранизированы.',
      en: 'His work is on the school curriculum and “Days Gone By” has been filmed several times.',
    },
    facts: [
      { uz: '“Julqunboy” taxallusi bilan hajviy asarlar yozgan.', ru: 'Писал сатиру под псевдонимом «Джулкунбой».', en: 'He wrote satire under the pen name “Julqunboy”.' },
      { uz: '1991-yilda Alisher Navoiy nomidagi Davlat mukofotiga sazovor bo‘lgan.', ru: 'В 1991 году удостоен Государственной премии имени Алишера Навои.', en: 'He received the Alisher Navoi State Prize in 1991.' },
    ],
  }),
  makeEntry({
    id: 'cholpon', categoryId: 'adiblar', image: `${P}/cholpon.jpg`,
    name: { uz: 'Cho‘lpon', ru: 'Чулпан', en: 'Cho‘lpon' },
    subtitle: { uz: '1897 – 1938', ru: '1897 – 1938', en: '1897 – 1938' },
    summary: {
      uz: 'Shoir, dramaturg va tarjimon. XX asr o‘zbek she’riyatining yangilanishiga asos solgan jadid adibi.',
      ru: 'Поэт, драматург и переводчик, джадид, обновивший узбекскую поэзию XX века.',
      en: 'Poet, playwright and translator — a Jadid writer who renewed 20th-century Uzbek poetry.',
    },
    hayoti: {
      uz: 'Andijonda tug‘ilgan. Jadid maktablarida o‘qigan, teatr va matbuot sohasida ishlagan. Qatag‘on qurboni.',
      ru: 'Родился в Андижане, учился в джадидских школах, работал в театре и прессе. Жертва репрессий.',
      en: 'Born in Andijan, he studied in Jadid schools and worked in theatre and the press. A victim of the repressions.',
    },
    asarlari: {
      uz: '“Kecha va kunduz” romani, “Buloqlar”, “Tong sirlari” she’riy to‘plamlari, Shekspir va Pushkin asarlari tarjimalari.',
      ru: 'Роман «Ночь и день», сборники «Родники», «Тайны рассвета», переводы Шекспира и Пушкина.',
      en: 'The novel “Night and Day”, the collections “Springs” and “Secrets of Dawn”, and translations of Shakespeare and Pushkin.',
    },
    meros: {
      uz: 'She’riyatidagi erkinlik ruhi keyingi avlod shoirlariga kuchli ta’sir ko‘rsatgan.',
      ru: 'Дух свободы в его поэзии сильно повлиял на следующие поколения поэтов.',
      en: 'The spirit of freedom in his verse strongly influenced later generations of poets.',
    },
    facts: [
      { uz: 'Asl ismi — Abdulhamid Sulaymon o‘g‘li Yunusov.', ru: 'Настоящее имя — Абдулхамид Сулейман угли Юнусов.', en: 'His real name was Abdulhamid Sulaymon oʻgʻli Yunusov.' },
      { uz: 'O‘zbek teatri repertuarini shakllantirishda ishtirok etgan.', ru: 'Участвовал в формировании репертуара узбекского театра.', en: 'He helped shape the repertoire of Uzbek theatre.' },
    ],
  }),
  makeEntry({
    id: 'gafur-gulom', categoryId: 'adiblar', image: `${P}/gafur-gulom.jpg`,
    name: { uz: 'G‘afur G‘ulom', ru: 'Гафур Гулям', en: 'Gafur Gulom' },
    subtitle: { uz: '1903 – 1966', ru: '1903 – 1966', en: '1903 – 1966' },
    summary: {
      uz: 'Shoir va nosir, o‘zbek bolalar adabiyotining yirik namoyandasi. “Shum bola” qissasi muallifi.',
      ru: 'Поэт и прозаик, крупный представитель узбекской детской литературы, автор повести «Озорник».',
      en: 'Poet and prose writer, a major figure in Uzbek children’s literature and author of “The Mischievous Boy”.',
    },
    hayoti: {
      uz: 'Toshkentda tug‘ilgan, yoshligida yetim qolib, o‘qituvchilik bilan hayot kechirgan. Keyinchalik matbuot va adabiyotga bel bog‘lagan.',
      ru: 'Родился в Ташкенте, рано осиротел, работал учителем, позже посвятил себя литературе и прессе.',
      en: 'Born in Tashkent and orphaned young, he worked as a teacher before devoting himself to literature and the press.',
    },
    asarlari: {
      uz: '“Shum bola”, “Yodgor”, “Netay”, “Sen yetim emassan” she’ri — urush yillarida yozilgan mashhur asar.',
      ru: '«Озорник», «Ядгар», «Нетай», знаменитое стихотворение «Ты не сирота», написанное в годы войны.',
      en: '“The Mischievous Boy”, “Yodgor”, “Netay”, and the famous wartime poem “You Are Not an Orphan”.',
    },
    meros: {
      uz: '“Sen yetim emassan” she’ri urush yillarida O‘zbekistonga ko‘chirilgan minglab bolalar haqidagi insoniylik ramziga aylangan.',
      ru: 'Стихотворение «Ты не сирота» стало символом милосердия к тысячам детей, эвакуированных в Узбекистан.',
      en: '“You Are Not an Orphan” became a symbol of the compassion shown to thousands of children evacuated to Uzbekistan.',
    },
    facts: [
      { uz: 'Toshkentdagi madaniyat va istirohat bog‘i uning nomi bilan atalgan.', ru: 'Парк культуры и отдыха в Ташкенте носит его имя.', en: 'A park in Tashkent is named after him.' },
      { uz: '“Shum bola” bir necha bor ekranlashtirilgan.', ru: '«Озорник» неоднократно экранизирован.', en: '“The Mischievous Boy” has been filmed several times.' },
    ],
  }),
  makeEntry({
    id: 'oybek', categoryId: 'adiblar', image: `${P}/oybek.jpg`,
    name: { uz: 'Oybek', ru: 'Айбек', en: 'Oybek' },
    subtitle: { uz: '1905 – 1968', ru: '1905 – 1968', en: '1905 – 1968' },
    summary: {
      uz: 'Yozuvchi va akademik. “Navoiy”, “Qutlug‘ qon” romanlari bilan o‘zbek tarixiy nasrini yuksaltirgan.',
      ru: 'Писатель и академик. Романами «Навои» и «Священная кровь» поднял узбекскую историческую прозу.',
      en: 'Writer and academician who elevated Uzbek historical prose with the novels “Navoi” and “Sacred Blood”.',
    },
    hayoti: {
      uz: 'Toshkentda to‘quvchi oilasida tug‘ilgan. O‘rta Osiyo davlat universitetini tugatgan, Fanlar akademiyasi akademigi bo‘lgan.',
      ru: 'Родился в Ташкенте в семье ткача, окончил Среднеазиатский университет, стал академиком Академии наук.',
      en: 'Born in Tashkent to a weaver’s family, he graduated from Central Asian State University and became an academician.',
    },
    asarlari: {
      uz: '“Qutlug‘ qon” (1940), “Navoiy” (1944), “Oltin vodiydan shabadalar”, “Bolalik” qissasi.',
      ru: '«Священная кровь» (1940), «Навои» (1944), «Ветер Золотой долины», повесть «Детство».',
      en: '“Sacred Blood” (1940), “Navoi” (1944), “Winds of the Golden Valley” and the novella “Childhood”.',
    },
    meros: {
      uz: '“Navoiy” romani buyuk shoir obrazini adabiyotda mustahkamlagan asar sifatida qadrlanadi.',
      ru: 'Роман «Навои» ценится как произведение, закрепившее образ великого поэта в литературе.',
      en: 'The novel “Navoi” is valued for fixing the great poet’s image in literature.',
    },
    facts: [
      { uz: 'Asl ismi — Muso Toshmuhammad o‘g‘li.', ru: 'Настоящее имя — Муса Ташмухаммад угли.', en: 'His real name was Musa Toshmuhammad oʻgʻli.' },
      { uz: 'Asarlari 30 dan ortiq tilga tarjima qilingan.', ru: 'Его произведения переведены более чем на 30 языков.', en: 'His works are translated into more than 30 languages.' },
    ],
  }),
  makeEntry({
    id: 'qahhor', categoryId: 'adiblar', image: `${IMG}/featured.webp`,
    name: { uz: 'Abdulla Qahhor', ru: 'Абдулла Каххар', en: 'Abdulla Qahhor' },
    subtitle: { uz: '1907 – 1968', ru: '1907 – 1968', en: '1907 – 1968' },
    summary: {
      uz: 'O‘zbek adabiyotining yirik namoyandasi, serqirra yozuvchi, dramaturg va jamoat arbobi. Uning asarlari xalqimizning hayoti, orzu-umidlari va insoniy qadriyatlarini chuqur ifodalaydi.',
      ru: 'Крупный представитель узбекской литературы — разносторонний писатель, драматург и общественный деятель, глубоко отразивший жизнь и чаяния народа.',
      en: 'A major figure of Uzbek literature — a versatile writer, playwright and public figure whose work captures the life and hopes of his people.',
    },
    hayoti: {
      uz: 'Qo‘qon yaqinidagi qishloqda temirchi oilasida tug‘ilgan. O‘rta Osiyo davlat universitetida tahsil olgan, umri davomida jurnalistika va adabiyot bilan shug‘ullangan.',
      ru: 'Родился в семье кузнеца близ Коканда, учился в Среднеазиатском университете, всю жизнь занимался журналистикой и литературой.',
      en: 'Born to a blacksmith’s family near Kokand, he studied at Central Asian State University and spent his life in journalism and literature.',
    },
    asarlari: {
      uz: '“Sarob” romani, “O‘tmishdan ertaklar” qissasi, “Anor”, “Bemor”, “Og‘riq tishlar” hikoyalari va “Shohi so‘zana” dramasi.',
      ru: 'Роман «Мираж», повесть «Сказки о былом», рассказы «Гранат», «Больная», пьеса «Шёлковое сюзане».',
      en: 'The novel “Mirage”, the novella “Tales of the Past”, the stories “Pomegranate” and “The Patient”, and the play “Silk Suzani”.',
    },
    meros: {
      uz: 'Qisqa hikoya janrining o‘zbek adabiyotidagi eng yuksak namunalarini yaratgan usta adib sifatida tan olingan.',
      ru: 'Признан мастером, создавшим лучшие образцы короткого рассказа в узбекской литературе.',
      en: 'He is recognised as the master of the short story in Uzbek literature.',
    },
    facts: [
      { uz: 'Gogol, Chexov va Tolstoy asarlarini o‘zbek tiliga tarjima qilgan.', ru: 'Переводил на узбекский Гоголя, Чехова и Толстого.', en: 'He translated Gogol, Chekhov and Tolstoy into Uzbek.' },
      { uz: '“Anor” hikoyasi jahon antologiyalariga kiritilgan.', ru: 'Рассказ «Гранат» вошёл в мировые антологии.', en: 'His story “Pomegranate” appears in world anthologies.' },
    ],
  }),
  makeEntry({
    id: 'erkin-vohidov', categoryId: 'adiblar', image: `${P}/erkin-vohidov.jpg`,
    name: { uz: 'Erkin Vohidov', ru: 'Эркин Вахидов', en: 'Erkin Vohidov' },
    subtitle: { uz: '1936 – 2016', ru: '1936 – 2016', en: '1936 – 2016' },
    summary: {
      uz: 'O‘zbekiston Qahramoni, xalq shoiri. “O‘zbegim” qasidasi milliy o‘zlikni anglash ramziga aylangan.',
      ru: 'Герой Узбекистана, народный поэт. Его касыда «Узбегим» стала символом национального самосознания.',
      en: 'Hero of Uzbekistan and People’s Poet, whose ode “O‘zbegim” became a symbol of national self-awareness.',
    },
    hayoti: {
      uz: 'Farg‘ona viloyatida tug‘ilgan, Toshkent davlat universitetini tugatgan. Nashriyot va parlament faoliyati bilan shug‘ullangan.',
      ru: 'Родился в Ферганской области, окончил Ташкентский университет, работал в издательствах и парламенте.',
      en: 'Born in the Fergana region, he graduated from Tashkent State University and worked in publishing and parliament.',
    },
    asarlari: {
      uz: '“Yoshlik devoni”, “Charog‘bon”, “Tirik sayyoralar”, Gyotening “Faust” asari tarjimasi.',
      ru: '«Диван молодости», «Чарогбон», «Живые планеты», перевод «Фауста» Гёте.',
      en: '“Divan of Youth”, “Charogbon”, “Living Planets”, and a translation of Goethe’s “Faust”.',
    },
    meros: {
      uz: 'She’rlari qo‘shiqqa aylanib, bir necha avlod xotirasida saqlanib qolgan.',
      ru: 'Его стихи стали песнями и остались в памяти нескольких поколений.',
      en: 'His poems became songs and live on in the memory of several generations.',
    },
    facts: [
      { uz: '1999-yilda “O‘zbekiston Qahramoni” unvoniga sazovor bo‘lgan.', ru: 'В 1999 году удостоен звания «Герой Узбекистана».', en: 'He was named Hero of Uzbekistan in 1999.' },
      { uz: '“Faust”ni o‘zbek tiliga tarjima qilishga 10 yil sarflagan.', ru: 'Перевод «Фауста» занял у него 10 лет.', en: 'His translation of “Faust” took ten years.' },
    ],
  }),
  makeEntry({
    id: 'otkir-hoshimov', categoryId: 'adiblar', image: `${P}/otkir-hoshimov.jpg`,
    name: { uz: 'O‘tkir Hoshimov', ru: 'Уткир Хашимов', en: 'Oʻtkir Hoshimov' },
    subtitle: { uz: '1941 – 2013', ru: '1941 – 2013', en: '1941 – 2013' },
    summary: {
      uz: 'Xalq yozuvchisi. “Dunyoning ishlari” va “Ikki eshik orasi” asarlari o‘zbek nasrining eng ko‘p o‘qilgan kitoblari qatorida.',
      ru: 'Народный писатель. «Дела мирские» и «Между двух дверей» — среди самых читаемых книг узбекской прозы.',
      en: 'People’s Writer, whose “The Ways of the World” and “Between Two Doors” are among the most-read books of Uzbek prose.',
    },
    hayoti: {
      uz: 'Toshkent viloyatida tug‘ilgan, jurnalistika fakultetini bitirgan. Ko‘p yillar gazeta va nashriyotlarda rahbarlik qilgan.',
      ru: 'Родился в Ташкентской области, окончил факультет журналистики, долгие годы руководил газетами и издательствами.',
      en: 'Born in the Tashkent region, he graduated in journalism and led newspapers and publishing houses for many years.',
    },
    asarlari: {
      uz: '“Dunyoning ishlari”, “Ikki eshik orasi”, “Bahor qaytmaydi”, “Tushda kechgan umrlar”.',
      ru: '«Дела мирские», «Между двух дверей», «Весна не вернётся», «Жизни, прожитые во сне».',
      en: '“The Ways of the World”, “Between Two Doors”, “Spring Will Not Return”, “Lives Lived in a Dream”.',
    },
    meros: {
      uz: '“Dunyoning ishlari” ona mehri haqidagi eng ta’sirchan o‘zbek kitoblaridan biri sifatida qadrlanadi.',
      ru: '«Дела мирские» ценится как одна из самых пронзительных узбекских книг о материнской любви.',
      en: '“The Ways of the World” is treasured as one of the most moving Uzbek books about a mother’s love.',
    },
    facts: [
      { uz: '1991-yilda “O‘zbekiston xalq yozuvchisi” unvonini olgan.', ru: 'В 1991 году получил звание «Народный писатель Узбекистана».', en: 'He was named People’s Writer of Uzbekistan in 1991.' },
      { uz: 'Asarlari maktab va oliygoh dasturlariga kiritilgan.', ru: 'Его произведения включены в школьные и вузовские программы.', en: 'His works are on school and university curricula.' },
    ],
  }),
  makeEntry({
    id: 'avloniy', categoryId: 'olimlar', image: `${P}/abdulla-avloniy.jpg`,
    name: { uz: 'Abdulla Avloniy', ru: 'Абдулла Авлони', en: 'Abdulla Avloniy' },
    subtitle: { uz: '1878 – 1934', ru: '1878 – 1934', en: '1878 – 1934' },
    summary: {
      uz: 'Ma’rifatparvar, pedagog va shoir. Jadid maktablarining tashkilotchisi, “Turkiy guliston yoxud axloq” darsligi muallifi.',
      ru: 'Просветитель, педагог и поэт, организатор джадидских школ, автор учебника «Тюркский цветник, или Нравственность».',
      en: 'Enlightener, educator and poet — organiser of Jadid schools and author of the textbook “Turkic Rose Garden, or Morality”.',
    },
    hayoti: {
      uz: 'Toshkentda tug‘ilgan. 1904-yilda yangi usuldagi maktab ochgan, o‘qituvchilar tayyorlash va darsliklar yaratish bilan shug‘ullangan.',
      ru: 'Родился в Ташкенте. В 1904 году открыл школу нового типа, готовил учителей и создавал учебники.',
      en: 'Born in Tashkent, he opened a new-method school in 1904 and worked on teacher training and textbooks.',
    },
    asarlari: {
      uz: '“Turkiy guliston yoxud axloq”, “Birinchi muallim”, “Ikkinchi muallim” darsliklari, ko‘plab she’r va pyesalar.',
      ru: 'Учебники «Тюркский цветник, или Нравственность», «Первый учитель», «Второй учитель», множество стихов и пьес.',
      en: 'The textbooks “Turkic Rose Garden”, “First Teacher” and “Second Teacher”, plus many poems and plays.',
    },
    meros: {
      uz: 'O‘zbekistonda pedagogika sohasining asoschilaridan biri sifatida e’tirof etiladi.',
      ru: 'Признан одним из основателей педагогики в Узбекистане.', 
      en: 'He is recognised as a founder of pedagogy in Uzbekistan.',
    },
    facts: [
      { uz: 'Toshkent shahridagi pedagogika instituti uning nomi bilan atalgan.', ru: 'Педагогический институт в Ташкенте носит его имя.', en: 'A pedagogical institute in Tashkent bears his name.' },
      { uz: 'Teatr truppasini tashkil etgan.', ru: 'Организовал театральную труппу.', en: 'He founded a theatre company.' },
    ],
  }),
  makeEntry({
    id: 'buxoriy', categoryId: 'olimlar', image: `${P}/imom-al-buxoriy.jpg`,
    name: { uz: 'Imom al-Buxoriy', ru: 'Имам аль-Бухари', en: 'Imam al-Bukhari' },
    subtitle: { uz: '810 – 870', ru: '810 – 870', en: '810 – 870' },
    summary: {
      uz: 'Buyuk muhaddis, “Sahih al-Buxoriy” to‘plami muallifi. Hadis ilmida eng ishonchli manba yaratgan alloma.',
      ru: 'Великий мухаддис, автор сборника «Сахих аль-Бухари» — самого достоверного источника в науке о хадисах.',
      en: 'A great hadith scholar and author of “Sahih al-Bukhari”, the most trusted source in hadith studies.',
    },
    hayoti: {
      uz: 'Buxoroda tug‘ilgan. O‘n olti yoshidan boshlab hadis to‘plash uchun Makka, Madina, Misr va Bag‘dodga safar qilgan.',
      ru: 'Родился в Бухаре. С шестнадцати лет путешествовал в Мекку, Медину, Египет и Багдад, собирая хадисы.',
      en: 'Born in Bukhara, from the age of sixteen he travelled to Mecca, Medina, Egypt and Baghdad collecting hadith.',
    },
    asarlari: {
      uz: '“Al-Jomi‘ as-sahih” — 600 mingdan ortiq hadis ichidan tanlab olingan 7275 ta ishonchli hadis to‘plami. “At-Tarix al-kabir” asari.',
      ru: '«Аль-Джами ас-сахих» — 7275 достоверных хадисов, отобранных из более чем 600 тысяч. Труд «Ат-Тарих аль-кабир».',
      en: '“Al-Jami as-Sahih” gathers 7,275 sound hadith selected from over 600,000, alongside “Al-Tarikh al-Kabir”.',
    },
    meros: {
      uz: 'Samarqand yaqinidagi maqbarasi butun dunyodan ziyoratchilarni jalb qiladi.',
      ru: 'Его мавзолей под Самаркандом притягивает паломников со всего мира.',
      en: 'His mausoleum near Samarkand draws pilgrims from around the world.',
    },
    facts: [
      { uz: 'Har bir hadisni yozishdan oldin ikki rakat namoz o‘qigan.', ru: 'Перед записью каждого хадиса совершал молитву в два ракята.', en: 'He prayed two rak‘ahs before recording each hadith.' },
      { uz: 'Xotirasi favqulodda kuchli bo‘lgani rivoyat qilinadi.', ru: 'По преданию, обладал феноменальной памятью.', en: 'He is said to have had an extraordinary memory.' },
    ],
  }),
  makeEntry({
    id: 'temur', categoryId: 'boshqa', image: `${P}/amir-temur.jpg`,
    name: { uz: 'Amir Temur', ru: 'Амир Темур', en: 'Amir Temur' },
    subtitle: { uz: '1336 – 1405', ru: '1336 – 1405', en: '1336 – 1405' },
    summary: {
      uz: 'Sarkarda va davlat arbobi, Temuriylar saltanatining asoschisi. Samarqandni jahon poytaxtiga aylantirgan.',
      ru: 'Полководец и государственный деятель, основатель державы Тимуридов, превративший Самарканд в мировую столицу.',
      en: 'Commander and statesman, founder of the Timurid empire, who made Samarkand a world capital.',
    },
    hayoti: {
      uz: '1336-yilda Shahrisabz yaqinida tug‘ilgan. 1370-yilda Movarounnahrda hokimiyatni qo‘lga olib, keng hududlarni birlashtirgan.',
      ru: 'Родился в 1336 году близ Шахрисабза. В 1370 году взял власть в Мавераннахре и объединил обширные территории.',
      en: 'Born near Shahrisabz in 1336, he took power in Transoxiana in 1370 and united vast territories.',
    },
    asarlari: {
      uz: '“Temur tuzuklari” — davlat boshqaruvi tamoyillari bayon etilgan asar. Bibixonim masjidi, Go‘ri Amir, Oqsaroy kabi me’moriy obidalar.',
      ru: '«Уложение Темура» — свод принципов государственного управления. Мечеть Биби-Ханым, Гур-Эмир, Ак-Сарай.',
      en: 'The “Tuzuk-i Timuri” on principles of governance, and monuments such as Bibi-Khanym, Gur-e-Amir and Aq-Saray.',
    },
    meros: {
      uz: 'Uning davrida qurilgan me’moriy majmualar bugungi kunda YUNESKO Jahon merosi ro‘yxatida.',
      ru: 'Архитектурные ансамбли его эпохи входят в список Всемирного наследия ЮНЕСКО.',
      en: 'The architectural ensembles of his era are on the UNESCO World Heritage List.',
    },
    facts: [
      { uz: '“Kuch — adolatdadir” shiori davlat siyosatining asosi bo‘lgan.', ru: 'Девиз «Сила — в справедливости» лежал в основе его политики.', en: 'His motto “Strength lies in justice” underpinned his policy.' },
      { uz: 'Samarqandga dunyoning turli burchaklaridan hunarmandlarni to‘plagan.', ru: 'Собирал в Самарканде ремесленников со всего света.', en: 'He gathered craftsmen from across the world in Samarkand.' },
    ],
  }),
  makeEntry({
    id: 'bobur', categoryId: 'boshqa', image: `${P}/zahiriddin-muhammad-bobur.jpg`,
    name: { uz: 'Zahiriddin Muhammad Bobur', ru: 'Захириддин Мухаммад Бабур', en: 'Zahiriddin Muhammad Babur' },
    subtitle: { uz: '1483 – 1530', ru: '1483 – 1530', en: '1483 – 1530' },
    summary: {
      uz: 'Shoir, davlat arbobi va Boburiylar saltanatining asoschisi. “Boburnoma” asari jahon memuar adabiyotining durdonasi.',
      ru: 'Поэт, государственный деятель и основатель империи Бабуридов. «Бабур-наме» — жемчужина мировой мемуарной литературы.',
      en: 'Poet, statesman and founder of the Mughal empire; the “Baburnama” is a gem of world memoir literature.',
    },
    hayoti: {
      uz: 'Andijonda tug‘ilgan, o‘n ikki yoshida Farg‘ona taxtiga o‘tirgan. Keyinchalik Kobul va Hindistonda saltanat qurgan.',
      ru: 'Родился в Андижане, в двенадцать лет занял ферганский престол, позже основал державу в Кабуле и Индии.',
      en: 'Born in Andijan, he took the Fergana throne at twelve and later founded an empire in Kabul and India.',
    },
    asarlari: {
      uz: '“Boburnoma” — o‘z hayoti, yurishlari va o‘z davri haqidagi bebaho asar. “Mubayyin” risolasi va turkiy she’rlar devoni.',
      ru: '«Бабур-наме» — бесценный труд о собственной жизни, походах и эпохе. Трактат «Мубайин» и диван тюркских стихов.',
      en: 'The “Baburnama”, an invaluable account of his life and times, plus the treatise “Mubayyin” and a divan of Turkic verse.',
    },
    meros: {
      uz: '“Boburnoma” dunyoning o‘nlab tillariga tarjima qilingan va tarixchilar uchun birlamchi manba hisoblanadi.',
      ru: '«Бабур-наме» переведено на десятки языков и служит первоисточником для историков.',
      en: 'The “Baburnama” is translated into dozens of languages and serves as a primary source for historians.',
    },
    facts: [
      { uz: 'Bog‘dorchilikka ishtiyoqi kuchli bo‘lgan, ko‘plab bog‘lar barpo etgan.', ru: 'Страстно увлекался садоводством и разбил множество садов.', en: 'A passionate gardener, he laid out many gardens.' },
      { uz: 'O‘zi ixtiro qilgan “Xatti Boburiy” yozuvini yaratgan.', ru: 'Создал собственное письмо «хатт-и Бабури».', en: 'He devised his own script, the “Baburi script”.' },
    ],
  }),
];

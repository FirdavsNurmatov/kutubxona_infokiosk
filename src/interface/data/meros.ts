/* "Nodir meros" moduli — qo'lyozmalar, noyob kitoblar va tarixiy fondlar.
   Muqovalar mavjud public/images/books/ fondidan olinadi. */
import type { EncyclopediaCategory, EncyclopediaEntry, Localized } from '../api/types';

const B = '/images/books';
const IMG = '/interface/meros';

/** Modul bezaklari — fon naqshi va sahifa qirralari. */
export const merosArt = {
  heroBook: `${IMG}/hero-book.webp`,
  pageLeft: `${IMG}/page-left.webp`,
  pageRight: `${IMG}/page-right.webp`,
  boburnoma: `${IMG}/boburnoma.webp`,
};

export const merosCategories: EncyclopediaCategory[] = [
  {
    id: 'qolyozma',
    name: { uz: 'Qo‘lyozmalar', ru: 'Рукописи', en: 'Manuscripts' },
    description: {
      uz: 'Asrlar osha saqlangan qo‘lyozma nusxalar',
      ru: 'Рукописные копии, сохранённые веками',
      en: 'Handwritten copies preserved through the centuries',
    },
    icon: 'BookOpenText', count: 0, accent: '#D9A441',
  },
  {
    id: 'noyob',
    name: { uz: 'Noyob kitoblar', ru: 'Редкие книги', en: 'Rare books' },
    description: {
      uz: 'Kam nusxada chop etilgan nashrlar',
      ru: 'Издания малого тиража',
      en: 'Editions printed in small runs',
    },
    icon: 'BookMarked', count: 0, accent: '#C9A227',
  },
  {
    id: 'tarixiy',
    name: { uz: 'Tarixiy meros', ru: 'Историческое наследие', en: 'Historical heritage' },
    description: {
      uz: 'Davlatchilik va ma’rifat yodgorliklari',
      ru: 'Памятники государственности и просвещения',
      en: 'Monuments of statehood and enlightenment',
    },
    icon: 'Feather', count: 0, accent: '#E0B860',
  },
];

function makeMeros(o: {
  id: string; categoryId: string; image: string;
  name: Localized; subtitle: Localized; summary: Localized;
  tarixi: Localized; mazmuni: Localized; holati: Localized;
  facts: Localized[];
  /** Raqamlangan varaqlar — faqat nusxasi tayyor nashrlarda. */
  pages?: string[];
}): EncyclopediaEntry {
  return {
    id: o.id, name: o.name, subtitle: o.subtitle, categoryId: o.categoryId,
    image: o.image, summary: o.summary, facts: o.facts, pages: o.pages,
    sections: [
      { id: 'tarixi', title: { uz: 'Tarixi', ru: 'История', en: 'History' }, body: [o.tarixi] },
      { id: 'mazmuni', title: { uz: 'Mazmuni', ru: 'Содержание', en: 'Contents' }, body: [o.mazmuni] },
      { id: 'holati', title: { uz: 'Saqlanish holati', ru: 'Состояние сохранности', en: 'Condition' }, body: [o.holati] },
    ],
  };
}

export const merosEntries: EncyclopediaEntry[] = [
  makeMeros({
    id: 'boburnoma', categoryId: 'qolyozma', image: `${B}/boburnoma.jpg`,
    /* Raqamlangan varaqlar. Boshqa nashrlarda hozircha yo'q — ular uchun
       varaqlagich ochilmaydi, ilgari esa hammasi shu sahifalarni ko'rsatardi. */
    pages: [`${IMG}/boburnoma.webp`, `${IMG}/page-left.webp`, `${IMG}/page-right.webp`],
    name: { uz: 'Boburnoma', ru: 'Бабур-наме', en: 'Baburnama' },
    subtitle: { uz: 'Zahiriddin Muhammad Bobur • XVI asr', ru: 'Захириддин Мухаммад Бабур • XVI век', en: 'Zahiriddin Muhammad Babur • 16th c.' },
    summary: {
      uz: 'Zahiriddin Muhammad Boburning hayoti, yurishlari va o‘z davri haqidagi bebaho asar.',
      ru: 'Бесценный труд о жизни, походах и эпохе Захириддина Мухаммада Бабура.',
      en: 'An invaluable account of the life, campaigns and era of Zahiriddin Muhammad Babur.',
    },
    tarixi: {
      uz: 'Asar 1494–1529-yillar voqealarini qamrab oladi va muallif tomonidan turkiy tilda yozilgan. Ko‘chirma nusxalari Hindiston, Eron va Markaziy Osiyo kutubxonalarida saqlanadi.',
      ru: 'Труд охватывает события 1494–1529 годов и написан автором на тюркском языке. Списки хранятся в библиотеках Индии, Ирана и Центральной Азии.',
      en: 'It covers the years 1494–1529 and was written by the author in Turkic. Copies are held in libraries in India, Iran and Central Asia.',
    },
    mazmuni: {
      uz: 'Uch qismdan iborat: Farg‘ona davri, Kobul davri va Hindiston davri. Muallif tabiat, urf-odat, hayvonot va nabotot dunyosini ham batafsil tasvirlagan.',
      ru: 'Состоит из трёх частей: ферганский, кабульский и индийский периоды. Автор подробно описывает природу, обычаи, флору и фауну.',
      en: 'It falls into three parts — the Fergana, Kabul and India periods — with detailed descriptions of nature, customs, flora and fauna.',
    },
    holati: {
      uz: 'Kutubxona fondidagi nusxa to‘liq raqamlashtirilgan, yuqori aniqlikdagi skanerlar interfeys orqali varaqlash uchun ochiq.',
      ru: 'Экземпляр фонда полностью оцифрован, сканы высокого разрешения доступны для просмотра через интерфейс.',
      en: 'The library’s copy is fully digitised; high-resolution scans can be browsed through this interface.',
    },
    facts: [
      { uz: 'Dunyoning 30 dan ortiq tiliga tarjima qilingan.', ru: 'Переведено более чем на 30 языков мира.', en: 'Translated into more than 30 languages.' },
      { uz: 'Jahon memuar adabiyotining ilk namunalaridan biri.', ru: 'Один из первых образцов мировой мемуарной литературы.', en: 'One of the earliest examples of world memoir literature.' },
    ],
  }),
  makeMeros({
    id: 'xamsa', categoryId: 'qolyozma', image: `${B}/xamsa.jpg`,
    name: { uz: 'Xamsa', ru: 'Хамса', en: 'Khamsa' },
    subtitle: { uz: 'Alisher Navoiy • XV asr', ru: 'Алишер Навои • XV век', en: 'Alisher Navoi • 15th c.' },
    summary: {
      uz: 'Alisher Navoiyning besh dostondan iborat mashhur to‘plami — turkiy adabiyotning cho‘qqisi.',
      ru: 'Знаменитое собрание пяти поэм Алишера Навои — вершина тюркской литературы.',
      en: 'Alisher Navoi’s famous set of five epic poems — the summit of Turkic literature.',
    },
    tarixi: {
      uz: '1483–1485-yillarda yozilgan. Nizomiy va Xusrav Dehlaviy an’anasini turkiy tilda davom ettirgan ilk yirik asar.',
      ru: 'Написана в 1483–1485 годах. Первое крупное произведение, продолжившее традицию Низами и Хосрова Дехлеви на тюркском языке.',
      en: 'Written in 1483–1485, it was the first major work to continue the tradition of Nizami and Amir Khusrau in Turkic.',
    },
    mazmuni: {
      uz: '“Hayrat ul-abror”, “Farhod va Shirin”, “Layli va Majnun”, “Sab’ai sayyor” va “Saddi Iskandariy” dostonlari.',
      ru: 'Поэмы «Смятение праведных», «Фархад и Ширин», «Лейли и Меджнун», «Семь планет», «Стена Искандара».',
      en: 'The poems “Confusion of the Righteous”, “Farhad and Shirin”, “Layli and Majnun”, “Seven Planets” and “Wall of Iskandar”.',
    },
    holati: {
      uz: 'Miniatyuralar bilan bezatilgan qo‘lyozma nusxasi maxsus haroratli xonada saqlanadi.',
      ru: 'Иллюстрированный миниатюрами список хранится в помещении с особым температурным режимом.',
      en: 'The miniature-illustrated manuscript is kept in a climate-controlled room.',
    },
    facts: [
      { uz: 'Beshta doston jami 50 mingdan ortiq misradan iborat.', ru: 'Пять поэм насчитывают более 50 тысяч строк.', en: 'The five poems total over 50,000 lines.' },
      { uz: 'Miniatyuralari Hirot maktabi san’atining namunasi.', ru: 'Миниатюры — образец гератской школы.', en: 'Its miniatures exemplify the Herat school.' },
    ],
  }),
  makeMeros({
    id: 'sahihi-buxoriy', categoryId: 'qolyozma', image: `${B}/sahihi-buxoriy.jpg`,
    name: { uz: 'Sahihi Buxoriy', ru: 'Сахих аль-Бухари', en: 'Sahih al-Bukhari' },
    subtitle: { uz: 'Imom al-Buxoriy • IX asr', ru: 'Имам аль-Бухари • IX век', en: 'Imam al-Bukhari • 9th c.' },
    summary: {
      uz: 'Hadis ilmidagi eng ishonchli to‘plam — 7275 ta sahih hadis jamlangan asar.',
      ru: 'Самый достоверный сборник в науке о хадисах — 7275 достоверных хадисов.',
      en: 'The most trusted collection in hadith studies, gathering 7,275 sound traditions.',
    },
    tarixi: {
      uz: 'Muallif asarni yozishga o‘n olti yil sarflagan, 600 mingdan ortiq hadisni tekshirib chiqqan.',
      ru: 'Автор работал над трудом шестнадцать лет, проверив более 600 тысяч хадисов.',
      en: 'The author spent sixteen years on the work, examining more than 600,000 traditions.',
    },
    mazmuni: {
      uz: 'Hadislar mavzular bo‘yicha kitob va boblarga ajratilgan: iymon, ilm, namoz, savdo, odob va boshqalar.',
      ru: 'Хадисы разделены по темам на книги и главы: вера, знание, молитва, торговля, нравы и другие.',
      en: 'The traditions are organised into books and chapters by theme: faith, knowledge, prayer, trade, manners and more.',
    },
    holati: {
      uz: 'Fonddagi XIX asr ko‘chirma nusxasi restavratsiya qilingan va raqamlashtirilgan.',
      ru: 'Список XIX века из фонда отреставрирован и оцифрован.',
      en: 'The fund’s 19th-century copy has been restored and digitised.',
    },
    facts: [
      { uz: 'Muallif har hadisdan oldin ikki rakat namoz o‘qigan.', ru: 'Перед каждым хадисом автор совершал молитву в два ракята.', en: 'The author prayed two rak‘ahs before each tradition.' },
      { uz: 'Islom olamida Qur’ondan keyingi ikkinchi manba hisoblanadi.', ru: 'В исламском мире считается вторым источником после Корана.', en: 'In the Islamic world it ranks second only to the Qur’an.' },
    ],
  }),
  makeMeros({
    id: 'temur-tuzuklari', categoryId: 'tarixiy', image: `${B}/temur-tuzuklari.jpg`,
    name: { uz: 'Temur tuzuklari', ru: 'Уложение Темура', en: 'Tuzuk-i Timuri' },
    subtitle: { uz: 'Amir Temur • XIV–XV asrlar', ru: 'Амир Темур • XIV–XV века', en: 'Amir Temur • 14th–15th c.' },
    summary: {
      uz: 'Davlat boshqaruvi, harbiy tuzum va adolat tamoyillari bayon etilgan tarixiy hujjat.',
      ru: 'Исторический документ о принципах государственного управления, военного устройства и справедливости.',
      en: 'A historical document setting out principles of governance, military order and justice.',
    },
    tarixi: {
      uz: 'Amir Temur nomi bilan bog‘liq asar XVII asrda fors tilida qayta ishlangan holda keng tarqalgan.',
      ru: 'Труд, связанный с именем Амира Темура, широко разошёлся в персидской редакции XVII века.',
      en: 'Associated with Amir Temur, the work spread widely in a 17th-century Persian recension.',
    },
    mazmuni: {
      uz: 'Ikki qismdan iborat: hukmdorning hayot yo‘li va davlatni boshqarish qoidalari — kengash, adolat, qo‘shin tuzilishi.',
      ru: 'Состоит из двух частей: жизненный путь правителя и правила управления — совет, справедливость, устройство войска.',
      en: 'It has two parts: the ruler’s life, and rules of government — counsel, justice and the structure of the army.',
    },
    holati: {
      uz: 'Kutubxonada bir necha ko‘chirma nusxa va o‘zbekcha tarjimalari saqlanadi.',
      ru: 'В библиотеке хранятся несколько списков и узбекские переводы.',
      en: 'The library holds several copies and Uzbek translations.',
    },
    facts: [
      { uz: '“Kuch — adolatdadir” shiori shu asardan olingan.', ru: 'Девиз «Сила — в справедливости» взят из этого труда.', en: 'The motto “Strength lies in justice” comes from this work.' },
      { uz: 'Ko‘plab Yevropa tillariga tarjima qilingan.', ru: 'Переведено на многие европейские языки.', en: 'It has been translated into many European languages.' },
    ],
  }),
  makeMeros({
    id: 'qisasi-rabguziy', categoryId: 'qolyozma', image: `${B}/qisasi-rabguziy.jpg`,
    name: { uz: 'Qisasi Rabg‘uziy', ru: 'Кисаси Рабгузи', en: 'Qisas-i Rabghuzi' },
    subtitle: { uz: 'Nosiruddin Rabg‘uziy • 1310-yil', ru: 'Насируддин Рабгузи • 1310 год', en: 'Nasiruddin Rabghuzi • 1310' },
    summary: {
      uz: 'Turkiy tildagi eng qadimiy nasriy yodgorliklardan biri — payg‘ambarlar qissalari to‘plami.',
      ru: 'Один из древнейших прозаических памятников на тюркском языке — сборник сказаний о пророках.',
      en: 'One of the oldest prose monuments in Turkic — a collection of tales of the prophets.',
    },
    tarixi: {
      uz: '1310-yilda Xorazmda yozilgan. Asar turkiy nasr uslubining shakllanishida muhim o‘rin tutadi.',
      ru: 'Написано в 1310 году в Хорезме и сыграло важную роль в становлении тюркской прозы.',
      en: 'Written in Khorezm in 1310, it played a key role in the formation of Turkic prose style.',
    },
    mazmuni: {
      uz: 'Odam Atodan Muhammad payg‘ambargacha bo‘lgan qissalar, ular orasida she’riy parchalar keltirilgan.',
      ru: 'Сказания от Адама до пророка Мухаммада, между которыми приведены поэтические вставки.',
      en: 'Tales from Adam to the Prophet Muhammad, interspersed with poetic passages.',
    },
    holati: {
      uz: 'Fonddagi nusxa nozik holatda, faqat raqamli ko‘rinishda taqdim etiladi.',
      ru: 'Экземпляр фонда в хрупком состоянии и доступен только в цифровом виде.',
      en: 'The fund’s copy is fragile and is available only in digital form.',
    },
    facts: [
      { uz: 'Xorazm turkiy adabiy tilining muhim manbai.', ru: 'Важный источник хорезмского тюркского литературного языка.', en: 'A key source for the Khorezmian Turkic literary language.' },
      { uz: 'Nusxalari London va Sankt-Peterburgda ham saqlanadi.', ru: 'Списки хранятся также в Лондоне и Санкт-Петербурге.', en: 'Copies are also held in London and Saint Petersburg.' },
    ],
  }),
  makeMeros({
    id: 'kimyoi-saodat', categoryId: 'qolyozma', image: `${B}/kimyoi-saodat.jpg`,
    name: { uz: 'Kimyoi saodat', ru: 'Кимиё-и саадат', en: 'Kimiya-yi Sa‘adat' },
    subtitle: { uz: 'Imom G‘azzoliy • XI–XII asrlar', ru: 'Имам Газали • XI–XII века', en: 'Imam al-Ghazali • 11th–12th c.' },
    summary: {
      uz: 'Axloq va ma’naviyat masalalariga bag‘ishlangan mashhur asar — “Baxt kimyosi”.',
      ru: 'Знаменитый труд о нравственности и духовности — «Эликсир счастья».',
      en: 'A celebrated work on ethics and spirituality — “The Alchemy of Happiness”.',
    },
    tarixi: {
      uz: 'Muallif tomonidan fors tilida yozilgan, keyinchalik turkiy tilga ham tarjima qilingan.',
      ru: 'Написан автором на персидском, позже переведён и на тюркский.',
      en: 'Written by the author in Persian and later translated into Turkic.',
    },
    mazmuni: {
      uz: 'Insonning o‘zini, Yaratganni, dunyoni va oxiratni bilishi haqidagi to‘rt asosiy bo‘lim.',
      ru: 'Четыре основных раздела: познание себя, Творца, мира и загробной жизни.',
      en: 'Four main sections on knowing oneself, the Creator, the world and the hereafter.',
    },
    holati: {
      uz: 'Fonddagi nusxa yaxshi saqlangan, o‘zbekcha tarjimasi bilan birga taqdim etiladi.',
      ru: 'Экземпляр фонда хорошо сохранился и представлен вместе с узбекским переводом.',
      en: 'The fund’s copy is well preserved and is presented alongside an Uzbek translation.',
    },
    facts: [
      { uz: 'Sharq ma’naviyatining eng ko‘p o‘qilgan asarlaridan biri.', ru: 'Одна из самых читаемых книг восточной духовности.', en: 'One of the most-read books of Eastern spirituality.' },
      { uz: 'Muallif “Hujjat ul-islom” laqabini olgan.', ru: 'Автор получил прозвище «Худжат уль-ислам».', en: 'The author earned the title “Proof of Islam”.' },
    ],
  }),
  makeMeros({
    id: 'turkiy-guliston', categoryId: 'noyob', image: `${B}/turkiy-guliston.jpg`,
    name: { uz: 'Turkiy guliston yoxud axloq', ru: 'Тюркский цветник, или Нравственность', en: 'Turkic Rose Garden, or Morality' },
    subtitle: { uz: 'Abdulla Avloniy • 1913-yil', ru: 'Абдулла Авлони • 1913 год', en: 'Abdulla Avloniy • 1913' },
    summary: {
      uz: 'Jadid maktablari uchun yozilgan axloq darsligi — milliy pedagogikaning asos toshi.',
      ru: 'Учебник нравственности для джадидских школ — краеугольный камень национальной педагогики.',
      en: 'A morality textbook for Jadid schools — a cornerstone of national pedagogy.',
    },
    tarixi: {
      uz: '1913-yilda Toshkentda chop etilgan. Kam nusxada bosilgani sababli bugungi kunda noyob nashr hisoblanadi.',
      ru: 'Издан в Ташкенте в 1913 году малым тиражом, поэтому сегодня считается редким.',
      en: 'Printed in Tashkent in 1913 in a small run, it is now considered a rare edition.',
    },
    mazmuni: {
      uz: 'Yaxshi va yomon xulqlar tasnifi, ilm olishning ahamiyati, vatanparvarlik va mehnatsevarlik haqidagi darslar.',
      ru: 'Классификация добрых и дурных нравов, значение учёбы, уроки патриотизма и трудолюбия.',
      en: 'A classification of good and bad character, the value of learning, and lessons in patriotism and industry.',
    },
    holati: {
      uz: 'Asl nashr maxsus saqlanadi, o‘quvchilarga raqamli nusxa taqdim etiladi.',
      ru: 'Оригинал хранится особо, читателям предоставляется цифровая копия.',
      en: 'The original is specially stored; readers are given a digital copy.',
    },
    facts: [
      { uz: 'O‘zbek tilidagi ilk tizimli axloq darsligi.', ru: 'Первый систематический учебник нравственности на узбекском языке.', en: 'The first systematic morality textbook in Uzbek.' },
      { uz: 'Bugungi kunda ham qayta nashr etib turiladi.', ru: 'Переиздаётся и в наши дни.', en: 'It is still reprinted today.' },
    ],
  }),
  makeMeros({
    id: 'otkan-kunlar', categoryId: 'noyob', image: `${B}/otkan-kunlar.jpg`,
    name: { uz: 'O‘tkan kunlar', ru: 'Минувшие дни', en: 'Days Gone By' },
    subtitle: { uz: 'Abdulla Qodiriy • 1926-yil', ru: 'Абдулла Кадыри • 1926 год', en: 'Abdulla Qodiriy • 1926' },
    summary: {
      uz: 'O‘zbek adabiyotidagi birinchi roman — milliy nasrning boshlanish nuqtasi.',
      ru: 'Первый роман узбекской литературы — точка отсчёта национальной прозы.',
      en: 'The first novel in Uzbek literature — the starting point of national prose.',
    },
    tarixi: {
      uz: 'Dastlab 1922-yildan boshlab jurnalda bo‘lib-bo‘lib chop etilgan, 1926-yilda alohida kitob holida chiqqan.',
      ru: 'Сначала печатался частями в журнале с 1922 года, отдельной книгой вышел в 1926-м.',
      en: 'First serialised in a journal from 1922, it appeared as a separate book in 1926.',
    },
    mazmuni: {
      uz: 'XIX asr o‘rtalaridagi Turkiston hayoti fonida Otabek va Kumushbibi sevgisi hikoya qilinadi.',
      ru: 'История любви Отабека и Кумушбиби на фоне жизни Туркестана середины XIX века.',
      en: 'The love of Otabek and Kumush unfolds against mid-19th-century Turkestan.',
    },
    holati: {
      uz: 'Birinchi nashr nusxasi kutubxonaning noyob fondida saqlanadi.',
      ru: 'Экземпляр первого издания хранится в редком фонде библиотеки.',
      en: 'A first-edition copy is held in the library’s rare collection.',
    },
    facts: [
      { uz: 'Bir necha bor kino va teatr sahnasiga ko‘chirilgan.', ru: 'Неоднократно экранизирован и поставлен на сцене.', en: 'It has been filmed and staged many times.' },
      { uz: 'O‘nlab tillarga tarjima qilingan.', ru: 'Переведён на десятки языков.', en: 'It has been translated into dozens of languages.' },
    ],
  }),
  makeMeros({
    id: 'ulugbek-xazinasi', categoryId: 'tarixiy', image: `${B}/ulugbek-xazinasi.jpg`,
    name: { uz: 'Ulug‘bek xazinasi', ru: 'Сокровищница Улугбека', en: 'Ulugh Beg’s Treasury' },
    subtitle: { uz: 'Odil Yoqubov • 1973-yil', ru: 'Адыл Якубов • 1973 год', en: 'Odil Yoqubov • 1973' },
    summary: {
      uz: 'Mirzo Ulug‘bek davri va uning fojiali taqdiri haqidagi tarixiy roman.',
      ru: 'Исторический роман об эпохе Мирзо Улугбека и его трагической судьбе.',
      en: 'A historical novel about Mirzo Ulugh Beg’s era and tragic fate.',
    },
    tarixi: {
      uz: '1973-yilda nashr etilgan asar o‘zbek tarixiy romanchiligining eng yirik namunalaridan biriga aylandi.',
      ru: 'Изданный в 1973 году роман стал одним из вершинных образцов узбекской исторической прозы.',
      en: 'Published in 1973, it became one of the summits of Uzbek historical fiction.',
    },
    mazmuni: {
      uz: 'Ilm va jaholat, hokimiyat va ma’rifat o‘rtasidagi kurash Ulug‘bek va uning shogirdlari taqdirida ochib beriladi.',
      ru: 'Борьба знания и невежества, власти и просвещения раскрывается в судьбах Улугбека и его учеников.',
      en: 'The struggle between knowledge and ignorance, power and enlightenment, plays out in the fates of Ulugh Beg and his students.',
    },
    holati: {
      uz: 'Kutubxonada birinchi nashr va keyingi qayta nashrlar to‘plami mavjud.',
      ru: 'В библиотеке есть первое издание и последующие переиздания.',
      en: 'The library holds the first edition and later reprints.',
    },
    facts: [
      { uz: 'Hamza nomidagi Davlat mukofotiga sazovor bo‘lgan.', ru: 'Удостоен Государственной премии имени Хамзы.', en: 'It won the Hamza State Prize.' },
      { uz: 'Rus, ingliz va boshqa tillarga tarjima qilingan.', ru: 'Переведён на русский, английский и другие языки.', en: 'Translated into Russian, English and other languages.' },
    ],
  }),
];

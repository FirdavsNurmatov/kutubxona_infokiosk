/* "Nodir meros" moduli — O'zbekiston Milliy kutubxonasi noyob fondining
   raqamlashtirilgan yodgorliklari.

   Ma'lumot manbai: fonddan berilgan hujjatlar va skanerlar
   (fond-originals/Nodir Meros/). Muqova va varaqlar
   public/interface/meros/fond/<id>/ ichida webp holida saqlanadi. */
import type { EncyclopediaCategory, EncyclopediaEntry, Localized } from '../api/types';

const IMG = '/interface/meros';
/** Raqamlashtirilgan fond — har bir nashrning muqovasi va varaqlari. */
const F = `${IMG}/fond`;

/** Modul bezaklari — fon naqshi va sahifa qirralari. */
export const merosArt = {
  heroBook: `${IMG}/hero-book.webp`,
  pageLeft: `${IMG}/page-left.webp`,
  pageRight: `${IMG}/page-right.webp`,
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

/** `p01.webp … pNN.webp` — varaqlagich uchun raqamlangan skanerlar. */
function scans(id: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${F}/${id}/p${String(i + 1).padStart(2, '0')}.webp`);
}

function makeMeros(o: {
  id: string; categoryId: string;
  /** Fonddagi shifr — muqova ostidagi qatorda ham ko'rsatiladi. */
  name: Localized; subtitle: Localized; summary: Localized;
  tarixi: Localized; mazmuni: Localized; holati: Localized;
  facts: Localized[];
  /** Raqamlashtirilgan varaqlar soni. */
  pageCount: number;
}): EncyclopediaEntry {
  return {
    id: o.id, name: o.name, subtitle: o.subtitle, categoryId: o.categoryId,
    image: `${F}/${o.id}/cover.webp`,
    summary: o.summary, facts: o.facts, pages: scans(o.id, o.pageCount),
    sections: [
      { id: 'tarixi', title: { uz: 'Tarixi', ru: 'История', en: 'History' }, body: [o.tarixi] },
      { id: 'mazmuni', title: { uz: 'Mazmuni', ru: 'Содержание', en: 'Contents' }, body: [o.mazmuni] },
      { id: 'holati', title: { uz: 'Saqlanish holati', ru: 'Состояние сохранности', en: 'Condition' }, body: [o.holati] },
    ],
  };
}

export const merosEntries: EncyclopediaEntry[] = [
  /* ══ Qo'lyozmalar ══════════════════════════════════ */
  makeMeros({
    id: 'mahbub-ul-qulub', categoryId: 'qolyozma', pageCount: 14,
    name: { uz: 'Mahbub ul-qulub', ru: 'Махбуб ул-кулуб', en: 'Mahbub ul-Qulub' },
    subtitle: {
      uz: 'Alisher Navoiy • 1824-yil nusxasi • Пв-233',
      ru: 'Алишер Навои • список 1824 года • Пв-233',
      en: 'Alisher Navoi • 1824 copy • Пв-233',
    },
    summary: {
      uz: '“Qalblar mahbubi” — Alisher Navoiyning so‘nggi asarlaridan biri, 1500-yilda yozilgan.',
      ru: '«Возлюбленный сердец» — одно из последних произведений Алишера Навои, написано в 1500 году.',
      en: '“The Beloved of Hearts” — one of Alisher Navoi’s final works, written in 1500.',
    },
    tarixi: {
      uz: 'Asar 1500-yilda yozilgan. Fonddagi qo‘lyozma nusxani Xoliqnazar Xalifa ibn usta Qurbon 1239 hijriy yilda (1824) Farg‘onaning Besharig‘ida ko‘chirgan.',
      ru: 'Произведение написано в 1500 году. Хранящийся в фонде список переписан Халикназаром Халифой ибн уста Курбаном в 1239 году хиджры (1824) в Бешарыке, Фергана.',
      en: 'The work was written in 1500. The manuscript held in the fund was copied by Khaliqnazar Khalifa ibn Usta Qurban in 1239 AH (1824) in Beshariq, Fergana.',
    },
    mazmuni: {
      uz: 'Uch qismdan iborat: turli ijtimoiy guruhlar va kasblar tavsifi, so‘fiylik odoblari hamda payg‘ambar va avliyolarning hikmatlari va pand-nasihatlari.',
      ru: 'Состоит из трёх частей: описание социальных групп и профессий, суфийская этика, а также мудрость и назидания пророков и святых.',
      en: 'It has three parts: various social groups and professions, Sufi ethics, and the wisdom and moral teachings of prophets and saints.',
    },
    holati: {
      uz: 'Пв-233 shifri ostida saqlanadi, to‘liq raqamlashtirilgan — varaqlar interfeys orqali ochiladi.',
      ru: 'Хранится под шифром Пв-233, полностью оцифрован — страницы доступны через интерфейс.',
      en: 'Held under shelfmark Пв-233 and fully digitised — the pages can be browsed in this interface.',
    },
    facts: [
      { uz: 'Navoiy asarni umrining so‘nggi yillarida — 1500-yilda yozgan.', ru: 'Навои написал этот труд в последние годы жизни — в 1500 году.', en: 'Navoi wrote the work in his final years, in 1500.' },
      { uz: 'Ko‘chirilganiga 200 yildan oshgan: nusxa 1824-yilda yozilgan.', ru: 'Списку более 200 лет: он переписан в 1824 году.', en: 'The copy is over 200 years old, written out in 1824.' },
    ],
  }),
  makeMeros({
    id: 'muqaddimat-al-adab', categoryId: 'qolyozma', pageCount: 14,
    name: { uz: 'Muqaddimat al-Adab', ru: 'Мукаддимат аль-Адаб', en: 'Muqaddimat al-Adab' },
    subtitle: {
      uz: 'Mahmud az-Zamaxshariy • 1308-yil nusxasi • Пв-56',
      ru: 'Махмуд аз-Замахшари • список 1308 года • Пв-56',
      en: 'Mahmud al-Zamakhshari • 1308 copy • Пв-56',
    },
    summary: {
      uz: '“Adabiyotga kirish” — arabcha-forscha lug‘at, fondning eng qadimiy qo‘lyozmalaridan biri.',
      ru: '«Введение в словесность» — арабско-персидский словарь, одна из древнейших рукописей фонда.',
      en: '“Introduction to Literature” — an Arabic-Persian dictionary, one of the oldest manuscripts in the fund.',
    },
    tarixi: {
      uz: 'Muallif — O‘rta Osiyoning buyuk mufassiri, muhaddisi va tilshunosi Abulqosim Mahmud ibn Umar az-Zamaxshariy. Qo‘lyozma 707 hijriy yilda (1308) ko‘chirilgan.',
      ru: 'Автор — великий среднеазиатский толкователь Корана, хадисовед и языковед Абулкасим Махмуд ибн Умар аз-Замахшари. Рукопись переписана в 707 году хиджры (1308).',
      en: 'The author, Abu’l-Qasim Mahmud ibn Umar al-Zamakhshari, was a great Central Asian Qur’anic commentator, hadith scholar and linguist. The manuscript was copied in 707 AH (1308).',
    },
    mazmuni: {
      uz: 'Arabcha so‘zlar va iboralar forscha izohlari bilan mavzular bo‘yicha joylashtirilgan — o‘rta asr madrasalarining asosiy til qo‘llanmasi.',
      ru: 'Арабские слова и выражения с персидскими толкованиями расположены по темам — основное языковое пособие средневековых медресе.',
      en: 'Arabic words and phrases with Persian glosses, arranged by topic — a core language handbook of the medieval madrasa.',
    },
    holati: {
      uz: 'Muhrdagi ma’lumotlarga ko‘ra, qo‘lyozma Buxoro amirligining qozikaloni Sharifjon Mahdum — Sadri Ziyo kutubxonasida saqlangan. Bugun Пв-56 shifri ostida.',
      ru: 'Согласно печати, рукопись хранилась в библиотеке казикалона Бухарского эмирата Шарифджона Махдума — Садри Зиё. Сегодня — под шифром Пв-56.',
      en: 'Its seal shows the manuscript was kept in the library of Sharifjon Mahdum — Sadri Ziyo, Qadi Kalon of the Emirate of Bukhara. Today it bears shelfmark Пв-56.',
    },
    facts: [
      { uz: 'Nusxa 700 yildan ortiq — fondning eng eski qo‘lyozmalaridan.', ru: 'Списку более 700 лет — один из старейших в фонде.', en: 'The copy is over 700 years old — among the fund’s oldest.' },
      { uz: 'Muhr Sadri Ziyo kutubxonasidan kelganini ko‘rsatadi.', ru: 'Печать указывает на происхождение из библиотеки Садри Зиё.', en: 'The seal traces it to the Sadri Ziyo library.' },
    ],
  }),
  makeMeros({
    id: 'silsilat-az-zahab', categoryId: 'qolyozma', pageCount: 14,
    name: { uz: 'Silsilat az-Zahab', ru: 'Силсилат аз-Захаб', en: 'Silsilat al-Dhahab' },
    subtitle: {
      uz: 'Abdurahmon Jomiy • 1581–1582-yillar nusxasi • Пв-61',
      ru: 'Абдуррахман Джами • список 1581–1582 годов • Пв-61',
      en: 'Abdurrahman Jami • 1581–1582 copy • Пв-61',
    },
    summary: {
      uz: '“Oltin zanjir” — Abdurahmon Jomiyning masnaviy janridagi falsafiy-axloqiy asari.',
      ru: '«Золотая цепь» — философско-нравственное произведение Абдуррахмана Джами в жанре маснави.',
      en: '“The Golden Chain” — Abdurrahman Jami’s philosophical and ethical work in the masnavi form.',
    },
    tarixi: {
      uz: 'Fonddagi qo‘lyozma 989–990 hijriy yillarda (1581–1582) nasta’liq xatida ko‘chirilgan.',
      ru: 'Рукопись фонда переписана почерком настаълик в 989–990 годах хиджры (1581–1582).',
      en: 'The fund’s manuscript was copied in Nasta‘liq script in 989–990 AH (1581–1582).',
    },
    mazmuni: {
      uz: 'Ibratli va tarbiyaviy mazmundagi hikoyalar zanjiri — har bir hikoya axloqiy xulosa bilan yakunlanadi.',
      ru: 'Цепь поучительных и назидательных рассказов — каждый завершается нравственным выводом.',
      en: 'A chain of instructive, morally themed stories, each closing with an ethical lesson.',
    },
    holati: {
      uz: 'Пв-61 shifrida saqlanadi; nasta’liq xati va hoshiyalari yaxshi saqlangan, varaqlari raqamlashtirilgan.',
      ru: 'Хранится под шифром Пв-61; почерк настаълик и поля хорошо сохранились, листы оцифрованы.',
      en: 'Held under shelfmark Пв-61; the Nasta‘liq script and margins are well preserved and the leaves are digitised.',
    },
    facts: [
      { uz: 'Nusxa Jomiy vafotidan taxminan 90 yil keyin ko‘chirilgan.', ru: 'Список сделан примерно через 90 лет после смерти Джами.', en: 'The copy was made about 90 years after Jami’s death.' },
      { uz: 'Masnaviy — qofiyalangan baytlardan tuzilgan doston shakli.', ru: 'Маснави — форма поэмы из рифмованных бейтов.', en: 'The masnavi is a narrative form built of rhymed couplets.' },
    ],
  }),
  makeMeros({
    id: 'sharh-al-mulaxxas', categoryId: 'qolyozma', pageCount: 14,
    name: {
      uz: 'Sharh “Al-Mulaxxas fi-l-hay’ati”',
      ru: 'Шарх «Аль-Мулаххас фи-ль-хайъа»',
      en: 'Sharh “Al-Mulakhkhas fi-l-hay’a”',
    },
    subtitle: {
      uz: 'Qozizoda Rumiy • 1648-yil nusxasi • Пв-71',
      ru: 'Казизаде Руми • список 1648 года • Пв-71',
      en: 'Qazi-zade Rumi • 1648 copy • Пв-71',
    },
    summary: {
      uz: 'Astronomiya haqidagi qisqacha risolaga yozilgan sharh — o‘rta asrlarning asosiy astronomiya qo‘llanmasi.',
      ru: 'Комментарий к краткому трактату по астрономии — основное учебное пособие Средневековья.',
      en: 'A commentary on a compendium of astronomy — the main medieval textbook on the subject.',
    },
    tarixi: {
      uz: 'Xorazmlik olim Mahmud ibn Muhammad ibn Umar al-Chag‘miniy (vaf. 1221-y.) asariga Qozizoda Rumiy (1364–1436) sharh yozgan. Nusxa 1058 hijriy/1648-yilda Buxoroda Mir Zuhur ibn Mirzo Toyyib tomonidan nasta’liqda ko‘chirilgan.',
      ru: 'Комментарий Казизаде Руми (1364–1436) к трактату хорезмийского учёного Махмуда ибн Мухаммада ибн Умара аль-Чагмини (ум. 1221). Список переписан почерком настаълик в 1058/1648 году в Бухаре Мир Зухуром ибн Мирзо Тайибом.',
      en: 'A commentary by Qazi-zade Rumi (1364–1436) on the treatise of Mahmud ibn Muhammad ibn ‘Umar al-Chagmini al-Khwarizmi (d. 1221). The copy was made in Nasta‘liq in 1058/1648 in Bukhara by Mir Zuhur ibn Mirza Tayyib.',
    },
    mazmuni: {
      uz: 'Osmon jismlarining tuzilishi va harakati, sferik astronomiya asoslari — matn va sharh yonma-yon joylashtirilgan.',
      ru: 'Строение и движение небесных тел, основы сферической астрономии — текст и комментарий расположены рядом.',
      en: 'The structure and motion of the heavenly bodies and the basics of spherical astronomy, with text and commentary side by side.',
    },
    holati: {
      uz: 'Пв-71 shifrida saqlanadi, sxema va chizmalari bilan birga raqamlashtirilgan.',
      ru: 'Хранится под шифром Пв-71, оцифрован вместе со схемами и чертежами.',
      en: 'Held under shelfmark Пв-71 and digitised together with its diagrams.',
    },
    facts: [
      { uz: 'Qozizoda Rumiy — Ulug‘bek madrasasining birinchi mudarrisi.', ru: 'Казизаде Руми — первый мударрис медресе Улугбека.', en: 'Qazi-zade Rumi was the first head teacher of Ulugh Beg’s madrasa.' },
      { uz: 'Sharh Sharq madrasalarida asrlar davomida darslik bo‘lgan.', ru: 'Комментарий веками служил учебником в восточных медресе.', en: 'The commentary served for centuries as a textbook in Eastern madrasas.' },
    ],
  }),

  /* ══ Noyob kitoblar ════════════════════════════════ */
  makeMeros({
    id: 'boburnoma', categoryId: 'noyob', pageCount: 14,
    name: { uz: 'Boburnoma', ru: 'Бабур-наме', en: 'Baburnama' },
    subtitle: {
      uz: 'London, Oxford University Press • 1921-yil • Пя-11672',
      ru: 'Лондон, Oxford University Press • 1921 год • Пя-11672',
      en: 'London, Oxford University Press • 1921 • Пя-11672',
    },
    summary: {
      uz: '“Boburnoma”ning eski o‘zbek tilidan ingliz tiliga o‘girilgan ilk to‘liq tarjimasi.',
      ru: 'Первый полный перевод «Бабур-наме» со староузбекского на английский язык.',
      en: 'The first complete English translation of the “Baburnama” from Old Uzbek.',
    },
    tarixi: {
      uz: 'Memoirs of Zahir-ed-Din Muhammed Babur, Emperor of Hindustan — muallifning o‘zi chig‘atoy turkiysida yozgan asarini Jon Leyden va Uilyam Erskin tarjima qilgan. London: Oxford University Press, 1921-yil.',
      ru: 'Memoirs of Zahir-ed-Din Muhammed Babur, Emperor of Hindustan — труд, написанный самим автором на чагатайском тюрки, перевели Джон Лейден и Уильям Эрскин. Лондон: Oxford University Press, 1921.',
      en: 'Memoirs of Zahir-ed-Din Muhammed Babur, Emperor of Hindustan — written by the author himself in Chaghatai Turki and translated by John Leyden and William Erskine. London: Oxford University Press, 1921.',
    },
    mazmuni: {
      uz: 'Boburning Farg‘ona, Kobul va Hindiston davrlari: yurishlar, saroy hayoti, tabiat, urf-odat, hayvonot va nabotot dunyosining batafsil tavsifi.',
      ru: 'Ферганский, кабульский и индийский периоды жизни Бабура: походы, придворная жизнь, подробные описания природы, обычаев, флоры и фауны.',
      en: 'Babur’s Fergana, Kabul and India years: campaigns, court life, and detailed descriptions of nature, customs, flora and fauna.',
    },
    holati: {
      uz: 'Пя-11672 shifrida noyob nashrlar fondida saqlanadi, to‘liq raqamlashtirilgan.',
      ru: 'Хранится в фонде редких изданий под шифром Пя-11672, полностью оцифрован.',
      en: 'Kept in the rare editions fund under shelfmark Пя-11672 and fully digitised.',
    },
    facts: [
      { uz: 'Tarjima ustida ish yarim asrdan ortiq davom etgan — Leyden 1811-yilda vafot etgan, Erskin uni yakunlagan.', ru: 'Работа над переводом растянулась более чем на полвека: Лейден умер в 1811 году, Эрскин завершил труд.', en: 'The translation spanned over half a century: Leyden died in 1811 and Erskine completed it.' },
      { uz: 'Jahon memuar adabiyotining ilk namunalaridan biri.', ru: 'Один из первых образцов мировой мемуарной литературы.', en: 'One of the earliest examples of world memoir literature.' },
    ],
  }),
  makeMeros({
    id: 'temur-tuzuklari-1783', categoryId: 'noyob', pageCount: 14,
    name: { uz: 'Temur tuzuklari', ru: 'Уложение Темура', en: 'Institutes of Timur' },
    subtitle: {
      uz: 'Oxford, Clarendon Press • 1783-yil • Пи-2806',
      ru: 'Оксфорд, Clarendon Press • 1783 год • Пи-2806',
      en: 'Oxford, Clarendon Press • 1783 • Пи-2806',
    },
    summary: {
      uz: '“Temur tuzuklari”ning fors va ingliz tillarida toshbosma usulida chop etilgan nashri.',
      ru: 'Литографическое издание «Уложения Темура» на персидском и английском языках.',
      en: 'A lithographic edition of the “Institutes of Timur” in Persian and English.',
    },
    tarixi: {
      uz: 'Institutes Political and Military… — Oxford: At the Clarendon-Press, M DCC LXXXIII, ya’ni 1783-yil. Nashrda asarni eski o‘zbek tilidan forsiyga o‘girgan tarjimon — xattot Abu Tolib Husayniy nomi zikr etiladi.',
      ru: 'Institutes Political and Military… — Oxford: At the Clarendon-Press, M DCC LXXXIII, то есть 1783 год. В издании упомянуто имя переводчика со староузбекского на персидский — каллиграфа Абу Толиба Хусайни.',
      en: 'Institutes Political and Military… — Oxford: At the Clarendon-Press, M DCC LXXXIII, that is 1783. The edition names the translator from Old Uzbek into Persian — the scribe Abu Talib Husayni.',
    },
    mazmuni: {
      uz: 'Davlat boshqaruvi, kengash, adolat tamoyillari va qo‘shin tuzilishi haqidagi qoidalar; matn ikki tilda yonma-yon berilgan.',
      ru: 'Правила государственного управления, совета, справедливости и устройства войска; текст дан параллельно на двух языках.',
      en: 'Rules of governance, counsel, justice and the structure of the army, with the text given in parallel in two languages.',
    },
    holati: {
      uz: 'Пи-2806 shifrida saqlanadi — XVIII asr Yevropa nashrlari orasidagi eng noyoblaridan biri.',
      ru: 'Хранится под шифром Пи-2806 — одно из редчайших европейских изданий XVIII века в фонде.',
      en: 'Held under shelfmark Пи-2806 — one of the rarest 18th-century European editions in the fund.',
    },
    facts: [
      { uz: 'Nashr Amir Temur haqidagi ilk ingliz tilidagi manbalardan biri.', ru: 'Издание — один из первых англоязычных источников об Амире Темуре.', en: 'The edition is among the first English-language sources on Amir Temur.' },
      { uz: 'Kitob 240 yildan ortiq yoshga ega.', ru: 'Книге более 240 лет.', en: 'The book is more than 240 years old.' },
    ],
  }),
  makeMeros({
    id: 'zafarnoma-1723', categoryId: 'noyob', pageCount: 14,
    name: { uz: 'Zafarnoma', ru: 'Зафар-наме', en: 'Zafarnama' },
    subtitle: {
      uz: 'Sharafiddin Ali Yazdiy • Delft, 1723-yil • Пи-2500',
      ru: 'Шарафиддин Али Йазди • Делфт, 1723 год • Пи-2500',
      en: 'Sharafiddin Ali Yazdi • Delft, 1723 • Пи-2500',
    },
    summary: {
      uz: 'Amir Temur haqidagi mashhur biografiyaning fors tilidan fransuz tiliga o‘girilgan to‘rt jildlik nashri.',
      ru: 'Четырёхтомное издание знаменитой биографии Амира Темура в переводе с персидского на французский.',
      en: 'A four-volume French translation from Persian of the famous biography of Amir Temur.',
    },
    tarixi: {
      uz: 'Histoire de Timur-Bec connu sous le nom du Grand Tamerlan, Tome I–IV. — Delft: Chez Reinier Boitet, MDCCXXIII, ya’ni 1723-yil. Asl asar — Sharafiddin Ali Yazdiyning “Zafarnoma”si.',
      ru: 'Histoire de Timur-Bec connu sous le nom du Grand Tamerlan, Tome I–IV. — Делфт: Chez Reinier Boitet, MDCCXXIII, то есть 1723 год. Оригинал — «Зафар-наме» Шарафиддина Али Йазди.',
      en: 'Histoire de Timur-Bec connu sous le nom du Grand Tamerlan, Tome I–IV. — Delft: Chez Reinier Boitet, MDCCXXIII, that is 1723. The original is Sharafiddin Ali Yazdi’s “Zafarnama”.',
    },
    mazmuni: {
      uz: 'Amir Temurning tug‘ilishidan vafotigacha bo‘lgan hayoti, yurishlari va davlat qurilishi to‘rt jildda batafsil bayon etilgan.',
      ru: 'В четырёх томах подробно изложены жизнь Амира Темура от рождения до кончины, его походы и государственное строительство.',
      en: 'Four volumes recount Amir Temur’s life from birth to death, his campaigns and his state-building.',
    },
    holati: {
      uz: 'Fondda birinchi jild Пи-2500 shifri ostida saqlanadi va raqamlashtirilgan.',
      ru: 'В фонде первый том хранится под шифром Пи-2500 и оцифрован.',
      en: 'The fund holds the first volume under shelfmark Пи-2500; it has been digitised.',
    },
    facts: [
      { uz: 'Yevropada Amir Temur “Buyuk Tamerlan” nomi bilan aynan shunday nashrlar orqali tanilgan.', ru: 'Именно через такие издания Европа узнала Амира Темура как «Великого Тамерлана».', en: 'Editions like this made Amir Temur known in Europe as “the Great Tamerlane”.' },
      { uz: 'Nashr 300 yildan oshgan.', ru: 'Изданию более 300 лет.', en: 'The edition is over 300 years old.' },
    ],
  }),
  makeMeros({
    id: 'humoyunnoma-1959', categoryId: 'noyob', pageCount: 14,
    name: { uz: 'Humoyunnoma', ru: 'Хумаюн-наме', en: 'Humayunnama' },
    subtitle: {
      uz: 'Gulbadan Begim • Toshkent, 1959-yil • Пя-10232',
      ru: 'Гулбадан Бегим • Ташкент, 1959 год • Пя-10232',
      en: 'Gulbadan Begim • Tashkent, 1959 • Пя-10232',
    },
    summary: {
      uz: 'Boburning kenja qizi Gulbadan Begimning otasi, akasi va jiyani haqidagi xotiralari.',
      ru: 'Воспоминания младшей дочери Бабура Гулбадан Бегим об отце, брате и племяннике.',
      en: 'The memoirs of Babur’s youngest daughter, Gulbadan Begim, about her father, brother and nephew.',
    },
    tarixi: {
      uz: 'Muallif — Gulbadan Begim (1523–1603), Zahiriddin Muhammad Boburning eng kenja qizi. Nashr: Toshkent, O‘zbekiston Fanlar akademiyasi nashriyoti, 1959-yil.',
      ru: 'Автор — Гулбадан Бегим (1523–1603), самая младшая дочь Захириддина Мухаммада Бабура. Издание: Ташкент, Издательство Академии наук Узбекистана, 1959.',
      en: 'The author, Gulbadan Begim (1523–1603), was the youngest daughter of Zahiriddin Muhammad Babur. Published in Tashkent by the Academy of Sciences of Uzbekistan Press in 1959.',
    },
    mazmuni: {
      uz: 'Kitobda Gulbadan Begim otasi Bobur, akasi Humoyun va jiyani Akbarlarning hayoti va faoliyati haqidagi xotiralarini bayon etgan.',
      ru: 'В книге Гулбадан Бегим излагает свои воспоминания о жизни и деятельности отца Бабура, брата Хумаюна и племянника Акбара.',
      en: 'In the book Gulbadan Begim recounts her memories of the life and work of her father Babur, her brother Humayun and her nephew Akbar.',
    },
    holati: {
      uz: 'Пя-10232 shifrida saqlanadi; nashr kam nusxada chiqqani sababli noyob fondga kiritilgan.',
      ru: 'Хранится под шифром Пя-10232; из-за малого тиража включено в редкий фонд.',
      en: 'Held under shelfmark Пя-10232; its small print run places it in the rare collection.',
    },
    facts: [
      { uz: 'Boburiylar tarixini ayol muallif ko‘zi bilan yoritgan yagona manba.', ru: 'Единственный источник по истории Бабуридов, написанный женщиной.', en: 'The only source on Baburid history written by a woman.' },
      { uz: 'Gulbadan Begim asarni jiyani Akbar topshirig‘i bilan yozgan.', ru: 'Гулбадан Бегим написала труд по поручению племянника Акбара.', en: 'Gulbadan Begim wrote the work at the request of her nephew Akbar.' },
    ],
  }),

  /* ══ Tarixiy meros ═════════════════════════════════ */
  makeMeros({
    id: 'turkiston-albomi', categoryId: 'tarixiy', pageCount: 16,
    name: { uz: 'Turkiston albomi', ru: 'Туркестанский альбом', en: 'Turkestan Album' },
    subtitle: {
      uz: 'Fotoalbom • 1871–1872-yillar',
      ru: 'Фотоальбом • 1871–1872 годы',
      en: 'Photo album • 1871–1872',
    },
    summary: {
      uz: 'Dunyoda uch nusxada mavjud fotoalbom — uning eng to‘liq nusxasi Milliy kutubxonada saqlanadi.',
      ru: 'Фотоальбом, существующий в мире всего в трёх экземплярах; самый полный хранится в Национальной библиотеке.',
      en: 'A photo album surviving in only three copies worldwide; the most complete is held by the National Library.',
    },
    tarixi: {
      uz: 'Albom 1871–1872-yillarda tayyorlangan va Milliy kutubxona bilan tengdosh. Boshqa nusxalari Rossiya va AQSH kutubxonalarida saqlanadi.',
      ru: 'Альбом подготовлен в 1871–1872 годах и является ровесником Национальной библиотеки. Другие экземпляры находятся в библиотеках России и США.',
      en: 'The album was produced in 1871–1872 and is as old as the National Library itself. The other copies are in libraries in Russia and the United States.',
    },
    mazmuni: {
      uz: 'Albom “Tarix”, “Arxeologiya” (I–II qism), “Etnografiya” (I–II qism) va “Ishlab chiqarish” bo‘limlariga taqsimlangan.',
      ru: 'Альбом разделён на разделы «История», «Археология» (I–II ч.), «Этнография» (I–II ч.) и «Промысловая».',
      en: 'The album is divided into “History”, “Archaeology” (parts I–II), “Ethnography” (parts I–II) and “Industry”.',
    },
    holati: {
      uz: 'Kutubxonaning eng noyob albomi; jildlar maxsus sharoitda saqlanadi, varaqlari yuqori aniqlikda raqamlashtirilgan.',
      ru: 'Самый редкий альбом библиотеки; тома хранятся в особых условиях, листы оцифрованы в высоком разрешении.',
      en: 'The library’s rarest album; the volumes are specially stored and the plates digitised at high resolution.',
    },
    facts: [
      { uz: 'Butun dunyoda atigi uchta nusxasi bor.', ru: 'Во всём мире сохранилось всего три экземпляра.', en: 'Only three copies survive worldwide.' },
      { uz: 'Fotosuratlar Markaziy Osiyoning XIX asrdagi qiyofasini hujjatlashtirgan.', ru: 'Фотографии документируют облик Центральной Азии XIX века.', en: 'The photographs document the face of 19th-century Central Asia.' },
    ],
  }),
  makeMeros({
    id: 'atlas-xvii', categoryId: 'tarixiy', pageCount: 14,
    name: { uz: 'XVII asr atlasi', ru: 'Атлас XVII века', en: 'Atlas of the 17th century' },
    subtitle: {
      uz: 'Qo‘lda bo‘yalgan xaritalar • XVII asr o‘rtalari',
      ru: 'Раскрашенные вручную карты • середина XVII века',
      en: 'Hand-coloured maps • mid-17th century',
    },
    summary: {
      uz: '150 sahifalik atlas — 75 ga yaqin rangli xarita jamlangan katta varaqli nashr.',
      ru: 'Атлас на 150 страницах — около 75 цветных карт на больших листах.',
      en: 'A 150-page atlas of large sheets holding some 75 colour maps.',
    },
    tarixi: {
      uz: 'Atlas taxminan XVII asr o‘rtalarida yaratilgan. Katta varaqlardan iborat bo‘lib, xaritalar qo‘lda bo‘yalgan.',
      ru: 'Атлас создан приблизительно в середине XVII века. Состоит из больших листов, карты раскрашены вручную.',
      en: 'The atlas was made around the middle of the 17th century, on large sheets with hand-coloured maps.',
    },
    mazmuni: {
      uz: 'Xaritalarning aksariyati Yevropa shaharlariga oid: Rim (№ 90–91), Konstantinopol (№ 106–107). Boshqalari dunyoning turli o‘lkalarini qamraydi: Meksika (68–69), Rossiya (130–131), Osiyo (134–135), Usmonlilar imperiyasi (140–141), Falastin (142–143), Hind okeani, Avstraliya va Okeaniya (144–145), Afrika (146–147), Amerika qit’asi (150–151), Markaziy Amerika orollari (152).',
      ru: 'Большинство карт посвящено европейским городам: Рим (№ 90–91), Константинополь (№ 106–107). Другие охватывают регионы мира: Мексика (68–69), Россия (130–131), Азия (134–135), Османская империя (140–141), Палестина (142–143), Индийский океан, Австралия и Океания (144–145), Африка (146–147), Америка (150–151), острова Центральной Америки (152).',
      en: 'Most maps describe European cities — Rome (nos. 90–91), Constantinople (nos. 106–107). Others cover Mexico (68–69), Russia (130–131), Asia (134–135), the Ottoman Empire (140–141), Palestine (142–143), the Indian Ocean, Australia and Oceania (144–145), Africa (146–147), America (150–151) and the islands of Central America (152).',
    },
    holati: {
      uz: 'Charm muqovasi va katta varaqlari saqlangan; nashr to‘liq raqamlashtirilgan.',
      ru: 'Кожаный переплёт и большие листы сохранены; издание полностью оцифровано.',
      en: 'Its leather binding and large sheets are intact; the volume is fully digitised.',
    },
    facts: [
      { uz: 'Atlasda Oy sathi tasvirlangan “Tabula Selenographica” xaritasi ham bor.', ru: 'В атласе есть и карта поверхности Луны «Tabula Selenographica».', en: 'The atlas even includes “Tabula Selenographica”, a map of the Moon’s surface.' },
      { uz: 'Har bir xarita qo‘lda bo‘yalgani uchun nusxalar bir-birini takrorlamaydi.', ru: 'Каждая карта раскрашена вручную, поэтому экземпляры не повторяют друг друга.', en: 'Each map is hand-coloured, so no two copies are alike.' },
    ],
  }),
  makeMeros({
    id: 'lugat-turk-fransuz', categoryId: 'tarixiy', pageCount: 14,
    name: { uz: 'Turkcha-fransuzcha lug‘at', ru: 'Турецко-французский словарь', en: 'Turkish-French dictionary' },
    subtitle: {
      uz: 'Diran Kelikyan • Konstantinopol, 1911-yil • O-Fc-6',
      ru: 'Диран Келекян • Константинополь, 1911 год • O-Fc-6',
      en: 'Diran Kélékian • Constantinople, 1911 • O-Fc-6',
    },
    summary: {
      uz: 'Ikki jildlik turkcha-fransuzcha rasmli lug‘at — XX asr boshi sharqshunosligining namunasi.',
      ru: 'Двухтомный турецко-французский иллюстрированный словарь — образец востоковедения начала XX века.',
      en: 'A two-volume illustrated Turkish-French dictionary — a specimen of early 20th-century Oriental studies.',
    },
    tarixi: {
      uz: 'Dictionnaire Turc-Français par Diran Kélékian. — Constantinople: Éditeur-Imprimeur Mihran, 1911-yil. Tuzuvchi Diran Kelikyan (1862–1915) — tilshunos olim va jurnalist.',
      ru: 'Dictionnaire Turc-Français par Diran Kélékian. — Константинополь: издатель-типограф Михран, 1911. Составитель Диран Келекян (1862–1915) — учёный-языковед и журналист.',
      en: 'Dictionnaire Turc-Français par Diran Kélékian. — Constantinople: publisher-printer Mihran, 1911. Compiled by Diran Kélékian (1862–1915), a linguist and journalist.',
    },
    mazmuni: {
      uz: 'Usmonli turkchasidagi so‘zlar arab yozuvida keltirilib, fransuzcha izohlari va rasmlari bilan berilgan.',
      ru: 'Слова османского турецкого приведены арабской графикой с французскими толкованиями и иллюстрациями.',
      en: 'Ottoman Turkish words are given in Arabic script with French glosses and illustrations.',
    },
    holati: {
      uz: 'O-Fc-6 shifrida saqlanadi; muqovasi va sarlavha varaqlari butun, nashr raqamlashtirilgan.',
      ru: 'Хранится под шифром O-Fc-6; переплёт и титульные листы целы, издание оцифровано.',
      en: 'Held under shelfmark O-Fc-6; the binding and title pages are intact and the edition is digitised.',
    },
    facts: [
      { uz: 'Lug‘at Usmonli turkchasi lotin yozuviga o‘tishidan ancha oldin tuzilgan.', ru: 'Словарь составлен задолго до перехода османского турецкого на латиницу.', en: 'The dictionary was compiled long before Ottoman Turkish switched to the Latin alphabet.' },
      { uz: 'Nashr Konstantinopolda — bugungi Istanbulda chop etilgan.', ru: 'Издание напечатано в Константинополе — нынешнем Стамбуле.', en: 'It was printed in Constantinople — today’s Istanbul.' },
    ],
  }),
  makeMeros({
    id: 'oyina-1913', categoryId: 'tarixiy', pageCount: 14,
    name: { uz: '“Oyina” jurnali', ru: 'Журнал «Ойина»', en: '“Oyina” magazine' },
    subtitle: {
      uz: 'Mahmudxo‘ja Behbudiy • 1913-yil',
      ru: 'Махмудходжа Бехбуди • 1913 год',
      en: 'Mahmudkhoja Behbudi • 1913',
    },
    summary: {
      uz: 'Turkistondagi birinchi milliy, haftalik, suratli jurnal — jadidchilik matbuotining boshlanishi.',
      ru: 'Первый в Туркестане национальный еженедельный иллюстрированный журнал — начало джадидской печати.',
      en: 'The first national weekly illustrated magazine in Turkestan — the start of the Jadid press.',
    },
    tarixi: {
      uz: 'Jurnalga Turkiston jadidlarining rahnamosi Mahmudxo‘ja Behbudiy asos solgan va muharrirlik qilgan. Birinchi soni 1913-yilning 20-avgustida B. Gazarov va K. Sliyanov litografiyasida bosilgan.',
      ru: 'Журнал основал и редактировал лидер туркестанских джадидов Махмудходжа Бехбуди. Первый номер напечатан 20 августа 1913 года в литографии Б. Газарова и К. Слиянова.',
      en: 'The magazine was founded and edited by Mahmudkhoja Behbudi, leader of the Turkestan Jadids. Its first issue was printed on 20 August 1913 at the lithography of B. Gazarov and K. Sliyanov.',
    },
    mazmuni: {
      uz: 'O‘lka hayotining turli sohalariga oid maqola va xabarlar: maorif, adabiyot, savdo, ijtimoiy masalalar.',
      ru: 'Статьи и сообщения о различных сферах жизни края: просвещение, литература, торговля, общественные вопросы.',
      en: 'Articles and reports on many sides of life in the region: education, literature, trade and social questions.',
    },
    holati: {
      uz: 'Jurnal to‘plami noyob nashrlar fondida saqlanadi va raqamlashtirilgan.',
      ru: 'Комплект журнала хранится в фонде редких изданий и оцифрован.',
      en: 'The run of the magazine is kept in the rare editions fund and has been digitised.',
    },
    facts: [
      { uz: 'Birinchi soni 1913-yil 20-avgustda chiqqan.', ru: 'Первый номер вышел 20 августа 1913 года.', en: 'The first issue appeared on 20 August 1913.' },
      { uz: 'Toshbosma usulida — litografiyada bosilgan.', ru: 'Печатался литографским способом.', en: 'It was produced by lithographic printing.' },
    ],
  }),
  makeMeros({
    id: 'kengash-1917', categoryId: 'tarixiy', pageCount: 10,
    name: { uz: '“Kengash” jurnali', ru: 'Журнал «Кенгаш»', en: '“Kengash” magazine' },
    subtitle: {
      uz: 'Hamza Hakimzoda Niyoziy • Qo‘qon, 1917-yil • Пяу-227',
      ru: 'Хамза Хакимзаде Ниязи • Коканд, 1917 год • Пяу-227',
      en: 'Hamza Hakimzoda Niyozi • Khoqand, 1917 • Пяу-227',
    },
    summary: {
      uz: 'Qo‘qon muallimlari chiqargan jurnal — 1917-yil bahoridagi ma’rifiy harakat ovozi.',
      ru: 'Журнал, издававшийся кокандскими учителями, — голос просветительского движения весны 1917 года.',
      en: 'A magazine issued by the teachers of Khoqand — the voice of the enlightenment movement in the spring of 1917.',
    },
    tarixi: {
      uz: 'Jurnal 1917-yil mart oyining oxirida Qo‘qon shahrida chiqa boshlagan. Muharriri Hamza Hakimzoda Niyoziy bo‘lgan.',
      ru: 'Журнал начал выходить в конце марта 1917 года в городе Коканде. Редактором был Хамза Хакимзаде Ниязи.',
      en: 'The magazine began to appear at the end of March 1917 in the city of Khoqand. Its editor was Hamza Hakimzoda Niyozi.',
    },
    mazmuni: {
      uz: 'Maorif, ijtimoiy islohot va o‘lka yangiliklari haqidagi maqolalar; jurnalni Qo‘qon muallimlari chiqargan.',
      ru: 'Статьи о просвещении, общественных реформах и новостях края; журнал издавали кокандские учителя.',
      en: 'Articles on education, social reform and regional news; the magazine was published by Khoqand teachers.',
    },
    holati: {
      uz: 'Пяу-227 shifrida saqlanadi, muqovasi va varaqlari raqamlashtirilgan.',
      ru: 'Хранится под шифром Пяу-227, переплёт и листы оцифрованы.',
      en: 'Held under shelfmark Пяу-227, with binding and leaves digitised.',
    },
    facts: [
      { uz: 'Muharriri — o‘zbek dramaturgiyasi asoschisi Hamza Hakimzoda Niyoziy.', ru: 'Редактор — основоположник узбекской драматургии Хамза Хакимзаде Ниязи.', en: 'Its editor was Hamza Hakimzoda Niyozi, founder of Uzbek drama.' },
      { uz: 'Jurnal 1917-yilgi o‘zgarishlar davrida chiqqan.', ru: 'Журнал выходил в эпоху перемен 1917 года.', en: 'The magazine appeared during the upheavals of 1917.' },
    ],
  }),
];

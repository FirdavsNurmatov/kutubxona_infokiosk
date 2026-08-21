/* Viktorina moduli — kattalar (neon) va bolalar bo'limi uchun umumiy ma'lumot.
   Ikkala bo'lim bitta savol bankidan `audience` bo'yicha ajratib oladi. */
import type { QuizCategory, QuizPreset, Question, Localized } from '../api/types';

const V = '/interface/viktorina';
const K = '/interface/bolalar';

export const adultCategories: QuizCategory[] = [
  { id: 'adabiyot', name: { uz: 'Adabiyot', ru: 'Литература', en: 'Literature' }, description: { uz: 'O‘zbek va jahon adabiyoti, yozuvchilar, asarlar', ru: 'Узбекская и мировая литература, писатели, произведения', en: 'Uzbek and world literature, writers, works' }, icon: 'BookOpen', accent: '#A855F7', questionCount: 120 },
  { id: 'tarix', name: { uz: 'Tarix', ru: 'История', en: 'History' }, description: { uz: 'O‘zbekiston tarixi va jahon tarixi', ru: 'История Узбекистана и мира', en: 'History of Uzbekistan and the world' }, icon: 'Landmark', accent: '#3B82F6', questionCount: 150 },
  { id: 'geografiya', name: { uz: 'Geografiya', ru: 'География', en: 'Geography' }, description: { uz: 'Dunyo va O‘zbekiston geografiyasi', ru: 'География мира и Узбекистана', en: 'World and Uzbek geography' }, icon: 'Globe', accent: '#22C55E', questionCount: 100 },
  { id: 'fan', name: { uz: 'Fan', ru: 'Наука', en: 'Science' }, description: { uz: 'Matematika, fizika, kimyo, biologiya va boshqalar', ru: 'Математика, физика, химия, биология и другое', en: 'Maths, physics, chemistry, biology and more' }, icon: 'Atom', accent: '#22D3EE', questionCount: 180 },
  { id: 'sanat', name: { uz: 'San’at', ru: 'Искусство', en: 'Art' }, description: { uz: 'Musiqa, rassomchilik, teatr va kino', ru: 'Музыка, живопись, театр и кино', en: 'Music, painting, theatre and cinema' }, icon: 'Palette', accent: '#F59E0B', questionCount: 90 },
  { id: 'ozbekiston', name: { uz: 'O‘zbekiston', ru: 'Узбекистан', en: 'Uzbekistan' }, description: { uz: 'Mamlakatimiz haqida qiziqarli ma’lumotlar', ru: 'Интересные сведения о нашей стране', en: 'Fascinating facts about our country' }, icon: 'Building2', accent: '#EC4899', questionCount: 200 },
];

export const kidsCategories: QuizCategory[] = [
  { id: 'k-adabiyot', name: { uz: 'Adabiyot', ru: 'Литература', en: 'Literature' }, description: { uz: 'Qiziqarli asarlar va yozuvchilar', ru: 'Интересные книги и писатели', en: 'Fun books and writers' }, icon: 'BookOpen', accent: '#6EBE4A', image: `${K}/topic-1.webp`, questionCount: 24 },
  { id: 'k-tarix', name: { uz: 'Tarix', ru: 'История', en: 'History' }, description: { uz: 'O‘zbekiston va jahon tarixi', ru: 'История Узбекистана и мира', en: 'History of Uzbekistan and the world' }, icon: 'Landmark', accent: '#3EA6DE', image: `${K}/topic-2.webp`, questionCount: 22 },
  { id: 'k-geografiya', name: { uz: 'Geografiya', ru: 'География', en: 'Geography' }, description: { uz: 'Davlatlar, shaharlar va tabiat', ru: 'Страны, города и природа', en: 'Countries, cities and nature' }, icon: 'Globe', accent: '#2FA36B', image: `${K}/topic-3.webp`, questionCount: 20 },
  { id: 'k-fan', name: { uz: 'Fan', ru: 'Наука', en: 'Science' }, description: { uz: 'Matematika, fizika, kimyo va boshqalar', ru: 'Математика, физика, химия и другое', en: 'Maths, physics, chemistry and more' }, icon: 'Atom', accent: '#8B5CF6', image: `${K}/topic-4.webp`, questionCount: 26 },
  { id: 'k-sanat', name: { uz: 'San’at', ru: 'Искусство', en: 'Art' }, description: { uz: 'Musiqa, rasmlar, kino va teatr', ru: 'Музыка, рисунки, кино и театр', en: 'Music, drawing, film and theatre' }, icon: 'Palette', accent: '#F0932B', image: `${K}/topic-5.webp`, questionCount: 18 },
  { id: 'k-ozbekiston', name: { uz: 'O‘zbekiston', ru: 'Узбекистан', en: 'Uzbekistan' }, description: { uz: 'Bizning yurtimiz haqida', ru: 'О нашей стране', en: 'About our homeland' }, icon: 'Flag', accent: '#EC5E7C', image: `${K}/topic-6.webp`, questionCount: 25 },
];

export const quizPresets: QuizPreset[] = [
  {
    id: 'tarix-viktorina', categoryId: 'tarix',
    title: { uz: 'O‘zbekiston tarixi viktorinasi', ru: 'Викторина по истории Узбекистана', en: 'Uzbek history quiz' },
    image: `${V}/featured.webp`,
    questionCount: 20, durationSec: 900, difficulty: 'medium',
    description: {
      uz: 'O‘zbekiston tarixining muhim voqealari va buyuk siymolariga oid savollar.',
      ru: 'Вопросы о важных событиях и великих личностях истории Узбекистана.',
      en: 'Questions on the key events and great figures of Uzbek history.',
    },
  },
  {
    id: 'adabiyot-viktorina', categoryId: 'adabiyot',
    title: { uz: 'O‘zbek adabiyoti bo‘yicha sinov', ru: 'Тест по узбекской литературе', en: 'Uzbek literature challenge' },
    image: `${V}/hero.webp`,
    questionCount: 15, durationSec: 600, difficulty: 'easy',
    description: {
      uz: 'Mumtoz va zamonaviy o‘zbek adabiyoti bo‘yicha savollar to‘plami.',
      ru: 'Набор вопросов по классической и современной узбекской литературе.',
      en: 'A set of questions on classical and modern Uzbek literature.',
    },
  },
];

/* ══ Savol banki ══════════════════════════════════════ */

function q(
  id: string, categoryId: string, audience: 'adult' | 'kids',
  text: Localized, options: Localized[], answer: number, explanation: Localized,
): Question {
  return { id, categoryId, audience, text, options, answer, explanation };
}

/** Faqat o'zbekcha variantlar uchun qisqartma — uch tilga bir xil tarqaladi. */
const L = (uz: string, ru: string, en: string): Localized => ({ uz, ru, en });

export const questions: Question[] = [
  /* ── Tarix (kattalar) ── */
  q('t1', 'tarix', 'adult',
    L('Amir Temur davlatiga qaysi yilda asos solgan?', 'В каком году Амир Темур основал своё государство?', 'In which year did Amir Temur found his state?'),
    [L('1336-yil', '1336 год', '1336'), L('1370-yil', '1370 год', '1370'), L('1405-yil', '1405 год', '1405'), L('1447-yil', '1447 год', '1447')], 1,
    L('1370-yilda Amir Temur Movarounnahrda hokimiyatni qo‘lga oldi.', 'В 1370 году Амир Темур взял власть в Мавераннахре.', 'In 1370 Amir Temur took power in Transoxiana.')),
  q('t2', 'tarix', 'adult',
    L('Mirzo Ulug‘bek rasadxonasi qaysi shaharda qurilgan?', 'В каком городе построена обсерватория Улугбека?', 'In which city was Ulugh Beg’s observatory built?'),
    [L('Buxoro', 'Бухара', 'Bukhara'), L('Xiva', 'Хива', 'Khiva'), L('Samarqand', 'Самарканд', 'Samarkand'), L('Toshkent', 'Ташкент', 'Tashkent')], 2,
    L('Rasadxona 1420-yillarda Samarqandda qurilgan.', 'Обсерватория построена в Самарканде в 1420-х годах.', 'The observatory was built in Samarkand in the 1420s.')),
  q('t3', 'tarix', 'adult',
    L('O‘zbekiston mustaqilligi qachon e’lon qilingan?', 'Когда провозглашена независимость Узбекистана?', 'When was Uzbekistan’s independence declared?'),
    [L('1991-yil 1-sentyabr', '1 сентября 1991', '1 September 1991'), L('1991-yil 31-avgust', '31 августа 1991', '31 August 1991'), L('1992-yil 8-dekabr', '8 декабря 1992', '8 December 1992'), L('1990-yil 20-iyun', '20 июня 1990', '20 June 1990')], 1,
    L('Bayonot 31-avgustda qabul qilingan, 1-sentyabr bayram kuni deb belgilangan.', 'Заявление принято 31 августа, 1 сентября объявлено праздником.', 'The declaration was adopted on 31 August; 1 September became the holiday.')),
  q('t4', 'tarix', 'adult',
    L('“Boburnoma” asari muallifi kim?', 'Кто автор «Бабур-наме»?', 'Who wrote the “Baburnama”?'),
    [L('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'), L('Zahiriddin Bobur', 'Захириддин Бабур', 'Zahiriddin Babur'), L('Abu Rayhon Beruniy', 'Абу Райхан Беруни', 'Abu Rayhan Biruni'), L('Amir Temur', 'Амир Темур', 'Amir Temur')], 1,
    L('Asar Zahiriddin Muhammad Bobur tomonidan turkiy tilda yozilgan.', 'Труд написан Захириддином Мухаммадом Бабуром на тюркском языке.', 'It was written by Zahiriddin Muhammad Babur in Turkic.')),
  q('t5', 'tarix', 'adult',
    L('Buyuk ipak yo‘lida asosiy vositachi bo‘lgan xalq qaysi?', 'Какой народ был главным посредником Великого шёлкового пути?', 'Which people were the main intermediaries on the Silk Road?'),
    [L('So‘g‘dlar', 'Согдийцы', 'Sogdians'), L('Skiflar', 'Скифы', 'Scythians'), L('Xettlar', 'Хетты', 'Hittites'), L('Finikiyaliklar', 'Финикийцы', 'Phoenicians')], 0,
    L('So‘g‘d savdogarlari Sharq va G‘arb o‘rtasidagi savdoni boshqargan.', 'Согдийские купцы вели торговлю между Востоком и Западом.', 'Sogdian merchants ran trade between East and West.')),
  q('t6', 'tarix', 'adult',
    L('Imom al-Buxoriy qaysi shaharda tug‘ilgan?', 'В каком городе родился Имам аль-Бухари?', 'In which city was Imam al-Bukhari born?'),
    [L('Samarqand', 'Самарканд', 'Samarkand'), L('Buxoro', 'Бухара', 'Bukhara'), L('Termiz', 'Термез', 'Termez'), L('Marg‘ilon', 'Маргилан', 'Margilan')], 1,
    L('U 810-yilda Buxoroda tug‘ilgan.', 'Он родился в Бухаре в 810 году.', 'He was born in Bukhara in 810.')),

  /* ── Adabiyot (kattalar) ── */
  q('a1', 'adabiyot', 'adult',
    L('O‘zbek adabiyotidagi birinchi roman qaysi?', 'Какой роман стал первым в узбекской литературе?', 'Which was the first novel in Uzbek literature?'),
    [L('“Sarob”', '«Мираж»', '“Mirage”'), L('“O‘tkan kunlar”', '«Минувшие дни»', '“Days Gone By”'), L('“Navoiy”', '«Навои»', '“Navoi”'), L('“Qutlug‘ qon”', '«Священная кровь»', '“Sacred Blood”')], 1,
    L('Abdulla Qodiriyning “O‘tkan kunlar” romani 1926-yilda nashr etilgan.', 'Роман Абдуллы Кадыри «Минувшие дни» издан в 1926 году.', 'Abdulla Qodiriy’s “Days Gone By” was published in 1926.')),
  q('a2', 'adabiyot', 'adult',
    L('“Xamsa” nechta dostondan iborat?', 'Из скольких поэм состоит «Хамса»?', 'How many poems make up the “Khamsa”?'),
    [L('Uchta', 'Три', 'Three'), L('To‘rtta', 'Четыре', 'Four'), L('Beshta', 'Пять', 'Five'), L('Oltita', 'Шесть', 'Six')], 2,
    L('“Xamsa” — “beshlik” degani, u besh dostondan tashkil topgan.', '«Хамса» означает «пятерица» и состоит из пяти поэм.', '“Khamsa” means “quintet” and comprises five poems.')),
  q('a3', 'adabiyot', 'adult',
    L('“Shum bola” qissasi muallifi kim?', 'Кто автор повести «Озорник»?', 'Who wrote the novella “The Mischievous Boy”?'),
    [L('Oybek', 'Айбек', 'Oybek'), L('G‘afur G‘ulom', 'Гафур Гулям', 'Gafur Gulom'), L('Abdulla Qahhor', 'Абдулла Каххар', 'Abdulla Qahhor'), L('Said Ahmad', 'Саид Ахмад', 'Said Ahmad')], 1,
    L('Qissa G‘afur G‘ulom qalamiga mansub.', 'Повесть принадлежит перу Гафура Гуляма.', 'The novella is by Gafur Gulom.')),
  q('a4', 'adabiyot', 'adult',
    L('“O‘zbegim” qasidasi kimning asari?', 'Чьё произведение касыда «Узбегим»?', 'Whose work is the ode “O‘zbegim”?'),
    [L('Erkin Vohidov', 'Эркин Вахидов', 'Erkin Vohidov'), L('Abdulla Oripov', 'Абдулла Арипов', 'Abdulla Oripov'), L('Muhammad Yusuf', 'Мухаммад Юсуф', 'Muhammad Yusuf'), L('Cho‘lpon', 'Чулпан', 'Cho‘lpon')], 0,
    L('“O‘zbegim” — Erkin Vohidovning mashhur qasidasi.', '«Узбегим» — знаменитая касыда Эркина Вахидова.', '“O‘zbegim” is Erkin Vohidov’s famous ode.')),
  q('a5', 'adabiyot', 'adult',
    L('Cho‘lponning asl ismi nima?', 'Каково настоящее имя Чулпана?', 'What was Cho‘lpon’s real name?'),
    [L('Muso Toshmuhammad o‘g‘li', 'Муса Ташмухаммад угли', 'Musa Toshmuhammad oʻgʻli'), L('Abdulhamid Sulaymon o‘g‘li', 'Абдулхамид Сулейман угли', 'Abdulhamid Sulaymon oʻgʻli'), L('Abdulla Qodiriy', 'Абдулла Кадыри', 'Abdulla Qodiriy'), L('Abdurauf Fitrat', 'Абдурауф Фитрат', 'Abdurauf Fitrat')], 1,
    L('Cho‘lpon — Abdulhamid Sulaymon o‘g‘li Yunusovning taxallusi.', 'Чулпан — псевдоним Абдулхамида Сулеймана угли Юнусова.', '“Cho‘lpon” was the pen name of Abdulhamid Sulaymon oʻgʻli Yunusov.')),
  q('a6', 'adabiyot', 'adult',
    L('“Dunyoning ishlari” asari kimga tegishli?', 'Кому принадлежит книга «Дела мирские»?', 'Who wrote “The Ways of the World”?'),
    [L('O‘tkir Hoshimov', 'Уткир Хашимов', 'Oʻtkir Hoshimov'), L('Tohir Malik', 'Тохир Малик', 'Tohir Malik'), L('Odil Yoqubov', 'Адыл Якубов', 'Odil Yoqubov'), L('Pirimqul Qodirov', 'Пиримкул Кадыров', 'Pirimqul Qodirov')], 0,
    L('Asar O‘tkir Hoshimovning eng mashhur kitoblaridan biri.', 'Это одна из самых известных книг Уткира Хашимова.', 'It is one of Oʻtkir Hoshimov’s best-known books.')),

  /* ── Fan (kattalar) ── */
  q('f1', 'fan', 'adult',
    L('“Algoritm” atamasi qaysi olim nomidan kelib chiqqan?', 'От имени какого учёного произошёл термин «алгоритм»?', 'Which scholar’s name gave us the word “algorithm”?'),
    [L('Al-Beruniy', 'Аль-Беруни', 'Al-Biruni'), L('Al-Xorazmiy', 'Аль-Хорезми', 'Al-Khwarizmi'), L('Al-Farg‘oniy', 'Аль-Фергани', 'Al-Farghani'), L('Ibn Sino', 'Ибн Сина', 'Ibn Sina')], 1,
    L('Muhammad al-Xorazmiy nomining lotincha shakli “algorithmi” dan kelib chiqqan.', 'От латинской формы имени «algorithmi».', 'From the Latinised form of his name, “algorithmi”.')),
  q('f2', 'fan', 'adult',
    L('Beruniy Yer radiusini necha kilometr deb hisoblagan?', 'Каким Беруни вычислил радиус Земли?', 'What figure did Biruni calculate for the Earth’s radius?'),
    [L('5980 km', '5980 км', '5,980 km'), L('6339 km', '6339 км', '6,339 km'), L('6720 km', '6720 км', '6,720 km'), L('7100 km', '7100 км', '7,100 km')], 1,
    L('Bu qiymat bugungi aniq o‘lchovdan atigi 20 km farq qiladi.', 'Это значение отличается от современного всего на 20 км.', 'That is only 20 km from the modern value.')),
  q('f3', 'fan', 'adult',
    L('“Tib qonunlari” asari muallifi kim?', 'Кто автор «Канона врачебной науки»?', 'Who wrote “The Canon of Medicine”?'),
    [L('Ibn Sino', 'Ибн Сина', 'Ibn Sina'), L('Ar-Roziy', 'Ар-Рази', 'Al-Razi'), L('Al-Kindiy', 'Аль-Кинди', 'Al-Kindi'), L('Ibn Rushd', 'Ибн Рушд', 'Ibn Rushd')], 0,
    L('Asar Yevropa universitetlarida olti asr davomida o‘qitilgan.', 'Труд преподавался в европейских университетах шесть веков.', 'It was taught in European universities for six centuries.')),
  q('f4', 'fan', 'adult',
    L('Ulug‘bek katalogida nechta yulduz keltirilgan?', 'Сколько звёзд в каталоге Улугбека?', 'How many stars are in Ulugh Beg’s catalogue?'),
    [L('870', '870', '870'), L('1018', '1018', '1,018'), L('1520', '1520', '1,520'), L('2402', '2402', '2,402')], 1,
    L('“Ziji jadidi Ko‘ragoniy”da 1018 ta yulduz o‘rni aniqlangan.', 'В «Зидж-и джадид-и Гурагани» указано положение 1018 звёзд.', 'The “Zij-i Sultani” fixes the positions of 1,018 stars.')),
  q('f5', 'fan', 'adult',
    L('Ahmad Farg‘oniy loyihalagan mashhur inshoot qaysi?', 'Какое знаменитое сооружение спроектировал Ахмад Фергани?', 'Which famous structure did al-Farghani design?'),
    [L('Nil suv o‘lchagichi', 'Нилометр', 'The Nilometer'), L('Bag‘dod ko‘prigi', 'Багдадский мост', 'The Baghdad bridge'), L('Samarqand rasadxonasi', 'Самаркандская обсерватория', 'The Samarkand observatory'), L('Ark qal’asi', 'Крепость Арк', 'The Ark fortress')], 0,
    L('861-yilda qurilgan bu inshoot bugungi kunda ham saqlanib qolgan.', 'Сооружение 861 года сохранилось до наших дней.', 'Built in 861, it still stands today.')),

  /* ── Geografiya (kattalar) ── */
  q('g1', 'geografiya', 'adult',
    L('O‘zbekistonning eng baland cho‘qqisi qaysi?', 'Какая вершина Узбекистана самая высокая?', 'What is Uzbekistan’s highest peak?'),
    [L('Xazrat Sulton', 'Хазрет Султан', 'Khazret Sultan'), L('Beshtor', 'Бештор', 'Beshtor'), L('Chimyon', 'Чимган', 'Chimgan'), L('Oqtosh', 'Акташ', 'Oqtosh')], 0,
    L('Xazrat Sulton cho‘qqisi 4643 metr balandlikda.', 'Пик Хазрет Султан — 4643 метра.', 'Khazret Sultan rises to 4,643 metres.')),
  q('g2', 'geografiya', 'adult',
    L('O‘zbekiston nechta davlat bilan chegaradosh?', 'Со сколькими странами граничит Узбекистан?', 'How many countries border Uzbekistan?'),
    [L('To‘rtta', 'Четыре', 'Four'), L('Beshta', 'Пять', 'Five'), L('Oltita', 'Шесть', 'Six'), L('Yettita', 'Семь', 'Seven')], 1,
    L('Qozog‘iston, Qirg‘iziston, Tojikiston, Afg‘oniston va Turkmaniston.', 'Казахстан, Кыргызстан, Таджикистан, Афганистан и Туркменистан.', 'Kazakhstan, Kyrgyzstan, Tajikistan, Afghanistan and Turkmenistan.')),
  q('g3', 'geografiya', 'adult',
    L('Amudaryo qaysi ikki daryoning qo‘shilishidan hosil bo‘ladi?', 'От слияния каких рек образуется Амударья?', 'Which two rivers merge to form the Amu Darya?'),
    [L('Panj va Vaxsh', 'Пяндж и Вахш', 'Panj and Vakhsh'), L('Norin va Qoradaryo', 'Нарын и Карадарья', 'Naryn and Kara Darya'), L('Zarafshon va Kashkadaryo', 'Зарафшан и Кашкадарья', 'Zarafshan and Kashkadarya'), L('Chirchiq va Ohangaron', 'Чирчик и Ахангаран', 'Chirchiq and Ohangaron')], 0,
    L('Panj va Vaxsh daryolari qo‘shilib Amudaryoni hosil qiladi.', 'Реки Пяндж и Вахш, сливаясь, образуют Амударью.', 'The Panj and Vakhsh join to form the Amu Darya.')),
  q('g4', 'geografiya', 'adult',
    L('Qaysi shahar YUNESKO ro‘yxatiga “Ichan qal’a” bilan kirgan?', 'Какой город вошёл в список ЮНЕСКО с «Ичан-Кала»?', 'Which city entered the UNESCO list with “Itchan Kala”?'),
    [L('Buxoro', 'Бухара', 'Bukhara'), L('Xiva', 'Хива', 'Khiva'), L('Shahrisabz', 'Шахрисабз', 'Shahrisabz'), L('Termiz', 'Термез', 'Termez')], 1,
    L('Xivaning ichki shahri 1990-yilda ro‘yxatga kiritilgan.', 'Внутренний город Хивы внесён в список в 1990 году.', 'Khiva’s inner city was inscribed in 1990.')),

  /* ── San'at (kattalar) ── */
  q('s1', 'sanat', 'adult',
    L('“Shashmaqom” nechta maqomdan iborat?', 'Из скольких макомов состоит «Шашмаком»?', 'How many maqams make up the “Shashmaqom”?'),
    [L('Beshta', 'Пять', 'Five'), L('Oltita', 'Шесть', 'Six'), L('Yettita', 'Семь', 'Seven'), L('To‘qqizta', 'Девять', 'Nine')], 1,
    L('“Shash” — olti degani, ya’ni oltita maqom turkumi.', '«Шаш» означает «шесть» — шесть циклов макомов.', '“Shash” means six — six maqam cycles.')),
  q('s2', 'sanat', 'adult',
    L('Hirot miniatyura maktabining eng mashhur ustasi kim?', 'Кто самый известный мастер гератской школы миниатюры?', 'Who is the best-known master of the Herat miniature school?'),
    [L('Kamoliddin Behzod', 'Камолиддин Бехзод', 'Kamoliddin Behzod'), L('Mahmud Muzahhib', 'Махмуд Музаххиб', 'Mahmud Muzahhib'), L('Sulton Ali Mashhadiy', 'Султан Али Машхади', 'Sultan Ali Mashhadi'), L('Sodiqbek Afshor', 'Садикбек Афшар', 'Sadiqi Beg')], 0,
    L('Kamoliddin Behzod Sharq miniatyurasining eng buyuk ustasi hisoblanadi.', 'Камолиддин Бехзод — величайший мастер восточной миниатюры.', 'Kamoliddin Behzod is considered the greatest master of Eastern miniature.')),
  q('s3', 'sanat', 'adult',
    L('Registon maydonidagi madrasalar soni nechta?', 'Сколько медресе на площади Регистан?', 'How many madrasas stand on Registan Square?'),
    [L('Ikkita', 'Два', 'Two'), L('Uchta', 'Три', 'Three'), L('To‘rtta', 'Четыре', 'Four'), L('Beshta', 'Пять', 'Five')], 1,
    L('Ulug‘bek, Sherdor va Tillakori madrasalari.', 'Медресе Улугбека, Шердор и Тилля-Кари.', 'The Ulugh Beg, Sher-Dor and Tilya-Kori madrasas.')),

  /* ── O'zbekiston (kattalar) ── */
  q('o1', 'ozbekiston', 'adult',
    L('O‘zbekiston Milliy kutubxonasi kimning nomi bilan atalgan?', 'Чьё имя носит Национальная библиотека Узбекистана?', 'After whom is the National Library of Uzbekistan named?'),
    [L('Abdulla Qodiriy', 'Абдулла Кадыри', 'Abdulla Qodiriy'), L('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'), L('Zahiriddin Bobur', 'Захириддин Бабур', 'Zahiriddin Babur'), L('Mirzo Ulug‘bek', 'Мирзо Улугбек', 'Mirzo Ulugh Beg')], 1,
    L('Kutubxona buyuk shoir Alisher Navoiy nomi bilan ataladi.', 'Библиотека носит имя великого поэта Алишера Навои.', 'The library bears the name of the great poet Alisher Navoi.')),
  q('o2', 'ozbekiston', 'adult',
    L('O‘zbekiston bayrog‘idagi yulduzlar soni nechta?', 'Сколько звёзд на флаге Узбекистана?', 'How many stars are on Uzbekistan’s flag?'),
    [L('Ettita', 'Семь', 'Seven'), L('O‘nta', 'Десять', 'Ten'), L('O‘n ikkita', 'Двенадцать', 'Twelve'), L('O‘n to‘rtta', 'Четырнадцать', 'Fourteen')], 2,
    L('O‘n ikki yulduz o‘n ikki burjni va yilning o‘n ikki oyini anglatadi.', 'Двенадцать звёзд символизируют двенадцать созвездий и месяцев.', 'Twelve stars stand for the twelve constellations and months.')),
  q('o3', 'ozbekiston', 'adult',
    L('Qaysi shahar “Sharq durdonasi” deb ataladi?', 'Какой город называют «жемчужиной Востока»?', 'Which city is called “the pearl of the East”?'),
    [L('Buxoro', 'Бухара', 'Bukhara'), L('Samarqand', 'Самарканд', 'Samarkand'), L('Xiva', 'Хива', 'Khiva'), L('Toshkent', 'Ташкент', 'Tashkent')], 1,
    L('Samarqand qadimdan shu nom bilan ulug‘lanadi.', 'Самарканд издревле славится этим именем.', 'Samarkand has long been honoured with this name.')),
  q('o4', 'ozbekiston', 'adult',
    L('O‘zbekistonda nechta viloyat mavjud?', 'Сколько областей в Узбекистане?', 'How many regions does Uzbekistan have?'),
    [L('O‘n ikki', 'Двенадцать', 'Twelve'), L('O‘n uch', 'Тринадцать', 'Thirteen'), L('O‘n to‘rt', 'Четырнадцать', 'Fourteen'), L('O‘n besh', 'Пятнадцать', 'Fifteen')], 0,
    L('12 ta viloyat, Qoraqalpog‘iston Respublikasi va Toshkent shahri.', '12 областей, Республика Каракалпакстан и город Ташкент.', 'Twelve regions, the Republic of Karakalpakstan and the city of Tashkent.')),

  /* ── Bolalar bo'limi ── */
  q('kt1', 'k-tarix', 'kids',
    L('Amir Temur qaysi shaharni poytaxt qilgan?', 'Какой город Амир Темур сделал столицей?', 'Which city did Amir Temur make his capital?'),
    [L('Buxoro', 'Бухара', 'Bukhara'), L('Samarqand', 'Самарканд', 'Samarkand'), L('Xiva', 'Хива', 'Khiva')], 1,
    L('Samarqand Amir Temur davrida jahon poytaxtiga aylangan.', 'При Амире Темуре Самарканд стал мировой столицей.', 'Under Amir Temur, Samarkand became a world capital.')),
  q('kt2', 'k-tarix', 'kids',
    L('Mustaqillik bayrami qaysi kuni nishonlanadi?', 'Когда отмечается День независимости?', 'When is Independence Day celebrated?'),
    [L('1-sentyabr', '1 сентября', '1 September'), L('9-may', '9 мая', '9 May'), L('21-mart', '21 марта', '21 March')], 0,
    L('Har yili 1-sentyabrda nishonlanadi.', 'Отмечается ежегодно 1 сентября.', 'It is celebrated every year on 1 September.')),
  q('kt3', 'k-tarix', 'kids',
    L('Yulduzlarni o‘rgangan buyuk shohimiz kim?', 'Какой наш великий правитель изучал звёзды?', 'Which of our great rulers studied the stars?'),
    [L('Mirzo Ulug‘bek', 'Мирзо Улугбек', 'Mirzo Ulugh Beg'), L('Bobur', 'Бабур', 'Babur'), L('Amir Temur', 'Амир Темур', 'Amir Temur')], 0,
    L('Mirzo Ulug‘bek Samarqandda rasadxona qurdirgan.', 'Мирзо Улугбек построил обсерваторию в Самарканде.', 'Mirzo Ulugh Beg built an observatory in Samarkand.')),
  q('kl1', 'k-adabiyot', 'kids',
    L('“Shum bola” asarining bosh qahramoni kim?', 'Кто главный герой повести «Озорник»?', 'Who is the hero of “The Mischievous Boy”?'),
    [L('Qo‘rqmas bola', 'Бесстрашный мальчик', 'A fearless boy'), L('Shum bola', 'Озорник', 'The mischievous boy'), L('Kichkina shahzoda', 'Маленький принц', 'The Little Prince')], 1,
    L('Asar shum va topqir bolaning sarguzashtlari haqida.', 'Повесть о приключениях озорного и находчивого мальчика.', 'The story follows a mischievous, quick-witted boy.')),
  q('kl2', 'k-adabiyot', 'kids',
    L('“Xamsa” asari muallifi kim?', 'Кто автор «Хамсы»?', 'Who wrote the “Khamsa”?'),
    [L('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'), L('Abdulla Qodiriy', 'Абдулла Кадыри', 'Abdulla Qodiriy'), L('G‘afur G‘ulom', 'Гафур Гулям', 'Gafur Gulom')], 0,
    L('Alisher Navoiy “Xamsa”ni besh dostondan yaratgan.', 'Алишер Навои создал «Хамсу» из пяти поэм.', 'Alisher Navoi composed the “Khamsa” from five poems.')),
  q('kg1', 'k-geografiya', 'kids',
    L('O‘zbekiston poytaxti qaysi shahar?', 'Какой город — столица Узбекистана?', 'Which city is the capital of Uzbekistan?'),
    [L('Samarqand', 'Самарканд', 'Samarkand'), L('Toshkent', 'Ташкент', 'Tashkent'), L('Buxoro', 'Бухара', 'Bukhara')], 1,
    L('Toshkent — mamlakatimizning poytaxti.', 'Ташкент — столица нашей страны.', 'Tashkent is our country’s capital.')),
  q('kg2', 'k-geografiya', 'kids',
    L('Eng katta daryolarimizdan biri qaysi?', 'Какая из наших рек самая большая?', 'Which is one of our largest rivers?'),
    [L('Amudaryo', 'Амударья', 'Amu Darya'), L('Volga', 'Волга', 'Volga'), L('Nil', 'Нил', 'Nile')], 0,
    L('Amudaryo — Markaziy Osiyodagi eng suvli daryo.', 'Амударья — самая полноводная река Центральной Азии.', 'The Amu Darya is Central Asia’s largest river by volume.')),
  q('kf1', 'k-fan', 'kids',
    L('2 + 2 × 2 nechaga teng?', 'Чему равно 2 + 2 × 2?', 'What is 2 + 2 × 2?'),
    [L('6', '6', '6'), L('8', '8', '8'), L('4', '4', '4')], 0,
    L('Avval ko‘paytirish bajariladi: 2 × 2 = 4, keyin 2 + 4 = 6.', 'Сначала умножение: 2 × 2 = 4, затем 2 + 4 = 6.', 'Multiply first: 2 × 2 = 4, then 2 + 4 = 6.')),
  q('kf2', 'k-fan', 'kids',
    L('Suvning kimyoviy formulasi qaysi?', 'Какова химическая формула воды?', 'What is the chemical formula for water?'),
    [L('CO₂', 'CO₂', 'CO₂'), L('H₂O', 'H₂O', 'H₂O'), L('O₂', 'O₂', 'O₂')], 1,
    L('Suv ikki vodorod va bir kislorod atomidan iborat.', 'Вода состоит из двух атомов водорода и одного кислорода.', 'Water is two hydrogen atoms and one oxygen atom.')),
  q('ks1', 'k-sanat', 'kids',
    L('Doira qaysi turkumga kiruvchi cholg‘u?', 'К какой группе относится дойра?', 'What kind of instrument is the doira?'),
    [L('Zarbli', 'Ударный', 'Percussion'), L('Torli', 'Струнный', 'String'), L('Puflama', 'Духовой', 'Wind')], 0,
    L('Doira — qo‘l bilan chalinadigan zarbli cholg‘u.', 'Дойра — ударный инструмент, на котором играют руками.', 'The doira is a hand-played percussion instrument.')),
  q('ko1', 'k-ozbekiston', 'kids',
    L('Bayrog‘imizdagi oy va yulduzlar qaysi rangda?', 'Какого цвета луна и звёзды на нашем флаге?', 'What colour are the moon and stars on our flag?'),
    [L('Oq', 'Белые', 'White'), L('Sariq', 'Жёлтые', 'Yellow'), L('Yashil', 'Зелёные', 'Green')], 0,
    L('Ko‘k maydondagi oy va o‘n ikki yulduz oq rangda.', 'На синем поле луна и двенадцать звёзд — белые.', 'On the blue field the crescent and twelve stars are white.')),
  q('ko2', 'k-ozbekiston', 'kids',
    L('Milliy taomimiz qaysi?', 'Какое наше национальное блюдо?', 'What is our national dish?'),
    [L('Palov', 'Плов', 'Palov'), L('Pizza', 'Пицца', 'Pizza'), L('Sushi', 'Суши', 'Sushi')], 0,
    L('Palov YUNESKOning nomoddiy meros ro‘yxatiga kiritilgan.', 'Плов внесён в список нематериального наследия ЮНЕСКО.', 'Palov is on the UNESCO intangible heritage list.')),
];

/* ══ Bolalar mini-o'yinlari ═══════════════════════════ */

export interface MiniGame {
  id: string;
  /** Qaysi dvigatel bilan o'ynaladi. */
  kind: 'memory' | 'quiz' | 'match' | 'word' | 'picture';
  title: Localized;
  image: string;
  accent: string;
}

export const miniGames: MiniGame[] = [
  { id: 'match', kind: 'match', title: { uz: 'Top va mosla', ru: 'Найди и сопоставь', en: 'Find and match' }, image: `${K}/game-1.webp`, accent: '#4F6FD6' },
  { id: 'memory', kind: 'memory', title: { uz: 'Xotirani sinang', ru: 'Проверь память', en: 'Test your memory' }, image: `${K}/game-2.webp`, accent: '#6EBE4A' },
  { id: 'quiz', kind: 'quiz', title: { uz: 'To‘g‘ri javobni tanla', ru: 'Выбери верный ответ', en: 'Pick the right answer' }, image: `${K}/game-3.webp`, accent: '#2FA36B' },
  { id: 'word', kind: 'word', title: { uz: 'So‘zlar olami', ru: 'Мир слов', en: 'World of words' }, image: `${K}/game-4.webp`, accent: '#2D6BC4' },
  { id: 'picture', kind: 'picture', title: { uz: 'Rasmli viktorina', ru: 'Викторина в картинках', en: 'Picture quiz' }, image: `${K}/game-5.webp`, accent: '#D94E7A' },
];

/** "Xotirani sinang" o'yini uchun juftliklar — kitob muqovalari. */
export const memoryCards: { id: string; image: string; label: Localized }[] = [
  { id: 'm1', image: '/images/books/otkan-kunlar.jpg', label: { uz: 'O‘tkan kunlar', ru: 'Минувшие дни', en: 'Days Gone By' } },
  { id: 'm2', image: '/images/books/shum-bola.jpg', label: { uz: 'Shum bola', ru: 'Озорник', en: 'The Mischievous Boy' } },
  { id: 'm3', image: '/images/books/boburnoma.jpg', label: { uz: 'Boburnoma', ru: 'Бабур-наме', en: 'Baburnama' } },
  { id: 'm4', image: '/images/books/xamsa.jpg', label: { uz: 'Xamsa', ru: 'Хамса', en: 'Khamsa' } },
  { id: 'm5', image: '/images/books/chipollino.jpg', label: { uz: 'Chipollino', ru: 'Чиполлино', en: 'Cipollino' } },
  { id: 'm6', image: '/images/books/kichkina-shahzoda.jpg', label: { uz: 'Kichkina shahzoda', ru: 'Маленький принц', en: 'The Little Prince' } },
];

/** "So'zlar olami" — harflardan so'z yig'ish topshiriqlari. */
export const wordPuzzles: { id: string; answer: string; hint: Localized }[] = [
  { id: 'w1', answer: 'KITOB', hint: { uz: 'Uni o‘qiymiz', ru: 'Мы это читаем', en: 'We read it' } },
  { id: 'w2', answer: 'QALAM', hint: { uz: 'U bilan yozamiz', ru: 'Им пишем', en: 'We write with it' } },
  { id: 'w3', answer: 'MAKTAB', hint: { uz: 'Bolalar u yerda o‘qiydi', ru: 'Там учатся дети', en: 'Where children study' } },
  { id: 'w4', answer: 'BAYROQ', hint: { uz: 'Yurtimiz ramzi', ru: 'Символ страны', en: 'A symbol of our country' } },
];

/* "O'zbekiston: kecha va bugun" — eski va zamonaviy suratlar juftligi. */
import type { PlacePair } from '../api/types';

const IMG = '/interface/kechabugun';

/* Maketda faqat bitta "oldin/hozir" juftligi bor (Registon), shuning uchun
   qolgan shaharlar uchun o'sha juftlik namuna sifatida ishlatiladi —
   backend ulanganda har bir joyning o'z arxiv surati keladi. */
export const placePairs: PlacePair[] = [
  {
    id: 'registon',
    city: { uz: 'Samarqand', ru: 'Самарканд', en: 'Samarkand' },
    place: { uz: 'Registon maydoni', ru: 'Площадь Регистан', en: 'Registan Square' },
    beforeYear: '1910',
    afterYear: '2024',
    before: `${IMG}/before.webp`,
    after: `${IMG}/after.webp`,
    thumb: `${IMG}/city-4.webp`,
    story: {
      uz: 'XX asr boshida Registon savdo maydoni bo‘lib, madrasalar atrofida bozor rastalari joylashgan edi. Bugungi kunda maydon to‘liq ta’mirlanib, YUNESKO Jahon merosi ro‘yxatiga kiritilgan.',
      ru: 'В начале XX века Регистан был торговой площадью с рядами базара вокруг медресе. Сегодня площадь полностью отреставрирована и входит в список Всемирного наследия ЮНЕСКО.',
      en: 'In the early 20th century Registan was a market square with bazaar rows around the madrasas. Today it is fully restored and inscribed on the UNESCO World Heritage List.',
    },
  },
  {
    id: 'toshkent',
    city: { uz: 'Toshkent', ru: 'Ташкент', en: 'Tashkent' },
    place: { uz: 'Hazrati Imom majmuasi', ru: 'Комплекс Хазрати Имам', en: 'Hazrati Imam complex' },
    beforeYear: '1925',
    afterYear: '2024',
    before: `${IMG}/before.webp`,
    after: `${IMG}/city-1.webp`,
    thumb: `${IMG}/city-1.webp`,
    story: {
      uz: 'Hazrati Imom majmuasi Toshkentning diniy-ma’rifiy markazi. Bu yerda dunyodagi eng qadimiy Usmon Qur’oni saqlanadi. 2007-yilda majmua qayta tiklandi.',
      ru: 'Комплекс Хазрати Имам — духовно-просветительский центр Ташкента, где хранится древнейший Коран Усмана. В 2007 году комплекс был реконструирован.',
      en: 'The Hazrati Imam complex is Tashkent’s religious and educational centre, home to the oldest Uthman Qur’an. It was rebuilt in 2007.',
    },
  },
  {
    id: 'buxoro',
    city: { uz: 'Buxoro', ru: 'Бухара', en: 'Bukhara' },
    place: { uz: 'Ark qal’asi', ru: 'Крепость Арк', en: 'The Ark fortress' },
    beforeYear: '1900',
    afterYear: '2024',
    before: `${IMG}/before.webp`,
    after: `${IMG}/city-2.webp`,
    thumb: `${IMG}/city-2.webp`,
    story: {
      uz: 'Ark — Buxoro amirlarining qarorgohi bo‘lgan qadimiy qal’a. Uning tarixi ikki ming yildan ortiq. Bugun qal’ada muzey joylashgan.',
      ru: 'Арк — древняя крепость, резиденция бухарских эмиров, история которой насчитывает более двух тысяч лет. Сегодня здесь музей.',
      en: 'The Ark is an ancient citadel and residence of the emirs of Bukhara, with over two thousand years of history. It now houses a museum.',
    },
  },
  {
    id: 'xiva',
    city: { uz: 'Xiva', ru: 'Хива', en: 'Khiva' },
    place: { uz: 'Ichan qal’a', ru: 'Ичан-Кала', en: 'Itchan Kala' },
    beforeYear: '1913',
    afterYear: '2024',
    before: `${IMG}/before.webp`,
    after: `${IMG}/city-3.webp`,
    thumb: `${IMG}/city-3.webp`,
    story: {
      uz: 'Ichan qal’a — Xivaning ichki shahri, butunligicha saqlanib qolgan yagona o‘rta asr shahar majmuasi. 1990-yilda YUNESKO ro‘yxatiga kiritilgan.',
      ru: 'Ичан-Кала — внутренний город Хивы, единственный полностью сохранившийся средневековый городской ансамбль. В 1990 году внесён в список ЮНЕСКО.',
      en: 'Itchan Kala, the inner city of Khiva, is the only fully preserved medieval urban ensemble in the region. It joined the UNESCO list in 1990.',
    },
  },
  {
    id: 'fargona',
    city: { uz: 'Farg‘ona vodiysi', ru: 'Ферганская долина', en: 'Fergana Valley' },
    place: { uz: 'Chorvoq va tog‘ manzaralari', ru: 'Чарвак и горные пейзажи', en: 'Charvak and mountain landscapes' },
    beforeYear: '1930',
    afterYear: '2024',
    before: `${IMG}/before.webp`,
    after: `${IMG}/city-5.webp`,
    thumb: `${IMG}/city-5.webp`,
    story: {
      uz: 'Farg‘ona vodiysi — mamlakatning eng sertuproq va gavjum hududi. Tog‘ etaklaridagi tabiat manzaralari asrlar davomida sayyohlarni jalb qilib kelgan.',
      ru: 'Ферганская долина — самый плодородный и густонаселённый регион страны. Природа предгорий веками привлекала путешественников.',
      en: 'The Fergana Valley is the country’s most fertile and populous region; its foothill landscapes have drawn travellers for centuries.',
    },
  },
];

export interface ArchiveKind {
  id: string;
  label: { uz: string; ru: string; en: string };
  icon: string;
  accent: string;
  count: number;
}

export const archiveKinds: ArchiveKind[] = [
  { id: 'foto', label: { uz: 'Tarixiy foto arxivlar', ru: 'Исторические фотоархивы', en: 'Historical photo archives' }, icon: 'Image', accent: '#1E6FD9', count: 1240 },
  { id: 'video', label: { uz: 'Tarixiy video arxivlar', ru: 'Исторические видеоархивы', en: 'Historical video archives' }, icon: 'Clapperboard', accent: '#0F8A6E', count: 318 },
  { id: 'kitob', label: { uz: 'Raqamli kitoblar', ru: 'Цифровые книги', en: 'Digital books' }, icon: 'BookOpen', accent: '#6B3FBF', count: 862 },
  { id: 'audio', label: { uz: 'Audiolar va hikoyalar', ru: 'Аудио и рассказы', en: 'Audio and stories' }, icon: 'Mic', accent: '#C87A16', count: 205 },
];

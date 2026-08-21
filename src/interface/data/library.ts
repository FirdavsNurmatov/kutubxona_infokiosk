/* Kutubxona haqidagi ma'lumot.
   Manzil, telefon va jadval butun ilova bo'ylab bitta joyda saqlanadi
   (`src/data/mockData.ts` dagi `contact`) — bu yerda faqat interfeys
   oynasi uchun kerakli shaklga keltiriladi va tanishtiruv matni
   qo'shiladi. Backend ulanganda `getLibraryInfo` HTTP javobini qaytaradi. */
import { contact } from '../../data/mockData';
import type { LibraryInfo } from '../api/types';

export const libraryInfo: LibraryInfo = {
  name: {
    uz: 'O‘zbekiston Milliy kutubxonasi',
    ru: 'Национальная библиотека Узбекистана',
    en: 'National Library of Uzbekistan',
  },
  summary: [
    {
      uz: 'Alisher Navoiy nomidagi O‘zbekiston Milliy kutubxonasi — mamlakatning eng yirik kitob xazinasi. Bu yerda qo‘lyozmalar, nodir nashrlar, davriy matbuot va elektron resurslar jamlangan.',
      ru: 'Национальная библиотека Узбекистана имени Алишера Навои — крупнейшее книжное собрание страны. Здесь хранятся рукописи, редкие издания, периодика и электронные ресурсы.',
      en: 'The Alisher Navoi National Library of Uzbekistan is the country’s largest book collection, holding manuscripts, rare editions, periodicals and electronic resources.',
    },
    {
      uz: 'O‘quv zallari, multimedia xonalari, bolalar bo‘limi va til markazlari barcha tashrifchilar uchun ochiq.',
      ru: 'Читальные залы, мультимедийные комнаты, детский отдел и языковые центры открыты для всех посетителей.',
      en: 'Reading halls, multimedia rooms, a children’s department and language centres are open to every visitor.',
    },
  ],
  address: contact.address,
  schedule: contact.schedule,
  phone: contact.phone,
  email: contact.email,
  website: contact.website,
};

/* Interfeys modullarining ro'yxati va yo'llari.
   Yo'l: /interface           → hub
         /interface/<slug>    → modul */
import type { Localized } from './api/types';

export type ModuleId =
  | 'hub' | 'meros' | 'allomalar' | 'siymolar'
  | 'tarix' | 'kechabugun' | 'viktorina' | 'bolalar';

export interface ModuleDef {
  id: ModuleId;
  /** URL bo'lagi. Hub uchun bo'sh. */
  slug: string;
  title: Localized;
  /** Hub sahifasidagi qisqa izoh. */
  tagline: Localized;
  icon: string;
}

export const INTERFACE_PATH = '/interface';

export const MODULES: ModuleDef[] = [
  {
    id: 'hub', slug: '', icon: 'Home',
    title: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
    tagline: { uz: 'Kutubxonani kashf et', ru: 'Откройте библиотеку', en: 'Discover the library' },
  },
  {
    id: 'meros', slug: 'meros', icon: 'BookOpenText',
    title: { uz: 'Nodir meros', ru: 'Редкое наследие', en: 'Rare heritage' },
    tagline: { uz: 'Qo‘lyozmalar va noyob kitoblar', ru: 'Рукописи и редкие книги', en: 'Manuscripts and rare books' },
  },
  {
    id: 'allomalar', slug: 'allomalar', icon: 'GraduationCap',
    title: { uz: 'Buyuk allomalar', ru: 'Великие учёные', en: 'Great scholars' },
    tagline: { uz: 'Ilm-fan merosi', ru: 'Наследие науки', en: 'The legacy of science' },
  },
  {
    id: 'siymolar', slug: 'siymolar', icon: 'Users',
    title: { uz: 'O‘zbekistonning 100 siymosi', ru: '100 личностей Узбекистана', en: '100 figures of Uzbekistan' },
    tagline: { uz: 'Tarix • Ilm • San’at • Sport', ru: 'История • Наука • Искусство • Спорт', en: 'History • Science • Art • Sport' },
  },
  {
    id: 'tarix', slug: 'tarix', icon: 'Hourglass',
    title: { uz: 'O‘zbekiston tarixi', ru: 'История Узбекистана', en: 'History of Uzbekistan' },
    tagline: { uz: 'Vaqt oralig‘ida sayohat qiling', ru: 'Путешествие сквозь время', en: 'Travel through time' },
  },
  {
    id: 'kechabugun', slug: 'kecha-bugun', icon: 'Images',
    title: { uz: 'Kecha va bugun', ru: 'Вчера и сегодня', en: 'Then and now' },
    tagline: { uz: 'Eski va zamonaviy suratlarni solishtiring', ru: 'Сравните старые и новые снимки', en: 'Compare old and new photographs' },
  },
  {
    id: 'viktorina', slug: 'viktorina', icon: 'Brain',
    title: { uz: 'Bilimingizni sinang', ru: 'Проверьте знания', en: 'Test your knowledge' },
    tagline: { uz: 'Intellektual o‘yinlar olami', ru: 'Мир интеллектуальных игр', en: 'A world of intellectual games' },
  },
  {
    id: 'bolalar', slug: 'bolalar', icon: 'Baby',
    title: { uz: 'Bolalar bo‘limi', ru: 'Детский раздел', en: 'Kids’ section' },
    tagline: { uz: 'Qiziqarli savollar va o‘yinlar', ru: 'Увлекательные вопросы и игры', en: 'Fun questions and games' },
  },
];

const BY_SLUG = new Map(MODULES.map((m) => [m.slug, m]));

/** Manzil yo'lidan modulni aniqlaydi. Notanish yo'l hub'ga tushadi. */
export function moduleFromPath(pathname: string): ModuleDef {
  const rest = pathname.replace(INTERFACE_PATH, '').replace(/^\/+|\/+$/g, '');
  return BY_SLUG.get(rest) ?? MODULES[0];
}

export function pathFor(id: ModuleId): string {
  const mod = MODULES.find((m) => m.id === id) ?? MODULES[0];
  return mod.slug ? `${INTERFACE_PATH}/${mod.slug}` : INTERFACE_PATH;
}

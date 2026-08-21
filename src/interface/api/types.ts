/*
 * Interfeys modullarining ma'lumot shartnomasi.
 *
 * MUHIM: modullar ma'lumotni faqat `src/interface/api` orqali oladi.
 * Hozir uni mock adapter qaytaradi, keyinchalik backend ulanganda
 * shu tiplarning o'zi HTTP javobining shakli bo'ladi — komponentlarga
 * tegilmaydi. Shuning uchun bu yerdagi har bir tur backend bilan
 * kelishilgan shartnoma sifatida qaraladi.
 */
import type { Lang } from '../../i18n/translations';

/** Uch tilli matn. Backend ham shu shaklda qaytaradi. */
export type Localized = Record<Lang, string>;

/* ══ Kutubxona haqida ═════════════════════════════════
   Pastki navigatsiyadagi "Kutubxona haqida" oynasi shu
   ma'lumotdan quriladi. Bo'sh maydonlar ko'rsatilmaydi —
   backend to'ldirmaguncha qator umuman chiqmaydi. */

export interface LibraryInfo {
  name: Localized;
  /** Bir-ikki abzats qisqacha tanishtiruv. */
  summary: Localized[];
  address: Localized;
  /** Kun va soatlar jadvali. */
  schedule: { days: Localized; hours: Localized }[];
  phone: string;
  email: string;
  website: string;
}

/* ══ Umumiy ensiklopediya modeli ══════════════════════
   Allomalar, 100 siymo va Nodir meros — uchalasi ham
   "kategoriya → yozuv → bo'limlar" tuzilishiga tushadi. */

export interface EntrySection {
  id: string;
  title: Localized;
  /** Abzatslar ro'yxati — har biri alohida <p>. */
  body: Localized[];
}

export interface EncyclopediaEntry {
  id: string;
  name: Localized;
  /** Yillari yoki muallifi — sarlavha ostidagi qator. */
  subtitle: Localized;
  categoryId: string;
  image: string;
  summary: Localized;
  sections: EntrySection[];
  /** "Qiziqarli faktlar" bloki uchun. */
  facts: Localized[];
}

export interface EncyclopediaCategory {
  id: string;
  name: Localized;
  description: Localized;
  /** lucide-react ikonkasining nomi. */
  icon: string;
  image?: string;
  /** Kategoriyadagi yozuvlar soni (backend hisoblab beradi). */
  count: number;
  /** CSS rang — kartochka aksenti. */
  accent: string;
}

/* ══ Tarix moduli ═════════════════════════════════════ */

export interface EraStat {
  label: Localized;
  value: number;
  icon: string;
}

export interface Era {
  id: string;
  name: Localized;
  period: Localized;
  summary: Localized;
  body: Localized[];
  /** Vaqt lentasidagi doira uchun kichik tasvir. */
  image: string;
  /** Davr paneli uchun keng tasvir. */
  detailImage: string;
  stats: EraStat[];
}

export interface HistoryEvent {
  id: string;
  eraId: string;
  title: Localized;
  date: Localized;
  image: string;
  body: Localized;
}

/* ══ Kecha va bugun moduli ════════════════════════════ */

export interface PlacePair {
  id: string;
  city: Localized;
  place: Localized;
  beforeYear: string;
  afterYear: string;
  before: string;
  after: string;
  thumb: string;
  story: Localized;
}

/* ══ Viktorina (kattalar va bolalar uchun umumiy) ═════ */

export interface QuizCategory {
  id: string;
  name: Localized;
  description: Localized;
  icon: string;
  /** Neon/bolalar mavzusidagi aksent rang. */
  accent: string;
  image?: string;
  questionCount: number;
}

export interface Question {
  id: string;
  categoryId: string;
  /** 'adult' — neon viktorina, 'kids' — bolalar bo'limi. */
  audience: 'adult' | 'kids';
  text: Localized;
  options: Localized[];
  /** To'g'ri javobning `options` ichidagi indeksi. */
  answer: number;
  explanation: Localized;
}

export interface QuizPreset {
  id: string;
  categoryId: string;
  title: Localized;
  image: string;
  questionCount: number;
  /** Butun test uchun ajratilgan vaqt, soniyada. */
  durationSec: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description: Localized;
}

/* ══ Bosh sahifa (hub) ════════════════════════════════ */

export interface Floor {
  id: string;
  level: string;
  label: Localized;
  note?: Localized;
  rooms: Localized[];
}

export interface HubService {
  id: string;
  label: Localized;
  icon: string;
}

export interface HubEvent {
  id: string;
  time: string;
  title: Localized;
  place: Localized;
  image: string;
}

export interface HubCard {
  id: string;
  title: Localized;
  description: Localized;
  image: string;
  /** Bosilganda ochiladigan modul yo'li. */
  target: string;
  accent: string;
}

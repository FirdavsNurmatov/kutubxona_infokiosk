/*
 * Ma'lumotga kirishning yagona nuqtasi.
 *
 * Modullar hech qachon `src/interface/data/*` dan to'g'ridan-to'g'ri
 * import qilmaydi — faqat shu fayldagi funksiyalar orqali ishlaydi.
 * Har bir funksiya Promise qaytaradi, shuning uchun mock adapterni
 * HTTP so'roviga almashtirish komponentlarga umuman ta'sir qilmaydi:
 *
 *   .env → VITE_API_URL=http://localhost:8000/api
 *
 * qo'yilsa, quyidagi `fetchJson` yo'li ishga tushadi.
 */
import type {
  Era, EncyclopediaCategory, EncyclopediaEntry, Floor, HistoryEvent,
  HubCard, HubEvent, HubService, LibraryInfo, Localized, PlacePair, Question,
  QuizCategory, QuizPreset, SearchHit,
} from './types';
import { MODULES } from '../routes';

import { allomalar, allomalarSections } from '../data/allomalar';
import { siymoCategories, siymolar } from '../data/siymolar';
import { merosCategories, merosEntries } from '../data/meros';
import { eras, historyEvents } from '../data/tarix';
import { archiveKinds, placePairs, type ArchiveKind } from '../data/kechabugun';
import {
  adultCategories, kidsCategories, memoryCards, miniGames,
  questions, quizPresets, wordPuzzles, type MiniGame,
} from '../data/viktorina';
import { floors, hubCards, hubEvents, hubServices } from '../data/hub';
import { libraryInfo } from '../data/library';

const BASE = import.meta.env.VITE_API_URL as string | undefined;

/*
 * Kategoriyalardagi `count` / `questionCount` — bazadagi yozuvlar soni.
 * Backend uni o'zi hisoblab beradi; mock yo'lida esa shu yerda hisoblanadi,
 * aks holda ro'yxatda "16 ta siymo" yozilib, ochilganda bo'sh sahifa chiqadi.
 * Yozuvi yo'q kategoriya umuman qaytarilmaydi — tashrifchi bo'sh eshikni
 * itarib ko'rmasin.
 */
function withEntryCounts(
  cats: EncyclopediaCategory[],
  entries: EncyclopediaEntry[],
): EncyclopediaCategory[] {
  return cats
    .map((c) => ({ ...c, count: entries.filter((e) => e.categoryId === c.id).length }))
    .filter((c) => c.count > 0);
}

function withQuestionCounts(cats: QuizCategory[]): QuizCategory[] {
  return cats
    .map((c) => ({
      ...c,
      questionCount: questions.filter((q) => q.categoryId === c.id).length,
    }))
    .filter((c) => c.questionCount > 0);
}

/** Backend ulanganda ishlaydigan yo'l. Hozircha BASE bo'sh — mock qaytadi. */
async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  if (!BASE) return fallback;
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return (await res.json()) as T;
}

/* ── Kutubxona haqida ──────────────────────────────── */
export const getLibraryInfo = () => fetchJson<LibraryInfo>('/library', libraryInfo);

/* ── Bosh sahifa ───────────────────────────────────── */
export const getFloors = () => fetchJson<Floor[]>('/hub/floors', floors);
export const getHubServices = () => fetchJson<HubService[]>('/hub/services', hubServices);
export const getHubEvents = () => fetchJson<HubEvent[]>('/hub/events', hubEvents);
export const getHubCards = () => fetchJson<HubCard[]>('/hub/cards', hubCards);

/* ── Ensiklopediya modullari ───────────────────────── */
export const getScholars = () => fetchJson<EncyclopediaEntry[]>('/allomalar', allomalar);
export const getScholarSections = () =>
  fetchJson<EncyclopediaCategory[]>('/allomalar/sections', withEntryCounts(allomalarSections, allomalar));

export const getFigures = () => fetchJson<EncyclopediaEntry[]>('/siymolar', siymolar);
export const getFigureCategories = () =>
  fetchJson<EncyclopediaCategory[]>('/siymolar/categories', withEntryCounts(siymoCategories, siymolar));

export const getHeritage = () => fetchJson<EncyclopediaEntry[]>('/meros', merosEntries);
export const getHeritageCategories = () =>
  fetchJson<EncyclopediaCategory[]>('/meros/categories', withEntryCounts(merosCategories, merosEntries));

/* ── Tarix ─────────────────────────────────────────── */

/* Davr panelidagi ko'rsatkich bazadagi voqealardan hisoblanadi. Ilgari u
   qo'lda yozilgan ("12 yirik voqea") va hech narsaga bog'lanmagan edi. */
export const getEras = () =>
  fetchJson<Era[]>('/tarix/eras', eras.map((e) => ({
    ...e,
    stats: e.stats
      .filter((st) => st.icon === 'Scroll')
      .map((st) => ({ ...st, value: historyEvents.filter((h) => h.eraId === e.id).length })),
  })));
export const getHistoryEvents = () => fetchJson<HistoryEvent[]>('/tarix/events', historyEvents);

/* ── Kecha va bugun ────────────────────────────────── */
export const getPlacePairs = () => fetchJson<PlacePair[]>('/kechabugun/places', placePairs);
export const getArchiveKinds = () => fetchJson<ArchiveKind[]>('/kechabugun/archives', archiveKinds);

/* ── Viktorina ─────────────────────────────────────── */
export const getQuizCategories = (audience: 'adult' | 'kids') =>
  fetchJson<QuizCategory[]>(`/quiz/categories?audience=${audience}`,
    withQuestionCounts(audience === 'adult' ? adultCategories : kidsCategories));

/* Preset "20 savol · 15 daqiqa" deb turib 6 savol bermasligi uchun ikkala
   ko'rsatkich ham haqiqiy savollar sonidan kelib chiqadi (savoliga ~45 s). */
export const getQuizPresets = () =>
  fetchJson<QuizPreset[]>('/quiz/presets', quizPresets
    .map((p) => {
      const count = questions.filter((q) => q.categoryId === p.categoryId).length;
      return { ...p, questionCount: count, durationSec: count * 45 };
    })
    .filter((p) => p.questionCount > 0));

export const getQuestions = (categoryId: string) =>
  fetchJson<Question[]>(`/quiz/questions?category=${categoryId}`,
    questions.filter((q) => q.categoryId === categoryId));

export const getMiniGames = () => fetchJson<MiniGame[]>('/quiz/mini-games', miniGames);
export const getMemoryCards = () => fetchJson('/quiz/memory-cards', memoryCards);
export const getWordPuzzles = () => fetchJson('/quiz/word-puzzles', wordPuzzles);

export type { ArchiveKind, MiniGame };

/* ── Umumiy qidiruv ────────────────────────────────── */

/*
 * Bosh sahifadagi qidiruv butun bo'lim bo'ylab ishlaydi: allomalar,
 * siymolar, nodir meros, tarixiy voqealar, joylar, qavatlar va
 * xizmatlar. Ilgari bu maydon hech narsa qilmasdi — klaviatura yopilib,
 * kiritilgan so'z hech qayerga bormasdi.
 *
 * Solishtirish uchta tilning barchasi bo'yicha ketadi: tashrifchi
 * interfeysni o'zbekcha ochib, ruscha nom yozsa ham topadi. Apostrof
 * variantlari (ʻ ʼ ‘ ’ ') tashlab yuboriladi — kiosk klaviaturasida
 * ular chalkashtiriladi.
 */
function normalize(value: string): string {
  return value.toLowerCase().replace(/[ʻʼ‘’']/g, '').replace(/\s+/g, ' ').trim();
}

function matches(needle: string, ...fields: (Localized | undefined)[]): boolean {
  return fields.some((f) => f && Object.values(f).some((v) => normalize(v).includes(needle)));
}

function entryHits(entries: EncyclopediaEntry[], module: string): SearchHit[] {
  return entries.map((e) => ({
    id: `${module}:${e.id}`, module, title: e.name, subtitle: e.subtitle, image: e.image,
  }));
}

/** Butun indeks — mock rejimida shu yerda yig'iladi. */
function searchIndex(): { hit: SearchHit; haystack: (Localized | undefined)[] }[] {
  const items: { hit: SearchHit; haystack: (Localized | undefined)[] }[] = [];

  const push = (hit: SearchHit, ...haystack: (Localized | undefined)[]) =>
    items.push({ hit, haystack: [hit.title, hit.subtitle, ...haystack] });

  MODULES.filter((m) => m.id !== 'hub').forEach((m) =>
    push({ id: `modul:${m.id}`, module: m.id, title: m.title, subtitle: m.tagline }));

  entryHits(allomalar, 'allomalar').forEach((h, i) => push(h, allomalar[i].summary));
  entryHits(siymolar, 'siymolar').forEach((h, i) => push(h, siymolar[i].summary));
  entryHits(merosEntries, 'meros').forEach((h, i) => push(h, merosEntries[i].summary));

  historyEvents.forEach((e) =>
    push({ id: `tarix:${e.id}`, module: 'tarix', title: e.title, subtitle: e.date, image: e.image },
      e.body));

  placePairs.forEach((p) =>
    push({ id: `kechabugun:${p.id}`, module: 'kechabugun', title: p.place, subtitle: p.city, image: p.thumb }));

  floors.forEach((f) => {
    const rooms: Localized = {
      uz: f.rooms.map((r) => r.uz).join(', '),
      ru: f.rooms.map((r) => r.ru).join(', '),
      en: f.rooms.map((r) => r.en).join(', '),
    };
    push({ id: `qavat:${f.id}`, module: 'hub', title: f.label, subtitle: rooms }, rooms);
  });

  hubServices.forEach((sv) =>
    push({ id: `xizmat:${sv.id}`, module: 'hub', title: sv.label, subtitle: { uz: '', ru: '', en: '' } },
      sv.description));

  hubEvents.forEach((e) =>
    push({ id: `tadbir:${e.id}`, module: 'hub', title: e.title, subtitle: e.place, image: e.image }));

  return items;
}

export function searchLocally(query: string): SearchHit[] {
  const needle = normalize(query);
  if (needle.length < 2) return [];
  return searchIndex()
    .filter((it) => matches(needle, ...it.haystack))
    .map((it) => it.hit)
    .slice(0, 40);
}

export const search = (query: string) =>
  fetchJson<SearchHit[]>(`/search?q=${encodeURIComponent(query)}`, searchLocally(query));

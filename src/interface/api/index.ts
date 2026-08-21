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
  HubCard, HubEvent, HubService, LibraryInfo, PlacePair, Question,
  QuizCategory, QuizPreset,
} from './types';

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
export const getScholarSections = () => fetchJson<EncyclopediaCategory[]>('/allomalar/sections', allomalarSections);

export const getFigures = () => fetchJson<EncyclopediaEntry[]>('/siymolar', siymolar);
export const getFigureCategories = () => fetchJson<EncyclopediaCategory[]>('/siymolar/categories', siymoCategories);

export const getHeritage = () => fetchJson<EncyclopediaEntry[]>('/meros', merosEntries);
export const getHeritageCategories = () => fetchJson<EncyclopediaCategory[]>('/meros/categories', merosCategories);

/* ── Tarix ─────────────────────────────────────────── */
export const getEras = () => fetchJson<Era[]>('/tarix/eras', eras);
export const getHistoryEvents = () => fetchJson<HistoryEvent[]>('/tarix/events', historyEvents);

/* ── Kecha va bugun ────────────────────────────────── */
export const getPlacePairs = () => fetchJson<PlacePair[]>('/kechabugun/places', placePairs);
export const getArchiveKinds = () => fetchJson<ArchiveKind[]>('/kechabugun/archives', archiveKinds);

/* ── Viktorina ─────────────────────────────────────── */
export const getQuizCategories = (audience: 'adult' | 'kids') =>
  fetchJson<QuizCategory[]>(`/quiz/categories?audience=${audience}`,
    audience === 'adult' ? adultCategories : kidsCategories);

export const getQuizPresets = () => fetchJson<QuizPreset[]>('/quiz/presets', quizPresets);

export const getQuestions = (categoryId: string) =>
  fetchJson<Question[]>(`/quiz/questions?category=${categoryId}`,
    questions.filter((q) => q.categoryId === categoryId));

export const getMiniGames = () => fetchJson<MiniGame[]>('/quiz/mini-games', miniGames);
export const getMemoryCards = () => fetchJson('/quiz/memory-cards', memoryCards);
export const getWordPuzzles = () => fetchJson('/quiz/word-puzzles', wordPuzzles);

export type { ArchiveKind, MiniGame };

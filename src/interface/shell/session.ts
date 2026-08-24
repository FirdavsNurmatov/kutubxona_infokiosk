/*
 * Bitta tashrifchining sessiyasi.
 *
 * Yulduzlar va viktorina natijalari ilgari modul komponentining o'z
 * holatida edi — bosh sahifaga chiqib qaytilishi bilan yo'qolardi, bolalar
 * bo'limi esa har safar soxta 320 yulduz bilan ochilardi.
 *
 * Endi ular shu yerda, butun bo'lim uchun bitta joyda turadi va faqat
 * ikki holatda tozalanadi: kiosk bo'sh qolganda yoki tashrifchi o'zi
 * chiqqanda. Bu ma'lumot ataylab `localStorage` ga yozilmaydi — u
 * keyingi odamga o'tib qolmasligi kerak.
 */
import { createContext, useContext } from 'react';

export interface QuizStats {
  played: number;
  score: number;
  correct: number;
  total: number;
}

export const EMPTY_QUIZ_STATS: QuizStats = { played: 0, score: 0, correct: 0, total: 0 };

export interface KioskSession {
  /** Bolalar bo'limida yig'ilgan yulduzlar. */
  stars: number;
  addStars: (n: number) => void;
  quiz: QuizStats;
  addQuizResult: (result: { score: number; correct: number; total: number }) => void;
}

export const SessionContext = createContext<KioskSession | null>(null);

/** Sessiya holatiga kirish. Provider tashqarisida chaqirilsa xatolik beradi. */
export function useSession(): KioskSession {
  const value = useContext(SessionContext);
  if (!value) throw new Error('useSession: SessionProvider ichida chaqirilishi kerak');
  return value;
}

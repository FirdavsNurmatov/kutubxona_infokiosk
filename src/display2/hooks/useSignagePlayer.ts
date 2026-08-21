import { useCallback, useEffect, useRef, useState } from 'react';
import type { SignageSlide } from '../data/types';

export interface SignagePlayer {
  /** Joriy slayd indeksi (pleylist ichida). */
  index: number;
  slide: SignageSlide | undefined;
  /** Keyingi slaydga o'tish — video tugaganda yoki xatolikda chaqiriladi. */
  next: () => void;
  /**
   * Boshlang'ich holatga qaytish — xatolikdan tiklanishda ishlatiladi.
   * `?slide=` bilan qotirilgan bo'lsa o'sha bo'limga qaytadi.
   */
  reset: () => void;
}

/**
 * Signage pleyerining markaziy holati.
 *
 * Butun ilovada bitta taymer — har bir komponent o'zicha `setTimeout`
 * qo'ymaydi. Slayd almashganda eski taymer albatta tozalanadi, shuning uchun
 * ekran kunlab ishlaganda ham taymerlar to'planib qolmaydi.
 *
 * `duration` berilmagan slayd (masalan video) o'zi tugaganini `next()` orqali
 * bildiradi.
 */
/**
 * `?slide=books` — pleyerni bitta bo'limda ushlab turadi.
 *
 * Sozlash va tekshirish uchun: LED panelni joyiga o'rnatayotganda kerakli
 * bo'limni ochib, ranglar va o'qishlilikni tinch tekshirish mumkin.
 * Parametr berilmasa ssenariy odatdagidek aylanaveradi.
 */
export function pinnedSlideIndex(playlist: SignageSlide[]): number | null {
  if (typeof window === 'undefined') return null;
  const wanted = new URLSearchParams(window.location.search).get('slide');
  if (!wanted) return null;

  const byIndex = Number(wanted);
  if (Number.isInteger(byIndex) && byIndex >= 0 && byIndex < playlist.length) return byIndex;

  const byType = playlist.findIndex((slide) => slide.type === wanted);
  return byType >= 0 ? byType : null;
}

export function useSignagePlayer(
  playlist: SignageSlide[],
  isPlaying: boolean,
  pinned: number | null = null,
): SignagePlayer {
  const [index, setIndex] = useState(pinned ?? 0);
  const length = playlist.length;

  // Taymerdagi callback eskirmasligi uchun uzunlik ref'da saqlanadi
  const lengthRef = useRef(length);
  lengthRef.current = length;

  const next = useCallback(() => {
    setIndex((current) => (lengthRef.current ? (current + 1) % lengthRef.current : 0));
  }, []);

  /* Tiklanish qotirilgan bo'limni buzmasligi kerak: LED panelni sozlayotganda
     ekran bir marta xato bersa, `?slide=events` bilan ochilgan sahifa
     INTRO'ga sakrab ketmasin. */
  const reset = useCallback(() => setIndex(pinned ?? 0), [pinned]);

  // Pleylist qisqarsa indeks chegaradan chiqib ketmasin
  useEffect(() => {
    if (length > 0 && index >= length) setIndex(0);
  }, [index, length]);

  useEffect(() => {
    const slide = playlist[index];
    if (pinned !== null || !isPlaying || !slide || !slide.duration) return undefined;
    const id = window.setTimeout(next, slide.duration);
    return () => window.clearTimeout(id);
  }, [index, isPlaying, playlist, next, pinned]);

  return { index, slide: playlist[index], next, reset };
}

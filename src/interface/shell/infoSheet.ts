/* Ma'lumot oynasining konteksti.
   Provider va oynaning o'zi `InfoSheet.tsx` da — kontekst esa alohida
   faylda turadi (`src/i18n/context.ts` bilan bir xil naqsh), shunda
   komponent fayli faqat komponent eksport qiladi va Vite'ning
   "fast refresh" i to'g'ri ishlaydi. */
import { createContext, useContext } from 'react';

export type SheetKind = 'about' | 'help';

export interface SheetApi {
  open: (kind: SheetKind) => void;
}

export const SheetContext = createContext<SheetApi | null>(null);

/** Oynani ochish uchun. Provider tashqarisida chaqirilsa xatolik beradi. */
export function useInfoSheet(): SheetApi {
  const api = useContext(SheetContext);
  if (!api) throw new Error('useInfoSheet: InfoSheetProvider ichida chaqirilishi kerak');
  return api;
}

import { createContext, useContext } from 'react';
import type { Lang, Localized, Translation } from './translations';

export interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Interfeys matnlari (joriy til). */
  t: Translation;
  /** Ma'lumotdagi ko'p tilli qiymatni joriy tilga o'giradi. */
  tr: (value: Localized) => string;
  formatDate: (date: Date) => string;
  dayName: (date: Date) => string;
  monthShort: (date: Date) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n() faqat <LanguageProvider> ichida ishlatiladi');
  }
  return ctx;
}

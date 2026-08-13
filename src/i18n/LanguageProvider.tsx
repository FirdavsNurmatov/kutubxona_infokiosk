import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18nContext, type I18nContextValue } from './context';
import {
  DEFAULT_LANG,
  LANGS,
  formatDate,
  formatDayName,
  formatMonthShort,
  translations,
  type Lang,
} from './translations';

const STORAGE_KEY = 'mk-kiosk-lang';

function isLang(value: unknown): value is Lang {
  return LANGS.some((l) => l.code === value);
}

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // Kiosk brauzerida localStorage o'chirilgan bo'lishi mumkin
  }
  return DEFAULT_LANG;
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].documentTitle;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // e'tiborsiz qoldiriladi
    }
  }, [lang]);

  const tr = useCallback(
    (value: Record<Lang, string>) => value[lang] ?? value[DEFAULT_LANG],
    [lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: translations[lang],
      tr,
      formatDate: (date: Date) => formatDate(date, lang),
      dayName: (date: Date) => formatDayName(date, lang),
      monthShort: (date: Date) => formatMonthShort(date, lang),
    }),
    [lang, tr],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

import { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown, CalendarDays } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { LANGS, formatTime } from '../i18n/translations';
import LibraryLogo from './LibraryLogo';
import WeatherWidget from './WeatherWidget';

function LanguageSelector() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tashqariga bosilganda va Esc bosilganda ro'yxat yopiladi
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const activeLabel = LANGS.find((l) => l.code === lang)?.label ?? lang.toUpperCase();

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.aria.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="hdr-control flex items-center gap-2 px-4 rounded-xl bg-ink-500/70 hover:bg-ink-400/70 active:bg-ink-300/60 border border-cyan-400/25 transition-colors text-white font-semibold text-[15px]"
        style={{ minWidth: '96px' }}
      >
        <Globe size={18} className="text-cyan-300 flex-shrink-0" />
        <span className="flex-1 text-left">{activeLabel}</span>
        <ChevronDown
          size={15}
          className={`text-cyan-300/70 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-full mt-1 left-0 right-0 rounded-xl bg-ink-700 border border-cyan-400/30 shadow-panel z-50 overflow-hidden"
        >
          {LANGS.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={lang === item.code}
              onClick={() => {
                setLang(item.code);
                setOpen(false);
              }}
              className={`w-full px-4 py-3 text-[15px] font-semibold text-left transition-colors hover:bg-cyan-700/40 active:bg-cyan-700/60 ${
                lang === item.code ? 'text-cyan-300 bg-cyan-700/25' : 'text-paper-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { t, formatDate, dayName } = useI18n();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="hdr">
      <div className="hdr-logo">
        <LibraryLogo className="hdr-logo-mark" />
        <div className="hdr-brand text-white font-extrabold">
          {t.libraryName[0]}
          <br />
          {t.libraryName[1]}
          <br />
          {t.libraryName[2]}
        </div>
      </div>

      <div className="hdr-tagline text-amber-300 font-semibold italic flex-shrink-0">
        {t.tagline}
      </div>

      {/* Markaz — soat va sana */}
      <div className="hdr-clock-block flex-1 flex items-center justify-center gap-5 min-w-0">
        <div className="hdr-clock text-white font-black">{formatTime(now)}</div>
        <div className="min-w-0">
          <div className="hdr-date text-paper-200 font-semibold">{formatDate(now)}</div>
          <div className="hdr-date flex items-center gap-1.5 text-cyan-300 font-medium mt-1">
            <CalendarDays size={15} className="flex-shrink-0" />
            {dayName(now)}
          </div>
        </div>
      </div>

      <LanguageSelector />
      <WeatherWidget />
    </header>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown, Search, Building2, X } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { LANGS, formatTime } from '../i18n/translations';

interface LanguageSelectorProps {
  compact?: boolean;
}

function LanguageSelector({ compact }: LanguageSelectorProps) {
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
        className="hdr-control flex items-center gap-2 px-4 rounded-xl border border-navy-200 bg-white/90 hover:bg-white active:bg-cream-100 transition-all shadow-sm text-navy-900 font-semibold text-sm"
        style={{ minWidth: compact ? '84px' : '100px' }}
      >
        <Globe size={16} className="text-navy-700 flex-shrink-0" />
        <span className="flex-1 text-left">{activeLabel}</span>
        <ChevronDown
          size={14}
          className={`text-navy-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl border border-navy-200 shadow-lg z-50 overflow-hidden"
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
              className={`w-full px-4 py-3 text-sm font-semibold text-left hover:bg-cream-100 active:bg-cream-200 transition-colors ${
                lang === item.code ? 'text-gold-600 bg-cream-50' : 'text-navy-800'
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

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const { t } = useI18n();

  return (
    <form
      className="hdr-control hdr-search flex items-center gap-2 px-4 rounded-xl border border-navy-200 bg-white/90 focus-within:border-gold-500 focus-within:bg-white transition-colors shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      role="search"
    >
      <button
        type="submit"
        aria-label={t.aria.search}
        className="btn-compact flex-shrink-0 text-navy-400 hover:text-gold-600 transition-colors"
      >
        <Search size={16} />
      </button>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={t.aria.search}
        className="bg-transparent outline-none text-sm text-navy-800 placeholder-navy-400 w-full min-w-0 font-medium"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t.aria.clearSearch}
          className="btn-compact flex-shrink-0 text-navy-400 hover:text-navy-700 transition-colors"
        >
          <X size={15} />
        </button>
      )}
    </form>
  );
}

interface HeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
  onLogoClick: () => void;
}

export default function Header({ query, onQueryChange, onSearchSubmit, onLogoClick }: HeaderProps) {
  const { t, formatDate, dayName } = useI18n();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="hdr">
      {/* Logotip — bosilganda bosh sahifaga qaytaradi */}
      <div
        className="hdr-logo cursor-pointer"
        onClick={onLogoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onLogoClick();
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <Building2 className="hdr-logo-mark relative text-gold-400" strokeWidth={1.5} />
        <div className="relative min-w-0">
          <div className="hdr-brand text-white font-extrabold">
            {t.libraryName[0]}
            <br />
            {t.libraryName[1]}
            <br />
            {t.libraryName[2]}
          </div>
          <div className="hdr-tagline text-gold-400 font-medium mt-1">{t.tagline}</div>
        </div>
      </div>

      {/* Markaz — sana va soat */}
      <div className="hdr-center">
        <div
          className="absolute inset-0 opacity-[0.06] bg-center bg-no-repeat bg-contain pointer-events-none"
          style={{
            backgroundImage: `url("/images/texture.jpg")`,
            filter: 'sepia(100%) saturate(200%)',
          }}
        />
        <div className="relative z-10 text-center px-2">
          <div className="hdr-date text-navy-700 font-semibold">{formatDate(now)}</div>
          <div className="hdr-day text-navy-500 font-medium">{dayName(now)}</div>
          <div className="hdr-clock font-black text-navy-900 mt-0.5">{formatTime(now)}</div>
        </div>
      </div>

      {/* O'ng — til va qidiruv */}
      <div className="hdr-right">
        <LanguageSelector />
        <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearchSubmit} />
      </div>
    </header>
  );
}

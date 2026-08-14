import { Info, LayoutGrid, Map as MapIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { LANGS, formatTime } from '../../i18n/translations';
import type { MapText } from '../mapText';
import type { MapView } from '../types';

const NAV: { view: MapView; icon: LucideIcon; key: 'map' | 'about' | 'rooms' }[] = [
  { view: 'map', icon: MapIcon, key: 'map' },
  { view: 'about', icon: Info, key: 'about' },
  { view: 'rooms', icon: LayoutGrid, key: 'rooms' },
];

interface MapHeaderProps {
  text: MapText;
  view: MapView;
  onNavigate: (view: MapView) => void;
  now: Date;
}

export default function MapHeader({ text, view, onNavigate, now }: MapHeaderProps) {
  const { lang, setLang, formatDate } = useI18n();

  return (
    <header className="m-header">
      <div className="m-brand">
        <img src="/images/logo.png" alt="" className="m-brand-mark" />
        <div>
          <div className="m-brand-name">{text.brand[0]}</div>
          <div className="m-brand-sub">{text.brand[1]}</div>
        </div>
      </div>

      <nav className="m-nav" aria-label={text.nav.map}>
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.view}
              type="button"
              className="m-nav-btn"
              aria-current={view === item.view ? 'page' : undefined}
              onClick={() => onNavigate(item.view)}
            >
              <Icon size={20} strokeWidth={2} />
              <span>{text.nav[item.key]}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-headmeta">
        <div className="m-clock">
          <div className="m-clock-time">{formatTime(now)}</div>
          <div className="m-clock-date">{formatDate(now)}</div>
        </div>

        <div className="m-lang" role="group" aria-label={text.aria.language}>
          {LANGS.map((item) => (
            <button
              key={item.code}
              type="button"
              aria-pressed={lang === item.code}
              onClick={() => setLang(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

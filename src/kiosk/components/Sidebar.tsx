import { Home, Search, LayoutGrid, Users, Sparkles, Flame, BookCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { LANGS, formatTime } from '../../i18n/translations';
import type { Translation } from '../../i18n/translations';
import type { KioskView } from '../types';
import LibraryLogo from '../../components/LibraryLogo';

type MenuKey = keyof Translation['kiosk']['menu'];

/* Umumiy kiosk: shaxsiy ro'yxat yo'q. Tadbirlar va Kutubxonalarga
   bosh sahifadagi kartochka va plitkalar orqali o'tiladi. */
const NAV: { view: KioskView; icon: LucideIcon; key: MenuKey }[] = [
  { view: 'home', icon: Home, key: 'home' },
  { view: 'search', icon: Search, key: 'search' },
  { view: 'genres', icon: LayoutGrid, key: 'genres' },
  { view: 'authors', icon: Users, key: 'authors' },
  { view: 'new', icon: Sparkles, key: 'newArrivals' },
  { view: 'popular', icon: Flame, key: 'popular' },
  { view: 'available', icon: BookCheck, key: 'available' },
];

interface SidebarProps {
  view: KioskView;
  onNavigate: (view: KioskView) => void;
  now: Date;
}

export default function Sidebar({ view, onNavigate, now }: SidebarProps) {
  const { t, lang, setLang, formatDate, dayName } = useI18n();

  return (
    <aside className="k-side">
      <div
        className="k-side-logo"
        role="button"
        tabIndex={0}
        onClick={() => onNavigate('home')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onNavigate('home');
        }}
      >
        {/* Rasmiy tilla lokap — to'q ko'k panelda o'z rangida turadi */}
        <LibraryLogo variant="gold" className="k-side-mark" />
      </div>

      <nav className="k-side-nav" aria-label={t.kiosk.menu.home}>
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.view;
          return (
            <button
              key={item.view}
              type="button"
              className="k-nav-btn"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(item.view)}
            >
              <Icon size={19} strokeWidth={2} className="flex-shrink-0" />
              <span>{t.kiosk.menu[item.key]}</span>
            </button>
          );
        })}
      </nav>

      <div className="k-lang">
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

      <div className="k-side-clock">
        <div className="k-side-time">{formatTime(now)}</div>
        <div className="k-side-date">
          {formatDate(now)}
          <br />
          {dayName(now)}
        </div>
      </div>
    </aside>
  );
}

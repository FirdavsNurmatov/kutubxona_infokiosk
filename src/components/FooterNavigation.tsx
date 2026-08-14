import { Home, BookMarked, Landmark, HandHeart, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/context';
import type { View } from '../types';

const NAV_ITEMS: {
  view: View;
  icon: LucideIcon;
  key: 'home' | 'catalog' | 'about' | 'services' | 'contact';
}[] = [
  { view: 'home', icon: Home, key: 'home' },
  { view: 'catalog', icon: BookMarked, key: 'catalog' },
  { view: 'about', icon: Landmark, key: 'about' },
  { view: 'services', icon: HandHeart, key: 'services' },
  { view: 'contact', icon: MapPin, key: 'contact' },
];

/** Maketning o'ng chekkasidagi kutubxona binosi chizmasi. */
function BuildingArt() {
  return (
    <svg viewBox="0 0 220 90" className="ftr-art h-full" fill="none" aria-hidden="true">
      <g stroke="#22C3E6" strokeWidth="1.1" strokeLinejoin="round">
        {/* Zinapoya */}
        <path d="M18 84 H202" />
        <path d="M30 78 H190" />
        {/* Asos */}
        <path d="M34 72 H186" />
        {/* Ustunlar */}
        {[46, 70, 94, 118, 142, 166].map((x) => (
          <g key={x}>
            <path d={`M${x} 72 V38`} />
            <path d={`M${x - 5} 38 H${x + 5}`} />
            <path d={`M${x - 5} 72 H${x + 5}`} />
          </g>
        ))}
        {/* Antablement va peshtoq */}
        <path d="M34 38 H186" />
        <path d="M34 32 H186" />
        <path d="M110 6 L192 32 H28 Z" />
        {/* Peshtoqdagi bezak */}
        <path d="M110 14 L166 32 H54 Z" opacity="0.5" />
      </g>
    </svg>
  );
}

interface FooterNavigationProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

export default function FooterNavigation({ activeView, onNavigate }: FooterNavigationProps) {
  const { t } = useI18n();

  return (
    <footer className="ftr">
      <nav className="ftr-nav" aria-label={t.page.catalog}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const entry = t.nav[item.key];
          const isActive = activeView === item.view;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.view)}
              aria-current={isActive ? 'page' : undefined}
              className="ftr-nav-btn group"
            >
              <Icon
                size={27}
                strokeWidth={1.6}
                className={`flex-shrink-0 transition-colors ${
                  isActive ? 'text-cyan-300' : 'text-paper-300 group-hover:text-cyan-300'
                }`}
              />
              <span
                className={`ftr-nav-label font-bold transition-colors ${
                  isActive ? 'text-white' : 'text-paper-200 group-hover:text-white'
                }`}
              >
                {entry.label}
                {entry.sublabel && (
                  <>
                    {' '}
                    {entry.sublabel}
                  </>
                )}
              </span>
            </button>
          );
        })}
      </nav>

      <BuildingArt />
    </footer>
  );
}

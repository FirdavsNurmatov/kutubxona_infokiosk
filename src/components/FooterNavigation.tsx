import { Home, BookOpen, Info, Wrench, MapPin, Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { SITE_URL, socialLinks } from '../data/mockData';
import type { View } from '../types';

const NAV_ITEMS: { view: View; icon: LucideIcon; key: 'home' | 'catalog' | 'about' | 'services' | 'contact' }[] = [
  { view: 'home', icon: Home, key: 'home' },
  { view: 'catalog', icon: BookOpen, key: 'catalog' },
  { view: 'about', icon: Info, key: 'about' },
  { view: 'services', icon: Wrench, key: 'services' },
  { view: 'contact', icon: MapPin, key: 'contact' },
];

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  telegram: Send,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

interface FooterNavigationProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

export default function FooterNavigation({ activeView, onNavigate }: FooterNavigationProps) {
  const { t } = useI18n();

  return (
    <footer className="ftr">
      {/* Bezak — chap va o'ng burchak naqshi */}
      <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none" style={{ width: '120px', height: '100%' }}>
        <svg viewBox="0 0 120 110" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <circle cx="0" cy="110" r="80" stroke="#C9A84C" strokeWidth="1" fill="none" />
          <circle cx="0" cy="110" r="60" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
          <circle cx="0" cy="110" r="40" stroke="#C9A84C" strokeWidth="0.6" fill="none" />
          <line x1="0" y1="30" x2="70" y2="110" stroke="#C9A84C" strokeWidth="0.5" />
          <line x1="0" y1="60" x2="50" y2="110" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none" style={{ width: '200px', height: '100%' }}>
        <svg viewBox="0 0 200 110" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <circle cx="200" cy="110" r="80" stroke="#C9A84C" strokeWidth="1" fill="none" />
          <circle cx="200" cy="110" r="60" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
          <circle cx="200" cy="110" r="40" stroke="#C9A84C" strokeWidth="0.6" fill="none" />
          <line x1="200" y1="30" x2="130" y2="110" stroke="#C9A84C" strokeWidth="0.5" />
          <line x1="200" y1="60" x2="150" y2="110" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>

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
              className={`ftr-nav-btn group ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`}
            >
              <Icon
                size={26}
                strokeWidth={1.5}
                className={`transition-colors ${isActive ? 'text-gold-400' : 'text-white group-hover:text-gold-400'}`}
              />
              <span className={`ftr-nav-label font-bold ${isActive ? 'text-gold-400' : 'text-white'}`}>
                {entry.label}
                {entry.sublabel && (
                  <>
                    <br />
                    {entry.sublabel}
                  </>
                )}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="w-px self-stretch my-3 flex-shrink-0" style={{ background: 'rgba(201,168,76,0.3)' }} />

      <div className="ftr-side">
        <div>
          <div className="text-white text-xs font-medium mb-2 leading-tight" style={{ maxWidth: '110px' }}>
            {t.socialText}
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = SOCIAL_ICONS[link.id];
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.aria.social(link.label)}
                  className="text-white hover:text-gold-400 transition-colors p-1"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="ftr-qr" title={t.aria.qrCode}>
          <QRCodeSVG
            value={SITE_URL}
            className="w-full h-full"
            bgColor="#ffffff"
            fgColor="#0D1B4B"
            level="M"
          />
        </div>
      </div>
    </footer>
  );
}

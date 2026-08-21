import { useState } from 'react';
import {
  Baby, BookOpenText, Brain, GraduationCap, Home, Hourglass,
  Images, Menu, Monitor, Map as MapIcon, Users, X, type LucideIcon,
} from 'lucide-react';
import { MODULES, type ModuleId } from '../routes';
import { useText } from '../i18n';

/*
 * Bo'limlar menyusi — har bir modulning yuqori panelidan ochiladi,
 * shunda bosh sahifaga qaytmasdan boshqa bo'limga o'tish mumkin.
 * Maketlarda ham (ozbekiston_tarixi.png, bilimingizni_sinang.png) shu tugma bor.
 */

const ICONS: Record<string, LucideIcon> = {
  Home, BookOpenText, GraduationCap, Users, Hourglass, Images, Brain, Baby,
};

/** Ishlab chiqishda qulay bo'lsin uchun — boshqa qurilmalar ekranlari. */
const SURFACES: { path: string; icon: LucideIcon; label: [string, string, string] }[] = [
  { path: '/', icon: Monitor, label: ['Sensorli kiosk', 'Сенсорный киоск', 'Touch kiosk'] },
  { path: '/ekran', icon: Monitor, label: ['Katta ekran', 'Большой экран', 'Wall screen'] },
  { path: '/ekran2', icon: Monitor, label: ['Katta ekran (animatsion)', 'Большой экран (анимация)', 'Wall screen (animated)'] },
  { path: '/map', icon: MapIcon, label: ['Bino xaritasi', 'Карта здания', 'Building map'] },
];

const LANG_INDEX = { uz: 0, ru: 1, en: 2 } as const;

export interface ModuleMenuProps {
  current: ModuleId;
  onSelect: (id: ModuleId) => void;
}

export default function ModuleMenu({ current, onSelect }: ModuleMenuProps) {
  const [open, setOpen] = useState(false);
  const { tr, s, lang } = useText();

  return (
    <>
      <button
        className="if-menu-btn if-tap"
        onClick={() => setOpen(true)}
        aria-label={s('sections')}
        aria-expanded={open}
      >
        <Menu size={30} />
      </button>

      {open && (
        <div className="if-menu" onClick={() => setOpen(false)}>
          <div className="if-menu-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="if-menu-head">
              <b>{s('sections')}</b>
              <button className="if-menu-close if-tap" onClick={() => setOpen(false)} aria-label="Yopish">
                <X size={30} />
              </button>
            </div>

            <div className="if-menu-grid">
              {MODULES.map((m) => {
                const Icon = ICONS[m.icon] ?? Home;
                return (
                  <button
                    key={m.id}
                    className="if-menu-item if-tap"
                    aria-current={m.id === current ? 'page' : undefined}
                    onClick={() => {
                      setOpen(false);
                      onSelect(m.id);
                    }}
                  >
                    <span className="if-menu-icon"><Icon size={28} /></span>
                    <b>{tr(m.title)}</b>
                    <small>{tr(m.tagline)}</small>
                  </button>
                );
              })}
            </div>

            {import.meta.env.DEV && (
              <div className="if-menu-dev">
                <span>Boshqa ekranlar (faqat ishlab chiqishda)</span>
                <div>
                  {SURFACES.map((sf) => {
                    const Icon = sf.icon;
                    return (
                      <a key={sf.path} className="if-menu-surface if-tap" href={sf.path}>
                        <Icon size={22} />
                        {sf.label[LANG_INDEX[lang]]}
                        <code>{sf.path}</code>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

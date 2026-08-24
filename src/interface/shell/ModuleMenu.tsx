import { useState } from 'react';
import {
  Baby, BookOpenText, Brain, GraduationCap, Home, Hourglass,
  Images, Menu, Users, X, type LucideIcon,
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

export interface ModuleMenuProps {
  current: ModuleId;
  onSelect: (id: ModuleId) => void;
}

export default function ModuleMenu({ current, onSelect }: ModuleMenuProps) {
  const [open, setOpen] = useState(false);
  const { tr, s } = useText();

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
              <button className="if-menu-close if-tap" onClick={() => setOpen(false)} aria-label={s('close')}>
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
          </div>
        </div>
      )}
    </>
  );
}

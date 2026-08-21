import type { ReactNode } from 'react';
import { ChevronLeft, HelpCircle, Home, Info } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { useText } from '../i18n';
import ModuleMenu from './ModuleMenu';
import { useInfoSheet } from './infoSheet';
import type { ModuleId } from '../routes';
import type { Lang } from '../../i18n/translations';

/* Barcha modullar uchun umumiy yuqori panel va pastki navigatsiya.
   Ranglar `data-module` orqali keladi, shuning uchun bu komponentlar
   har bir mavzuda o'zicha ko'rinadi. */

const LANGS: Lang[] = ['uz', 'ru', 'en'];

export interface TopBarProps {
  title: string;
  onBack?: () => void;
  backLabel?: string;
  /** O'ng tomonga qo'shimcha element (masalan soat). */
  extra?: ReactNode;
  showLang?: boolean;
  /** Bo'limlar menyusi uchun — berilmasa menyu tugmasi chiqmaydi. */
  current?: ModuleId;
  onNavigate?: (id: ModuleId) => void;
}

export function TopBar({
  title, onBack, backLabel, extra, showLang = true, current, onNavigate,
}: TopBarProps) {
  const { lang, setLang } = useI18n();
  const { s } = useText();

  return (
    <header className="if-topbar">
      {current && onNavigate && <ModuleMenu current={current} onSelect={onNavigate} />}
      {onBack && (
        <button className="if-back if-tap" onClick={onBack}>
          <ChevronLeft size={26} />
          {backLabel ?? s('back')}
        </button>
      )}
      <div className="if-topbar-title">{title}</div>
      {extra}
      {showLang && (
        <div className="if-lang">
          {LANGS.map((l) => (
            <button
              key={l}
              aria-pressed={l === lang}
              className="if-tap"
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/*
 * Til almashtirgich faqat yuqori panelda (`TopBar` dagi UZ/RU/EN) —
 * pastda takrorlanmaydi, aks holda bitta ekranda ikkita til tanlagich
 * bo'lib qoladi.
 */
export interface BottomNavProps {
  onHome: () => void;
  /* Ikkalasi berilmasa, tugma tegishli ma'lumot oynasini ochadi —
     shuning uchun modullarda ular odatda umuman ko'rsatilmaydi. */
  onAbout?: () => void;
  onHelp?: () => void;
  current?: 'home' | 'about' | 'help';
}

export function BottomNav({ onHome, onAbout, onHelp, current }: BottomNavProps) {
  const { s } = useText();
  const sheet = useInfoSheet();

  return (
    <nav className="if-bottomnav">
      <button className="if-tap" onClick={onHome} aria-current={current === 'home' ? 'page' : undefined}>
        <Home size={30} />
        {s('home')}
      </button>
      <button
        className="if-tap"
        onClick={onAbout ?? (() => sheet.open('about'))}
        aria-current={current === 'about' ? 'page' : undefined}
      >
        <Info size={30} />
        {s('about')}
      </button>
      <button
        className="if-tap"
        onClick={onHelp ?? (() => sheet.open('help'))}
        aria-current={current === 'help' ? 'page' : undefined}
      >
        <HelpCircle size={30} />
        {s('help')}
      </button>
    </nav>
  );
}

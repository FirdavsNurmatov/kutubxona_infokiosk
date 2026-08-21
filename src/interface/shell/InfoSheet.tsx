import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Clock, Globe, HelpCircle, Info, Mail, MapPin, Phone, X } from 'lucide-react';
import { useText } from '../i18n';
import { useResource } from '../api/useResource';
import { getLibraryInfo } from '../api';
import type { LibraryInfo } from '../api/types';
import { SheetContext, type SheetApi, type SheetKind } from './infoSheet';
import type { ModuleId } from '../routes';

/*
 * Pastki navigatsiyaning uchta tugmasi ortidagi oyna: "Kutubxona haqida",
 * "Yordam" va "Til".
 *
 * Oyna butun `/interface` uchun bitta nusxada — `InterfaceApp` ichida
 * chiziladi. Shu sababli uni istalgan joydan ochish mumkin (pastki
 * navigatsiya ham, viktorinadagi "Qanday o'ynaladi?" yozuvi ham),
 * lekin holat bitta joyda turadi va ikkita oyna bir vaqtda ochilmaydi.
 */

/** Viktorina qoidalari faqat shu ikki bo'limda kerak. */
const QUIZ_MODULES: ModuleId[] = ['viktorina', 'bolalar'];

const EMPTY_INFO: LibraryInfo = {
  name: { uz: '', ru: '', en: '' },
  summary: [],
  address: { uz: '', ru: '', en: '' },
  schedule: [],
  phone: '',
  email: '',
  website: '',
};

function AboutBody() {
  const { s, tr } = useText();
  const info = useResource(getLibraryInfo, EMPTY_INFO);

  return (
    <>
      <h3 className="if-sheet-lead">{tr(info.data.name)}</h3>
      {info.data.summary.map((paragraph, i) => (
        <p key={i}>{tr(paragraph)}</p>
      ))}

      {info.data.schedule.length > 0 && (
        <div className="if-sheet-block">
          <h4><Clock size={22} />{s('schedule')}</h4>
          <dl className="if-sheet-rows">
            {info.data.schedule.map((row, i) => (
              <div key={i}>
                <dt>{tr(row.days)}</dt>
                <dd>{tr(row.hours)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="if-sheet-block">
        <h4><MapPin size={22} />{s('address')}</h4>
        <p className="if-sheet-address">{tr(info.data.address)}</p>
        <dl className="if-sheet-rows">
          {/* Bo'sh maydonlar ko'rsatilmaydi — backend to'ldirmaguncha qator chiqmaydi */}
          {info.data.phone && (
            <div><dt><Phone size={20} />{s('phone')}</dt><dd>{info.data.phone}</dd></div>
          )}
          {info.data.email && (
            <div><dt><Mail size={20} />{s('email')}</dt><dd>{info.data.email}</dd></div>
          )}
          {info.data.website && (
            <div><dt><Globe size={20} />{s('website')}</dt><dd>{info.data.website}</dd></div>
          )}
        </dl>
      </div>
    </>
  );
}

function HelpBody({ module }: { module: ModuleId }) {
  const { s } = useText();

  return (
    <>
      <p className="if-sheet-lead">{s('helpIntro')}</p>
      <ol className="if-sheet-steps">
        <li>{s('helpStep1')}</li>
        <li>{s('helpStep2')}</li>
        <li>{s('helpStep3')}</li>
        <li>{s('helpStep4')}</li>
      </ol>

      {QUIZ_MODULES.includes(module) && (
        <div className="if-sheet-block">
          <h4><HelpCircle size={22} />{s('quizHelpTitle')}</h4>
          <ol className="if-sheet-steps">
            <li>{s('quizHelp1')}</li>
            <li>{s('quizHelp2')}</li>
            <li>{s('quizHelp3')}</li>
          </ol>
        </div>
      )}
    </>
  );
}

const TITLE_KEY = { about: 'about', help: 'help' } as const;
const TITLE_ICON = { about: Info, help: HelpCircle };

export function InfoSheetProvider({
  module, children,
}: {
  /** Joriy modul — yordam matni shunga qarab to'ldiriladi. */
  module: ModuleId;
  children: ReactNode;
}) {
  const [kind, setKind] = useState<SheetKind | null>(null);
  const { s } = useText();

  const open = useCallback((next: SheetKind) => setKind(next), []);
  const api = useMemo<SheetApi>(() => ({ open }), [open]);
  const close = useCallback(() => setKind(null), []);

  const Icon = kind ? TITLE_ICON[kind] : Info;

  return (
    <SheetContext.Provider value={api}>
      {children}

      {kind && (
        <div className="if-sheet" onClick={close}>
          <div
            className="if-sheet-card"
            role="dialog"
            aria-modal="true"
            aria-label={s(TITLE_KEY[kind])}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="if-sheet-head">
              <span className="if-sheet-icon"><Icon size={28} /></span>
              <b>{s(TITLE_KEY[kind])}</b>
              <button className="if-menu-close if-tap" onClick={close} aria-label={s('close')}>
                <X size={30} />
              </button>
            </div>

            <div className="if-sheet-body">
              {kind === 'about' && <AboutBody />}
              {kind === 'help' && <HelpBody module={module} />}
            </div>
          </div>
        </div>
      )}
    </SheetContext.Provider>
  );
}

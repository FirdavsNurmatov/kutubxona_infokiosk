import { useEffect, useMemo, useState } from 'react';
import {
  Accessibility, ArrowRight, Baby, BookMarked, Boxes, Brain, CalendarDays,
  Clock, Coffee, GraduationCap, HelpCircle, Hourglass, Images, Layers,
  MapPin, Mic, Monitor, Navigation, PhoneCall, Printer, QrCode, Search,
  Users, Wifi, BookOpenText,
} from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import type { LibraryInfo } from '../../api/types';
import { useI18n } from '../../../i18n/context';
import { MODULES } from '../../routes';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getFloors, getHubCards, getHubEvents, getHubServices, getLibraryInfo } from '../../api';
import OnScreenKeyboard from '../../shell/OnScreenKeyboard';
import ModuleMenu from '../../shell/ModuleMenu';
import './hub.css';

/* Modul yo'lini `lucide` ikonkasiga bog'laydi — ma'lumotda faqat nom saqlanadi,
   shunda backend ulanganda ham ikonkani matn sifatida yuborish yetarli. */
const ICONS: Record<string, typeof Search> = {
  BookMarked, CalendarDays, Monitor, Wifi, Coffee, Accessibility,
  Printer, HelpCircle, PhoneCall, QrCode,
  BookOpenText, GraduationCap, Users, Hourglass, Images, Brain, Baby,
};

/* Chrome'da `uz-UZ` locale oy va kun nomlarini bermaydi ("M08 20 Thu"),
   shuning uchun o'zbekcha nomlar qo'lda saqlanadi. Rus va ingliz uchun
   `Intl` yetarli. */
const UZ_MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
];
const UZ_DAYS = [
  'Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba',
  'Payshanba', 'Juma', 'Shanba',
];

function Clock24() {
  const [now, setNow] = useState(() => new Date());
  const { lang } = useText();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const locale = lang === 'ru' ? 'ru-RU' : 'en-GB';
  const date = lang === 'uz'
    ? `${now.getDate()}-${UZ_MONTHS[now.getMonth()]}`
    : now.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
  const day = lang === 'uz'
    ? UZ_DAYS[now.getDay()]
    : now.toLocaleDateString(locale, { weekday: 'long' });

  return (
    <div className="hub-clock">
      <b>{now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</b>
      <small>{date}</small>
      <small>{day}</small>
    </div>
  );
}

/** Binoning 3D xaritasi alohida bo'lim (`/map`) — interfeys modullaridan tashqarida. */
const MAP_URL = '/map';

export default function HubModule({ navigate }: { navigate: NavigateFn }) {
  const { s, tr, title, lang } = useText();
  const { setLang } = useI18n();
  const [floorId, setFloorId] = useState('f5');
  const [query, setQuery] = useState('');
  const [keyboard, setKeyboard] = useState(false);

  const floors = useResource(getFloors, []);
  const services = useResource(getHubServices, []);
  const events = useResource(getHubEvents, []);
  const cards = useResource(getHubCards, []);
  /* Ish vaqti va manzil ilgari shu faylda qo'lda yozilgan edi — endi
     boshqa ekranlar bilan bitta manbadan keladi. */
  const library = useResource(getLibraryInfo, null as LibraryInfo | null);

  const activeFloor = useMemo(
    () => floors.data.find((f) => f.id === floorId) ?? floors.data[0],
    [floors.data, floorId],
  );

  /* Hub'dan tashqari modullar — pastki plitalar */
  const otherModules = MODULES.filter((m) => m.id !== 'hub');

  /* Zallar va Qavatlar bino xaritasida ko'rsatiladi, Xizmatlar esa
     shu sahifadagi "Tezkor xizmatlar" bloki. */
  function openCard(id: string) {
    if (id === 'xizmatlar') {
      document.getElementById('hub-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.href = MAP_URL;
  }

  return (
    <div className="if-screen">
      <header className="hub-header">
        <ModuleMenu current="hub" onSelect={navigate} />
        <div className="hub-brand">
          <img className="if-logo" src="/images/logo.png" alt="" />
          <div className="hub-brand-text">
            <span>O‘zbekiston</span>
            <span>Milliy</span>
            <span>kutubxonasi</span>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div className="if-lang">
          {(['uz', 'ru', 'en'] as const).map((l) => (
            <button
              key={l}
              className="if-tap"
              aria-pressed={l === lang}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <Clock24 />
      </header>

      <div className="if-scroll">
        <section className="hub-hero">
          <img className="hub-hero-bg" src="/interface/hub/hero.webp" alt="" />
          <div className="hub-hero-scrim" />
          <div className="hub-hint">
            <div className="hub-hint-icon"><Navigation size={28} /></div>
            <div>
              <b>{tr({ uz: 'Yo‘nalish olish oson!', ru: 'Найти дорогу легко!', en: 'Finding your way is easy!' })}</b>
              <small>
                {tr({
                  uz: '3D xaritada kutubxonani oson kashf eting.',
                  ru: 'Исследуйте библиотеку на 3D-карте.',
                  en: 'Explore the library on the 3D map.',
                })}
              </small>
            </div>
          </div>
          <h1>
            {title('hub')[0]}
            <em>{title('hub')[1]}</em>
          </h1>
          <p>{s('hubLead')}</p>
          <button
            className="hub-search if-tap"
            data-filled={query ? '1' : '0'}
            onClick={() => setKeyboard(true)}
          >
            <Search size={28} />
            <span>{query || s('searchPlaceholder')}</span>
            <Mic size={28} />
          </button>
        </section>

        <div className="hub-body">
          <div className="hub-cta">
            <button
              className="if-cta if-tap"
              onClick={() => { window.location.href = MAP_URL; }}
            >
              <Boxes size={32} />
              {tr({ uz: '3D xaritani ochish', ru: 'Открыть 3D-карту', en: 'Open the 3D map' })}
              <ArrowRight size={30} />
            </button>
          </div>

          <div className="hub-split">
            <div className="hub-floors">
              <h3>{s('chooseFloor')}</h3>
              {floors.data.map((f) => (
                <button
                  key={f.id}
                  className="hub-floor if-tap"
                  aria-pressed={f.id === floorId}
                  onClick={() => setFloorId(f.id)}
                >
                  <Layers size={26} />
                  <span>
                    <b>{f.level}</b>
                    <small>{f.note ? tr(f.note) : tr(f.label)}</small>
                  </span>
                </button>
              ))}
            </div>

            <div>
              <div className="hub-cards">
                {cards.data.map((c) => (
                  <button
                    key={c.id}
                    className="hub-card if-tap"
                    style={{ background: `linear-gradient(180deg, ${c.accent}, rgba(4,12,30,0.9))` }}
                    onClick={() => openCard(c.id)}
                  >
                    <img src={c.image} alt="" />
                    <h4>{tr(c.title)}</h4>
                    <p>{tr(c.description)}</p>
                    <span className="hub-card-go"><ArrowRight size={26} /></span>
                  </button>
                ))}
              </div>

              {activeFloor && (
                <div className="if-card" style={{ marginTop: 16, padding: '16px 20px' }}>
                  <b style={{ fontSize: 20, color: 'var(--m-gold)' }}>
                    {activeFloor.level} — {tr(activeFloor.label)}
                  </b>
                  <div style={{ marginTop: 8, fontSize: 18, color: 'var(--m-muted)', lineHeight: 1.45 }}>
                    {activeFloor.rooms.map((r) => tr(r)).join(' · ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="if-section-head">
            <h2 className="if-section-title">{s('sections')}</h2>
          </div>
          <div className="hub-modules">
            {otherModules.map((m) => {
              const Icon = ICONS[m.icon] ?? Search;
              return (
                <button key={m.id} className="hub-module if-tap" onClick={() => navigate(m.id)}>
                  <span className="hub-module-icon"><Icon size={28} /></span>
                  <b>{tr(m.title)}</b>
                  <small>{tr(m.tagline)}</small>
                </button>
              );
            })}
          </div>

          <div className="if-section-head">
            <h2 className="if-section-title">{s('quickServices')}</h2>
          </div>
          <div className="hub-services" id="hub-services">
            {services.data.map((sv) => {
              const Icon = ICONS[sv.icon] ?? Search;
              return (
                <button key={sv.id} className="hub-service if-tap">
                  <Icon size={30} />
                  <span>{tr(sv.label)}</span>
                </button>
              );
            })}
          </div>

          <div className="if-section-head">
            <h2 className="if-section-title">{s('todayEvents')}</h2>
            <button className="if-section-link if-tap">
              {s('seeAll')} <ArrowRight size={22} />
            </button>
          </div>
          <div className="hub-events">
            {events.data.map((e) => (
              <button key={e.id} className="hub-event if-tap">
                <img src={e.image} alt="" />
                <span>
                  <time>{e.time}</time>
                  <b>{tr(e.title)}</b>
                  <small>{tr(e.place)}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="hub-footer">
            <div className="hub-footer-item">
              <Clock size={34} />
              <span>
                <b>{s('openingHours')}</b>
                {library.data?.schedule.map((row, i) => (
                  <small key={i}>{tr(row.days)}: {tr(row.hours)}</small>
                ))}
              </span>
            </div>
            <img className="if-logo" src="/images/logo.png" alt="" />
            <div className="hub-footer-item">
              <span>
                <b>{s('address')}</b>
                <small>{library.data ? tr(library.data.address) : ''}</small>
              </span>
              <MapPin size={34} />
            </div>
          </div>
        </div>
      </div>

      {keyboard && (
        <OnScreenKeyboard
          value={query}
          placeholder={s('searchPlaceholder')}
          onChange={setQuery}
          onSubmit={() => setKeyboard(false)}
          onClose={() => setKeyboard(false)}
        />
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import {
  Accessibility, ArrowRight, Baby, BookMarked, Brain, CalendarDays,
  Clock, Coffee, GraduationCap, HelpCircle, Hourglass, Images, Layers,
  MapPin, Mic, Monitor, Navigation, PhoneCall, Printer, QrCode, Search,
  Users, Wifi, X, BookOpenText,
} from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import type { HubEvent, HubService, LibraryInfo, Localized, SearchHit } from '../../api/types';
import { useI18n } from '../../../i18n/context';
import { MODULES, type ModuleId } from '../../routes';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getFloors, getHubCards, getHubEvents, getHubServices, getLibraryInfo, search } from '../../api';
import OnScreenKeyboard from '../../../components/OnScreenKeyboard';
import ModuleMenu from '../../shell/ModuleMenu';
import { useInfoSheet } from '../../shell/infoSheet';
import './hub.css';
import LibraryLogo from '../../../components/LibraryLogo';
import DataNotice from '../../components/DataNotice';

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

/** "14:00" ni bugungi sanadagi daqiqaga aylantiradi. */
function minutesOfDay(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** Xizmat yoki tadbir kartochkasi ochadigan oddiy tafsilot oynasi. */
interface DetailSheet {
  title: Localized;
  body?: Localized;
  meta?: string;
  image?: string;
}

export default function HubModule({ navigate }: { navigate: NavigateFn }) {
  const { s, tr, title, lang } = useText();
  const { setLang } = useI18n();
  const [floorId, setFloorId] = useState('f5');
  const [query, setQuery] = useState('');
  const [keyboard, setKeyboard] = useState(false);
  /* Qidiruv natijalari. Klaviatura ochilishi bilan ro'yxat ham ochiladi
     va har bir harfda yangilanadi — ilgari bu maydon umuman javob
     bermasdi: "Qidirish" bosilsa klaviatura yopilib, ish shu bilan
     tugardi. */
  const [hits, setHits] = useState<SearchHit[]>([]);
  /* Xizmat yoki tadbir kartochkasi bosilganda ochiladigan tafsilot oynasi. */
  const [detail, setDetail] = useState<DetailSheet | null>(null);
  const sheet = useInfoSheet();
  /* Tadbirlar ro'yxati kun bo'yi o'zgarmasdan turardi: kechqurun ham
     ertalabki tadbir "bugungi" bo'lib ko'rinardi. Endi vaqti o'tganlari
     belgilanadi — daqiqada bir marta qayta hisoblanadi. */
  const [nowMinutes, setNowMinutes] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  useEffect(() => {
    let alive = true;
    if (query.trim().length < 2) {
      setHits([]);
      return undefined;
    }
    /* Har bosishda emas — terish to'xtaganda so'raladi. */
    const id = window.setTimeout(() => {
      search(query).then((r) => alive && setHits(r)).catch(() => alive && setHits([]));
    }, 180);
    return () => {
      alive = false;
      window.clearTimeout(id);
    };
  }, [query]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const d = new Date();
      setNowMinutes(d.getHours() * 60 + d.getMinutes());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

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

  /* Infokiosk interfeysi yopiq bo'lim — bu yerdan boshqa yuzaga (`/map`,
     `/ekran`, kiosk) chiqilmaydi. Shuning uchun kartochkalar shu sahifaning
     o'z bloklariga olib boradi: Xizmatlar — "Tezkor xizmatlar", Zallar va
     Qavatlar — qavat va xonalar ro'yxati. */
  function openCard(id: string) {
    const target = id === 'xizmatlar' ? 'hub-services' : 'hub-floorplan';
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* Xizmat kartochkalari. Uchtasi bo'limning mavjud oynalariga bog'lanadi,
     qolganlari o'z tavsifini ochadi — ilgari o'ntasi ham bosilib, hech
     narsa qilmasdi. */
  function openService(sv: HubService) {
    if (sv.id === 'yordam') { sheet.open('help'); return; }
    if (sv.id === 'aloqa') { sheet.open('about'); return; }
    if (sv.id === 'tadbir') {
      document.getElementById('hub-events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (sv.description) setDetail({ title: sv.label, body: sv.description });
  }

  function openEvent(e: HubEvent) {
    setDetail({
      title: e.title,
      body: e.description,
      meta: `${e.time} · ${tr(e.place)}`,
      image: e.image,
    });
  }

  return (
    <div className="if-screen">
      <header className="hub-header">
        <ModuleMenu current="hub" onSelect={navigate} />
        <div className="hub-brand">
          <LibraryLogo variant="gold" className="if-logo" />
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
          <DataNotice sources={[floors, services, events, cards, library]} />
        <section className="hub-hero">
          <img className="hub-hero-bg" src="/interface/hub/hero.webp" alt="" />
          <div className="hub-hero-scrim" />
          <div className="hub-hint">
            <div className="hub-hint-icon"><Navigation size={28} /></div>
            <div>
              <b>{tr({ uz: 'Yo‘nalish olish oson!', ru: 'Найти дорогу легко!', en: 'Finding your way is easy!' })}</b>
              <small>
                {tr({
                  uz: 'Qavat va zallar ro‘yxatini quyidan ko‘ring.',
                  ru: 'Список этажей и залов — ниже.',
                  en: 'See the list of floors and halls below.',
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
          <div className="hub-split" id="hub-floorplan">
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
                <button key={sv.id} className="hub-service if-tap" onClick={() => openService(sv)}>
                  <Icon size={30} />
                  <span>{tr(sv.label)}</span>
                </button>
              );
            })}
          </div>

          <div className="if-section-head" id="hub-events">
            <h2 className="if-section-title">{s('todayEvents')}</h2>
          </div>
          <div className="hub-events">
            {events.data.map((e) => {
              const past = minutesOfDay(e.time) < nowMinutes;
              return (
                <button
                  key={e.id}
                  className="hub-event if-tap"
                  data-past={past ? '1' : '0'}
                  onClick={() => openEvent(e)}
                >
                  <img src={e.image} alt="" />
                  <span>
                    <time>{e.time}{past && <i>{s('eventEnded')}</i>}</time>
                    <b>{tr(e.title)}</b>
                    <small>{tr(e.place)}</small>
                  </span>
                </button>
              );
            })}
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
            <LibraryLogo variant="gold" className="if-logo" />
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

      {detail && (
        <div className="if-sheet" onClick={() => setDetail(null)}>
          <div
            className="if-sheet-card"
            role="dialog"
            aria-modal="true"
            aria-label={tr(detail.title)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="if-sheet-head">
              <b>{tr(detail.title)}</b>
              <button
                className="if-menu-close if-tap"
                onClick={() => setDetail(null)}
                aria-label={s('close')}
              >
                <X size={30} />
              </button>
            </div>
            <div className="if-sheet-body">
              {detail.image && <img className="hub-detail-img" src={detail.image} alt="" />}
              {detail.meta && <div className="hub-detail-meta">{detail.meta}</div>}
              {detail.body && <p>{tr(detail.body)}</p>}
            </div>
          </div>
        </div>
      )}

      {keyboard && (
        <div className="hub-results" role="region" aria-label={s('search')}>
          {query.trim().length < 2 ? (
            <p className="hub-results-hint">{s('searchHint')}</p>
          ) : hits.length === 0 ? (
            <p className="hub-results-hint">{s('nothingFound')}</p>
          ) : (
            <>
              <div className="hub-results-head">
                {s('found')}: <b>{hits.length}</b>
              </div>
              <div className="hub-results-list">
                {hits.map((h) => {
                  const mod = MODULES.find((m) => m.id === h.module);
                  return (
                    <button
                      key={h.id}
                      className="hub-result if-tap"
                      onClick={() => {
                        setKeyboard(false);
                        navigate(h.module as ModuleId, { query });
                      }}
                    >
                      {h.image
                        ? <img src={h.image} alt="" />
                        : <span className="hub-result-blank"><Search size={26} /></span>}
                      <span className="hub-result-text">
                        <b>{tr(h.title)}</b>
                        {tr(h.subtitle) && <small>{tr(h.subtitle)}</small>}
                      </span>
                      {mod && <em className="hub-result-mod">{tr(mod.title)}</em>}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {keyboard && (
        <OnScreenKeyboard
          value={query}
          placeholder={s('searchPlaceholder')}
          onChange={setQuery}
          onSubmit={() => {
            /* Natijalar ro'yxati allaqachon ochiq — bitta natija bo'lsa
               to'g'ridan-to'g'ri o'sha bo'lim ochiladi. */
            if (hits.length === 1) {
              setKeyboard(false);
              navigate(hits[0].module as ModuleId, { query });
            }
          }}
          onClose={() => setKeyboard(false)}
        />
      )}
    </div>
  );
}

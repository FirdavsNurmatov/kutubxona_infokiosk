import { useMemo, useState } from 'react';
import {
  ChevronRight, Flag, Hourglass, Landmark, Map as MapIcon, Scroll, Users, X,
} from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getEras, getHistoryEvents } from '../../api';
import { TopBar, BottomNav } from '../../shell/Chrome';
import type { Era, HistoryEvent } from '../../api/types';
import './tarix.css';
import DataNotice from '../../components/DataNotice';

const STAT_ICONS = { Scroll, Users, Landmark };

type Tab = 'lenta' | 'davrlar' | 'voqealar' | 'shaxslar' | 'xaritalar';

const TABS: { id: Tab; icon: typeof Scroll; label: [string, string, string] }[] = [
  { id: 'lenta', icon: Hourglass, label: ['Vaqt lentasi', 'Лента времени', 'Timeline'] },
  { id: 'davrlar', icon: Landmark, label: ['Davrlar', 'Периоды', 'Eras'] },
  { id: 'voqealar', icon: Flag, label: ['Muhim voqealar', 'События', 'Events'] },
  { id: 'shaxslar', icon: Users, label: ['Tarixiy shaxslar', 'Личности', 'Figures'] },
  { id: 'xaritalar', icon: MapIcon, label: ['Xaritalar', 'Карты', 'Maps'] },
];

const LANG_INDEX = { uz: 0, ru: 1, en: 2 } as const;

export default function TarixModule({ navigate }: { navigate: NavigateFn }) {
  const { s, tr, title, lang } = useText();
  const eras = useResource(getEras, [] as Era[]);
  const events = useResource(getHistoryEvents, [] as HistoryEvent[]);

  const [tab, setTab] = useState<Tab>('lenta');
  const [eraId, setEraId] = useState('qadimgi');
  const [eventId, setEventId] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  const era = useMemo(
    () => eras.data.find((e) => e.id === eraId) ?? eras.data[0],
    [eras.data, eraId],
  );
  const openedEvent = events.data.find((e) => e.id === eventId);

  /* Voqealar tanlangan davrga tegishli bo'lishi kerak — ilgari qaysi davr
     tanlansa ham bitta ro'yxat chiqardi. */
  const eraEvents = useMemo(
    () => events.data.filter((e) => e.eraId === era?.id),
    [events.data, era],
  );

  return (
    <div className="if-screen">
      <TopBar title={tr({ uz: 'O‘zbekiston tarixi', ru: 'История Узбекистана', en: 'History of Uzbekistan' })} onBack={() => navigate('hub')}
        current="tarix"
        onNavigate={navigate} />

      <div className="if-scroll">
          <DataNotice sources={[eras, events]} />
        <section className="tx-hero">
          <img src="/interface/tarix/hero.webp" alt="" />
          <div className="tx-hero-inner">
            <h1>{title('tarix')[0]}<br />{title('tarix')[1]}</h1>
            <p>{s('tarixLead')}</p>
          </div>
        </section>

        <div className="tx-tabs" role="tablist">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                className="tx-tab if-tap"
                role="tab"
                aria-selected={t.id === tab}
                onClick={() => setTab(t.id)}
              >
                <Icon size={28} />
                {t.label[LANG_INDEX[lang]]}
              </button>
            );
          })}
        </div>

        <div className="tx-body">
          {tab === 'lenta' && era && (
            <div className="tx-split">
              <div className="tx-rail">
                {eras.data.map((e) => (
                  <button
                    key={e.id}
                    className="tx-era if-tap"
                    aria-pressed={e.id === era.id}
                    onClick={() => setEraId(e.id)}
                  >
                    <img src={e.image} alt="" />
                    <span className="tx-era-text">
                      <i>{tr(e.period)}</i>
                      <b>{tr(e.name)}</b>
                      <small>{tr(e.summary)}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="tx-detail">
                <span className="tx-badge">{s('currentEra')}</span>
                <h3>{tr(era.name)}</h3>
                <div className="tx-period">{tr(era.period)}</div>
                <img className="tx-detail-img" src={era.detailImage} alt="" />
                {era.body.map((p, i) => (
                  <p key={i}>{tr(p)}</p>
                ))}
                <div className="tx-stats">
                  {era.stats.map((st, i) => {
                    const Icon = STAT_ICONS[st.icon as keyof typeof STAT_ICONS] ?? Scroll;
                    return (
                      <div className="tx-stat" key={i}>
                        <span><Icon size={20} />{tr(st.label)}</span>
                        <b>{st.value}</b>
                      </div>
                    );
                  })}
                </div>
                <button className="tx-cta if-tap" onClick={() => setTab('voqealar')}>
                  {s('studyMore')}
                  <ChevronRight size={26} />
                </button>
              </div>
            </div>
          )}

          {tab === 'davrlar' && (
            <div className="tx-cards">
              {eras.data.map((e) => (
                <button
                  key={e.id}
                  className="tx-card if-tap"
                  onClick={() => { setEraId(e.id); setTab('lenta'); }}
                >
                  <img src={e.detailImage} alt="" />
                  <span>
                    <i>{tr(e.period)}</i>
                    <b>{tr(e.name)}</b>
                    <small>{tr(e.summary)}</small>
                  </span>
                </button>
              ))}
            </div>
          )}

          {tab === 'voqealar' && (eraEvents.length === 0 ? (
            <div className="tx-placeholder">
              {tr({
                uz: 'Bu davr uchun voqealar hozircha kiritilmagan. Boshqa davrni tanlab ko‘ring.',
                ru: 'Для этого периода события пока не добавлены. Выберите другой период.',
                en: 'No events have been added for this period yet. Try another period.',
              })}
              <div style={{ marginTop: 26 }}>
                <button className="tx-cta if-tap" onClick={() => setTab('davrlar')}>
                  {tr({ uz: 'Davrlar', ru: 'Периоды', en: 'Eras' })} <ChevronRight size={24} />
                </button>
              </div>
            </div>
          ) : (
            <div className="tx-cards">
              {eraEvents.map((e) => (
                <button key={e.id} className="tx-card if-tap" onClick={() => setEventId(e.id)}>
                  <img src={e.image} alt="" />
                  <span>
                    <i>{tr(e.date)}</i>
                    <b>{tr(e.title)}</b>
                    <small>{tr(e.body).slice(0, 90)}…</small>
                  </span>
                </button>
              ))}
            </div>
          ))}

          {tab === 'shaxslar' && (
            <div className="tx-placeholder">
              {tr({
                uz: 'Tarixiy shaxslar bo‘limi “O‘zbekistonning 100 siymosi” modulida ochiladi.',
                ru: 'Раздел исторических личностей открывается в модуле «100 личностей Узбекистана».',
                en: 'Historical figures open in the “100 figures of Uzbekistan” module.',
              })}
              <div style={{ marginTop: 26 }}>
                <button className="tx-cta if-tap" onClick={() => navigate('siymolar')}>
                  {s('view')} <ChevronRight size={24} />
                </button>
              </div>
            </div>
          )}

          {tab === 'xaritalar' && (
            <div className="tx-cards" style={{ gridTemplateColumns: '1fr' }}>
              <button className="tx-card if-tap" onClick={() => setMapOpen(true)}>
                <img src="/interface/tarix/map.webp" alt="" style={{ height: 340 }} />
                <span>
                  <b>{s('onMaps')}</b>
                  <small>{s('viewMap')}</small>
                </span>
              </button>
            </div>
          )}

          {tab === 'lenta' && (
            <>
              <div className="tx-map">
                <img src="/interface/tarix/map.webp" alt="" />
                <div>
                  <h3>{s('onMaps')}</h3>
                  <button className="tx-cta if-tap" onClick={() => setMapOpen(true)}>
                    {s('viewMap')}
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div className="if-section-head" style={{ marginTop: 30 }}>
                <h2 className="if-section-title">{s('keyEvents')}</h2>
              </div>
              <div className="tx-events">
                {events.data.map((e) => (
                  <button key={e.id} className="tx-event if-tap" onClick={() => setEventId(e.id)}>
                    <img src={e.image} alt="" />
                    <span>
                      <b>{tr(e.title)}</b>
                      <small>{tr(e.date)}</small>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <BottomNav onHome={() => navigate('hub')} current="home" />

      {openedEvent && (
        <div className="tx-modal" onClick={() => setEventId(null)}>
          <div className="tx-modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={openedEvent.image} alt="" />
            <div className="tx-modal-body">
              <h3>{tr(openedEvent.title)}</h3>
              <div className="tx-period">{tr(openedEvent.date)}</div>
              <p>{tr(openedEvent.body)}</p>
              <button className="tx-cta if-tap" onClick={() => setEventId(null)}>
                <X size={24} /> {tr({ uz: 'Yopish', ru: 'Закрыть', en: 'Close' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {mapOpen && (
        <div className="tx-modal" onClick={() => setMapOpen(false)}>
          <div className="tx-modal-card" style={{ maxWidth: 940 }} onClick={(e) => e.stopPropagation()}>
            <img src="/interface/tarix/map.webp" alt="" style={{ height: 480 }} />
            <div className="tx-modal-body">
              <h3>{s('onMaps')}</h3>
              <p>
                {tr({
                  uz: 'Buyuk ipak yo‘li shoxobchalari va tarixiy savdo marshrutlari.',
                  ru: 'Ответвления Великого шёлкового пути и исторические торговые маршруты.',
                  en: 'Branches of the Silk Road and historic trade routes.',
                })}
              </p>
              <button className="tx-cta if-tap" onClick={() => setMapOpen(false)}>
                <X size={24} /> {tr({ uz: 'Yopish', ru: 'Закрыть', en: 'Close' })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

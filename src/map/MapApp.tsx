import { useCallback, useEffect, useMemo, useState } from 'react';
import { Hand } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { DEFAULT_LANG } from '../i18n/translations';
import AboutView from './components/AboutView';
import FloorPlan from './components/FloorPlan';
import FloorSwitch from './components/FloorSwitch';
import InfoColumn from './components/InfoColumn';
import MapHeader from './components/MapHeader';
import RoomDetail from './components/RoomDetail';
import RoomsView from './components/RoomsView';
import StatsColumn from './components/StatsColumn';
import { FLOORS } from './data/floors';
import { MAP_TEXT } from './mapText';
import type { FloorId, MapView, Room } from './types';
import './map.css';

/** Kioskda tegilmagan vaqt shu qiymatdan oshsa, ekran boshlang'ich holatga qaytadi. */
const IDLE_RESET_MS = 3 * 60 * 1000;

/**
 * /map — kutubxona binosining interaktiv 3D xaritasi.
 *
 * Kiosk (/) va devor ekranidan (/ekran) mustaqil bo'lim: o'z sarlavhasi,
 * och mavzusi va uchta ko'rinishi bor —
 *   'map'   → tanlangan qavatning 3D chizmasi + shu qavatdagi xonalar ro'yxati
 *   'about' → kutubxona haqida (raqamlar, imkoniyatlar, aloqa)
 *   'rooms' → barcha xonalar ro'yxati (qidiruv va filtr bilan)
 */
export default function MapApp() {
  const { lang, setLang } = useI18n();
  const text = MAP_TEXT[lang];

  const [view, setView] = useState<MapView>('map');
  const [floorId, setFloorId] = useState<FloorId>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = text.documentTitle;
  }, [text]);

  /*
   * Ommaviy kiosk: bir necha daqiqa tegilmasa, oldingi tashrifchi
   * qoldirgan holat (qavat, tanlangan xona, til) tozalanib, ekran
   * boshlang'ich ko'rinishga qaytadi.
   */
  useEffect(() => {
    let timer: number;

    function reset() {
      setView('map');
      setFloorId(1);
      setSelectedId(null);
      setLang(DEFAULT_LANG);
    }

    function restart() {
      window.clearTimeout(timer);
      timer = window.setTimeout(reset, IDLE_RESET_MS);
    }

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, restart, { passive: true }));
    restart();

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, restart));
    };
  }, [setLang]);

  const floor = useMemo(() => FLOORS.find((f) => f.id === floorId) ?? FLOORS[0], [floorId]);

  const selectedRoom = useMemo(
    () => floor.rooms.find((room) => room.id === selectedId) ?? null,
    [floor, selectedId],
  );

  /* Qavat almashganda oldingi qavatning tanlovi ochiq qolmasin. */
  const selectFloor = useCallback((next: FloorId) => {
    setFloorId(next);
    setSelectedId(null);
  }, []);

  /* Ro'yxatdan tanlangan xona — kerakli qavat ochilib, kartochkasi chiqadi. */
  const showOnMap = useCallback((room: Room) => {
    setFloorId(room.floor);
    setSelectedId(room.id);
    setView('map');
  }, []);

  function renderView() {
    if (view === 'about') return <AboutView text={text} />;
    return <RoomsView text={text} onShowOnMap={showOnMap} />;
  }

  return (
    <div className="m-root">
      <MapHeader text={text} view={view} onNavigate={setView} now={now} />

      {view !== 'map' ? (
        <main className="m-body m-body-scroll">{renderView()}</main>
      ) : (
        <main className="m-body m-layout">
          <aside className="m-col m-col-left">
            <InfoColumn
              text={text}
              floor={floor}
              selectedId={selectedId}
              onSelectRoom={(room) => setSelectedId(room.id)}
              onOpenRooms={() => setView('rooms')}
            />
          </aside>

          <section className="m-stage">
            <div className="m-stage-head">
              <div className="m-stage-titlebox">
                <h1 className="m-stage-title">{text.floor(floor.id)}</h1>
                <div className="m-stage-sub">{text.floorPlanSubtitle}</div>
              </div>
              <FloorSwitch text={text} floorId={floorId} onSelect={selectFloor} />
            </div>

            <div className="m-stage-body">
              <FloorPlan floor={floor} text={text} />
            </div>

            <div className="m-hint">
              <Hand size={18} strokeWidth={2} />
              {text.hint}
            </div>
          </section>

          {/* Tanlangan xona kartochkasi statistika tepasida paydo bo'ladi —
              shunda ustun bo'sh qolmaydi va umumiy raqamlar ko'rinib turadi. */}
          <aside className="m-col m-col-right">
            {selectedRoom && (
              <RoomDetail room={selectedRoom} text={text} onClose={() => setSelectedId(null)} />
            )}
            <StatsColumn
              text={text}
              floorId={floorId}
              onNavigate={setView}
              onSelectFloor={selectFloor}
            />
          </aside>
        </main>
      )}
    </div>
  );
}

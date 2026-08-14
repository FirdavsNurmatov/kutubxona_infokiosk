import { Clock, MapPin } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import KioskPage from '../components/KioskPage';
import { events } from '../../data/mockData';
import type { LibraryEvent } from '../../data/mockData';

interface KioskEventsProps {
  onSelectEvent: (event: LibraryEvent) => void;
}

export default function KioskEvents({ onSelectEvent }: KioskEventsProps) {
  const { t, tr, monthShort, dayName } = useI18n();

  return (
    <KioskPage title={t.kiosk.menu.events} subtitle={t.results(events.length)}>
      <div className="k-grid-wide">
        {events.map((event) => {
          const date = new Date(`${event.date}T00:00:00`);
          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onSelectEvent(event)}
              className="k-card overflow-hidden text-left transition-transform hover:-translate-y-0.5"
              style={{ padding: 0 }}
            >
              <div style={{ height: '132px', background: '#E8EDF7' }}>
                <img
                  src={event.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-3 p-4">
                <span
                  className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl text-white"
                  style={{ width: '54px', height: '54px', background: '#4F52F6' }}
                >
                  <span className="text-lg font-black leading-none">{date.getDate()}</span>
                  <span className="text-[10px] font-bold mt-0.5 opacity-90">{monthShort(date)}</span>
                </span>

                <span className="min-w-0">
                  <span
                    className="block font-bold leading-tight line-clamp-2"
                    style={{ color: '#0B1848', fontSize: 'clamp(13px, 1.6vh, 15.5px)' }}
                  >
                    {tr(event.title)}
                  </span>
                  <span
                    className="block mt-1.5"
                    style={{ color: '#6B7A99', fontSize: 'clamp(11px, 1.35vh, 13px)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="flex-shrink-0" />
                      {dayName(date)}, {event.time} – {event.endTime}
                    </span>
                    <span className="flex items-center gap-1.5 mt-1">
                      <MapPin size={12} className="flex-shrink-0" />
                      <span className="truncate">{tr(event.location)}</span>
                    </span>
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </KioskPage>
  );
}

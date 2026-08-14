import { CalendarRange, Megaphone } from 'lucide-react';
import EventCard from './EventCard';
import { useI18n } from '../i18n/context';
import type { LibraryEvent } from '../data/mockData';

interface EventListProps {
  events: LibraryEvent[];
  /** Bugungi tadbirlar soni — panel ostidagi e'lon qatorida ko'rsatiladi. */
  todayCount: number;
  /** Bosh sahifadagi to'r joylashuvi uchun klass. */
  className?: string;
  onSelectEvent: (event: LibraryEvent) => void;
}

export default function EventList({
  events,
  todayCount,
  className = '',
  onSelectEvent,
}: EventListProps) {
  const { t } = useI18n();

  return (
    <section className={`panel ${className}`}>
      <header
        className="panel-head"
        style={{ background: 'linear-gradient(135deg, #015C74 0%, #013F52 100%)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <CalendarRange size={19} className="text-cyan-200 flex-shrink-0" />
          <h2 className="text-white font-bold tracking-wide truncate">{t.eventsTitle}</h2>
        </div>

        {/* Bu ekran bosilmaydi — yorliq faqat nechta tadbir borligini bildiradi */}
        <span className="panel-pill flex-shrink-0">{events.length}</span>
      </header>

      <div className="panel-body scroll-cyan px-2 py-2 flex flex-col gap-1.5">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onSelect={onSelectEvent} />
        ))}
      </div>

      <div
        className="panel-note text-white font-medium"
        style={{ background: 'linear-gradient(90deg, #015C74 0%, #013F52 70%, rgba(1,63,82,0.85) 100%)' }}
      >
        <Megaphone size={16} className="text-amber-300 flex-shrink-0" />
        <span className="truncate">{t.dash.todayEvents(todayCount)}</span>
      </div>
    </section>
  );
}

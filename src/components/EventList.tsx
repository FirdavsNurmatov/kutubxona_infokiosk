import { Calendar, ChevronRight, LayoutGrid } from 'lucide-react';
import EventCard from './EventCard';
import { useI18n } from '../i18n/context';
import type { LibraryEvent } from '../data/mockData';

interface EventListProps {
  events: LibraryEvent[];
  onSelectEvent: (event: LibraryEvent) => void;
  onShowAll: () => void;
}

const PANEL_BG = 'linear-gradient(135deg, #0D1B4B 0%, #1e3a74 100%)';

export default function EventList({ events, onSelectEvent, onShowAll }: EventListProps) {
  const { t } = useI18n();

  return (
    <section className="panel" style={{ border: '1.5px solid #C9A84C' }}>
      <header
        className="panel-head"
        style={{ background: PANEL_BG, borderBottom: '2px solid #C9A84C' }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Calendar size={18} className="text-gold-400 flex-shrink-0" />
          <h2 className="text-white font-bold tracking-wide truncate">{t.eventsTitle}</h2>
        </div>
        <ChevronRight size={18} className="text-gold-400 flex-shrink-0" />
      </header>

      <div className="panel-body px-3 py-2 flex flex-col gap-1.5">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onSelect={onSelectEvent} />
        ))}
      </div>

      <button
        type="button"
        onClick={onShowAll}
        className="panel-foot font-bold text-white transition-all hover:opacity-90 active:opacity-80"
        style={{ background: PANEL_BG, borderTop: '2px solid #C9A84C' }}
      >
        <span className="flex items-center gap-2 min-w-0">
          <LayoutGrid size={16} className="text-gold-400 flex-shrink-0" />
          <span className="truncate">{t.eventsButton}</span>
        </span>
        <ChevronRight size={16} className="text-gold-400 flex-shrink-0" />
      </button>
    </section>
  );
}

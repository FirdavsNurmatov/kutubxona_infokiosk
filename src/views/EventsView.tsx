import { CalendarDays, Clock, MapPin } from 'lucide-react';
import PageShell from '../components/PageShell';
import { useI18n } from '../i18n/context';
import { events } from '../data/mockData';
import type { LibraryEvent } from '../data/mockData';

interface EventsViewProps {
  onBack: () => void;
  onSelectEvent: (event: LibraryEvent) => void;
}

function EventCardWide({
  event,
  onSelect,
}: {
  event: LibraryEvent;
  onSelect: (event: LibraryEvent) => void;
}) {
  const { tr, monthShort, dayName } = useI18n();
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className="flex flex-col rounded-xl bg-ink-600 overflow-hidden text-left transition-all hover:shadow-md active:scale-[0.99] group"
      style={{ border: '1px solid rgba(34,195,230,0.25)' }}
    >
      <div className="relative bg-ink-500" style={{ height: '128px' }}>
        <img src={event.image} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div
          className="absolute top-2 left-2 flex flex-col items-center justify-center rounded-xl text-white font-bold shadow-lg"
          style={{
            width: '52px',
            height: '52px',
            background: 'linear-gradient(135deg, #06437A 0%, #0E5270 100%)',
          }}
        >
          <span className="text-xl font-black leading-none">{date.getDate()}</span>
          <span className="text-cyan-300 text-[10px] font-bold tracking-wide mt-0.5">
            {monthShort(date)}
          </span>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 group-hover:text-paper-200">
          {tr(event.title)}
        </h3>
        <div className="flex items-center gap-1.5 text-paper-400 text-xs">
          <CalendarDays size={12} className="text-cyan-300 flex-shrink-0" />
          <span className="truncate">{dayName(date)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-paper-400 text-xs">
          <Clock size={12} className="text-cyan-300 flex-shrink-0" />
          <span>
            {event.time} – {event.endTime}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-paper-400 text-xs">
          <MapPin size={12} className="text-cyan-300 flex-shrink-0" />
          <span className="truncate">{tr(event.location)}</span>
        </div>
      </div>
    </button>
  );
}

export default function EventsView({ onBack, onSelectEvent }: EventsViewProps) {
  const { t } = useI18n();

  return (
    <PageShell title={t.page.events} subtitle={t.results(events.length)} onBack={onBack}>
      <div className="card-grid">
        {events.map((event) => (
          <EventCardWide key={event.id} event={event} onSelect={onSelectEvent} />
        ))}
      </div>
    </PageShell>
  );
}

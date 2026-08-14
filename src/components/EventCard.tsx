import { Clock, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/context';
import type { LibraryEvent } from '../data/mockData';

interface EventCardProps {
  event: LibraryEvent;
  onSelect: (event: LibraryEvent) => void;
}

export default function EventCard({ event, onSelect }: EventCardProps) {
  const { tr, monthShort } = useI18n();
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className="btn-compact w-full flex items-center gap-2.5 rounded-lg bg-white hover:bg-paper-100 active:bg-paper-200 border border-paper-200 hover:border-cyan-400/60 transition-colors text-left group"
      style={{ minHeight: '64px', padding: '7px 9px' }}
    >
      {/* Sana bloki */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg text-white"
        style={{
          width: '50px',
          minWidth: '50px',
          height: '50px',
          background: 'linear-gradient(135deg, #062240 0%, #0E5270 100%)',
        }}
      >
        <span className="text-xl font-black leading-none">{date.getDate()}</span>
        <span className="text-cyan-300 text-[10.5px] font-bold tracking-wide mt-0.5">
          {monthShort(date)}
        </span>
      </div>

      {/* Tadbir tafsiloti */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-ink-800 text-[14.5px] leading-tight line-clamp-1 group-hover:text-cyan-800 transition-colors">
          {tr(event.title)}
        </div>
        <div className="flex items-center gap-2.5 mt-1">
          <span className="flex items-center gap-1 text-paper-500 text-[12.5px] flex-shrink-0">
            <Clock size={12} className="text-cyan-600 flex-shrink-0" />
            {event.time}
          </span>
          <span className="flex items-center gap-1 text-paper-500 text-[12.5px] min-w-0">
            <MapPin size={12} className="text-cyan-600 flex-shrink-0" />
            <span className="truncate">{tr(event.location)}</span>
          </span>
        </div>
      </div>

      {/* Rasm */}
      <div
        className="flex-shrink-0 rounded-md overflow-hidden bg-paper-200"
        style={{ width: '68px', height: '48px' }}
      >
        <img src={event.image} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
    </button>
  );
}

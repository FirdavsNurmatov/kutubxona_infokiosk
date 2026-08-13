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
      className="btn-compact w-full flex items-center gap-3 rounded-xl bg-white hover:bg-cream-50 active:bg-cream-100 transition-colors border border-transparent hover:border-gold-200 text-left group"
      style={{ minHeight: '68px', padding: '8px 10px' }}
    >
      {/* Sana bloki */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl text-white font-bold"
        style={{
          width: '54px',
          minWidth: '54px',
          height: '54px',
          background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2f6e 100%)',
        }}
      >
        <span className="text-xl font-black leading-none">{date.getDate()}</span>
        <span className="text-gold-400 text-[10px] font-bold tracking-wide mt-0.5">{monthShort(date)}</span>
      </div>

      {/* Tadbir tafsiloti */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-navy-900 text-sm leading-tight line-clamp-2 group-hover:text-navy-700 transition-colors">
          {tr(event.title)}
        </div>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="flex items-center gap-1 text-navy-500 text-xs flex-shrink-0">
            <Clock size={11} className="text-gold-500 flex-shrink-0" />
            {event.time}
          </span>
          <span className="flex items-center gap-1 text-navy-500 text-xs min-w-0">
            <MapPin size={11} className="text-gold-500 flex-shrink-0" />
            <span className="truncate">{tr(event.location)}</span>
          </span>
        </div>
      </div>

      {/* Rasm */}
      <div className="flex-shrink-0 rounded-lg overflow-hidden bg-cream-200" style={{ width: '72px', height: '52px' }}>
        <img
          src={event.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </button>
  );
}

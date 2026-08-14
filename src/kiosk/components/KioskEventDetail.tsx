import { CalendarDays, Clock, MapPin } from 'lucide-react';
import KioskModal from './KioskModal';
import { useI18n } from '../../i18n/context';
import type { LibraryEvent } from '../../data/mockData';

interface KioskEventDetailProps {
  event: LibraryEvent;
  onClose: () => void;
}

export default function KioskEventDetail({ event, onClose }: KioskEventDetailProps) {
  const { t, tr, formatDate, dayName } = useI18n();
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <KioskModal title={tr(event.title)} onClose={onClose}>
      <div className="w-full" style={{ height: '220px', background: '#E8EDF7' }}>
        <img src={event.image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3
          className="font-extrabold leading-tight"
          style={{ color: '#0B1848', fontSize: 'clamp(18px, 2.4vh, 24px)' }}
        >
          {tr(event.title)}
        </h3>

        <div className="flex flex-col gap-2.5" style={{ color: '#1B2559', fontSize: '15px' }}>
          <div className="flex items-center gap-2.5">
            <CalendarDays size={18} style={{ color: '#4F52F6' }} className="flex-shrink-0" />
            <span>
              {formatDate(date)} · {dayName(date)}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock size={18} style={{ color: '#4F52F6' }} className="flex-shrink-0" />
            <span>
              {event.time} – {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin size={18} style={{ color: '#4F52F6' }} className="flex-shrink-0" />
            <span>{tr(event.location)}</span>
          </div>
        </div>

        <div className="pt-4" style={{ borderTop: '1px solid #E3E8F2' }}>
          <h4
            className="font-semibold uppercase tracking-wide mb-1"
            style={{ color: '#8B98B8', fontSize: '11px' }}
          >
            {t.eventInfo.description}
          </h4>
          <p style={{ color: '#3B4A6B', fontSize: '15px', lineHeight: 1.65 }}>
            {tr(event.description)}
          </p>
        </div>
      </div>
    </KioskModal>
  );
}

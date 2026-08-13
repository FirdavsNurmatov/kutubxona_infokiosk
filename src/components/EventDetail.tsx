import { CalendarDays, Clock, MapPin } from 'lucide-react';
import Modal from './Modal';
import { useI18n } from '../i18n/context';
import type { LibraryEvent } from '../data/mockData';

interface EventDetailProps {
  event: LibraryEvent;
  onClose: () => void;
}

export default function EventDetail({ event, onClose }: EventDetailProps) {
  const { t, tr, formatDate, dayName } = useI18n();
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <Modal title={tr(event.title)} onClose={onClose}>
      <div
        className="w-full bg-cream-200"
        style={{ height: '200px', borderBottom: '1px solid rgba(201,168,76,0.4)' }}
      >
        <img src={event.image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-navy-900 font-extrabold text-lg leading-tight">{tr(event.title)}</h3>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 text-navy-800 text-sm">
            <CalendarDays size={17} className="text-gold-600 flex-shrink-0" />
            <span>
              {formatDate(date)} · {dayName(date)}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-navy-800 text-sm">
            <Clock size={17} className="text-gold-600 flex-shrink-0" />
            <span>
              {event.time} – {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-navy-800 text-sm">
            <MapPin size={17} className="text-gold-600 flex-shrink-0" />
            <span>{tr(event.location)}</span>
          </div>
        </div>

        <div className="pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.3)' }}>
          <h4 className="text-navy-400 text-[11px] font-semibold uppercase tracking-wide mb-1">
            {t.eventInfo.description}
          </h4>
          <p className="text-navy-800 text-sm leading-relaxed">{tr(event.description)}</p>
        </div>
      </div>
    </Modal>
  );
}

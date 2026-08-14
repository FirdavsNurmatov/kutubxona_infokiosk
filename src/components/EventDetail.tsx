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
        className="w-full bg-ink-500"
        style={{ height: '200px', borderBottom: '1px solid rgba(34,195,230,0.25)' }}
      >
        <img src={event.image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-white font-extrabold text-xl leading-tight">{tr(event.title)}</h3>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 text-paper-200 text-[15px]">
            <CalendarDays size={17} className="text-cyan-300 flex-shrink-0" />
            <span>
              {formatDate(date)} · {dayName(date)}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-paper-200 text-[15px]">
            <Clock size={17} className="text-cyan-300 flex-shrink-0" />
            <span>
              {event.time} – {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-paper-200 text-[15px]">
            <MapPin size={17} className="text-cyan-300 flex-shrink-0" />
            <span>{tr(event.location)}</span>
          </div>
        </div>

        <div className="pt-4" style={{ borderTop: '1px solid rgba(34,195,230,0.2)' }}>
          <h4 className="text-cyan-300/70 text-xs font-semibold uppercase tracking-wide mb-1">
            {t.eventInfo.description}
          </h4>
          <p className="text-paper-200 text-[15px] leading-relaxed">{tr(event.description)}</p>
        </div>
      </div>
    </Modal>
  );
}

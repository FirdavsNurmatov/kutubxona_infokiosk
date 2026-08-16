import { MapPin } from 'lucide-react';
import Media from './Media';
import { useI18n } from '../../i18n/context';
import { slotAttrs } from './slots';
import type { SignageEvent } from '../data/types';

interface EventCardProps {
  event: SignageEvent;
  offset: number;
  focused: boolean;
}

/**
 * Tadbir kartochkasi — maketdagidek gorizontal:
 *
 *     sana │ rasm │ nom + joy
 *
 * Markazdagi kartochka oltin ramka va yumshoq yog'du oladi; qolganlari
 * sokin to'q panel bo'lib qoladi, lekin sanasi va nomi baribir o'qiladi.
 */
export default function EventCard({ event, offset, focused }: EventCardProps) {
  const { tr, monthShort } = useI18n();
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <li className={`sg-event${focused ? ' is-focus' : ''}`} {...slotAttrs(offset)}>
      <span className="sg-event-card">
        <span className="sg-event-when">
          <span className="sg-event-day">{date.getDate()}</span>
          <span className="sg-event-month">{monthShort(date)}</span>
          <span className="sg-event-time">{event.time}</span>
        </span>

        <span className="sg-event-media">
          <Media src={event.image} alt="" />
        </span>

        <span className="sg-event-body">
          <span className="sg-event-title">{tr(event.title)}</span>
          <span className="sg-event-place">
            <MapPin aria-hidden="true" />
            {tr(event.location)}
          </span>
        </span>
      </span>
    </li>
  );
}

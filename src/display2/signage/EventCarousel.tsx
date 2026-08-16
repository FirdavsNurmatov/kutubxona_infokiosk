import EventCard from './EventCard';
import { SLOT_RANGE } from './slots';
import { useAutoCarousel } from '../hooks/useAutoCarousel';
import { EVENT_INTERVAL } from '../data/playlist';
import type { SignageEvent } from '../data/types';

interface EventCarouselProps {
  events: SignageEvent[];
  active: boolean;
}

/**
 * Cheksiz tadbirlar karuseli — kitoblar karuseli bilan bir xil mantiq.
 *
 * Maketdan farqli o'laroq bu yerda pastda alohida katta blok yo'q: tadbir
 * haqidagi barcha ma'lumot (sana, vaqt, nom, joy) kartochkaning o'zida
 * turadi, markazdagisi esa oltin ramka bilan ajratiladi.
 */
export default function EventCarousel({ events, active }: EventCarouselProps) {
  const { cursor, index } = useAutoCarousel('events', events.length, EVENT_INTERVAL, active);

  const slots = [];
  for (let offset = -SLOT_RANGE; offset <= SLOT_RANGE; offset += 1) {
    const position = index + offset;
    const event = events[((position % events.length) + events.length) % events.length];
    slots.push({ key: cursor + offset, event, offset });
  }

  return (
    <div className="sg-carousel">
      <ul className="sg-event-track">
        {slots.map(({ key, event, offset }) => (
          <EventCard key={key} event={event} offset={offset} focused={offset === 0} />
        ))}
      </ul>
    </div>
  );
}

import { useCallback, useMemo } from 'react';
import EventCarousel from './EventCarousel';
import { useI18n } from '../../i18n/context';
import { getSignageEvents } from '../api';
import { buildSignageEvents } from '../data/events';
import { useSignageResource } from '../hooks/useSignageResource';
import { useToday } from '../hooks/useToday';

/** 03 — YAQINLASHAYOTGAN TADBIRLAR. */
export default function EventsSlide({ active }: { active: boolean }) {
  const { t } = useI18n();

  /* Ro'yxat kun almashganda qaytadan yig'iladi. Odatdagi siklda bo'lim har
     safar qaytadan mount bo'ladi va shusiz ham yangilanardi; bu esa
     `?slide=events` bilan qotirilgan ekran uchun — u oylab mount bo'lib
     turadi va aks holda birinchi kundagi afishani ko'rsatib qolaverardi. */
  const today = useToday();
  const fallback = useMemo(() => buildSignageEvents(today), [today]);
  const load = useCallback(() => getSignageEvents(today), [today]);
  const events = useSignageResource(`events:${today}`, load, fallback);

  return (
    <div className="sg-section">
      <h2 className="sg-section-title">{t.screen2.eventsTitle}</h2>

      {events.length > 0 ? (
        <EventCarousel events={events} active={active} />
      ) : (
        <p className="sg-empty">{t.screen2.empty.events}</p>
      )}
    </div>
  );
}

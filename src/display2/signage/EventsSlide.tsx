import EventCarousel from './EventCarousel';
import { useI18n } from '../../i18n/context';
import { signageEvents } from '../data/events';

/** 03 — YAQINLASHAYOTGAN TADBIRLAR. */
export default function EventsSlide({ active }: { active: boolean }) {
  const { t } = useI18n();

  return (
    <div className="sg-section">
      <h2 className="sg-section-title">{t.screen2.eventsTitle}</h2>

      {signageEvents.length > 0 ? (
        <EventCarousel events={signageEvents} active={active} />
      ) : (
        <p className="sg-empty">{t.screen2.empty.events}</p>
      )}
    </div>
  );
}

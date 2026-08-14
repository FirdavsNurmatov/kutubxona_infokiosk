import { Wifi, Headphones, MonitorSmartphone, Baby, CalendarDays, CreditCard, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { quickServices } from '../../data/mockData';
import type { QuickService } from '../../data/mockData';
import type { View } from '../../types';

const ICONS: Record<QuickService['icon'], LucideIcon> = {
  wifi: Wifi,
  headphones: Headphones,
  monitor: MonitorSmartphone,
  kids: Baby,
  calendar: CalendarDays,
  card: CreditCard,
};

/** Har bir plitka qaysi bo'limga olib boradi. */
const TARGET: Record<QuickService['id'], View> = {
  wifi: 'services',
  audio: 'catalog',
  catalog: 'catalog',
  kids: 'services',
  events: 'events',
  membership: 'services',
};

interface QuickServicesProps {
  onNavigate: (view: View) => void;
}

export default function QuickServices({ onNavigate }: QuickServicesProps) {
  const { t } = useI18n();

  return (
    <section className="dash dash-serv">
      <header className="dash-head">
        <Sparkles size={16} className="flex-shrink-0" />
        {t.dash.servicesTitle}
      </header>

      <div
        className="dash-body grid gap-1.5"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}
      >
        {quickServices.map((service) => {
          const Icon = ICONS[service.icon];

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onNavigate(TARGET[service.id])}
              className="btn-compact flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-1 transition-colors hover:bg-white/10 active:bg-white/15"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <Icon
                style={{
                  color: service.accent,
                  width: 'clamp(22px, 3vh, 30px)',
                  height: 'auto',
                }}
                strokeWidth={1.8}
                className="flex-shrink-0"
              />
              <span
                className="text-cyan-200/85 font-medium leading-tight text-center line-clamp-2"
                style={{ fontSize: 'clamp(9px, 1.15vh, 12px)' }}
              >
                {t.dash.quick[service.id]}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

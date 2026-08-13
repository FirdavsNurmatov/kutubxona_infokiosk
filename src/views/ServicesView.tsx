import { BookOpen, Wifi, Printer, Monitor, Users, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import PageShell from '../components/PageShell';
import { useI18n } from '../i18n/context';
import { services } from '../data/mockData';
import type { Service } from '../data/mockData';

interface ServicesViewProps {
  onBack: () => void;
}

const ICONS: Record<Service['icon'], LucideIcon> = {
  book: BookOpen,
  wifi: Wifi,
  printer: Printer,
  monitor: Monitor,
  users: Users,
  graduation: GraduationCap,
};

export default function ServicesView({ onBack }: ServicesViewProps) {
  const { t, tr } = useI18n();

  return (
    <PageShell title={t.page.services} onBack={onBack}>
      <div className="card-grid-wide">
        {services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <article
              key={service.id}
              className="flex gap-4 p-4 rounded-xl bg-white"
              style={{ border: '1px solid rgba(201,168,76,0.35)' }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2f6e 100%)',
                }}
              >
                <Icon size={26} className="text-gold-400" strokeWidth={1.5} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-navy-900 text-sm leading-tight">{tr(service.title)}</h3>
                <p className="text-navy-600 text-xs mt-1.5 leading-relaxed">{tr(service.description)}</p>
                <p
                  className="text-navy-500 text-xs mt-2.5 pt-2.5 leading-relaxed"
                  style={{ borderTop: '1px solid rgba(201,168,76,0.25)' }}
                >
                  {tr(service.detail)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

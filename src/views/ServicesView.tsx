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
              className="flex gap-4 p-4 rounded-xl bg-ink-600"
              style={{ border: '1px solid rgba(34,195,230,0.25)' }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #06437A 0%, #0E5270 100%)',
                }}
              >
                <Icon size={30} className="text-cyan-300" strokeWidth={1.5} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-white text-base leading-tight">{tr(service.title)}</h3>
                <p className="text-paper-300 text-sm mt-1.5 leading-relaxed">{tr(service.description)}</p>
                <p
                  className="text-paper-400 text-sm mt-2.5 pt-2.5 leading-relaxed"
                  style={{ borderTop: '1px solid rgba(34,195,230,0.25)' }}
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

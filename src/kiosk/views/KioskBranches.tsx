import { MapPin, Phone, Clock, Users, Navigation } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import KioskPage from '../components/KioskPage';
import { branches } from '../../data/mockData';

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={16} style={{ color: '#4F52F6' }} className="flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div
          className="font-semibold uppercase tracking-wide"
          style={{ color: '#8B98B8', fontSize: '10.5px' }}
        >
          {label}
        </div>
        <div style={{ color: '#1B2559', fontSize: 'clamp(12px, 1.45vh, 14px)' }}>{value}</div>
      </div>
    </div>
  );
}

export default function KioskBranches() {
  const { t, tr } = useI18n();

  return (
    <KioskPage title={t.kiosk.menu.branches} subtitle={t.results(branches.length)}>
      <div className="k-grid-wide">
        {branches.map((branch) => (
          <article key={branch.id} className="k-card p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: '44px', height: '44px', background: '#EAEEFD' }}
              >
                <Navigation size={20} style={{ color: '#4F52F6' }} strokeWidth={2} />
              </span>
              <h2
                className="font-bold leading-tight min-w-0"
                style={{ color: '#0B1848', fontSize: 'clamp(14px, 1.75vh, 17px)' }}
              >
                {tr(branch.name)}
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              <Row icon={MapPin} label={t.contactInfo.address} value={tr(branch.address)} />
              <Row icon={Navigation} label={t.kiosk.branches.floor} value={tr(branch.floor)} />
              <Row icon={Clock} label={t.kiosk.branches.hours} value={tr(branch.hours)} />
              <Row icon={Phone} label={t.kiosk.branches.phone} value={branch.phone} />
              <Row icon={Users} label={t.kiosk.branches.seats} value={String(branch.seats)} />
            </div>
          </article>
        ))}
      </div>
    </KioskPage>
  );
}

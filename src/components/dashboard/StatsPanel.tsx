import { Users, Armchair, BookPlus, CalendarCheck, Library, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { formatNumber } from '../../i18n/translations';
import { todayStats } from '../../data/mockData';
import type { StatTile } from '../../data/mockData';

const ICONS: Record<StatTile['icon'], LucideIcon> = {
  users: Users,
  armchair: Armchair,
  book: BookPlus,
  calendar: CalendarCheck,
  library: Library,
};

const ACCENTS: Record<StatTile['accent'], string> = {
  cyan: '#22C3E6',
  emerald: '#3FBF9F',
  amber: '#F0AB2A',
  iris: '#A79CD9',
  azure: '#7FB6E8',
};

export default function StatsPanel() {
  const { t } = useI18n();

  return (
    <section className="dash dash-stats">
      <header className="dash-head">
        <Activity size={16} className="flex-shrink-0" />
        {t.dash.statsTitle}
      </header>

      <div className="dash-body grid gap-1.5" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {todayStats.map((stat) => {
          const Icon = ICONS[stat.icon];
          const accent = ACCENTS[stat.accent];

          return (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center text-center rounded-lg px-1 py-1.5"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{
                  width: 'clamp(34px, 4.6vh, 46px)',
                  height: 'clamp(34px, 4.6vh, 46px)',
                  background: `${accent}26`,
                }}
              >
                <Icon
                  style={{ color: accent, width: 'clamp(20px, 2.7vh, 27px)', height: 'auto' }}
                  strokeWidth={1.8}
                />
              </div>
              <div
                className="text-white font-black leading-none mt-2 tabular-nums"
                style={{ fontSize: 'clamp(15px, 2.2vh, 24px)' }}
              >
                {formatNumber(stat.value)}
              </div>
              <div
                className="text-cyan-200/80 font-medium leading-tight mt-1"
                style={{ fontSize: 'clamp(9.5px, 1.2vh, 12px)' }}
              >
                {t.dash.stat[stat.id]}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

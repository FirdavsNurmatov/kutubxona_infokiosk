import { Sun, CloudSun, Cloud, CloudRain, Snowflake, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { peopleInside, weather } from '../data/mockData';
import type { Weather } from '../data/mockData';

const ICONS: Record<Weather['condition'], LucideIcon> = {
  clear: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  rain: CloudRain,
  snow: Snowflake,
};

export default function WeatherWidget() {
  const { t, tr } = useI18n();
  const Icon = ICONS[weather.condition];

  return (
    <div
      className="hdr-weather flex items-center gap-3"
      title={t.weather.condition[weather.condition]}
    >
      <Icon size={34} className="text-amber-300 flex-shrink-0" strokeWidth={1.6} />
      <div className="min-w-0">
        <div className="text-white font-extrabold leading-none" style={{ fontSize: '25px' }}>
          {weather.tempC}°C
        </div>
        <div className="text-cyan-200 text-[12.5px] font-medium mt-1 leading-none">
          {tr(weather.city)}
        </div>
        <div className="flex items-center gap-1 text-cyan-200 text-[12.5px] font-medium mt-1 leading-none">
          <Users size={13} className="flex-shrink-0" />
          {t.weather.peopleInside(peopleInside)}
        </div>
      </div>
    </div>
  );
}

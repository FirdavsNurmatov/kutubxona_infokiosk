import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { categoryShares } from '../../data/mockData';

export default function CategoryChart() {
  const { t, tr } = useI18n();

  const data = categoryShares.map((share) => ({
    name: tr(share.label),
    value: share.percent,
    color: share.color,
  }));

  return (
    <section className="dash dash-cats">
      <header className="dash-head">
        <PieIcon size={16} className="flex-shrink-0" />
        {t.dash.categoriesTitle}
      </header>

      <div className="dash-body flex items-center gap-2 min-w-0">
        {/* Doiraviy diagramma */}
        <div className="flex-shrink-0" style={{ width: '38%', minWidth: '84px', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="52%"
                outerRadius="92%"
                paddingAngle={2}
                stroke="#092A48"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda — har bir bo'lak nomi va ulushi yozib qo'yilgan,
            shuning uchun ma'no faqat rangga bog'liq emas. */}
        <ul className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 dash-scroll overflow-y-auto h-full">
          {data.map((entry) => (
            <li key={entry.name} className="flex items-center gap-1.5 min-w-0">
              <span
                className="flex-shrink-0 rounded-sm"
                style={{ width: '11px', height: '11px', background: entry.color }}
              />
              <span
                className="flex-1 min-w-0 truncate text-cyan-200/85"
                style={{ fontSize: 'clamp(9.5px, 1.25vh, 13px)' }}
              >
                {entry.name}
              </span>
              <span
                className="flex-shrink-0 font-bold text-white tabular-nums"
                style={{ fontSize: 'clamp(9.5px, 1.25vh, 13px)' }}
              >
                {entry.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

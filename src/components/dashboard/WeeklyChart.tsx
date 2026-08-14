import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useI18n } from '../../i18n/context';
import { SITE_URL, weeklyVisits } from '../../data/mockData';

export default function WeeklyChart() {
  const { t } = useI18n();

  const data = weeklyVisits.map((day) => ({
    day: t.daysShort[day.weekday],
    visits: day.visits,
  }));

  return (
    <section className="dash dash-week">
      <header className="dash-head">
        <TrendingUp size={16} className="flex-shrink-0" />
        {t.dash.weeklyTitle}
      </header>

      <div className="dash-body flex gap-2 min-w-0">
        {/* Ustunli diagramma — bitta qator, shuning uchun legenda kerak emas */}
        <div className="flex-1 min-w-0 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 14, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="rgba(159,228,245,0.12)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: '#9FE4F5', fontSize: 11, fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(159,228,245,0.25)' }}
              />
              <YAxis
                tick={{ fill: 'rgba(159,228,245,0.6)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={36}
                tickCount={4}
              />
              <Bar dataKey="visits" fill="#22C3E6" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                <LabelList
                  dataKey="visits"
                  position="top"
                  fill="#FFFFFF"
                  fontSize={11}
                  fontWeight={700}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* QR kartochkasi */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-center"
          style={{
            width: '38%',
            maxWidth: '170px',
            background: 'linear-gradient(150deg, #0E7490 0%, #0B5C74 100%)',
            border: '1px solid rgba(159,228,245,0.28)',
          }}
        >
          <div
            className="text-white font-bold leading-tight"
            style={{ fontSize: 'clamp(9.5px, 1.2vh, 12.5px)' }}
          >
            {t.dash.qrTitle}
          </div>
          <div className="rounded bg-white p-1 flex-shrink-0">
            <QRCodeSVG value={SITE_URL} size={54} bgColor="#ffffff" fgColor="#062240" level="M" />
          </div>
          <div
            className="text-cyan-200 leading-tight"
            style={{ fontSize: 'clamp(8.5px, 1.05vh, 11px)' }}
          >
            {t.dash.qrHint}
          </div>
        </div>
      </div>
    </section>
  );
}

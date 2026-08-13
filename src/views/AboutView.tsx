import { Building2 } from 'lucide-react';
import PageShell from '../components/PageShell';
import { useI18n } from '../i18n/context';
import { aboutFacts, aboutText } from '../data/mockData';

interface AboutViewProps {
  onBack: () => void;
}

export default function AboutView({ onBack }: AboutViewProps) {
  const { t, tr } = useI18n();

  return (
    <PageShell title={t.page.about} onBack={onBack}>
      <div className="flex flex-col gap-4">
        <div
          className="relative overflow-hidden rounded-2xl flex items-center gap-5 p-6 flex-wrap"
          style={{
            background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2f6e 100%)',
            border: '1.5px solid #C9A84C',
          }}
        >
          <Building2 size={72} className="text-gold-400 flex-shrink-0" strokeWidth={1.2} />
          <div className="min-w-0 flex-1" style={{ minWidth: '220px' }}>
            <h2 className="text-white font-extrabold text-xl leading-tight">
              {t.libraryName.join(' ')}
            </h2>
            <p className="text-gold-400 text-xs font-medium mt-1.5 tracking-wide">{t.tagline}</p>
          </div>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
        >
          {aboutFacts.map((fact) => (
            <div
              key={fact.value}
              className="rounded-xl bg-white p-4 text-center"
              style={{ border: '1px solid rgba(201,168,76,0.35)' }}
            >
              <div className="text-navy-900 font-black text-2xl leading-none">{fact.value}</div>
              <div className="text-navy-500 text-xs font-medium mt-1.5">{tr(fact.label)}</div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl bg-white p-5"
          style={{ border: '1px solid rgba(201,168,76,0.35)' }}
        >
          <p className="text-navy-800 text-sm leading-relaxed">{tr(aboutText)}</p>
        </div>
      </div>
    </PageShell>
  );
}

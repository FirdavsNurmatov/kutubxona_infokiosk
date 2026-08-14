import PageShell from '../components/PageShell';
import LibraryLogo from '../components/LibraryLogo';
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
            background: 'linear-gradient(135deg, #06437A 0%, #0E5270 100%)',
            border: '1.5px solid #22C3E6',
          }}
        >
          <LibraryLogo className="flex-shrink-0" style={{ width: '76px', height: '76px' }} />
          <div className="min-w-0 flex-1" style={{ minWidth: '220px' }}>
            <h2 className="text-white font-extrabold text-2xl leading-tight">
              {t.libraryName.join(' ')}
            </h2>
            <p className="text-cyan-300 text-sm font-medium mt-1.5 tracking-wide">{t.tagline}</p>
          </div>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
        >
          {aboutFacts.map((fact) => (
            <div
              key={fact.value}
              className="rounded-xl bg-ink-600 p-4 text-center"
              style={{ border: '1px solid rgba(34,195,230,0.25)' }}
            >
              <div className="text-white font-black text-3xl leading-none">{fact.value}</div>
              <div className="text-paper-400 text-sm font-medium mt-1.5">{tr(fact.label)}</div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl bg-ink-600 p-5"
          style={{ border: '1px solid rgba(34,195,230,0.25)' }}
        >
          <p className="text-paper-200 text-[15px] leading-relaxed">{tr(aboutText)}</p>
        </div>
      </div>
    </PageShell>
  );
}

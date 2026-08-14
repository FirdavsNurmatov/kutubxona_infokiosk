import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useI18n } from '../i18n/context';

interface PageShellProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  /** Sarlavha qatorining o'ng tomoniga qo'yiladigan boshqaruv (filtr va h.k.). */
  toolbar?: ReactNode;
  children: ReactNode;
}

export default function PageShell({ title, subtitle, onBack, toolbar, children }: PageShellProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3 h-full">
      <div
        className="flex items-center gap-3 flex-wrap px-3 py-2.5 rounded-xl flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #06437A 0%, #0E5270 100%)',
          border: '1px solid rgba(34,195,230,0.3)',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 rounded-lg text-white font-bold text-sm tracking-wide transition-colors hover:bg-white/15 active:bg-white/25 flex-shrink-0 border border-cyan-400/40"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <ArrowLeft size={18} className="text-cyan-300" />
          {t.page.back}
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-white font-extrabold text-base tracking-wide truncate">{title}</h1>
          {subtitle && <p className="text-cyan-200 text-sm mt-0.5 truncate">{subtitle}</p>}
        </div>

        {toolbar}
      </div>

      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

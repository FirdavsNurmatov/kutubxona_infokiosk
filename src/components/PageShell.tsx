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
        className="flex items-center gap-3 flex-wrap px-4 py-2.5 rounded-2xl flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #0D1B4B 0%, #1e3a74 100%)',
          border: '1.5px solid #C9A84C',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 rounded-xl text-white font-bold text-xs tracking-wide transition-colors hover:bg-white/15 active:bg-white/25 flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.5)' }}
        >
          <ArrowLeft size={16} className="text-gold-400" />
          {t.page.back}
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-white font-extrabold text-sm tracking-wide truncate">{title}</h1>
          {subtitle && <p className="text-gold-300 text-xs mt-0.5 truncate">{subtitle}</p>}
        </div>

        {toolbar}
      </div>

      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

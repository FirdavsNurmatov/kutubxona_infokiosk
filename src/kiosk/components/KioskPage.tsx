import type { ReactNode } from 'react';

interface KioskPageProps {
  title: string;
  subtitle?: string;
  /** Sarlavha qatorining o'ng tomonidagi boshqaruv. */
  toolbar?: ReactNode;
  children: ReactNode;
}

/** Ichki sahifalarning umumiy sarlavhasi. */
export default function KioskPage({ title, subtitle, toolbar, children }: KioskPageProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="k-title" style={{ fontSize: 'clamp(22px, 3vh, 34px)' }}>
            {title}
          </h1>
          {subtitle && <p className="k-subtitle">{subtitle}</p>}
        </div>
        {toolbar}
      </div>

      {children}
    </div>
  );
}

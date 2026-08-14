import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../../i18n/context';

interface KioskModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function KioskModal({ title, onClose, children }: KioskModalProps) {
  const { t } = useI18n();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{ background: 'rgba(11, 24, 72, 0.45)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-card"
        style={{ background: '#FDFEFF', border: '1px solid #E3E8F2', maxWidth: '760px' }}
      >
        <header
          className="flex items-center justify-between gap-4 px-5 flex-shrink-0"
          style={{ borderBottom: '1px solid #E3E8F2', minHeight: '58px' }}
        >
          <h2
            className="font-bold truncate"
            style={{ color: '#0B1848', fontSize: 'clamp(14px, 1.8vh, 18px)' }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.aria.close}
            className="btn-compact flex-shrink-0 flex items-center justify-center rounded-lg transition-colors"
            style={{ width: '40px', height: '40px', background: '#EEF1F8', color: '#1B2559' }}
          >
            <X size={20} />
          </button>
        </header>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

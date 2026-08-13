import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/context';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProps) {
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
      onClick={(e) => {
        // Faqat fonga bosilganda yopiladi
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <header
          className="flex items-center justify-between gap-4 px-5 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #0D1B4B 0%, #1e3a74 100%)',
            borderBottom: '2px solid #C9A84C',
            minHeight: '60px',
          }}
        >
          <h2 className="text-white font-bold text-sm tracking-wide truncate">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.aria.close}
            className="btn-compact flex-shrink-0 flex items-center justify-center rounded-lg text-white hover:bg-white/15 active:bg-white/25 transition-colors"
            style={{ width: '40px', height: '40px' }}
          >
            <X size={20} />
          </button>
        </header>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

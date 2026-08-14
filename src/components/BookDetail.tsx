import { CheckCircle2, XCircle, Star } from 'lucide-react';
import Modal from './Modal';
import { useI18n } from '../i18n/context';
import { badgeFor } from '../data/mockData';
import type { Book } from '../data/mockData';

interface BookDetailProps {
  book: Book;
  onClose: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-cyan-300/70 text-xs font-semibold uppercase tracking-wide">
        {label}
      </span>
      <span className="text-white text-[15px] font-medium break-words">{value}</span>
    </div>
  );
}

export default function BookDetail({ book, onClose }: BookDetailProps) {
  const { t, tr } = useI18n();
  const available = book.copies > 0;

  return (
    <Modal title={tr(book.title)} onClose={onClose}>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex gap-5 flex-wrap">
          <div
            className="flex-shrink-0 rounded-xl overflow-hidden shadow-panel bg-ink-500"
            style={{ width: '140px', height: '196px', border: '1px solid rgba(34,195,230,0.3)' }}
          >
            <img src={book.cover} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 flex flex-col gap-3" style={{ minWidth: '220px' }}>
            <div>
              <h3 className="text-white font-extrabold text-xl leading-tight">{tr(book.title)}</h3>
              <p className="text-paper-400 text-[15px] mt-1">{tr(book.author)}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[11.5px] font-bold px-2.5 py-1 rounded tracking-wide"
                style={{ background: 'rgba(34,195,230,0.15)', color: '#5FD3EC' }}
              >
                {tr(badgeFor(book))}
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <Star size={15} className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-white tabular-nums">{book.rating.toFixed(1)}</span>
                <span className="text-paper-400 tabular-nums text-xs">({book.ratingCount})</span>
              </span>
            </div>

            <div
              className={`flex items-center gap-2 text-sm font-semibold ${
                available ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {available ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              {available ? t.bookInfo.inStock(book.copies) : t.bookInfo.outOfStock}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-cyan-300/70 text-xs font-semibold uppercase tracking-wide mb-1">
            {t.bookInfo.description}
          </h4>
          <p className="text-paper-200 text-[15px] leading-relaxed">{tr(book.description)}</p>
        </div>

        <div
          className="grid gap-4 pt-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            borderTop: '1px solid rgba(34,195,230,0.2)',
          }}
        >
          <Field label={t.bookInfo.category} value={tr(book.category)} />
          <Field label={t.bookInfo.publisher} value={tr(book.publisher)} />
          <Field label={t.bookInfo.year} value={String(book.year)} />
          <Field label={t.bookInfo.pages} value={String(book.pages)} />
          <Field label={t.bookInfo.isbn} value={book.isbn} />
        </div>
      </div>
    </Modal>
  );
}

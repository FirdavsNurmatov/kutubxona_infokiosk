import { CheckCircle2, XCircle } from 'lucide-react';
import Modal from './Modal';
import { useI18n } from '../i18n/context';
import type { Book } from '../data/mockData';

interface BookDetailProps {
  book: Book;
  onClose: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-navy-400 text-[11px] font-semibold uppercase tracking-wide">{label}</span>
      <span className="text-navy-900 text-sm font-medium break-words">{value}</span>
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
            className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-cream-200"
            style={{ width: '140px', height: '196px', border: '1px solid rgba(201,168,76,0.4)' }}
          >
            <img src={book.cover} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 flex flex-col gap-3" style={{ minWidth: '220px' }}>
            <div>
              <h3 className="text-navy-900 font-extrabold text-lg leading-tight">{tr(book.title)}</h3>
              <p className="text-navy-500 text-sm mt-1">{tr(book.author)}</p>
            </div>

            <span
              className="self-start text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(201,168,76,0.2)', color: '#9a7520' }}
            >
              {tr(book.category)}
            </span>

            <div
              className={`flex items-center gap-2 text-sm font-semibold ${
                available ? 'text-emerald-700' : 'text-red-600'
              }`}
            >
              {available ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              {available ? t.bookInfo.inStock(book.copies) : t.bookInfo.outOfStock}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-navy-400 text-[11px] font-semibold uppercase tracking-wide mb-1">
            {t.bookInfo.description}
          </h4>
          <p className="text-navy-800 text-sm leading-relaxed">{tr(book.description)}</p>
        </div>

        <div
          className="grid gap-4 pt-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            borderTop: '1px solid rgba(201,168,76,0.3)',
          }}
        >
          <Field label={t.bookInfo.publisher} value={tr(book.publisher)} />
          <Field label={t.bookInfo.year} value={String(book.year)} />
          <Field label={t.bookInfo.pages} value={String(book.pages)} />
          <Field label={t.bookInfo.isbn} value={book.isbn} />
        </div>
      </div>
    </Modal>
  );
}

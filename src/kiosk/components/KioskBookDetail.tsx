import { Star, CheckCircle2, XCircle } from 'lucide-react';
import KioskModal from './KioskModal';
import { useI18n } from '../../i18n/context';
import { badgeFor } from '../../data/mockData';
import type { Book } from '../../data/mockData';

interface KioskBookDetailProps {
  book: Book;
  onClose: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span
        className="font-semibold uppercase tracking-wide"
        style={{ color: '#8B98B8', fontSize: '11px' }}
      >
        {label}
      </span>
      <span className="font-medium break-words" style={{ color: '#1B2559', fontSize: '15px' }}>
        {value}
      </span>
    </div>
  );
}

export default function KioskBookDetail({ book, onClose }: KioskBookDetailProps) {
  const { t, tr } = useI18n();
  const available = book.copies > 0;

  return (
    <KioskModal title={tr(book.title)} onClose={onClose}>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex gap-5 flex-wrap">
          <div className="k-cover flex-shrink-0" style={{ width: '150px', height: '210px' }}>
            <img src={book.cover} alt="" />
          </div>

          <div className="flex-1 flex flex-col gap-3" style={{ minWidth: '240px' }}>
            <div>
              <h3
                className="font-extrabold leading-tight"
                style={{ color: '#0B1848', fontSize: 'clamp(18px, 2.4vh, 24px)' }}
              >
                {tr(book.title)}
              </h3>
              <p className="mt-1" style={{ color: '#6B7A99', fontSize: '15px' }}>
                {tr(book.author)}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="font-bold px-2.5 py-1 rounded tracking-wide"
                style={{ background: '#EAEEFD', color: '#3335FA', fontSize: '11.5px' }}
              >
                {tr(badgeFor(book))}
              </span>
              <span className="flex items-center gap-1.5" style={{ fontSize: '15px' }}>
                <Star size={16} style={{ color: '#F5A524', fill: '#F5A524' }} />
                <span className="font-bold tabular-nums" style={{ color: '#1B2559' }}>
                  {book.rating.toFixed(1)}
                </span>
                <span className="tabular-nums" style={{ color: '#8B98B8', fontSize: '13px' }}>
                  ({book.ratingCount})
                </span>
              </span>
            </div>

            <div
              className="flex items-center gap-2 font-semibold"
              style={{ color: available ? '#0E9F6E' : '#E02424', fontSize: '15px' }}
            >
              {available ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              {available ? t.bookInfo.inStock(book.copies) : t.bookInfo.outOfStock}
            </div>
          </div>
        </div>

        <div>
          <h4
            className="font-semibold uppercase tracking-wide mb-1"
            style={{ color: '#8B98B8', fontSize: '11px' }}
          >
            {t.bookInfo.description}
          </h4>
          <p style={{ color: '#3B4A6B', fontSize: '15px', lineHeight: 1.65 }}>
            {tr(book.description)}
          </p>
        </div>

        <div
          className="grid gap-4 pt-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            borderTop: '1px solid #E3E8F2',
          }}
        >
          <Field label={t.bookInfo.category} value={tr(book.category)} />
          <Field label={t.bookInfo.publisher} value={tr(book.publisher)} />
          <Field label={t.bookInfo.year} value={String(book.year)} />
          <Field label={t.bookInfo.pages} value={String(book.pages)} />
          <Field label={t.bookInfo.isbn} value={book.isbn} />
        </div>
      </div>
    </KioskModal>
  );
}

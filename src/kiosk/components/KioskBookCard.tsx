import { Star } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import type { Book } from '../../data/mockData';

interface KioskBookCardProps {
  book: Book;
  /** Muqova balandligi — ro'yxatga qarab o'zgaradi. */
  coverHeight?: string;
  /**
   * Muqova balandligi kenglikka nisbatan 2:3 bo'ladi. Sarlavha esa doim ikki
   * qatorlik joy egallaydi — shu tufayli qatordagi barcha kartochkalar va
   * muqovalar aynan bir xil o'lchamda chiqadi.
   */
  fixedAspect?: boolean;
  /** Bosh sahifada javondagi nusxalar soni ham ko'rsatiladi. */
  showCopies?: boolean;
  onSelect: (book: Book) => void;
}

export default function KioskBookCard({
  book,
  coverHeight = 'clamp(120px, 17vh, 168px)',
  fixedAspect = false,
  showCopies = false,
  onSelect,
}: KioskBookCardProps) {
  const { t, tr } = useI18n();

  return (
    <button
      type="button"
      onClick={() => onSelect(book)}
      className="k-book flex flex-col gap-2 text-left group w-full min-w-0"
      style={{ minHeight: 0 }}
    >
      <div
        className="k-cover w-full flex-shrink-0"
        style={fixedAspect ? { aspectRatio: '2 / 3' } : { height: coverHeight }}
      >
        <img src={book.cover} alt="" loading="lazy" />
      </div>

      <div className="min-w-0 w-full flex-shrink-0">
        <div
          className="k-book-title font-bold leading-tight line-clamp-2 group-hover:text-[#4F52F6] transition-colors"
          style={{ color: '#1B2559', fontSize: 'clamp(12px, 1.5vh, 14.5px)' }}
        >
          {tr(book.title)}
        </div>
        <div
          className="truncate mt-0.5"
          style={{ color: '#6B7A99', fontSize: 'clamp(10.5px, 1.3vh, 12.5px)' }}
        >
          {tr(book.author)}
        </div>
        <div className="flex items-center gap-1.5 mt-1 min-w-0">
          {showCopies && (
            <span className="flex items-center gap-1 min-w-0 flex-1">
              <span
                className="flex-shrink-0 rounded-full"
                style={{
                  width: '7px',
                  height: '7px',
                  background: book.copies > 0 ? '#0E9F6E' : '#E5484D',
                }}
              />
              <span
                className="truncate"
                style={{ color: '#6B7A99', fontSize: 'clamp(10px, 1.2vh, 12px)' }}
              >
                {book.copies > 0 ? t.bookInfo.copiesShort(book.copies) : t.bookInfo.outOfStock}
              </span>
            </span>
          )}
          <Star size={12} style={{ color: '#F5A524', fill: '#F5A524' }} className="flex-shrink-0" />
          <span
            className="font-bold tabular-nums flex-shrink-0"
            style={{ color: '#1B2559', fontSize: 'clamp(10.5px, 1.3vh, 12.5px)' }}
          >
            {book.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </button>
  );
}

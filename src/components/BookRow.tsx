import { Star } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { badgeFor } from '../data/mockData';
import type { Book } from '../data/mockData';

interface BookRowProps {
  book: Book;
  /** 'badge' — o'ng tomonda toifa nishoni, 'rating' — yulduzli baho. */
  variant: 'badge' | 'rating';
  /** Nishon foni uchun ustun aksenti. */
  accent: string;
  onSelect: (book: Book) => void;
}

export default function BookRow({ book, variant, accent, onSelect }: BookRowProps) {
  const { tr } = useI18n();
  const isTop3 = book.rank <= 3;

  return (
    <button
      type="button"
      onClick={() => onSelect(book)}
      className="btn-compact w-full flex items-center gap-2.5 px-2.5 hover:bg-paper-100 active:bg-paper-200 transition-colors text-left group"
      style={{ minHeight: '50px', paddingTop: '6px', paddingBottom: '6px' }}
    >
      {/* O'rin */}
      <div
        className={`flex-shrink-0 flex items-center justify-center font-black text-base ${
          isTop3 ? 'text-amber-500' : 'text-paper-400'
        }`}
        style={{ width: '22px', fontVariantNumeric: 'tabular-nums' }}
      >
        {book.rank}
      </div>

      {/* Muqova */}
      <div
        className="flex-shrink-0 rounded overflow-hidden shadow-sm bg-paper-200"
        style={{ width: '32px', height: '44px' }}
      >
        <img src={book.cover} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>

      {/* Nomi va muallifi */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-ink-800 text-[14px] leading-tight line-clamp-1 group-hover:text-azure-700 transition-colors">
          {tr(book.title)}
        </div>
        <div className="text-paper-500 text-[12.5px] mt-0.5 truncate">{tr(book.author)}</div>
      </div>

      {/* O'ng chekka — nishon yoki reyting */}
      {variant === 'badge' ? (
        <span
          className="flex-shrink-0 text-[10.5px] font-bold px-2 py-1 rounded-md tracking-wide max-w-[110px] truncate"
          style={{ background: `${accent}22`, color: accent }}
        >
          {tr(badgeFor(book))}
        </span>
      ) : (
        <span className="flex-shrink-0 flex items-center gap-1 text-[12.5px]">
          <Star size={14} className="text-amber-400 fill-amber-400 flex-shrink-0" />
          <span className="font-bold text-ink-800 tabular-nums">{book.rating.toFixed(1)}</span>
          <span className="text-paper-400 tabular-nums">({book.ratingCount})</span>
        </span>
      )}
    </button>
  );
}

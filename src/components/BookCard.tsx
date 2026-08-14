import { Star } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { badgeFor } from '../data/mockData';
import type { Book } from '../data/mockData';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export default function BookCard({ book, onSelect }: BookCardProps) {
  const { t, tr } = useI18n();

  return (
    <button
      type="button"
      onClick={() => onSelect(book)}
      className="flex gap-3 p-3 rounded-xl text-left transition-all hover:border-cyan-400/50 active:scale-[0.99] group"
      style={{
        background: 'linear-gradient(180deg, #092A48 0%, #061F3C 100%)',
        border: '1px solid rgba(55,138,207,0.25)',
      }}
    >
      <div
        className="flex-shrink-0 rounded-lg overflow-hidden shadow-tile bg-ink-500"
        style={{ width: '68px', height: '96px' }}
      >
        <img src={book.cover} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="font-bold text-white text-base leading-tight line-clamp-2 group-hover:text-cyan-200">
          {tr(book.title)}
        </h3>
        <p className="text-paper-400 text-sm mt-1 line-clamp-1">{tr(book.author)}</p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className="text-[10.5px] font-bold px-2 py-0.5 rounded tracking-wide"
            style={{ background: 'rgba(34,195,230,0.15)', color: '#5FD3EC' }}
          >
            {tr(badgeFor(book))}
          </span>
          <span className="flex items-center gap-1 text-[12.5px]">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="font-bold text-white tabular-nums">{book.rating.toFixed(1)}</span>
          </span>
        </div>

        <span
          className={`text-[12.5px] font-semibold mt-auto pt-2 ${
            book.copies > 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {book.copies > 0 ? t.bookInfo.inStock(book.copies) : t.bookInfo.outOfStock}
        </span>
      </div>
    </button>
  );
}

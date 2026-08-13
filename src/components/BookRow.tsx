import { useI18n } from '../i18n/context';
import type { Book } from '../data/mockData';

interface BookRowProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export default function BookRow({ book, onSelect }: BookRowProps) {
  const { tr } = useI18n();
  const isTop3 = book.rank <= 3;

  return (
    <button
      type="button"
      onClick={() => onSelect(book)}
      className="btn-compact w-full flex items-center gap-3 rounded-lg hover:bg-cream-100 active:bg-cream-200 transition-colors text-left group"
      style={{ minHeight: '52px', padding: '6px 12px' }}
    >
      {/* O'rin */}
      <div
        className={`flex-shrink-0 flex items-center justify-center font-black text-base ${
          isTop3 ? 'text-gold-600' : 'text-navy-300'
        }`}
        style={{ width: '24px', fontVariantNumeric: 'tabular-nums' }}
      >
        {book.rank}
      </div>

      {/* Muqova */}
      <div
        className="flex-shrink-0 rounded overflow-hidden shadow-sm bg-cream-200"
        style={{ width: '34px', height: '46px' }}
      >
        <img src={book.cover} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>

      {/* Nomi va muallifi */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-navy-900 text-xs leading-tight line-clamp-1 group-hover:text-navy-700 transition-colors">
          {tr(book.title)}
        </div>
        <div className="text-navy-400 text-xs mt-0.5 truncate">{tr(book.author)}</div>
      </div>
    </button>
  );
}

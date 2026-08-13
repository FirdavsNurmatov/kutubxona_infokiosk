import { useI18n } from '../i18n/context';
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
      className="flex gap-3 p-3 rounded-xl bg-white text-left transition-all hover:shadow-md active:scale-[0.99] group"
      style={{ border: '1px solid rgba(201,168,76,0.35)' }}
    >
      <div
        className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm bg-cream-200"
        style={{ width: '64px', height: '90px' }}
      >
        <img src={book.cover} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="font-bold text-navy-900 text-sm leading-tight line-clamp-2 group-hover:text-navy-700">
          {tr(book.title)}
        </h3>
        <p className="text-navy-500 text-xs mt-1 line-clamp-1">{tr(book.author)}</p>

        <span
          className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full mt-2"
          style={{ background: 'rgba(201,168,76,0.18)', color: '#9a7520' }}
        >
          {tr(book.category)}
        </span>

        <span
          className={`text-[11px] font-semibold mt-auto pt-2 ${
            book.copies > 0 ? 'text-emerald-700' : 'text-red-600'
          }`}
        >
          {book.copies > 0 ? t.bookInfo.inStock(book.copies) : t.bookInfo.outOfStock}
        </span>
      </div>
    </button>
  );
}

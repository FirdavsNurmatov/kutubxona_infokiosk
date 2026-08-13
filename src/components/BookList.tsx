import { ChevronRight, LayoutGrid } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import BookRow from './BookRow';
import { useI18n } from '../i18n/context';
import type { Book } from '../data/mockData';

interface BookListProps {
  title: string;
  books: Book[];
  buttonLabel: string;
  icon: LucideIcon;
  accentColor: string;
  panelBg: string;
  scrollClass: string;
  onSelectBook: (book: Book) => void;
  onShowAll: () => void;
}

export default function BookList({
  title,
  books,
  buttonLabel,
  icon: Icon,
  accentColor,
  panelBg,
  scrollClass,
  onSelectBook,
  onShowAll,
}: BookListProps) {
  const { t } = useI18n();

  return (
    <section className="panel" style={{ border: `1.5px solid ${accentColor}` }}>
      <header
        className="panel-head"
        style={{ background: panelBg, borderBottom: `2px solid ${accentColor}` }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon size={18} className="text-gold-300 flex-shrink-0" />
          <h2 className="text-white font-bold tracking-wide truncate">{title}</h2>
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: accentColor, color: '#fff' }}
        >
          {t.top10}
        </span>
      </header>

      <div className={`panel-body py-1.5 ${scrollClass}`}>
        {books.map((book, idx) => (
          <div key={book.id}>
            <BookRow book={book} onSelect={onSelectBook} />
            {idx < books.length - 1 && (
              <div className="mx-3" style={{ height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onShowAll}
        className="panel-foot font-bold text-white transition-all hover:opacity-90 active:opacity-80"
        style={{ background: panelBg, borderTop: `2px solid ${accentColor}` }}
      >
        <span className="flex items-center gap-2 min-w-0">
          <LayoutGrid size={16} style={{ color: accentColor }} className="flex-shrink-0" />
          <span className="truncate">{buttonLabel}</span>
        </span>
        <ChevronRight size={16} style={{ color: accentColor }} className="flex-shrink-0" />
      </button>
    </section>
  );
}

import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import BookRow from './BookRow';
import { useI18n } from '../i18n/context';
import type { Book } from '../data/mockData';

interface BookListProps {
  title: string;
  books: Book[];
  icon: LucideIcon;
  /** Panel sarlavhasi foni. */
  headBg: string;
  /** Nishon va urg'u rangi. */
  accent: string;
  /** Skroll chizig'i klassi. */
  scrollClass: string;
  variant: 'badge' | 'rating';
  /** Bosh sahifadagi to'r joylashuvi uchun klass. */
  className?: string;
  onSelectBook: (book: Book) => void;
  onShowAll: () => void;
}

export default function BookList({
  title,
  books,
  icon: Icon,
  headBg,
  accent,
  scrollClass,
  variant,
  className = '',
  onSelectBook,
  onShowAll,
}: BookListProps) {
  const { t } = useI18n();

  return (
    <section className={`panel ${className}`}>
      <header className="panel-head" style={{ background: headBg }}>
        <div className="flex items-center gap-2 min-w-0">
          <Icon size={19} className="text-white/85 flex-shrink-0" />
          <h2 className="text-white font-bold tracking-wide truncate">{title}</h2>
        </div>

        <button
          type="button"
          onClick={onShowAll}
          className="btn-compact flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 border border-white/25 text-white text-[11.5px] font-bold tracking-wide transition-colors flex-shrink-0"
        >
          {t.top10}
          <ChevronRight size={13} className="flex-shrink-0" />
        </button>
      </header>

      <div className={`panel-body ${scrollClass}`}>
        {books.map((book, idx) => (
          <div key={book.id}>
            <BookRow book={book} variant={variant} accent={accent} onSelect={onSelectBook} />
            {idx < books.length - 1 && (
              <div className="mx-2.5" style={{ height: '1px', background: '#E6ECF3' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

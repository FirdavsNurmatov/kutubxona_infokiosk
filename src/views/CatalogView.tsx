import { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import PageShell from '../components/PageShell';
import BookCard from '../components/BookCard';
import { useI18n } from '../i18n/context';
import { books, categories } from '../data/mockData';
import type { Book } from '../data/mockData';
import type { CollectionFilter } from '../types';

interface CatalogViewProps {
  initialFilter: CollectionFilter;
  onBack: () => void;
  onSelectBook: (book: Book) => void;
}

const COLLECTIONS: CollectionFilter[] = ['all', 'new', 'recommended'];

export default function CatalogView({ initialFilter, onBack, onSelectBook }: CatalogViewProps) {
  const { t, tr, lang } = useI18n();
  const [collection, setCollection] = useState<CollectionFilter>(initialFilter);
  const [category, setCategory] = useState<string | null>(null);

  const visible = useMemo(() => {
    return books.filter((book) => {
      const byCollection =
        collection === 'all' || book.collections.includes(collection as 'new' | 'recommended');
      const byCategory = category === null || book.category[lang] === category;
      return byCollection && byCategory;
    });
  }, [collection, category, lang]);

  return (
    <PageShell
      title={t.page.catalog}
      subtitle={t.results(visible.length)}
      onBack={onBack}
      toolbar={
        <div className="flex items-center gap-1.5 flex-wrap">
          {COLLECTIONS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCollection(key)}
              className={`btn-compact px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors ${
                collection === key
                  ? 'bg-cyan-400 text-ink-900'
                  : 'text-white hover:bg-white/15 active:bg-white/25'
              }`}
              style={collection === key ? undefined : { border: '1px solid rgba(34,195,230,0.25)' }}
            >
              {t.filter[key]}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-3 h-full">
        {/* Yo'nalish bo'yicha filtr */}
        <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`btn-compact px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              category === null ? 'bg-cyan-400 text-ink-900' : 'bg-ink-600 text-paper-200 hover:bg-ink-500'
            }`}
            style={{ border: '1px solid rgba(34,195,230,0.25)' }}
          >
            {t.filter.all}
          </button>
          {categories.map((cat) => {
            const label = tr(cat);
            return (
              <button
                key={label}
                type="button"
                onClick={() => setCategory(label)}
                className={`btn-compact px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  category === label ? 'bg-cyan-400 text-ink-900' : 'bg-ink-600 text-paper-200 hover:bg-ink-500'
                }`}
                style={{ border: '1px solid rgba(34,195,230,0.25)' }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="card-grid">
            {visible.map((book) => (
              <BookCard key={book.id} book={book} onSelect={onSelectBook} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function EmptyState() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <SearchX size={48} className="text-paper-500" strokeWidth={1.5} />
      <p className="text-paper-200 font-bold">{t.emptyResults}</p>
      <p className="text-paper-400 text-[15px]">{t.emptyResultsHint}</p>
    </div>
  );
}

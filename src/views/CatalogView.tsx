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
              className={`btn-compact px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-colors ${
                collection === key
                  ? 'bg-gold-500 text-white'
                  : 'text-white hover:bg-white/15 active:bg-white/25'
              }`}
              style={collection === key ? undefined : { border: '1px solid rgba(201,168,76,0.4)' }}
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
            className={`btn-compact px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
              category === null ? 'bg-navy-900 text-white' : 'bg-white/70 text-navy-700 hover:bg-white'
            }`}
            style={{ border: '1px solid rgba(201,168,76,0.4)' }}
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
                className={`btn-compact px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  category === label ? 'bg-navy-900 text-white' : 'bg-white/70 text-navy-700 hover:bg-white'
                }`}
                style={{ border: '1px solid rgba(201,168,76,0.4)' }}
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
      <SearchX size={48} className="text-navy-300" strokeWidth={1.5} />
      <p className="text-navy-800 font-bold">{t.emptyResults}</p>
      <p className="text-navy-500 text-sm">{t.emptyResultsHint}</p>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { Search as SearchIcon, X, SearchX, SlidersHorizontal } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { books, categories } from '../../data/mockData';
import type { Book } from '../../data/mockData';
import type { Lang, Localized } from '../../i18n/translations';
import KioskBookCard from '../components/KioskBookCard';
import KioskFilters from '../components/KioskFilters';
import { EMPTY_FILTERS, YEAR_BUCKETS, isFilterActive, yearBucketOf } from '../filterTypes';
import type { FilterState, YearBucket } from '../filterTypes';

/** Qidiruv uchala tildagi qiymat bo'yicha ishlaydi. */
function matches(value: Localized, needle: string): boolean {
  return (Object.keys(value) as Lang[]).some((l) => value[l].toLowerCase().includes(needle));
}

interface KioskSearchProps {
  query: string;
  submitted: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onSelectBook: (book: Book) => void;
}

export default function KioskSearch({
  query,
  submitted,
  onQueryChange,
  onSearch,
  onSelectBook,
}: KioskSearchProps) {
  const { t, tr, lang } = useI18n();
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [panelOpen, setPanelOpen] = useState(false);

  /* Matn bo'yicha mos kelganlar — filtrlar shu to'plam ustida ishlaydi.
     So'rov bo'sh bo'lsa butun katalog ko'rsatiladi (brauzing rejimi). */
  const base = useMemo(() => {
    const needle = submitted.trim().toLowerCase();
    if (!needle) return books;
    return books.filter(
      (b) =>
        matches(b.title, needle) ||
        matches(b.author, needle) ||
        matches(b.category, needle) ||
        b.isbn.replace(/-/g, '').includes(needle.replace(/-/g, '')),
    );
  }, [submitted]);

  const byGenre = (b: Book) => filters.genres.length === 0 || filters.genres.includes(b.category[lang]);
  const byYear = (b: Book) => filters.years.length === 0 || filters.years.includes(yearBucketOf(b.year));
  const byStock = (b: Book) => !filters.availableOnly || b.copies > 0;

  /* Fasetlar: har bir sonni hisoblashda o'sha fasetning o'z filtri
     hisobga olinmaydi — marketplace'lardagi kabi. */
  const genreOptions = useMemo(() => {
    const pool = base.filter((b) => byYear(b) && byStock(b));
    return categories
      .map((cat: Localized) => ({
        value: cat[lang],
        label: tr(cat),
        count: pool.filter((b) => b.category[lang] === cat[lang]).length,
      }))
      // Nol natijali janr ko'rsatilmaydi — foydalanuvchi bo'sh ekranga tushmaydi
      .filter((o) => o.count > 0 || filters.genres.includes(o.value))
      .sort((a, b) => b.count - a.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, lang, filters.years, filters.availableOnly, filters.genres, tr]);

  const yearCounts = useMemo(() => {
    const pool = base.filter((b) => byGenre(b) && byStock(b));
    const out = {} as Record<YearBucket, number>;
    for (const bucket of YEAR_BUCKETS) {
      out[bucket] = pool.filter((b) => yearBucketOf(b.year) === bucket).length;
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, lang, filters.genres, filters.availableOnly]);

  const availableCount = useMemo(
    () => base.filter((b) => byGenre(b) && byYear(b) && b.copies > 0).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [base, lang, filters.genres, filters.years],
  );

  const results = useMemo(() => {
    const list = base.filter((b) => byGenre(b) && byYear(b) && byStock(b));

    switch (filters.sort) {
      case 'newest':
        return [...list].sort((a, b) => b.year - a.year);
      case 'popular':
        return [...list].sort((a, b) => b.ratingCount - a.ratingCount);
      case 'title':
        return [...list].sort((a, b) => a.title[lang].localeCompare(b.title[lang], lang));
      default:
        return list;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, lang, filters]);

  const f = t.kiosk.filters;

  return (
    <div className="k-search-page">
      {/* Qidiruv qatori — ikkala ustun ustida */}
      <form
        className="k-search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <SearchIcon size={22} style={{ color: '#9AA6C2' }} className="flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t.kiosk.searchPlaceholder}
          aria-label={t.aria.search}
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label={t.aria.clearSearch}
            className="btn-compact flex-shrink-0 px-1"
            style={{ color: '#9AA6C2' }}
          >
            <X size={18} />
          </button>
        )}
        <button type="submit" className="k-search-btn btn-compact">
          {t.kiosk.searchButton}
        </button>
      </form>

      {/* Tor ekranda filtrlarni ochadigan tugma */}
      <button
        type="button"
        className="k-filters-toggle k-pill"
        onClick={() => setPanelOpen((v) => !v)}
      >
        <SlidersHorizontal size={17} style={{ color: '#4F52F6' }} />
        {panelOpen ? f.hide : f.show}
        {isFilterActive(filters) && <span className="k-filters-dot" />}
      </button>

      <div className={`k-search-body ${panelOpen ? 'is-open' : ''}`}>
        <KioskFilters
          value={filters}
          onChange={setFilters}
          genreOptions={genreOptions}
          yearCounts={yearCounts}
          availableCount={availableCount}
        />

        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
            <h1 className="k-title" style={{ fontSize: 'clamp(20px, 2.6vh, 30px)' }}>
              {submitted.trim() ? `«${submitted.trim()}»` : t.kiosk.menu.search}
            </h1>
            <span style={{ color: '#6B7A99', fontSize: 'clamp(12px, 1.5vh, 15px)' }}>
              {f.found(results.length)}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
              <SearchX size={52} style={{ color: '#C3CBE4' }} strokeWidth={1.5} />
              <p className="font-bold" style={{ color: '#1B2559', fontSize: '18px' }}>
                {t.emptyResults}
              </p>
              <p style={{ color: '#6B7A99', fontSize: '15px', maxWidth: '420px' }}>
                {t.emptyResultsHint}
              </p>
            </div>
          ) : (
            <div className="k-grid">
              {results.map((book) => (
                <KioskBookCard key={book.id} book={book} onSelect={onSelectBook} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

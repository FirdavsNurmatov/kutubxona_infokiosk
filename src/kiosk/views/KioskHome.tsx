import { useRef } from 'react';
import type { RefObject } from 'react';
import {
  Search, LayoutGrid, Sparkles, Flame, Users, BookCheck, Zap,
  ChevronLeft, ChevronRight, ArrowRight, Info, HelpCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { latestBooks, popularBooks, quickSearches } from '../../data/mockData';
import type { Book } from '../../data/mockData';
import KioskBookCard from '../components/KioskBookCard';
import type { KioskView } from '../types';

interface KioskHomeProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (query?: string) => void;
  /** Qidiruv maydoni bosilganda sensorli klaviaturani ochadi. */
  onOpenKeyboard: () => void;
  onNavigate: (view: KioskView) => void;
  onSelectBook: (book: Book) => void;
  onHelp: () => void;
}

/** Maketdagi 6 ta qidiruv kartochkasi. */
const TILES: {
  key: 'search' | 'authors' | 'genres' | 'newArrivals' | 'popular' | 'available';
  icon: LucideIcon;
  view: KioskView;
  color: string;
}[] = [
  { key: 'search', icon: Search, view: 'search', color: '#4F52F6' },
  { key: 'authors', icon: Users, view: 'authors', color: '#0E9F6E' },
  { key: 'genres', icon: LayoutGrid, view: 'genres', color: '#8B5CF6' },
  { key: 'newArrivals', icon: Sparkles, view: 'new', color: '#E28C0B' },
  { key: 'popular', icon: Flame, view: 'popular', color: '#E5484D' },
  { key: 'available', icon: BookCheck, view: 'available', color: '#0B76D0' },
];

export default function KioskHome({
  query,
  onQueryChange,
  onSearch,
  onOpenKeyboard,
  onNavigate,
  onSelectBook,
  onHelp,
}: KioskHomeProps) {
  const { t, tr } = useI18n();
  const popularRow = useRef<HTMLDivElement>(null);
  const latestRow = useRef<HTMLDivElement>(null);

  function scrollRow(row: RefObject<HTMLDivElement>, direction: -1 | 1) {
    row.current?.scrollBy({ left: direction * 380, behavior: 'smooth' });
  }

  return (
    <div className="k-home">
      {/* ── Hero: sarlavha va qidiruv ── */}
      <section className="k-hero">
        <div className="k-hero-bg" style={{ backgroundImage: 'url(/images/hero.jpg)' }} />

        <div className="k-hero-inner">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="k-title">{t.kiosk.welcome}</h1>
              <p className="k-subtitle">{t.kiosk.welcomeSub}</p>
            </div>

            <button type="button" className="k-pill flex-shrink-0" onClick={onHelp}>
              <HelpCircle size={19} style={{ color: '#4F52F6' }} />
              {t.kiosk.help}
            </button>
          </div>

          <form
            className="k-search"
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            role="search"
          >
            <Search size={22} style={{ color: '#9AA6C2' }} className="flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={onOpenKeyboard}
              onClick={onOpenKeyboard}
              placeholder={t.kiosk.searchPlaceholder}
              aria-label={t.aria.search}
            />
            <button type="submit" className="k-search-btn btn-compact">
              {t.kiosk.searchButton}
            </button>
          </form>

          {/* ── 6 ta qidiruv kartochkasi ── */}
          <div className="k-tiles">
            {TILES.map((tile) => {
              const Icon = tile.icon;
              const [title, sub] = t.kiosk.tiles[tile.key];
              return (
                <button
                  key={tile.key}
                  type="button"
                  className="k-tile"
                  onClick={() => onNavigate(tile.view)}
                >
                  <span className="k-tile-icon" style={{ background: tile.color }}>
                    <Icon size={22} style={{ color: '#fff' }} strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="k-tile-title block">{title}</span>
                    <span className="k-tile-sub block mt-1">{sub}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="k-home-lower px-[var(--k-pad)] pb-[var(--k-pad)]">
        {/* ── Tezkor qidiruv chiplari ── */}
        <section className="k-quick">
          <h2 className="k-quick-title">
            <Zap size={16} style={{ color: '#4F52F6' }} className="flex-shrink-0" />
            {t.kiosk.quickSearches}
          </h2>
          <div className="k-chips">
            {quickSearches.map((item) => {
              const label = tr(item);
              return (
                <button
                  key={label}
                  type="button"
                  className="k-chip btn-compact"
                  onClick={() => onSearch(label)}
                >
                  <Search size={14} style={{ color: '#9AA6C2' }} className="flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Mashhur kitoblar karuseli ── */}
        <section className="k-card k-home-row">
          <div className="k-card-head">
            <h2 className="k-card-title flex items-center gap-2">
              <Flame size={18} style={{ color: '#E5484D' }} className="flex-shrink-0" />
              {t.kiosk.menu.popular}
            </h2>
            <button type="button" className="k-link btn-compact" onClick={() => onNavigate('popular')}>
              {t.kiosk.seeAll}
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="k-carousel-wrap">
            <div ref={popularRow} className="k-carousel">
              {popularBooks.map((book) => (
                <div key={book.id} className="k-carousel-item">
                  <KioskBookCard book={book} fixedAspect showCopies onSelect={onSelectBook} />
                </div>
              ))}
            </div>

            <CarouselButton side="left" onClick={() => scrollRow(popularRow, -1)} />
            <CarouselButton side="right" onClick={() => scrollRow(popularRow, 1)} />
          </div>
        </section>

        {/* ── Yangi kelgan kitoblar ── */}
        <section className="k-card k-home-row">
          <div className="k-card-head">
            <h2 className="k-card-title flex items-center gap-2">
              <Sparkles size={18} style={{ color: '#E28C0B' }} className="flex-shrink-0" />
              {t.kiosk.menu.newArrivals}
            </h2>
            <button type="button" className="k-link btn-compact" onClick={() => onNavigate('new')}>
              {t.kiosk.seeAll}
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="k-carousel-wrap">
            <div ref={latestRow} className="k-carousel k-new-row">
              {latestBooks.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => onSelectBook(book)}
                  className="k-new-item btn-compact"
                >
                  <span className="k-cover k-new-cover flex-shrink-0">
                    <img src={book.cover} alt="" loading="lazy" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span
                      className="block font-bold leading-tight line-clamp-2"
                      style={{ color: '#1B2559', fontSize: 'clamp(11.5px, 1.4vh, 14px)' }}
                    >
                      {tr(book.title)}
                    </span>
                    <span
                      className="block truncate mt-0.5"
                      style={{ color: '#6B7A99', fontSize: 'clamp(10px, 1.25vh, 12px)' }}
                    >
                      {tr(book.author)}
                    </span>
                    <span className="flex items-center gap-1 mt-1">
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
                        {book.copies > 0
                          ? t.bookInfo.copiesShort(book.copies)
                          : t.bookInfo.outOfStock}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <CarouselButton side="left" onClick={() => scrollRow(latestRow, -1)} />
            <CarouselButton side="right" onClick={() => scrollRow(latestRow, 1)} />
          </div>
        </section>

        {/* ── Pastki maslahat paneli ── */}
        <div className="k-hint">
          <Info size={18} style={{ color: '#4F52F6' }} className="flex-shrink-0" />
          <span className="min-w-0 flex-1">{t.kiosk.hint}</span>
        </div>
      </div>
    </div>
  );
}

function CarouselButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-hidden="true"
      tabIndex={-1}
      className="k-carousel-nav btn-compact absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-colors"
      style={{
        [side]: '3px',
        width: '36px',
        height: '36px',
        background: 'rgba(255,255,255,0.96)',
        border: '1px solid #E3E8F2',
        color: '#1B2559',
        boxShadow: '0 6px 18px rgba(27,37,89,0.18)',
      }}
    >
      <Icon size={18} />
    </button>
  );
}

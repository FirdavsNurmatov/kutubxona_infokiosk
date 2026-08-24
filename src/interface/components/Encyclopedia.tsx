import { useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, X, type LucideIcon } from 'lucide-react';
import type { EncyclopediaCategory, EncyclopediaEntry } from '../api/types';
import { useText } from '../i18n';
import './encyclopedia.css';

/* Allomalar, 100 siymo va Nodir meros modullari shu komponentlar ustiga quriladi.
   Farqi faqat mavzu ranglari va ma'lumot to'plamida — shuning uchun uchta
   alohida sahifa emas, bitta komponent oilasi. */

/* ── Karusel ───────────────────────────────────────── */

export interface EntryCarouselProps {
  entries: EncyclopediaEntry[];
  activeId?: string;
  onSelect: (entry: EncyclopediaEntry) => void;
  /** Bir vaqtda ko'rinadigan yozuvlar soni. */
  perPage?: number;
  variant?: 'circle' | 'card';
}

export function EntryCarousel({
  entries, activeId, onSelect, perPage = 5, variant = 'circle',
}: EntryCarouselProps) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(entries.length / perPage));
  const shown = entries.slice(page * perPage, page * perPage + perPage);
  const { tr, s } = useText();

  return (
    <>
      <div className="enc-carousel">
        <button
          className="enc-arrow if-tap"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label={s('prev')}
        >
          <ChevronLeft size={30} />
        </button>

        <div
          className="enc-track"
          style={{ gridTemplateColumns: `repeat(${perPage}, 1fr)` }}
        >
          {shown.map((e) => (
            <button
              key={e.id}
              className={`${variant === 'circle' ? 'enc-person' : 'enc-card'} if-tap`}
              aria-pressed={e.id === activeId}
              onClick={() => onSelect(e)}
            >
              <img src={e.image} alt="" />
              {variant === 'circle' ? (
                <>
                  <b>{tr(e.name)}</b>
                  <small>{tr(e.subtitle)}</small>
                </>
              ) : (
                <span className="enc-card-body">
                  <b>{tr(e.name)}</b>
                  <small>{tr(e.subtitle)}</small>
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          className="enc-arrow if-tap"
          onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
          disabled={page >= pages - 1}
          aria-label={s('next')}
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {pages > 1 && (
        <div className="if-dots">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              aria-current={i === page}
              onClick={() => setPage(i)}
              aria-label={`${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ── Kategoriya plitalari ──────────────────────────── */

export interface CategoryTilesProps {
  categories: EncyclopediaCategory[];
  activeId?: string;
  onSelect: (category: EncyclopediaCategory) => void;
  icons: Record<string, LucideIcon>;
  columns?: number;
  /** Rasmli variant — 100 siymo maketidagi kartochkalar. */
  withPhoto?: boolean;
  countLabel?: string;
  /** Setkaning oxiriga qo'shiladigan qo'shimcha plita. */
  trailing?: ReactNode;
}

export function CategoryTiles({
  categories, activeId, onSelect, icons, columns = 4, withPhoto = false, countLabel, trailing,
}: CategoryTilesProps) {
  const { tr } = useText();

  return (
    <div className="enc-cats" style={{ ['--cols' as string]: columns }}>
      {categories.map((c) => {
        const Icon = icons[c.icon];
        if (withPhoto && c.image) {
          return (
            <button key={c.id} className="enc-cat-photo if-tap" onClick={() => onSelect(c)}>
              <img src={c.image} alt="" />
              <span className="enc-cat-photo-scrim" />
              <span className="enc-cat-photo-label">
                <i style={{ background: `${c.accent}cc` }}>{Icon && <Icon size={24} />}</i>
                <span>
                  <b>{tr(c.name)}</b>
                  <small>{c.count} {countLabel}</small>
                </span>
              </span>
            </button>
          );
        }
        return (
          <button
            key={c.id}
            className="enc-cat if-tap"
            aria-pressed={c.id === activeId}
            onClick={() => onSelect(c)}
          >
            {Icon && <span className="enc-cat-icon"><Icon size={40} /></span>}
            <b>{tr(c.name)}</b>
            {countLabel && <small>{c.count} {countLabel}</small>}
          </button>
        );
      })}
      {trailing}
    </div>
  );
}

/* ── Tavsiya etilgan blok ──────────────────────────── */

export interface FeaturedEntryProps {
  entry: EncyclopediaEntry;
  onOpen: () => void;
  /** Rasm chap tomonda bo'lsin. */
  flip?: boolean;
  actionLabel: string;
  badgeLabel: string;
}

export function FeaturedEntry({ entry, onOpen, flip, actionLabel, badgeLabel }: FeaturedEntryProps) {
  const { tr } = useText();
  const media = (
    <div className="enc-featured-media">
      <img src={entry.image} alt="" />
    </div>
  );

  return (
    <div className="enc-featured" data-flip={flip ? '1' : '0'}>
      {flip && media}
      <div className="enc-featured-text">
        <span className="enc-badge">{badgeLabel}</span>
        <h3>{tr(entry.name)}</h3>
        <div className="enc-years">{tr(entry.subtitle)}</div>
        <p>{tr(entry.summary)}</p>
        <button className="if-cta if-tap" style={{ alignSelf: 'flex-start' }} onClick={onOpen}>
          {actionLabel}
          <ChevronRight size={28} />
        </button>
      </div>
      {!flip && media}
    </div>
  );
}

/* ── To'liq detal ──────────────────────────────────── */

export interface EntryDetailProps {
  entry: EncyclopediaEntry;
  onClose: () => void;
  factsLabel: string;
}

export function EntryDetail({ entry, onClose, factsLabel }: EntryDetailProps) {
  const [tab, setTab] = useState(entry.sections[0]?.id ?? '');
  const { tr, s } = useText();
  const section = entry.sections.find((sc) => sc.id === tab) ?? entry.sections[0];

  return (
    <div className="enc-detail">
      <div className="enc-detail-hero">
        <img src={entry.image} alt="" />
        <div className="enc-detail-hero-scrim" />
        <button
          className="enc-arrow if-tap"
          style={{ position: 'absolute', top: 24, right: 28 }}
          onClick={onClose}
          aria-label={s('close')}
        >
          <X size={32} />
        </button>
        <div className="enc-detail-heading">
          <h2>{tr(entry.name)}</h2>
          <span>{tr(entry.subtitle)}</span>
        </div>
      </div>

      <div className="enc-tabs" role="tablist">
        {entry.sections.map((sc) => (
          <button
            key={sc.id}
            className="enc-tab if-tap"
            role="tab"
            aria-selected={sc.id === section?.id}
            onClick={() => setTab(sc.id)}
          >
            {tr(sc.title)}
          </button>
        ))}
      </div>

      <div className="if-scroll">
        <div className="enc-detail-body">
          {section?.body.map((paragraph, i) => (
            <p key={i}>{tr(paragraph)}</p>
          ))}

          {entry.facts.length > 0 && (
            <div className="enc-facts">
              <h4>{factsLabel}</h4>
              <ul>
                {entry.facts.map((f, i) => (
                  <li key={i}>{tr(f)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

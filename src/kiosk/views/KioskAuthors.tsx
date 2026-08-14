import { useMemo } from 'react';
import { Star } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import KioskPage from '../components/KioskPage';
import { books } from '../../data/mockData';

interface AuthorEntry {
  name: string;
  count: number;
  /** Muallif kitoblarining o'rtacha bahosi. */
  rating: number;
  /** Ismning bosh harflari — avatar o'rnida. */
  initials: string;
}

/** Har bir muallifga bitta barqaror rang beradi (ism bo'yicha). */
const PALETTE = ['#4F52F6', '#0E9F6E', '#E28C0B', '#E5484D', '#0B76D0', '#8B5CF6', '#EC4899', '#14B8A6'];

function colorFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

interface KioskAuthorsProps {
  onSelectAuthor: (name: string) => void;
}

export default function KioskAuthors({ onSelectAuthor }: KioskAuthorsProps) {
  const { t, lang } = useI18n();

  const authors = useMemo<AuthorEntry[]>(() => {
    const map = new Map<string, { count: number; ratingSum: number }>();

    for (const book of books) {
      const name = book.author[lang];
      const entry = map.get(name) ?? { count: 0, ratingSum: 0 };
      entry.count += 1;
      entry.ratingSum += book.rating;
      map.set(name, entry);
    }

    return [...map.entries()]
      .map(([name, { count, ratingSum }]) => ({
        name,
        count,
        rating: ratingSum / count,
        initials: name
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0] ?? '')
          .join('')
          .toUpperCase(),
      }))
      // Ko'p asarli mualliflar tepada, keyin alifbo tartibida
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, lang));
  }, [lang]);

  return (
    <KioskPage title={t.kiosk.menu.authors} subtitle={t.kiosk.authors.subtitle}>
      <div className="k-grid-wide">
        {authors.map((author) => {
          const color = colorFor(author.name);
          return (
            <button
              key={author.name}
              type="button"
              onClick={() => onSelectAuthor(author.name)}
              className="k-card flex items-center gap-4 p-4 text-left transition-transform hover:-translate-y-0.5"
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-full font-extrabold text-white"
                style={{ width: '52px', height: '52px', background: color, fontSize: '17px' }}
              >
                {author.initials}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className="block font-bold leading-tight line-clamp-2"
                  style={{ color: '#0B1848', fontSize: 'clamp(13px, 1.7vh, 16px)' }}
                >
                  {author.name}
                </span>
                <span
                  className="flex items-center gap-3 mt-1"
                  style={{ color: '#6B7A99', fontSize: 'clamp(11px, 1.35vh, 13px)' }}
                >
                  {t.kiosk.authors.bookCount(author.count)}
                  <span className="flex items-center gap-1">
                    <Star size={12} style={{ color: '#F5A524', fill: '#F5A524' }} />
                    <span className="font-bold tabular-nums" style={{ color: '#1B2559' }}>
                      {author.rating.toFixed(1)}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </KioskPage>
  );
}

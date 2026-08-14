import { BookOpen, Landmark, FlaskConical, Feather, Brain, Moon, Baby, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import KioskPage from '../components/KioskPage';
import { books, genres } from '../../data/mockData';
import type { Genre } from '../../data/mockData';

const ICONS: Record<Genre['icon'], LucideIcon> = {
  book: BookOpen,
  history: Landmark,
  science: FlaskConical,
  poetry: Feather,
  brain: Brain,
  mosque: Moon,
  kids: Baby,
  think: Lightbulb,
};

interface KioskGenresProps {
  onSelectGenre: (genre: Genre) => void;
}

export default function KioskGenres({ onSelectGenre }: KioskGenresProps) {
  const { t, tr, lang } = useI18n();

  return (
    <KioskPage title={t.kiosk.menu.genres} subtitle={t.kiosk.tiles.genres[1]}>
      <div className="k-grid-wide">
        {genres.map((genre) => {
          const Icon = ICONS[genre.icon];
          const count = books.filter((b) => b.category[lang] === genre.category[lang]).length;

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => onSelectGenre(genre)}
              className="k-card flex items-center gap-4 p-4 text-left transition-transform hover:-translate-y-0.5"
            >
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-2xl"
                style={{ width: '54px', height: '54px', background: `${genre.color}1A` }}
              >
                <Icon size={26} style={{ color: genre.color }} strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span
                  className="block font-bold leading-tight"
                  style={{ color: '#0B1848', fontSize: 'clamp(14px, 1.8vh, 17px)' }}
                >
                  {tr(genre.label)}
                </span>
                <span
                  className="block mt-1"
                  style={{ color: '#6B7A99', fontSize: 'clamp(11.5px, 1.4vh, 13.5px)' }}
                >
                  {t.results(count)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </KioskPage>
  );
}

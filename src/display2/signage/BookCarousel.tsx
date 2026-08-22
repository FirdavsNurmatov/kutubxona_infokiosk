import BookCard from './BookCard';
import { SLOT_RANGE } from './slots';
import { useAutoCarousel } from '../hooks/useAutoCarousel';
import { BOOK_INTERVAL } from '../data/playlist';
import { useI18n } from '../../i18n/context';
import type { SignageBook } from '../data/types';

interface BookCarouselProps {
  books: SignageBook[];
  active: boolean;
}

/**
 * Cheksiz kitob karuseli.
 *
 * Aylanish modul arifmetikasi bilan: ekranda doim bir xil sondagi uya turadi,
 * ularning ichidagi kitob esa hisoblagichga qarab tanlanadi. Element o'z
 * uyasidan qo'shnisiga suriladi (DOM tugun o'zgarmaydi), shuning uchun
 * harakat uzluksiz ko'rinadi va ro'yxat oxiriga yetganda sakrash bo'lmaydi.
 */
export default function BookCarousel({ books, active }: BookCarouselProps) {
  const { t } = useI18n();
  const { cursor, index } = useAutoCarousel('books', books.length, BOOK_INTERVAL, active);
  const focused = books[index];

  const slots = [];
  for (let offset = -SLOT_RANGE; offset <= SLOT_RANGE; offset += 1) {
    const position = index + offset;
    const book = books[((position % books.length) + books.length) % books.length];
    slots.push({
      // Kalit hisoblagichga bog'langan: element uyadan uyaga ko'chganda saqlanadi
      key: cursor + offset,
      book,
      offset,
    });
  }

  return (
    <div className="sg-carousel sg-carousel--split">
      <ul className="sg-book-track">
        {slots.map(({ key, book, offset }) => (
          <BookCard key={key} book={book} offset={offset} focused={offset === 0} />
        ))}
      </ul>

      {/* Tanlangan kitob — maketdagidek muqovaning o'ng yonidagi panel */}
      <div className="sg-focus-info" key={focused.id}>
        <p className="sg-focus-genre">{focused.genre}</p>
        <p className="sg-focus-title">{focused.title}</p>
        <p className="sg-focus-author">{focused.author}</p>

        {focused.summary && <p className="sg-focus-summary">{focused.summary}</p>}

        {(focused.year || focused.pages) && (
          <div className="sg-focus-meta">
            {focused.year && (
              <span className="sg-meta-item">
                <span className="sg-meta-value">{focused.year}</span>
                <span className="sg-meta-label">{t.screen2.meta.year}</span>
              </span>
            )}
            {focused.pages && (
              <span className="sg-meta-item">
                <span className="sg-meta-value">{focused.pages}</span>
                <span className="sg-meta-label">{t.screen2.meta.pages}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

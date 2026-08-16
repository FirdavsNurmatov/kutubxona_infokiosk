import BookCarousel from './BookCarousel';
import { useI18n } from '../../i18n/context';
import { signageBooks } from '../data/books';

/**
 * 02 — YANGI KELGAN KITOBLAR.
 *
 * Faqat kitoblar: statistika, tugma yoki QR yo'q. Markazdagi kitob
 * diqqat markazida, qolganlari esa o'qishli holda yon tomonlarda turadi.
 */
export default function BooksSlide({ active }: { active: boolean }) {
  const { t } = useI18n();

  return (
    <div className="sg-section">
      <h2 className="sg-section-title">{t.newBooksTitle}</h2>

      {signageBooks.length > 0 ? (
        <BookCarousel books={signageBooks} active={active} />
      ) : (
        <p className="sg-empty">{t.screen2.empty.books}</p>
      )}
    </div>
  );
}

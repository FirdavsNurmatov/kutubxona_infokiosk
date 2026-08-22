import BookCarousel from './BookCarousel';
import { useI18n } from '../../i18n/context';
import { getSignageBooks } from '../api';
import { signageBooks } from '../data/books';
import { useSignageResource } from '../hooks/useSignageResource';

/**
 * 02 — YANGI KELGAN KITOBLAR.
 *
 * Faqat kitoblar: statistika, tugma yoki QR yo'q. Markazdagi kitob
 * diqqat markazida, qolganlari esa o'qishli holda yon tomonlarda turadi.
 */
export default function BooksSlide({ active }: { active: boolean }) {
  const { t } = useI18n();
  /* Backend ulanmagan bo'lsa `signageBooks` o'zi qaytadi — ro'yxat
     birinchi kadrdayoq to'la, "yuklanmoqda" holati umuman yo'q. */
  const books = useSignageResource('books', getSignageBooks, signageBooks);

  return (
    <div className="sg-section">
      <h2 className="sg-section-title">{t.newBooksTitle}</h2>

      {books.length > 0 ? (
        <BookCarousel books={books} active={active} />
      ) : (
        <p className="sg-empty">{t.screen2.empty.books}</p>
      )}
    </div>
  );
}

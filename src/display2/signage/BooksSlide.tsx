import { useEffect, useState } from 'react';
import BookCarousel from './BookCarousel';
import { useI18n } from '../../i18n/context';
import { getSignageBooks } from '../api';
import { localBooksReady, signageBooks } from '../data/books';
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

  /* `books.json` hali o'qilib ulgurmagan bo'lishi mumkin — bu bo'lim
     ssenariyning birinchi qadami bo'lsa, aynan shunday bo'ladi. O'sha
     bir lahzada "kitob yo'q" deb yozish noto'g'ri: ro'yxat bo'sh emas,
     shunchaki hali kelmagan. Shuning uchun xabar faqat o'qish tugagach
     ko'rsatiladi. */
  const [loaded, setLoaded] = useState(signageBooks.length > 0);
  useEffect(() => {
    void localBooksReady.then(() => setLoaded(true));
  }, []);

  return (
    <div className="sg-section">
      <h2 className="sg-section-title">{t.newBooksTitle}</h2>

      {books.length > 0 ? (
        <BookCarousel books={books} active={active} />
      ) : (
        loaded && <p className="sg-empty">{t.screen2.empty.books}</p>
      )}

      {/* Muqovalar nashriyotlarniki — manbasi kadr chekkasida ko'rsatiladi.
          Ataylab kichik va xira: bu yozuv kompozitsiyaga qo'shilmasligi,
          lekin uzoqdan qaralganda ham o'qilishi kerak. */}
      <p className="sg-credit">{t.screen2.credits}</p>
    </div>
  );
}

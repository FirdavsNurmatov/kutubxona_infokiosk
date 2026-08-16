import Media from './Media';
import { useI18n } from '../../i18n/context';
import { slotAttrs } from './slots';
import type { SignageBook } from '../data/types';

interface BookCardProps {
  book: SignageBook;
  offset: number;
  focused: boolean;
}

/**
 * Kitob kartochkasi.
 *
 * Masshtab va blur faqat muqovaga tegadi, yozuvga emas — shuning uchun
 * chetdagi kitoblarning nomi va janri uzoqdan ham o'qiladi. Yaqindan qarab
 * turgan tashrifchi kitob markazga kelishini kutmasligi kerak.
 *
 * Markazdagi kitobning kichik yozuvi so'nadi: uning nomi, muallifi va janri
 * karusel ostidagi katta blokda ko'rsatiladi.
 */
export default function BookCard({ book, offset, focused }: BookCardProps) {
  const { tr } = useI18n();

  return (
    <li className={`sg-book${focused ? ' is-focus' : ''}`} {...slotAttrs(offset)}>
      <span className="sg-book-media">
        <Media src={book.cover} alt={tr(book.title)} />
      </span>

      <span className="sg-book-text">
        <span className="sg-book-title">{tr(book.title)}</span>
        <span className="sg-book-genre">{tr(book.genre)}</span>
      </span>
    </li>
  );
}

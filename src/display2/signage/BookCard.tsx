import Media from './Media';
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
 *
 * Muqovasi yo'q kitob bo'sh to'rtburchak bo'lib qolmaydi: o'rniga nomi va
 * muallifi yozilgan tipografik muqova chiziladi. Ro'yxatning yarmidan ko'pi
 * shunday — har bir nashrning skani yo'q, ekran esa baribir to'la va
 * o'qishli ko'rinishi kerak.
 */
export default function BookCard({ book, offset, focused }: BookCardProps) {
  return (
    <li className={`sg-book${focused ? ' is-focus' : ''}`} {...slotAttrs(offset)}>
      <span className="sg-book-media">
        {book.cover ? (
          <Media src={book.cover} alt={book.title} />
        ) : (
          <span className="sg-book-plate" aria-hidden="true">
            <span className="sg-book-plate-title">{book.title}</span>
            <span className="sg-book-plate-rule" />
            <span className="sg-book-plate-author">{book.author}</span>
          </span>
        )}
      </span>

      <span className="sg-book-text">
        <span className="sg-book-title">{book.title}</span>
        <span className="sg-book-genre">{book.genre}</span>
      </span>
    </li>
  );
}

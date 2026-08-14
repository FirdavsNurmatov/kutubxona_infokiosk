import { SearchX } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import KioskPage from '../components/KioskPage';
import KioskBookCard from '../components/KioskBookCard';
import type { Book } from '../../data/mockData';

interface KioskBookGridProps {
  title: string;
  subtitle?: string;
  books: Book[];
  toolbar?: React.ReactNode;
  onSelectBook: (book: Book) => void;
  /** Ro'yxat bo'sh bo'lganda ko'rsatiladigan matn. */
  emptyTitle?: string;
  emptyHint?: string;
}

/** Kitob ro'yxatini ko'rsatadigan umumiy sahifa (yangi, mashhur, janr, saqlangan). */
export default function KioskBookGrid({
  title,
  subtitle,
  books,
  toolbar,
  onSelectBook,
  emptyTitle,
  emptyHint,
}: KioskBookGridProps) {
  const { t } = useI18n();

  return (
    <KioskPage title={title} subtitle={subtitle ?? t.results(books.length)} toolbar={toolbar}>
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
          <SearchX size={52} style={{ color: '#C3CBE4' }} strokeWidth={1.5} />
          <p className="font-bold" style={{ color: '#1B2559', fontSize: '18px' }}>
            {emptyTitle ?? t.emptyResults}
          </p>
          <p style={{ color: '#6B7A99', fontSize: '15px', maxWidth: '420px' }}>
            {emptyHint ?? t.emptyResultsHint}
          </p>
        </div>
      ) : (
        <div className="k-grid">
          {books.map((book) => (
            <KioskBookCard key={book.id} book={book} onSelect={onSelectBook} />
          ))}
        </div>
      )}
    </KioskPage>
  );
}

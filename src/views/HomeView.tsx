import { BookOpen, Star } from 'lucide-react';
import EventList from '../components/EventList';
import BookList from '../components/BookList';
import { useI18n } from '../i18n/context';
import { events, newBooks, recommendedBooks } from '../data/mockData';
import type { Book, LibraryEvent } from '../data/mockData';
import type { CollectionFilter } from '../types';

interface HomeViewProps {
  onSelectBook: (book: Book) => void;
  onSelectEvent: (event: LibraryEvent) => void;
  onShowEvents: () => void;
  onShowCatalog: (filter: CollectionFilter) => void;
}

export default function HomeView({
  onSelectBook,
  onSelectEvent,
  onShowEvents,
  onShowCatalog,
}: HomeViewProps) {
  const { t } = useI18n();

  return (
    <main className="kiosk-main">
      <EventList events={events} onSelectEvent={onSelectEvent} onShowAll={onShowEvents} />

      <BookList
        title={t.newBooksTitle}
        books={newBooks}
        buttonLabel={t.newBooksButton}
        icon={BookOpen}
        accentColor="#C9A84C"
        panelBg="linear-gradient(135deg, #0D4B3E 0%, #0a6b52 100%)"
        scrollClass="scroll-emerald"
        onSelectBook={onSelectBook}
        onShowAll={() => onShowCatalog('new')}
      />

      <BookList
        title={t.recommendedTitle}
        books={recommendedBooks}
        buttonLabel={t.recommendedButton}
        icon={Star}
        accentColor="#B8922E"
        panelBg="linear-gradient(135deg, #4a3010 0%, #6b4a1a 100%)"
        scrollClass="scroll-bronze"
        onSelectBook={onSelectBook}
        onShowAll={() => onShowCatalog('recommended')}
      />
    </main>
  );
}

import { Sparkles, Award } from 'lucide-react';
import EventList from '../components/EventList';
import BookList from '../components/BookList';
import StatsPanel from '../components/dashboard/StatsPanel';
import CategoryChart from '../components/dashboard/CategoryChart';
import WeeklyChart from '../components/dashboard/WeeklyChart';
import QuickServices from '../components/dashboard/QuickServices';
import { useI18n } from '../i18n/context';
import { events, newBooks, recommendedBooks, todayEventCount } from '../data/mockData';
import type { Book, LibraryEvent } from '../data/mockData';
import type { CollectionFilter, View } from '../types';

interface HomeViewProps {
  onSelectBook: (book: Book) => void;
  onSelectEvent: (event: LibraryEvent) => void;
  onShowEvents: () => void;
  onShowCatalog: (filter: CollectionFilter) => void;
  onNavigate: (view: View) => void;
}

export default function HomeView({
  onSelectBook,
  onSelectEvent,
  onShowEvents,
  onShowCatalog,
  onNavigate,
}: HomeViewProps) {
  const { t } = useI18n();

  return (
    <main className="kiosk-main">
      <EventList
        className="col-afisha"
        events={events}
        todayCount={todayEventCount()}
        onSelectEvent={onSelectEvent}
        onShowAll={onShowEvents}
      />

      <BookList
        className="col-new"
        title={t.newBooksTitle}
        books={newBooks}
        icon={Sparkles}
        headBg="linear-gradient(135deg, #06437A 0%, #2A6DAB 100%)"
        accent="#2A6DAB"
        scrollClass="scroll-azure"
        variant="badge"
        onSelectBook={onSelectBook}
        onShowAll={() => onShowCatalog('new')}
      />

      <BookList
        className="col-rec"
        title={t.recommendedTitle}
        books={recommendedBooks}
        icon={Award}
        headBg="linear-gradient(135deg, #2A2257 0%, #6F6593 100%)"
        accent="#6F6593"
        scrollClass="scroll-iris"
        variant="rating"
        onSelectBook={onSelectBook}
        onShowAll={() => onShowCatalog('recommended')}
      />

      <StatsPanel />
      <CategoryChart />
      <WeeklyChart />
      <QuickServices onNavigate={onNavigate} />
    </main>
  );
}

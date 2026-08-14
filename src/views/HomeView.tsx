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

interface HomeViewProps {
  onSelectBook: (book: Book) => void;
  onSelectEvent: (event: LibraryEvent) => void;
}

export default function HomeView({ onSelectBook, onSelectEvent }: HomeViewProps) {
  const { t } = useI18n();

  return (
    <main className="kiosk-main">
      <EventList
        className="col-afisha"
        events={events}
        todayCount={todayEventCount()}
        onSelectEvent={onSelectEvent}
      />

      <BookList
        className="col-new"
        title={t.newBooksTitle}
        books={newBooks}
        icon={Sparkles}
        headBg="linear-gradient(135deg, #0E7490 0%, #0A5567 100%)"
        accent="#0E7490"
        scrollClass="scroll-mid"
        variant="badge"
        onSelectBook={onSelectBook}
      />

      <BookList
        className="col-rec"
        title={t.recommendedTitle}
        books={recommendedBooks}
        icon={Award}
        headBg="linear-gradient(135deg, #1E8FA8 0%, #156B7F 100%)"
        accent="#1E8FA8"
        scrollClass="scroll-light"
        variant="rating"
        onSelectBook={onSelectBook}
      />

      <StatsPanel />
      <CategoryChart />
      <WeeklyChart />
      <QuickServices />
    </main>
  );
}

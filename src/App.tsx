import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import FooterNavigation from './components/FooterNavigation';
import BookDetail from './components/BookDetail';
import EventDetail from './components/EventDetail';
import HomeView from './views/HomeView';
import CatalogView from './views/CatalogView';
import EventsView from './views/EventsView';
import AboutView from './views/AboutView';
import ServicesView from './views/ServicesView';
import ContactView from './views/ContactView';
import SearchView from './views/SearchView';
import type { Book, LibraryEvent } from './data/mockData';
import type { CollectionFilter, View } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [catalogFilter, setCatalogFilter] = useState<CollectionFilter>('all');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<LibraryEvent | null>(null);

  const navigate = useCallback((next: View) => {
    setSelectedBook(null);
    setSelectedEvent(null);
    setView(next);
    window.history.pushState({ view: next }, '');
  }, []);

  // Brauzerning "orqaga" tugmasi ham ishlashi uchun
  useEffect(() => {
    function onPopState(e: PopStateEvent) {
      const state = e.state as { view?: View } | null;
      setSelectedBook(null);
      setSelectedEvent(null);
      setView(state?.view ?? 'home');
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const goHome = useCallback(() => navigate('home'), [navigate]);

  const openCatalog = useCallback(
    (filter: CollectionFilter) => {
      setCatalogFilter(filter);
      navigate('catalog');
    },
    [navigate],
  );

  const runSearch = useCallback(() => {
    setSubmittedQuery(query);
    navigate('search');
  }, [query, navigate]);

  function renderPage() {
    switch (view) {
      case 'catalog':
        return (
          <CatalogView
            initialFilter={catalogFilter}
            onBack={goHome}
            onSelectBook={setSelectedBook}
          />
        );
      case 'events':
        return <EventsView onBack={goHome} onSelectEvent={setSelectedEvent} />;
      case 'about':
        return <AboutView onBack={goHome} />;
      case 'services':
        return <ServicesView onBack={goHome} />;
      case 'contact':
        return <ContactView onBack={goHome} />;
      case 'search':
        return (
          <SearchView
            query={submittedQuery}
            onBack={goHome}
            onSelectBook={setSelectedBook}
            onSelectEvent={setSelectedEvent}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="kiosk-root">
      <Header
        query={query}
        onQueryChange={setQuery}
        onSearchSubmit={runSearch}
        onLogoClick={goHome}
      />

      {view === 'home' ? (
        <HomeView
          onSelectBook={setSelectedBook}
          onSelectEvent={setSelectedEvent}
          onShowEvents={() => navigate('events')}
          onShowCatalog={openCatalog}
        />
      ) : (
        <main className="page-main">{renderPage()}</main>
      )}

      <FooterNavigation
        activeView={view}
        onNavigate={(next) => (next === 'catalog' ? openCatalog('all') : navigate(next))}
      />

      {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
      {selectedEvent && <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}

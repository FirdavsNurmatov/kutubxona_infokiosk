import { useCallback, useEffect, useMemo, useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { books, latestBooks, popularBooks } from '../data/mockData';
import type { Book, Genre, LibraryEvent } from '../data/mockData';
import Sidebar from './components/Sidebar';
import KioskModal from './components/KioskModal';
import KioskBookDetail from './components/KioskBookDetail';
import KioskHome from './views/KioskHome';
import KioskBookGrid from './views/KioskBookGrid';
import KioskSearch from './views/KioskSearch';
import KioskGenres from './views/KioskGenres';
import KioskEvents from './views/KioskEvents';
import KioskBranches from './views/KioskBranches';
import KioskAuthors from './views/KioskAuthors';
import EventDetail from './components/KioskEventDetail';
import type { KioskView } from './types';

export default function KioskApp() {
  const { t, tr, lang } = useI18n();

  const [view, setView] = useState<KioskView>('home');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [genre, setGenre] = useState<Genre | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<LibraryEvent | null>(null);
  const [overlay, setOverlay] = useState<'qr' | 'help' | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useCallback((next: KioskView) => {
    setSelectedBook(null);
    setSelectedEvent(null);
    setOverlay(null);
    if (next !== 'genres') setGenre(null);
    if (next !== 'authors') setAuthor(null);
    setView(next);
  }, []);

  const runSearch = useCallback(
    (text?: string) => {
      const value = text ?? query;
      if (text !== undefined) setQuery(text);
      setSubmitted(value);
      setGenre(null);
      setAuthor(null);
      setView('search');
    },
    [query],
  );

  const authorBooks = useMemo(
    () => (author ? books.filter((b) => b.author[lang] === author) : []),
    [author, lang],
  );

  /* Javonda nusxasi bor kitoblar — eng ko'p nusxalilari tepada. */
  const availableBooks = useMemo(
    () => books.filter((b) => b.copies > 0).sort((a, b) => b.copies - a.copies),
    [],
  );

  const genreBooks = useMemo(
    () => (genre ? books.filter((b) => b.category[lang] === genre.category[lang]) : []),
    [genre, lang],
  );

  function renderView() {
    switch (view) {
      case 'home':
        return (
          <KioskHome
            query={query}
            onQueryChange={setQuery}
            onSearch={runSearch}
            onNavigate={navigate}
            onSelectBook={setSelectedBook}
            onHelp={() => setOverlay('help')}
          />
        );

      case 'search':
        return (
          <div className="k-scroll">
            <KioskSearch
              query={query}
              submitted={submitted}
              onQueryChange={setQuery}
              onSearch={() => runSearch()}
              onSelectBook={setSelectedBook}
            />
          </div>
        );

      case 'genres':
        return (
          <div className="k-scroll">
            {genre ? (
              <KioskBookGrid
                title={tr(genre.label)}
                books={genreBooks}
                onSelectBook={setSelectedBook}
                toolbar={
                  <button
                    type="button"
                    className="k-pill btn-compact"
                    onClick={() => setGenre(null)}
                  >
                    <X size={16} />
                    {t.kiosk.menu.genres}
                  </button>
                }
              />
            ) : (
              <KioskGenres onSelectGenre={setGenre} />
            )}
          </div>
        );

      case 'new':
        return (
          <div className="k-scroll">
            <KioskBookGrid
              title={t.kiosk.menu.newArrivals}
              books={latestBooks}
              onSelectBook={setSelectedBook}
            />
          </div>
        );

      case 'popular':
        return (
          <div className="k-scroll">
            <KioskBookGrid
              title={t.kiosk.menu.popular}
              books={popularBooks}
              onSelectBook={setSelectedBook}
            />
          </div>
        );

      case 'events':
        return (
          <div className="k-scroll">
            <KioskEvents onSelectEvent={setSelectedEvent} />
          </div>
        );

      case 'authors':
        return (
          <div className="k-scroll">
            {author ? (
              <KioskBookGrid
                title={author}
                books={authorBooks}
                onSelectBook={setSelectedBook}
                toolbar={
                  <button type="button" className="k-pill btn-compact" onClick={() => setAuthor(null)}>
                    <X size={16} />
                    {t.kiosk.menu.authors}
                  </button>
                }
              />
            ) : (
              <KioskAuthors onSelectAuthor={setAuthor} />
            )}
          </div>
        );

      case 'available':
        return (
          <div className="k-scroll">
            <KioskBookGrid
              title={t.kiosk.menu.available}
              subtitle={t.kiosk.available.subtitle}
              books={availableBooks}
              onSelectBook={setSelectedBook}
            />
          </div>
        );

      case 'branches':
        return (
          <div className="k-scroll">
            <KioskBranches />
          </div>
        );
    }
  }

  return (
    <div className="k-root">
      <Sidebar view={view} onNavigate={navigate} now={now} />

      <div className="k-main">
        {/* Ichki sahifalarda Yordam tugmasi yuqori o'ngda turadi; bosh sahifada
            u hero ichida — shunda fon rasmi ekranning eng tepasidan boshlanadi. */}
        {view !== 'home' && (
          <div className="flex justify-end px-[var(--k-pad)] pt-[var(--k-pad)]">
            <button type="button" className="k-pill" onClick={() => setOverlay('help')}>
              <HelpCircle size={19} style={{ color: '#4F52F6' }} />
              {t.kiosk.help}
            </button>
          </div>
        )}

        {/* Bosh sahifa aylantirilmaydi — hamma narsa ekranga sig'adi */}
        {view === 'home' ? <div className="k-home-wrap">{renderView()}</div> : renderView()}
      </div>

      {selectedBook && (
        <KioskBookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}

      {selectedEvent && (
        <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {overlay === 'help' && (
        <KioskModal title={t.kiosk.help} onClose={() => setOverlay(null)}>
          <ol className="p-6 flex flex-col gap-3">
            {t.kiosk.helpText.map((line, i) => (
              <li key={line} className="flex gap-3">
                <span
                  className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-white"
                  style={{ width: '26px', height: '26px', background: '#4F52F6', fontSize: '13px' }}
                >
                  {i + 1}
                </span>
                <span style={{ color: '#3B4A6B', fontSize: '15px', lineHeight: 1.6 }}>{line}</span>
              </li>
            ))}
          </ol>
        </KioskModal>
      )}
    </div>
  );
}

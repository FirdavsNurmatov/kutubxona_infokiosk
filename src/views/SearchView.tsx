import { useMemo } from 'react';
import { CalendarDays, MapPin, SearchX, Search } from 'lucide-react';
import PageShell from '../components/PageShell';
import BookCard from '../components/BookCard';
import { useI18n } from '../i18n/context';
import { books, events } from '../data/mockData';
import type { Book, LibraryEvent } from '../data/mockData';
import type { Lang, Localized } from '../i18n/translations';

interface SearchViewProps {
  query: string;
  onBack: () => void;
  onSelectBook: (book: Book) => void;
  onSelectEvent: (event: LibraryEvent) => void;
}

/** Qidiruv barcha tillardagi qiymat bo'yicha ishlaydi — foydalanuvchi
 *  interfeys tilidan qat'i nazar rus yoki ingliz nomini yozishi mumkin. */
function matches(value: Localized, needle: string): boolean {
  return (Object.keys(value) as Lang[]).some((l) => value[l].toLowerCase().includes(needle));
}

export default function SearchView({ query, onBack, onSelectBook, onSelectEvent }: SearchViewProps) {
  const { t, tr, monthShort } = useI18n();
  const needle = query.trim().toLowerCase();

  const { foundBooks, foundEvents } = useMemo(() => {
    if (!needle) return { foundBooks: [] as Book[], foundEvents: [] as LibraryEvent[] };

    return {
      foundBooks: books.filter(
        (b) => matches(b.title, needle) || matches(b.author, needle) || matches(b.category, needle),
      ),
      foundEvents: events.filter(
        (e) => matches(e.title, needle) || matches(e.location, needle),
      ),
    };
  }, [needle]);

  const total = foundBooks.length + foundEvents.length;

  return (
    <PageShell
      title={t.page.search}
      subtitle={needle ? `«${query.trim()}» — ${t.results(total)}` : undefined}
      onBack={onBack}
    >
      {!needle ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <Search size={48} className="text-navy-300" strokeWidth={1.5} />
          <p className="text-navy-800 font-bold">{t.searchPrompt}</p>
        </div>
      ) : total === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <SearchX size={48} className="text-navy-300" strokeWidth={1.5} />
          <p className="text-navy-800 font-bold">{t.emptyResults}</p>
          <p className="text-navy-500 text-sm">{t.emptyResultsHint}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {foundBooks.length > 0 && (
            <section>
              <h2 className="text-navy-700 font-bold text-xs uppercase tracking-wide mb-2">
                {t.page.catalog} · {t.results(foundBooks.length)}
              </h2>
              <div className="card-grid">
                {foundBooks.map((book) => (
                  <BookCard key={book.id} book={book} onSelect={onSelectBook} />
                ))}
              </div>
            </section>
          )}

          {foundEvents.length > 0 && (
            <section>
              <h2 className="text-navy-700 font-bold text-xs uppercase tracking-wide mb-2">
                {t.page.events} · {t.results(foundEvents.length)}
              </h2>
              <div className="card-grid">
                {foundEvents.map((event) => {
                  const date = new Date(`${event.date}T00:00:00`);
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onSelectEvent(event)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white text-left transition-all hover:shadow-md active:scale-[0.99]"
                      style={{ border: '1px solid rgba(201,168,76,0.35)' }}
                    >
                      <div
                        className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl text-white font-bold"
                        style={{
                          width: '52px',
                          height: '52px',
                          background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2f6e 100%)',
                        }}
                      >
                        <span className="text-lg font-black leading-none">{date.getDate()}</span>
                        <span className="text-gold-400 text-[10px] font-bold mt-0.5">
                          {monthShort(date)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-navy-900 text-sm leading-tight line-clamp-2">
                          {tr(event.title)}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-navy-500 text-xs">
                          <span className="flex items-center gap-1">
                            <CalendarDays size={11} className="text-gold-500" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1 min-w-0">
                            <MapPin size={11} className="text-gold-500 flex-shrink-0" />
                            <span className="truncate">{tr(event.location)}</span>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </PageShell>
  );
}

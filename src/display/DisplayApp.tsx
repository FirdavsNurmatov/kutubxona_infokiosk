import { useState } from 'react';
import Header from '../components/Header';
import BookDetail from '../components/BookDetail';
import EventDetail from '../components/EventDetail';
import HomeView from '../views/HomeView';
import type { Book, LibraryEvent } from '../data/mockData';

/**
 * Devordagi katta ekran — bitta sahifadan iborat.
 *
 * Bu ekran ma'lumot ko'rsatish uchun: navigatsiya, ichki sahifalar va qidiruv
 * bo'limlari yo'q. Kitob yoki tadbir bosilganda faqat tafsilot oynasi ochiladi
 * (sensorli katta ekran uchun).
 */
export default function DisplayApp() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<LibraryEvent | null>(null);

  return (
    <div className="kiosk-root">
      <Header />

      <HomeView onSelectBook={setSelectedBook} onSelectEvent={setSelectedEvent} />

      {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
      {selectedEvent && <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}

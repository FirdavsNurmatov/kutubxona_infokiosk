import { events, todayISO } from '../../data/mockData';
import type { SignageEvent } from './types';

/**
 * Afishaga tushadigan tadbirlar: bugundan boshlab, vaqti bo'yicha tartiblangan.
 *
 * Agar oldinda tadbir qolmasa, ro'yxat bo'sh qaytadi va ekran "hozircha tadbir
 * yo'q" holatini chiroyli ko'rsatadi (bo'sh ekran chiqmaydi).
 */
export const signageEvents: SignageEvent[] = events
  .filter((event) => event.date >= todayISO())
  .sort((a, b) => (a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)))
  .map((event) => ({
    id: String(event.id),
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    image: event.image,
  }));

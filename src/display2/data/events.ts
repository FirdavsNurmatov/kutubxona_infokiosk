import { events, todayISO } from '../../data/mockData';
import type { SignageEvent } from './types';

/**
 * Afishaga tushadigan tadbirlar: berilgan kundan boshlab, vaqti bo'yicha
 * tartiblangan.
 *
 * Ataylab funksiya, konstanta emas: ekran sutkalab qayta yuklanmaydi, shuning
 * uchun ro'yxat modul yuklanganda emas, kun almashgan sari qaytadan yig'iladi
 * (`useToday` ga qarang). Aks holda kechagi tadbirlar afishada qolib ketardi.
 *
 * Agar oldinda tadbir qolmasa, ro'yxat bo'sh qaytadi va ekran "hozircha tadbir
 * yo'q" holatini chiroyli ko'rsatadi (bo'sh ekran chiqmaydi).
 */
export function buildSignageEvents(today: string = todayISO()): SignageEvent[] {
  return events
    .filter((event) => event.date >= today)
    .sort((a, b) =>
      a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date),
    )
    .map((event) => ({
      id: String(event.id),
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
    }));
}

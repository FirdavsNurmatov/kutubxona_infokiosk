import { useEffect, useState } from 'react';
import { todayISO } from '../../data/mockData';

/** Kun almashganini sezish uchun tekshiruv oralig'i. */
const TICK_MS = 60000;

/**
 * Joriy sana ('YYYY-MM-DD', mahalliy).
 *
 * Nega alohida hook kerak: LED ekran haftalab qayta yuklanmaydi. Sana modul
 * yuklanganda bir marta hisoblansa, yarim tundan keyin afisha muzlab qoladi —
 * kechagi tadbirlar ekranda turaveradi.
 *
 * Taymer arzon: kun o'zgarmagan bo'lsa `setToday` avvalgi qatorning AYNAN
 * o'zini qaytaradi, React esa bunday holatda umuman qayta render qilmaydi.
 * Ya'ni sutkasiga bor-yo'g'i bitta haqiqiy yangilanish bo'ladi.
 */
export function useToday(): string {
  const [today, setToday] = useState(todayISO);

  useEffect(() => {
    const id = window.setInterval(() => {
      setToday((prev) => {
        const now = todayISO();
        return now === prev ? prev : now;
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return today;
}

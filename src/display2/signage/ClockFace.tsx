import { useState, type CSSProperties } from 'react';

/** Siferblat chiziqchalari: 12 ta, ulardan 4 tasi (12/3/6/9) uzunroq. */
const TICKS = Array.from({ length: 12 }, (_, i) => ({ angle: i * 30, major: i % 3 === 0 }));

/**
 * Analog soat — maketdagi bezak belgisining o'rniga haqiqiy vaqt.
 *
 * Strelkalar CSS animatsiyasi bilan aylanadi, burchak esa `animation-delay` ga
 * **manfiy** qiymat berish orqali oshiriladi: "bu animatsiya shuncha sekund
 * oldin boshlangan edi" degani. Shuning uchun React sekundiga bir marta ham
 * qayta chizilmaydi — aylanishni butunlay brauzer kompozitori bajaradi.
 *
 * Vaqt faqat komponent DOM'ga qo'shilganda o'qiladi. INTRO bo'limi har siklda
 * qaytadan mount bo'ladi (`SignagePlayer` dagi `key`), demak soat har safar
 * tizim vaqti bilan qaytadan sinxronlanadi va drift to'planmaydi.
 */
export default function ClockFace() {
  // Mount paytidagi vaqt. Qayta render bo'lsa ham o'zgarmaydi: aks holda
  // `animation-delay` yangilanib, strelkalar sakrab qolardi.
  const [start] = useState(() => new Date());

  const seconds = start.getSeconds() + start.getMilliseconds() / 1000;
  const minutes = start.getMinutes() * 60 + seconds;
  const hours = (start.getHours() % 12) * 3600 + minutes;

  /*
     Ikki qatlamli burchak:
       • inline `transform` — vaqtning aynan shu ondagi holati;
       • `--sg-clock-*` — animatsiya uchun manfiy kechikish.
     Animatsiya inline uslubdan ustun turadi, shuning uchun odatda ikkinchisi
     ishlaydi. `prefers-reduced-motion` da esa animatsiya o'chadi va birinchisi
     ko'rinadi — ya'ni harakatsiz rejimda ham soat to'g'ri vaqtni ko'rsatadi.
  */
  function hand(elapsed: number, period: number, cssVar: string): CSSProperties {
    return {
      transform: `rotate(${(elapsed / period) * 360}deg)`,
      [cssVar]: elapsed,
    } as CSSProperties;
  }

  return (
    <svg className="sg-clock-face" viewBox="0 0 100 100" aria-hidden="true">
      {/* Halqa chiziq qalinligining yarmicha ichkariga olingan, aks holda
          qalin `stroke` viewBox chetidan chiqib kesilib qoladi */}
      <circle className="sg-clock-ring" cx="50" cy="50" r="45" />

      {TICKS.map(({ angle, major }) => (
        <line
          key={angle}
          className={`sg-clock-tick${major ? ' sg-clock-tick--major' : ''}`}
          x1="50"
          y1="10"
          x2="50"
          y2={major ? 19 : 16}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Strelkalar rotate(0) da tepaga — 12 ga qaraydi.
          Soat strelkasi ataylab ancha kalta va qalin: uzoqdan qaraganda
          ikkalasi bir xil uzunlikda bo'lsa, qaysi biri qaysiligi bilinmaydi. */}
      <line
        className="sg-clock-hand sg-clock-hand--hour"
        x1="50"
        y1="50"
        x2="50"
        y2="32"
        style={hand(hours, 43200, '--sg-clock-hour')}
      />
      <line
        className="sg-clock-hand sg-clock-hand--minute"
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        style={hand(minutes, 3600, '--sg-clock-minute')}
      />
      {/* Sekund strelkasi qarama-qarshi tomonga qisqa "dum" chiqaradi */}
      <line
        className="sg-clock-hand sg-clock-hand--second"
        x1="50"
        y1="58"
        x2="50"
        y2="17"
        style={hand(seconds, 60, '--sg-clock-second')}
      />

      <circle className="sg-clock-pin" cx="50" cy="50" r="4" />
    </svg>
  );
}

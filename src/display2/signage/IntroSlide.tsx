import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { BookOpen, CalendarDays, Users } from 'lucide-react';
import ClockFace from './ClockFace';
import SectionLabel from './SectionLabel';
import { useI18n } from '../../i18n/context';
import { formatNumber, formatTime } from '../../i18n/translations';
import { todayEventCount, todayStats } from '../../data/mockData';

function statValue(id: 'catalog' | 'visitors'): number {
  return todayStats.find((s) => s.id === id)?.value ?? 0;
}

/** Soat — har 15 sekundda yangilanadi (daqiqa ko'rsatkichi uchun yetarli). */
function useClock(active: boolean): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!active) return undefined;
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, [active]);

  return now;
}

/**
 * 01 — INTRO.
 *
 * Kompozitsiya maketdagidek: kutubxona nomi **chapda**, soat va kunlik
 * ko'rsatkichlar **o'ngda**, o'rtada esa bino uchun bo'sh joy qoladi.
 * Statistika butun ssenariyda faqat shu sahifada ko'rinadi.
 */
export default function IntroSlide({ active }: { active: boolean }) {
  const { t, formatDate, dayName } = useI18n();
  const now = useClock(active);
  const root = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: BookOpen, value: formatNumber(statValue('catalog')), label: t.screen2.stat.catalog },
    { icon: Users, value: formatNumber(statValue('visitors')), label: t.screen2.stat.visitors },
    { icon: CalendarDays, value: String(todayEventCount()), label: t.screen2.stat.events },
  ];

  /*
     Tipografiya barqaror turadi: na suzadi, na sakraydi. Ruxsat etilgani —
     shaffoflikning sezilmas "nafasi" va shiordagi oltin yog'du. Ikkalasining
     davri boshqa-boshqa, shuning uchun ular birga pulsatsiya qilmaydi.
  */
  useGSAP(
    () => {
      /* Faqat `opacity` — u kompozitorda hisoblanadi va qayta bo'yash talab
         qilmaydi. Ilgari bu yerda `drop-shadow()` animatsiya qilinardi: filtr
         yozuvni alohida yuzaga ko'chirib, har kadrda qaytadan rasterlatardi.
         Yog'duning o'zi endi statik `text-shadow` bo'lib CSS'da turadi. */
      gsap.fromTo(
        '.sg-intro-tagline',
        { opacity: 0.82 },
        { opacity: 1, duration: 6.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.6 },
      );
    },
    { scope: root },
  );

  return (
    <div className="sg-intro" ref={root}>
      <SectionLabel index="01" text={t.screen2.welcome} />

      {/* Chap ustun — kutubxona shaxsiyati */}
      <div className="sg-intro-brand">
        {/* Logotip vaqtincha olib tashlandi — yangisi tayyor bo'lganda shu joyga qo'yiladi. */}
        {/* Maketda shior undov belgisisiz — signage'da u ortiqcha ko'rinadi */}
        <p className="sg-intro-tagline">{t.tagline.replace(/!$/, '')}</p>
      </div>

      {/* O'ng ustun — soat va kunlik ko'rsatkichlar */}
      <div className="sg-intro-side">
        <div className="sg-intro-time">
          <ClockFace />
          <time className="sg-clock">{formatTime(now)}</time>
        </div>
        <div className="sg-intro-date">
          <span>{formatDate(now)}</span>
          <span className="sg-intro-day">{dayName(now)}</span>
        </div>

        <div className="sg-intro-stats">
          {stats.map(({ icon: Icon, value, label }) => (
            <div className="sg-stat" key={label}>
              <Icon className="sg-stat-icon" strokeWidth={1.4} aria-hidden="true" />
              <span className="sg-stat-value">{value}</span>
              <span className="sg-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

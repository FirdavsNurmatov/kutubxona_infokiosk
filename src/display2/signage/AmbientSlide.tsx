import { useI18n } from '../../i18n/context';

/**
 * 04 — AMBIENT: "Bilim oqimi".
 *
 * Bu bo'limda ekran ma'lumot bermaydi — u kutubxona interyerining bir qismiga
 * aylanadi. Butun kadrni fon egallaydi: ochiq kitobdan ko'tarilayotgan
 * harflar, oltin uchqunlar va ko'k yorug'lik oqimlari (fon qatlami shu paytda
 * kuchayadi, `CinematicBackground` ga qarang).
 *
 * Matndan faqat sokin brend yozuvi qoladi.
 */
export default function AmbientSlide() {
  const { t } = useI18n();

  return (
    <div className="sg-ambient">
      <p className="sg-ambient-brand">{t.libraryName.join(' ')}</p>
    </div>
  );
}

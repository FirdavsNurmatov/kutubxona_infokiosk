import SignagePlayer from './signage/SignagePlayer';
import './display2.css';

/**
 * /ekran2 — kutubxona zalidagi katta LED ekran.
 *
 * Bu sahifa infokiosk ham, boshqaruv paneli ham emas: u to'xtovsiz ishlaydigan
 * kinematik "digital signage" pleyeri. Ssenariy `data/playlist.ts` da:
 *
 *   INTRO → KITOBLAR → AMBIENT → TADBIRLAR → (video) → ...
 *
 * Har bir bo'lim — mustaqil to'liq ekran sahna; ular hech qachon bir vaqtda
 * ko'rinmaydi. Foydalanuvchi aralashuvi talab qilinmaydi — na tugma, na
 * strelka, na QR. Ekran kutubxona interyerining bir qismidek ko'rinishi kerak.
 */
export default function Display2App() {
  return (
    <div className="d2-root">
      <SignagePlayer />
    </div>
  );
}

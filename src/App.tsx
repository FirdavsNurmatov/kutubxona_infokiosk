import { useEffect, useState } from 'react';
import DisplayApp from './display/DisplayApp';
import KioskApp from './kiosk/KioskApp';

/** Devordagi katta ekran shu yo'l ostida ochiladi. */
const DISPLAY_PATH = '/ekran';

type Surface = 'kiosk' | 'display';

function surfaceFromPath(pathname: string): Surface {
  return pathname.startsWith(DISPLAY_PATH) ? 'display' : 'kiosk';
}

/**
 * Bitta build ikkita qurilmaga xizmat qiladi:
 *   /       → sensorli infokiosk (och mavzu)
 *   /ekran  → devordagi katta ekran (to'q mavzu, afisha va statistika)
 * Netlify har qanday yo'lni index.html ga yo'naltiradi (netlify.toml).
 */
export default function App() {
  const [surface, setSurface] = useState<Surface>(() =>
    surfaceFromPath(window.location.pathname),
  );

  // Brauzerning "orqaga" tugmasi ekranlar orasida ham ishlashi uchun
  useEffect(() => {
    function onPopState() {
      setSurface(surfaceFromPath(window.location.pathname));
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Mavzu (och/to'q) tanani ham o'zgartiradi
  useEffect(() => {
    document.body.dataset.app = surface;
  }, [surface]);

  return surface === 'display' ? <DisplayApp /> : <KioskApp />;
}

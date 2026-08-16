import { useEffect, useState } from 'react';
import DisplayApp from './display/DisplayApp';
import Display2App from './display2/Display2App';
import KioskApp from './kiosk/KioskApp';
import MapApp from './map/MapApp';

/** Devordagi katta ekran shu yo'l ostida ochiladi. */
const DISPLAY_PATH = '/ekran';
/** O'sha ekranning kinematik fonli ikkinchi versiyasi. */
const DISPLAY2_PATH = '/ekran2';
/** Bino xaritasi — kiosk va ekrandan mustaqil bo'lim. */
const MAP_PATH = '/map';

type Surface = 'kiosk' | 'display' | 'display2' | 'map';

function surfaceFromPath(pathname: string): Surface {
  // "/ekran2" ni "/ekran" dan oldin tekshiramiz — aks holda prefiks mos kelib ketadi
  if (pathname.startsWith(DISPLAY2_PATH)) return 'display2';
  if (pathname.startsWith(DISPLAY_PATH)) return 'display';
  if (pathname.startsWith(MAP_PATH)) return 'map';
  return 'kiosk';
}

/**
 * Bitta build bir nechta ekranga xizmat qiladi:
 *   /       → sensorli infokiosk (och mavzu)
 *   /ekran  → devordagi katta ekran (to'q mavzu, afisha va statistika)
 *   /ekran2 → o'sha ekranning kinematik animatsion fonli versiyasi
 *   /map    → binoning interaktiv 3D xaritasi (qavat va xonalar)
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

  if (surface === 'display2') return <Display2App />;
  if (surface === 'display') return <DisplayApp />;
  if (surface === 'map') return <MapApp />;
  return <KioskApp />;
}

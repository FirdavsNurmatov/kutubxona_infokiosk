import { useEffect, useState } from 'react';
import DisplayApp from './display/DisplayApp';
import KioskApp from './kiosk/KioskApp';
import MapApp from './map/MapApp';

/** Devordagi katta ekran shu yo'l ostida ochiladi. */
const DISPLAY_PATH = '/ekran';
/** Bino xaritasi — kiosk va ekrandan mustaqil bo'lim. */
const MAP_PATH = '/map';

type Surface = 'kiosk' | 'display' | 'map';

function surfaceFromPath(pathname: string): Surface {
  if (pathname.startsWith(DISPLAY_PATH)) return 'display';
  if (pathname.startsWith(MAP_PATH)) return 'map';
  return 'kiosk';
}

/**
 * Bitta build bir nechta ekranga xizmat qiladi:
 *   /       → sensorli infokiosk (och mavzu)
 *   /ekran  → devordagi katta ekran (to'q mavzu, afisha va statistika)
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

  if (surface === 'display') return <DisplayApp />;
  if (surface === 'map') return <MapApp />;
  return <KioskApp />;
}

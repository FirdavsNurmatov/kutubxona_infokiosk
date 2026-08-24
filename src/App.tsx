import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import KioskApp from './kiosk/KioskApp';

/*
 * Ikkilamchi ekranlar alohida "chunk" bo'lib yuklanadi.
 * Sabab: /ekran2 GSAP va WebGL to'lqin maydonini tortadi, /ekran esa recharts ni.
 * Bittayu bitta bundlega qo'shilsa, kiosk ham ochilishida o'sha
 * og'irlikni yuklab, tahlil qilib o'tiradi — har bir qayta yuklanishda.
 */
const DisplayApp = lazy(() => import('./display/DisplayApp'));
const Display2App = lazy(() => import('./display2/Display2App'));
const MapApp = lazy(() => import('./map/MapApp'));
const InterfaceApp = lazy(() => import('./interface/InterfaceApp'));

/** Devordagi katta ekran shu yo'l ostida ochiladi. */
const DISPLAY_PATH = '/ekran';
/** O'sha ekranning kinematik fonli ikkinchi versiyasi. */
const DISPLAY2_PATH = '/ekran2';
/** Bino xaritasi — kiosk va ekrandan mustaqil bo'lim. */
const MAP_PATH = '/map';
/** 1080×1920 infokiosk interfeysi (maketlardan qurilgan modullar). */
const INTERFACE_PATH = '/interface';

type Surface = 'kiosk' | 'display' | 'display2' | 'map' | 'interface';

function surfaceFromPath(pathname: string): Surface {
  // "/ekran2" ni "/ekran" dan oldin tekshiramiz — aks holda prefiks mos kelib ketadi
  if (pathname.startsWith(DISPLAY2_PATH)) return 'display2';
  if (pathname.startsWith(DISPLAY_PATH)) return 'display';
  if (pathname.startsWith(MAP_PATH)) return 'map';
  if (pathname.startsWith(INTERFACE_PATH)) return 'interface';
  return 'kiosk';
}

/**
 * Chunk yuklangunicha ko'rinadigan bo'sh fon.
 * Har bir ekranning fon rangi o'z CSS chunki bilan birga keladi, shuning
 * uchun bu yerda qo'lda takrorlanadi — aks holda bir zumlik oq chaqnash bo'ladi.
 */
const FALLBACK_BG: Record<Surface, string> = {
  kiosk: '#F4F6FB',
  display: '#010F26',
  display2: '#04111F',
  map: '#E8EDF7',
  interface: '#061530',
};

function renderSurface(surface: Surface) {
  switch (surface) {
    case 'display2':
      return <Display2App />;
    case 'display':
      return <DisplayApp />;
    case 'map':
      return <MapApp />;
    case 'interface':
      return <InterfaceApp />;
    default:
      return <KioskApp />;
  }
}

/**
 * Bitta build bir nechta ekranga xizmat qiladi:
 *   /          → sensorli infokiosk (och mavzu)
 *   /ekran     → devordagi katta ekran (to'q mavzu, afisha va statistika)
 *   /ekran2    → o'sha ekranning kinematik animatsion fonli versiyasi
 *   /map       → binoning interaktiv 3D xaritasi (qavat va xonalar)
 *   /interface → 1080×1920 portret infokiosk: meros, allomalar, siymolar,
 *                tarix, kecha-bugun, viktorina va bolalar bo'limlari
 * Netlify har qanday yo'lni index.html ga yo'naltiradi (netlify.toml).
 */
export default function App() {
  const [surface, setSurface] = useState<Surface>(() =>
    surfaceFromPath(window.location.pathname),
  );

  /* Amaldagi yuza popstate ichidan o'qiladi, lekin tinglovchi bir marta
     ulanadi — shuning uchun qiymat ref orqali yangilanib turadi. */
  const surfaceRef = useRef(surface);
  surfaceRef.current = surface;

  // Brauzerning "orqaga" tugmasi ekranlar orasida ham ishlashi uchun
  useEffect(() => {
    function onPopState() {
      const next = surfaceFromPath(window.location.pathname);
      /*
         `/interface` — yopiq bo'lim: undan boshqa yuzaga (kiosk, /ekran,
         /map) o'tib bo'lmaydi. "Orqaga" bosilsa yo'l joyiga qaytariladi,
         yuza esa o'zgarmaydi. Modullar orasidagi orqaga qaytish
         (`/interface/...` → `/interface`) bunga tushmaydi: u ham
         "interface", ya'ni InterfaceApp o'zi hal qiladi.
      */
      if (surfaceRef.current === 'interface' && next !== 'interface') {
        window.history.pushState(null, '', INTERFACE_PATH);
        return;
      }
      setSurface(next);
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Mavzu (och/to'q) tanani ham o'zgartiradi
  useEffect(() => {
    document.body.dataset.app = surface;
  }, [surface]);

  return (
    <Suspense
      fallback={
        <div style={{ position: 'fixed', inset: 0, background: FALLBACK_BG[surface] }} />
      }
    >
      {renderSurface(surface)}
    </Suspense>
  );
}

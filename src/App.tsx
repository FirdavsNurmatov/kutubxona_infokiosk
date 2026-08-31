import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import KioskApp from './kiosk/KioskApp';

/**
 * Variantli build: bitta yuza uchun yig'ilgan exe.
 *
 * `SURFACE=map npm run build:electron` da bu satr `'map'` bo'lib qotadi
 * (vite.config.ts dagi `define`), bo'sh bo'lsa — eski, hamma yuza bitta
 * ilovada turadigan build. `tools/surfaces.mjs` — variantlar jadvali.
 */
const ONLY = (import.meta.env.VITE_SURFACE ?? '') as Surface | '';

/*
 * Ikkilamchi ekranlar alohida "chunk" bo'lib yuklanadi.
 * Sabab: /ekran2 GSAP va WebGL to'lqin maydonini tortadi, /ekran esa recharts ni.
 * Bittayu bitta bundlega qo'shilsa, kiosk ham ochilishida o'sha
 * og'irlikni yuklab, tahlil qilib o'tiradi — har bir qayta yuklanishda.
 *
 * `ONLY` konstanta bo'lgani uchun mos kelmagan shart build vaqtidayoq
 * `false` ga aylanadi va `import()` bilan birga butun chunk bundledan
 * tushib qoladi — variantli exe boshqa ekranlarning kodini ko'tarib
 * yurmaydi.
 */
const DisplayApp = ONLY === '' || ONLY === 'display' ? lazy(() => import('./display/DisplayApp')) : null;
const Display2App = ONLY === '' || ONLY === 'display2' ? lazy(() => import('./display2/Display2App')) : null;
const MapApp = ONLY === '' || ONLY === 'map' ? lazy(() => import('./map/MapApp')) : null;
const InterfaceApp = ONLY === '' || ONLY === 'interface' ? lazy(() => import('./interface/InterfaceApp')) : null;

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
  /* Variantli buildda boshqa yuzalar umuman yig'ilmagan — yo'l nima
     bo'lishidan qat'i nazar bittayu bitta mavjud ekran ochiladi. */
  if (ONLY) return ONLY;
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

/*
 * `KioskApp` — yagona statik import: u eng yengil yuza va kiosk
 * ochilishida darhol kerak, lazy qilinsa bir zumlik bo'sh fon ko'rinardi.
 * Variantli buildda uning kodi (bir necha o'nlab KB) bundleda qolib
 * ketadi — media fayllar oldida bu sezilmaydi.
 *
 * Qolganlari `null` bo'lishi mumkin: variantda faqat bittasi yig'iladi,
 * boshqalarining o'rnida esa `null` turadi va u yerga hech qachon
 * borilmaydi — `surfaceFromPath` `ONLY` dan boshqa qiymat qaytarmaydi.
 */
function renderSurface(surface: Surface) {
  switch (surface) {
    case 'display2':
      return Display2App ? <Display2App /> : null;
    case 'display':
      return DisplayApp ? <DisplayApp /> : null;
    case 'map':
      return MapApp ? <MapApp /> : null;
    case 'interface':
      return InterfaceApp ? <InterfaceApp /> : null;
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

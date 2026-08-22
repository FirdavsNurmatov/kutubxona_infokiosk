import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Shrift loyiha ichida — ekran internetsiz ham to'g'ri ko'rinadi
import '@fontsource-variable/inter/wght.css';
import LanguageProvider from '../i18n/LanguageProvider';
import Display2App from './Display2App';
import '../index.css';

/*
 * /ekran2 ning mustaqil kirish nuqtasi (Electron nusxasi).
 *
 * `src/main.tsx` dan farqi: bu yerda yo'lga qarab ekran tanlanmaydi.
 * Ilova bitta ish qiladi — signage pleyerini ochadi. Shu sababli
 * `window.location` ga bog'liqlik yo'q: Electron sahifani `app://` orqali
 * beradi va u yerda "yo'l" tushunchasi ilovaga hech narsa anglatmaydi.
 */

// Mavzuni tanlash: `index.css` dagi `body[data-app]` qoidalari uchun
document.body.dataset.app = 'display2';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Display2App />
    </LanguageProvider>
  </StrictMode>,
);

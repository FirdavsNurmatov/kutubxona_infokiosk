import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Shrift loyiha ichida — kiosk internetsiz ishlaganda ham to'g'ri ko'rinadi.
// Variable font: kerakli subset (lotin / kirill) brauzer tomonidan tanlanadi.
import '@fontsource-variable/inter/wght.css';
import App from './App.tsx';
import LanguageProvider from './i18n/LanguageProvider.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

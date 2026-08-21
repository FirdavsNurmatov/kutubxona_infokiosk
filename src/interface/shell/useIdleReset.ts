import { useEffect, useRef } from 'react';

/**
 * Kioskda foydalanuvchi ketib qolsa, ekran o'zicha bosh sahifaga qaytishi kerak —
 * aks holda keyingi kishi begona odamning yarim tugallangan testini ko'radi.
 *
 * Har qanday tegish taymerni noldan boshlaydi.
 */
export function useIdleReset(onIdle: () => void, timeoutMs = 90_000): void {
  const saved = useRef(onIdle);
  saved.current = onIdle;

  useEffect(() => {
    let timer = window.setTimeout(() => saved.current(), timeoutMs);

    function reset() {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => saved.current(), timeoutMs);
    }

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [timeoutMs]);
}

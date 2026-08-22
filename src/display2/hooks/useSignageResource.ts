import { useEffect, useRef, useState } from 'react';
import { refreshMs } from '../api/runtime';

/**
 * API dan keladigan ro'yxat.
 *
 * Signage mantiqi oddiy brauzer ilovasidan ikki narsa bilan farq qiladi:
 *
 *   1. **Yuklanish holati yo'q.** Ekranda "yuklanmoqda" aylanasi ko'rinmasligi
 *      kerak — u yerda kutadigan odam yo'q. Shuning uchun boshlang'ich qiymat
 *      ichki ro'yxat bo'ladi va ekran birinchi kadrdanoq to'la ko'rinadi.
 *      API javobi kelganda ro'yxat sezdirmay almashadi.
 *
 *   2. **Ma'lumot o'zi yangilanadi.** Ekran haftalab qayta yuklanmaydi,
 *      demak yangi kitob yoki tadbir qo'shilganini o'zi bilib olishi kerak.
 *
 * Yangi javob eskisi bilan bir xil bo'lsa holat o'zgartirilmaydi: aks holda
 * har besh daqiqada karusel qaytadan mount bo'lib, kitob almashuvi sakrardi.
 */
export function useSignageResource<T>(key: string, load: () => Promise<T[]>, initial: T[]): T[] {
  const [items, setItems] = useState<T[]>(initial);

  /* Loader va zaxira har renderda yangi bo'ladi (`() => …`, `useMemo`),
     lekin effekt faqat `key` o'zgarganda qayta ishga tushishi kerak. */
  const loadRef = useRef(load);
  loadRef.current = load;
  const initialRef = useRef(initial);
  initialRef.current = initial;

  useEffect(() => {
    let alive = true;
    let timer = 0;

    // Kalit o'zgardi (masalan kun almashdi) — avval ichki ro'yxatga qaytamiz
    setItems(initialRef.current);

    async function tick() {
      const next = await loadRef.current();
      if (!alive) return;
      setItems((prev) => (same(prev, next) ? prev : next));
      timer = window.setTimeout(tick, refreshMs());
    }

    void tick();

    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, [key]);

  return items;
}

/**
 * Ikki ro'yxat bir xilmi.
 *
 * `JSON.stringify` — bu yerda maqbul: ro'yxatlar kichik (o'nlab element) va
 * taqqoslash besh daqiqada bir marta bo'ladi. Chuqur solishtiruvchi yozish
 * shu hajm uchun ortiqcha kod.
 */
function same(a: unknown[], b: unknown[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

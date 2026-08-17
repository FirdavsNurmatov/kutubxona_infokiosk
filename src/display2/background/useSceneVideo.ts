import { useEffect, useRef } from 'react';

/**
 * Hero videosini bo'lim faolligiga qarab yurgizadi.
 *
 * Nega bu kerak: video elementi hech qachon DOM'dan olib tashlanmaydi. Ilgari
 * har bir sahna `{mode === 'books' && <StageScene />}` shaklida shartli
 * render qilinardi — bo'lim almashishi bilan `<video>` yo'q qilinib, qaytib
 * kelganda yangisi yaratilardi. Brauzer uchun bu butunlay yangi manba: bufer
 * ham, dekoder ham nolddan tiklanadi. Pleylist sikli ≈ 96 sekund, ya'ni
 * sutkasiga ~900 marta. Netlify keshi bunga to'liq yordam bermaydi: `<video>`
 * Range so'rovlari orqali brauzerning alohida, hajmi cheklangan media keshiga
 * tushadi va u yerdan tez siqib chiqariladi.
 *
 * Yechim: element joyida qoladi, faqat to'xtatiladi. Bufer va dekoder
 * saqlanadi, tarmoqqa esa umuman murojaat bo'lmaydi.
 */
export function useSceneVideo(active: boolean) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!active) {
      el.pause();
      return;
    }

    // Bo'lim har safar boshidan ko'rinsin — loop qayerda to'xtagani muhim emas.
    // Fayl to'liq buferlangani uchun bu qidiruv tarmoqqa chiqmaydi.
    el.currentTime = 0;
    // `muted` + `playsInline` da autoplay ruxsat etiladi; baribir bloklansa
    // ekran ishlashda davom etsin — statik kadr ham maqbul.
    void el.play().catch(() => {});
  }, [active]);

  return ref;
}

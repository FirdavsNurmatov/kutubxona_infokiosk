import { useEffect, useRef } from 'react';
import type { VantaEffect } from 'vanta/dist/vanta.rings.min';

/**
 * Diqqat markazidagi kitob ortidagi halqa-yog'du (Vanta.js RINGS).
 *
 * Effekt fon sifatida emas, aynan **fokus belgisi** sifatida ishlatiladi:
 * u faqat markazdagi muqova ortida, kichik doira ichida chiziladi va
 * chetlariga qarab butunlay so'nadi (CSS niqob). Shu tufayli u qaysi kitob
 * hozir tanlanganini ko'rsatadi, ekranni esa bezab yubormaydi.
 *
 * Signage uchun muhimlari:
 *   • sichqoncha, teginish va giroskop boshqaruvi o'chirilgan;
 *   • three.js va Vanta alohida bo'lakka ajratilgan va faqat KITOBLAR
 *     sahifasi birinchi marta ochilganda yuklanadi — ekranning ilk
 *     chizilishi kechikmaydi;
 *   • piksel zichligi cheklangan — 4K panelda GPU behuda ishlamaydi;
 *   • sahifa yopilganda effekt to'liq yo'q qilinadi (`destroy`) va WebGL
 *     konteksti bo'shatiladi: ekran sutkalab ishlaydi.
 */
export default function FocusHalo() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = holder.current;
    if (!node) return undefined;

    // Harakat kamaytirilgan rejimda halqalar umuman ishga tushmaydi
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let effect: VantaEffect | null = null;
    // Kutubxona yuklanib bo'lgunga qadar sahifa yopilishi mumkin
    let cancelled = false;

    Promise.all([import('three'), import('vanta/dist/vanta.rings.min')])
      .then(([THREE, module]) => {
        if (cancelled) return;

        effect = module.default({
          el: node,
          THREE,
          // Bu passiv axborot ekrani — hech qanday kirish boshqaruvi yo'q
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          // Fon shaffof: ostidagi Particle Waves va osmon ko'rinib tursin
          backgroundColor: 0x020b16,
          backgroundAlpha: 0,
          // Asosiy ohang — kutubxona ko'ki
          color: 0x12b8e6,
        });

        // Vanta o'zicha to'liq devicePixelRatio bilan chizadi; katta panelda
        // bu ortiqcha. Yog'du yumshoq bo'lgani uchun pasaytirish sezilmaydi.
        effect.renderer?.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      })
      .catch((error) => {
        // WebGL yoki paket mavjud bo'lmasa ekran baribir ishlashda davom etadi
        console.error('[FocusHalo] Vanta RINGS ishga tushmadi:', error);
      });

    return () => {
      cancelled = true;
      const canvas = effect?.renderer?.domElement;
      effect?.destroy();
      // Kontekst darhol bo'shasin — bo'lim har aylanishda qayta ochiladi
      canvas?.getContext('webgl')?.getExtension('WEBGL_lose_context')?.loseContext();
      effect = null;
    };
  }, []);

  return <div className="sg-halo" ref={holder} aria-hidden="true" />;
}

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { createAmbientAnimation, type SceneController } from './animation';
import { HERO_VIDEO } from './heroMedia';

gsap.registerPlugin(useGSAP);

/**
 * AMBIENT sahifasining foni: ochiq kitob va undan taralayotgan bilim oqimi.
 *
 * Kadr **qimirlamaydi** — kamera qotirilgan, harakat faqat yorug'likda.
 *
 * Ikki rejim (`heroMedia.ts` ga qarang): Higgsfield loop videosi yoki statik
 * rasm + CSS qatlamlari. Video rejimida nur dastasi, oltin yog'du va varaq
 * yorug'ligi videoning ichida bo'lgani uchun CSS'da takrorlanmaydi; harflar,
 * uchqunlar va yorug'lik izlari canvas'i esa qoladi — u takrorlanmaydigan
 * qatlam sifatida videoning davriyligini yashiradi.
 */
export default function AmbientScene() {
  const root = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const pageLight = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const video = HERO_VIDEO.ambient;

  useGSAP(
    () => {
      let controller: SceneController | null = null;
      if (root.current && canvas.current) {
        controller = createAmbientAnimation({
          root: root.current,
          canvas: canvas.current,
          burst: burst.current,
          glow: glow.current,
          pageLight: pageLight.current,
        });
      }
      return () => controller?.destroy();
    },
    { scope: root },
  );

  return (
    <div className="d2-hero d2-hero--ambient" ref={root} aria-hidden="true">
      {video ? (
        <video
          className="d2-hero-video"
          src={video}
          poster="/images/ekran2/plate-book.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <>
          <div className="d2-hero-plate d2-hero-plate--book" />
          <div className="d2-page-light" ref={pageLight} />
          <div className="d2-book-burst" ref={burst} />
          <div className="d2-book-glow" ref={glow} />
        </>
      )}

      {/* Harflar, yorug'lik izlari va uchqunlar — har ikki rejimda ham */}
      <canvas className="d2-canvas" ref={canvas} />

      <div className="d2-hero-scrim d2-hero-scrim--ambient" />
    </div>
  );
}

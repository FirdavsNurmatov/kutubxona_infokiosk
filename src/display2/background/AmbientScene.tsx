import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { createAmbientAnimation, type SceneController } from './animation';
import { HERO_VIDEO } from './heroMedia';
import { useSceneVideo } from './useSceneVideo';

gsap.registerPlugin(useGSAP);

interface SceneProps {
  /** Bo'lim hozir ekrandami. Sahna DOM'da qoladi, faqat chizish to'xtaydi. */
  active: boolean;
}

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
export default function AmbientScene({ active }: SceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const pageLight = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SceneController | null>(null);

  const video = HERO_VIDEO.ambient;
  const videoRef = useSceneVideo(active);

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
      controllerRef.current = controller;
      return () => {
        controller?.destroy();
        controllerRef.current = null;
      };
    },
    { scope: root },
  );

  /* Bu sahnaning canvas'i eng og'iri (harflar, izlar, uchqunlar) — ko'rinmay
     turganda uni chizib o'tirish protsessorni bekorga yeydi. */
  useEffect(() => {
    controllerRef.current?.setActive(active);
  }, [active]);

  return (
    <div
      className={`d2-hero d2-hero--ambient${active ? ' is-active' : ''}`}
      ref={root}
      aria-hidden="true"
    >
      {video ? (
        <video
          ref={videoRef}
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

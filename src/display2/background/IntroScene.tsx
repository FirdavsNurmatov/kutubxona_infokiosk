import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { createIntroAnimation, type SceneController } from './animation';
import { HERO_VIDEO } from './heroMedia';
import { useSceneVideo } from './useSceneVideo';

gsap.registerPlugin(useGSAP);

interface SceneProps {
  /** Bo'lim hozir ekrandami. Sahna DOM'da qoladi, faqat chizish to'xtaydi. */
  active: boolean;
}

/**
 * INTRO sahifasining foni: yoritilgan Milliy kutubxona binosi.
 *
 * Tasvir butun ekranni (100vw × 100vh) egallaydi — u kichik kartochka ichida
 * ham, yuqoridagi tasmada ham emas, aynan **asosiy vizual**.
 *
 * Ikki rejim (`heroMedia.ts` ga qarang):
 *
 *   • video  — Higgsfield'da shu rasmdan generatsiya qilingan loop. Deraza
 *     chiroqlari, tuman, nur va aks videoning ichida, shuning uchun ularning
 *     CSS variantlari chizilmaydi;
 *   • statik — rasm + desinxron CSS/canvas qatlamlari.
 *
 * Har ikki holatda ham havodagi chang canvas'da qoladi: u takrorlanmaydigan
 * oldingi plan bo'lib, videoning davriyligini yumshatadi.
 */
export default function IntroScene({ active }: SceneProps) {
  const root = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const windowsLeft = useRef<HTMLDivElement>(null);
  const windowsCenter = useRef<HTMLDivElement>(null);
  const windowsRight = useRef<HTMLDivElement>(null);
  const hazeFar = useRef<HTMLDivElement>(null);
  const hazeNear = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const reflection = useRef<HTMLDivElement>(null);
  const dustCanvas = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SceneController | null>(null);

  const video = HERO_VIDEO.intro;
  const videoRef = useSceneVideo(active);

  useGSAP(
    () => {
      let controller: SceneController | null = null;
      if (root.current && dustCanvas.current) {
        controller = createIntroAnimation({
          root: root.current,
          dustCanvas: dustCanvas.current,
          // Video rejimida bu qatlamlar DOM'da yo'q
          plate: plate.current,
          windowGroups: video
            ? null
            : ([windowsLeft.current, windowsCenter.current, windowsRight.current].filter(
                Boolean,
              ) as HTMLElement[]),
          hazeFar: hazeFar.current,
          hazeNear: hazeNear.current,
          rays: rays.current,
          reflection: reflection.current,
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

  /* `useGSAP` layout bosqichida ishlaydi, ya'ni kontroller bu yerga qadar
     tayyor bo'ladi. Ko'rinmayotgan sahnaning changi chizilmaydi. */
  useEffect(() => {
    controllerRef.current?.setActive(active);
  }, [active]);

  return (
    <div
      className={`d2-hero d2-hero--intro${active ? ' is-active' : ''}`}
      ref={root}
      aria-hidden="true"
    >
      {video ? (
        <video
          ref={videoRef}
          className="d2-hero-video"
          src={video}
          poster="/images/ekran2/plate-building.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <>
          <div className="d2-hero-plate d2-hero-plate--arch" ref={plate} />
          <div className="d2-haze d2-haze--far" ref={hazeFar} />
          <div className="d2-windows d2-windows--left" ref={windowsLeft} />
          <div className="d2-windows d2-windows--center" ref={windowsCenter} />
          <div className="d2-windows d2-windows--right" ref={windowsRight} />
          <div className="d2-rays" ref={rays} />
          <div className="d2-haze d2-haze--near" ref={hazeNear} />
          <div className="d2-reflection" ref={reflection} />
        </>
      )}

      {/* Havodagi chang — har ikki rejimda ham qoladi */}
      <canvas className="d2-dust" ref={dustCanvas} />
    </div>
  );
}

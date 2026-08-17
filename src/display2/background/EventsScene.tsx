import { HERO_VIDEO } from './heroMedia';
import { useSceneVideo } from './useSceneVideo';

interface SceneProps {
  /** Bo'lim hozir ekrandami. Sahna DOM'da qoladi, faqat video to'xtaydi. */
  active: boolean;
}

/**
 * TADBIRLAR sahifasining foni.
 *
 * Higgsfield'da shu bo'lim uchun generatsiya qilingan loop video: siyohrang
 * va oltin zarracha oqimlari kadrning pastki yarmi bo'ylab suzadi, o'ngda
 * kutubxona binosi yorug' chizmada turadi, tepada yulduzli osmon, pastda
 * esa sayqal berilgan pol aks ettiradi.
 *
 * Video bo'lmasa `null` qaytaradi — u holda `SignageBackdrop` odatdagi
 * osmon gradienti va Particle Waves qatlamiga qaytadi. Ya'ni fayl yo'q
 * bo'lsa ham sahifa hech qachon qora ekranga tushib qolmaydi.
 */
export default function EventsScene({ active }: SceneProps) {
  const video = HERO_VIDEO.events;
  const videoRef = useSceneVideo(active);
  if (!video) return null;

  return (
    <div
      className={`d2-hero d2-hero--events${active ? ' is-active' : ''}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="d2-hero-video"
        src={video}
        poster="/images/ekran2/plate-events.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/*
        Kartochkalar tasmasi kadrning o'rtasida turadi. Video o'sha
        balandlikda eng yorqin (to'lqinlar shu yerdan o'tadi), shuning uchun
        parda aynan markaziy belbog'ni bosadi — matn fonga singib ketmasin.
      */}
      <div className="d2-hero-scrim d2-hero-scrim--events" />
    </div>
  );
}

import { HERO_VIDEO } from './heroMedia';
import { useSceneVideo } from './useSceneVideo';

interface SceneProps {
  /** Bo'lim hozir ekrandami. Sahna DOM'da qoladi, faqat video to'xtaydi. */
  active: boolean;
}

/**
 * KITOBLAR sahifasining foni.
 *
 * Higgsfield'da shu sahifa uchun maxsus generatsiya qilingan loop video:
 * markaz ataylab qorong'i va tinch (muqovalar uchun bo'sh joy), chetlarda
 * ko'k va oltin to'lqinlar oqadi, tepada "R" harflari suzadi, pastda esa
 * oltin halqalar yog'du beradi — reference maketdagi 02-bo'lim kayfiyati.
 *
 * Bu sahnada JS animatsiyasi yo'q: butun harakat videoning ichida, ustidan
 * esa Particle Waves qatlami qo'shiladi.
 */
export default function StageScene({ active }: SceneProps) {
  const video = HERO_VIDEO.books;
  const videoRef = useSceneVideo(active);
  if (!video) return null;

  return (
    <div
      className={`d2-hero d2-hero--books${active ? ' is-active' : ''}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="d2-hero-video"
        src={video}
        poster="/images/ekran2/plate-books.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}

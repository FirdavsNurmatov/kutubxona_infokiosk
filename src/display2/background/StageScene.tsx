import { HERO_VIDEO } from './heroMedia';

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
export default function StageScene() {
  const video = HERO_VIDEO.books;
  if (!video) return null;

  return (
    <div className="d2-hero d2-hero--books" aria-hidden="true">
      <video
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

import ParticleWaves from '../background/ParticleWaves';
import IntroScene from '../background/IntroScene';
import AmbientScene from '../background/AmbientScene';
import StageScene from '../background/StageScene';
import EventsScene from '../background/EventsScene';
import { HERO_VIDEO } from '../background/heroMedia';
import type { SignageMode } from '../data/types';

interface SignageBackdropProps {
  mode: SignageMode;
}

/**
 * Sahifalar ortidagi fon.
 *
 * Har bir sahifaning kompozitsiyasi butunlay boshqacha va ikkita hero tasvir
 * hech qachon bitta ekranda uchrashmaydi:
 *
 *   INTRO     — to'liq ekran kutubxona binosi + nozik zarrachalar
 *   KITOBLAR  — faqat to'q navy + Particle Waves (hero tasvirlar yo'q)
 *   TADBIRLAR — faqat to'q navy + Particle Waves (boshqacha oqim)
 *   AMBIENT   — to'liq ekran ochiq kitob + bilim oqimi
 *   VIDEO     — fon qora, ekranni video egallaydi
 *
 * Particle Waves doimiy: WebGL konteksti bir marta yaratiladi va bo'lim
 * almashganda faqat sozlamalari o'zgaradi. Hero sahnalar esa (oddiy 2D canvas
 * va rasm qatlamlari) faqat o'z sahifasida DOM'ga qo'shiladi.
 */
export default function SignageBackdrop({ mode }: SignageBackdropProps) {
  /*
     KITOBLAR va TADBIRLAR sahifalarida fon ataylab yalang'och: butun harakat
     generatsiya qilingan videoning ichida. Ustiga qo'shimcha zarrachalar,
     gradientlar yoki vinyetka qo'yilmaydi — aks holda ikki qavat to'lqin
     bo'lib, sun'iy ko'rinadi.

     Shart aynan **video bor-yo'qligiga** bog'langan, bo'lim nomiga emas:
     `heroMedia.ts` da yo'l `null` qilinsa, o'sha bo'lim o'z-o'zidan osmon
     gradienti va Particle Waves qatlamiga qaytadi.
  */
  const heroVideo =
    mode === 'books' ? HERO_VIDEO.books : mode === 'events' ? HERO_VIDEO.events : null;
  const bareVideo = Boolean(heroVideo);

  return (
    <div className="sg-backdrop" aria-hidden="true">
      {!bareVideo && <div className={`sg-sky sg-sky--${mode}`} />}

      {mode === 'intro' && <IntroScene />}
      {mode === 'books' && <StageScene />}
      {mode === 'events' && <EventsScene />}
      {mode === 'ambient' && <AmbientScene />}

      {!bareVideo && <ParticleWaves mode={mode} paused={mode === 'video'} />}

      {!bareVideo && <div className="sg-vignette" />}
    </div>
  );
}

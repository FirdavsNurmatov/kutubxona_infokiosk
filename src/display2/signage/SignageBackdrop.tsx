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
 * **Barcha og'ir qatlamlar doim DOM'da turadi**, ko'rinishi esa `active` va
 * CSS orqali boshqariladi. Ilgari ular shartli render qilinardi va har
 * aylanishda (≈96 s) qaytadan yaratilardi: `<video>` manbani nolddan yuklar,
 * Particle Waves esa yangi WebGL konteksti ochardi. Sutkalab ishlaydigan
 * ekranda bu tarmoqni ham, drayver xotirasini ham behuda yeydi. Endi ular
 * bir marta quriladi, bo'lim almashganda faqat to'xtatiladi.
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

      <IntroScene active={mode === 'intro'} />
      <StageScene active={mode === 'books'} />
      <EventsScene active={mode === 'events'} />
      <AmbientScene active={mode === 'ambient'} />

      {/*
        To'xtatilganda maydon o'zini qora rangga tozalaydi, `mix-blend-mode:
        screen` ostida esa qora — ko'rinmas. Ya'ni yalang'och video
        sahifalarida qatlamni yashirish uchun alohida CSS kerak emas.
      */}
      <ParticleWaves mode={mode} paused={bareVideo || mode === 'video'} />

      {!bareVideo && <div className="sg-vignette" />}
    </div>
  );
}

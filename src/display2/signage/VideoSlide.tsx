import { useCallback, useEffect, useRef } from 'react';
import { report, videoSound } from '../api/runtime';

interface VideoSlideProps {
  src: string;
  active: boolean;
  /** Video tugadi yoki ochilmadi — pleyer keyingi bo'limga o'tsin. */
  onFinished: () => void;
}

/**
 * 05 — VIDEO.
 *
 * Pleylistning bir bo'lagi: video tugagach ekran keyingi bo'limga o'tadi.
 *
 * OVOZ. Standart holatda video OVOZSIZ ijro etiladi. Electron nusxasida uni
 * `config.json` dagi `videoSound: true` bilan yoqish mumkin: ilovada ovozli
 * avtomatik ijroga ruxsat berilgan (`autoplay-policy`, electron/main.cjs),
 * shuning uchun brauzerdagidek maxsus flag talab qilinmaydi.
 *
 * Ovoz yoqilgan bo'lsa-yu, muhit uni bloklasa (masalan oddiy brauzerda
 * ochilgan bo'lsa), video OVOZSIZ qayta urinib ko'riladi — ekran bo'sh
 * kadrda qotib qolmasligi kerak. Ikkinchi urinish ham muvaffaqiyatsiz
 * bo'lsa (fayl yo'q, kodek yo'q), pleyer keyingi bo'limga o'tadi.
 */
export default function VideoSlide({ src, active, onFinished }: VideoSlideProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // Bitta slayd uchun faqat bitta "tugadi" signali
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current || !active) return;
    finished.current = true;
    onFinished();
  }, [active, onFinished]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;

    if (!active) {
      video.pause();
      return undefined;
    }

    finished.current = false;
    video.currentTime = 0;
    /* `muted` JSX atributi sifatida berilmaydi: uni shu yerda boshqaramiz,
       chunki ovozdan ovozsizga o'tish ijro urinishlari orasida bo'ladi. */
    const wantsSound = videoSound();
    video.muted = !wantsSound;
    video.volume = 1;

    let cancelled = false;

    const fail = (error: unknown) => {
      report('error', `video ijro etilmadi: ${error instanceof Error ? error.message : String(error)}`);
      finish();
    };

    void video.play().catch((error: unknown) => {
      if (cancelled) return undefined;
      if (!wantsSound) return fail(error);

      // Ovozli ijro bloklandi — ovozsiz ko'rsatgan bo'sh ekrandan yaxshiroq
      report('warn', "ovozli avtomatik ijro bloklandi — video ovozsiz ko'rsatiladi");
      video.muted = true;
      return video.play().catch(fail);
    });

    return () => {
      cancelled = true;
      video.pause();
    };
  }, [active, finish]);

  return (
    <video
      ref={ref}
      className="sg-video"
      src={src}
      playsInline
      preload="auto"
      onEnded={finish}
      onError={finish}
    />
  );
}

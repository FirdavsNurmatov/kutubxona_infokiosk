import { useCallback, useEffect, useRef } from 'react';

interface VideoSlideProps {
  src: string;
  active: boolean;
  /** Video tugadi yoki ochilmadi — pleyer keyingi bo'limga o'tsin. */
  onFinished: () => void;
}

/**
 * 05 — VIDEO.
 *
 * Ovozsiz, avtomatik ijro, takrorlashsiz: pleylistning bir bo'lagi sifatida
 * video tugagach ekran keyingi bo'limga o'tadi. Fayl topilmasa yoki brauzer
 * ijroni bloklasa ham ekran qotib qolmaydi — darhol keyingisiga o'tiladi.
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
    const started = video.play();
    if (started) started.catch(finish);

    return () => video.pause();
  }, [active, finish]);

  return (
    <video
      ref={ref}
      className="sg-video"
      src={src}
      muted
      playsInline
      preload="auto"
      onEnded={finish}
      onError={finish}
    />
  );
}

import { useEffect, useMemo, useState } from 'react';
import SignageBackdrop from './SignageBackdrop';
import IntroSlide from './IntroSlide';
import BooksSlide from './BooksSlide';
import EventsSlide from './EventsSlide';
import AmbientSlide from './AmbientSlide';
import VideoSlide from './VideoSlide';
import ProgressIndicator from './ProgressIndicator';
import SignageBoundary from './SignageBoundary';
import { pinnedSlideIndex, useSignagePlayer } from '../hooks/useSignagePlayer';
import { getSignagePlaylist } from '../api';
import { signagePlaylist } from '../data/playlist';
import { useSignageResource } from '../hooks/useSignageResource';
import { useI18n } from '../../i18n/context';
import type { SignageSlide } from '../data/types';

interface SignagePlayerProps {
  /**
   * Avtomatik ijro. Keyinchalik admin paneli shu bayroq orqali ekranni
   * to'xtatib turishi mumkin: taymerlar ham, karusellar ham to'xtaydi.
   */
  isPlaying?: boolean;
}

/** Eski sahifa so'nib bo'lgunga qadar ketadigan vaqt (CSS bilan bir xil). */
const FADE_OUT_MS = 700;

/**
 * Signage pleyeri.
 *
 * Har bir sahifa — mustaqil to'liq ekran sahna, va ayni paytda ekranda
 * ulardan faqat BITTASI turadi: eski sahifa avval so'nadi, DOM'dan
 * chiqariladi, keyin yangisi ochiladi. Shu sababli KITOBLAR sahifasida
 * TADBIRLAR yoki INTRO ning hech bir elementi qolib ketmaydi.
 *
 * Fon (SignageBackdrop) esa uzluksiz: u sahifalarni bitta kompozitsiyaga
 * bog'lab turadi va o'zi ham bo'limga qarab o'zgaradi.
 */
export default function SignagePlayer({ isPlaying = true }: SignagePlayerProps) {
  const { t } = useI18n();

  /* Ssenariy ham ma'lumot: backend ulanganda uni admin panelidan
     o'zgartirish mumkin bo'ladi. Ulanmagan bo'lsa ichki ro'yxat qaytadi. */
  const playlist = useSignageResource('playlist', getSignagePlaylist, signagePlaylist);
  /* `?slide=` — bo'limni qotirib qo'yish. Pleylist almashsa qayta hisoblanadi:
     qotirilgan bo'lim yangi ro'yxatda boshqa o'rinda bo'lishi mumkin. */
  const pinned = useMemo(() => pinnedSlideIndex(playlist), [playlist]);

  const { index, slide, next, reset } = useSignagePlayer(playlist, isPlaying, pinned);

  /* Ekranda turgan sahifa. Pleyer indeksidan orqada qoladi: eski sahifa
     so'nib ulgurishi kerak. */
  const [shown, setShown] = useState(index);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (index === shown) return undefined;
    setLeaving(true);
    const id = window.setTimeout(() => {
      setShown(index);
      setLeaving(false);
    }, FADE_OUT_MS);
    return () => window.clearTimeout(id);
  }, [index, shown]);

  const current = playlist[shown];
  const mode = current?.type ?? 'intro';
  /* So'nayotgan sahifada karusel va soat to'xtaydi — behuda ish qilinmasin */
  const active = !leaving && isPlaying;

  function renderSlide(item: SignageSlide) {
    switch (item.type) {
      case 'intro':
        return <IntroSlide active={active} />;
      case 'books':
        return <BooksSlide active={active} />;
      case 'events':
        return <EventsSlide active={active} />;
      case 'ambient':
        return <AmbientSlide />;
      case 'video':
        return <VideoSlide src={item.src} active={active} onFinished={next} />;
      default:
        return null;
    }
  }

  return (
    <>
      <SignageBackdrop mode={mode} />

      <SignageBoundary onRecover={reset} fallbackTitle={t.libraryName.join(' ')}>
        {current && (
          <main
            /* key — sahifa almashganda kirish animatsiyasi qaytadan boshlanadi */
            key={shown}
            className={`sg-stage sg-stage--${mode}${leaving ? ' is-leaving' : ''}`}
          >
            {renderSlide(current)}
          </main>
        )}
      </SignageBoundary>

      <ProgressIndicator count={playlist.length} index={index} duration={slide?.duration} />
    </>
  );
}

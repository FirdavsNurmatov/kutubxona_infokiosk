import {
  useCallback, useEffect, useMemo, useRef, useState, type ComponentProps,
} from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { EncyclopediaEntry } from '../../api/types';
import { useText } from '../../i18n';

/*
 * Nodir nashrlarni varaqlash oynasi.
 *
 * Ilgari bu yerda oddiy `<img>` va ikkita strelka turardi — nodir fond
 * uchun bu juda quruq ko'rinardi. Endi StPageFlip (react-pageflip) ustida
 * haqiqiy kitob: varaq burchagidan tortiladi, soya bilan ag'dariladi.
 *
 * Sahna o'lchami qotib qolmaydi: modul kiosk (1080x1920) da ham,
 * kengroq stol ekranida ham bir xil ishlashi kerak, shuning uchun kitob
 * o'lchami konteynerdan va varaqning haqiqiy nisbatidan hisoblanadi.
 */

type FlipProps = ComponentProps<typeof HTMLFlipBook>;

/** StPageFlip barcha sozlamalarni majburiy deb e'lon qilgan — bir joyda beriladi. */
const FLIP_BASE: Omit<FlipProps, 'width' | 'height' | 'children' | 'className' | 'style'> = {
  startPage: 0,
  size: 'fixed',
  minWidth: 120,
  maxWidth: 1600,
  minHeight: 160,
  maxHeight: 2200,
  drawShadow: true,
  flippingTime: 750,
  /* Tor sahnada (yoki gorizontal skanerlarda) kitob bitta varaqqa o'tadi. */
  usePortrait: true,
  startZIndex: 0,
  autoSize: false,
  maxShadowOpacity: 0.5,
  /* Birinchi va oxirgi varaq — muqova: qattiq, bukilmaydi. */
  showCover: true,
  mobileScrollSupport: false,
  clickEventForward: false,
  useMouseEvents: true,
  swipeDistance: 30,
  showPageCorners: true,
  disableFlipByClick: false,
};

/** `react-pageflip` ref'i — kutubxona uni `any` deb beradi, kerakligi shu qadar. */
interface FlipApi {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
  } | undefined;
}

export interface BookReaderProps {
  entry: EncyclopediaEntry;
  onClose: () => void;
}

export default function BookReader({ entry, onClose }: BookReaderProps) {
  const { s, tr } = useText();
  const pages = useMemo(() => entry.pages ?? [entry.image], [entry]);

  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<FlipApi | null>(null);

  const [box, setBox] = useState({ w: 0, h: 0 });
  /* Varaqning balandlik/kenglik nisbati — birinchi skanerdan o'lchanadi. */
  const [ratio, setRatio] = useState(0);
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(0);

  /* Sahna o'lchami — kiosk portretida ham, stol ekranining gorizontalida ham. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Nashrlar turlicha: qo'lyozma tik, albom va atlas gorizontal. Nisbat
     o'rtadagi varaqdan olinadi — muqova ko'pincha kitobning o'zidan
     boshqacha o'lchamda skanerlangan (atlasda tik muqova, keng xaritalar). */
  useEffect(() => {
    setRatio(0);
    setPage(0);
    let alive = true;
    const probe = new Image();
    probe.onload = () => {
      if (alive && probe.naturalWidth) setRatio(probe.naturalHeight / probe.naturalWidth);
    };
    probe.src = pages[Math.floor(pages.length / 2)] ?? pages[0];
    return () => { alive = false; };
  }, [pages]);

  const layout = useMemo(() => {
    if (!ratio || !box.w || !box.h) return null;
    /* Balandlik cheklovidagi varaq kengligi. Agar juft ochilganda ham varaq
       shundan kichraymasa — kitob ikki betlab ochiladi (keng, gorizontal
       ekran). Kiosk portretida esa juftlash varaqni ikki barobar kichraytirar
       va ekranning yarmi bo'sh qolar edi, shuning uchun bitta varaq. */
    const fit = box.h / ratio;
    const columns = fit <= box.w / 2 ? 2 : 1;
    const width = Math.floor(Math.min(box.w / columns, fit));
    return { columns, width, height: Math.round(width * ratio) };
  }, [ratio, box.w, box.h]);

  const flip = useCallback((dir: 1 | -1) => {
    const api = bookRef.current?.pageFlip();
    if (dir === 1) api?.flipNext();
    else api?.flipPrev();
  }, []);

  const jump = useCallback((to: number) => {
    bookRef.current?.pageFlip()?.turnToPage(to);
    setPage(to);
  }, []);

  const last = pages.length - 1;
  /* Juft ochilganda o'ngdagi varaq ham ko'rinib turadi. */
  const shown = layout && layout.columns === 2 && page > 0 && page < last
    ? [page, Math.min(page + 1, last)]
    : [page];

  return (
    <div className="mr-reader">
      <div className="mr-reader-top">
        <span className="mr-reader-title">
          <b>{tr(entry.name)}</b>
          <small>{tr(entry.subtitle)}</small>
        </span>
        <button className="enc-arrow if-tap" onClick={() => setZoom(1)} aria-label={s('zoomIn')}>
          <ZoomIn size={26} />
        </button>
        <button className="enc-arrow if-tap" onClick={onClose} aria-label={s('close')}>
          <X size={28} />
        </button>
      </div>

      <div className="mr-desk">
        <div className="mr-stage" ref={stageRef}>
          {layout && (
            <div
              className="mr-book"
              style={{ width: layout.width * layout.columns, height: layout.height }}
            >
              <HTMLFlipBook
                /* O'lcham o'zgarsa StPageFlip qaytadan quriladi — u
                   sozlamalarni faqat yaratilganda o'qiydi. */
                key={`${entry.id}-${layout.width}x${layout.height}`}
                ref={bookRef}
                className="mr-flip"
                style={{}}
                width={layout.width}
                height={layout.height}
                onFlip={(e: { data: number }) => setPage(e.data)}
                {...FLIP_BASE}
              >
                {pages.map((src, i) => (
                  <div className="mr-leaf" key={src}>
                    <img
                      src={src}
                      alt=""
                      draggable={false}
                      loading={i < 4 ? 'eager' : 'lazy'}
                    />
                    <span className="mr-leaf-no">{i + 1}</span>
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          )}
        </div>
        <p className="mr-hint">{s('flipHint')}</p>
      </div>

      <div className="mr-reader-bar">
        <button
          className="enc-arrow if-tap"
          onClick={() => flip(-1)}
          disabled={page === 0}
          aria-label={s('prev')}
        >
          <ChevronLeft size={30} />
        </button>

        <div className="mr-seek">
          <b>{s('page')} {shown.map((p) => p + 1).join('–')} / {pages.length}</b>
          <input
            type="range"
            min={0}
            max={last}
            value={page}
            onChange={(e) => jump(Number(e.target.value))}
            aria-label={s('page')}
          />
        </div>

        <button
          className="enc-arrow if-tap"
          onClick={() => flip(1)}
          disabled={page >= last}
          aria-label={s('next')}
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {zoom > 0 && (
        <div className="mr-zoom">
          <div className="mr-zoom-top">
            <b>{s('page')} {shown.map((p) => p + 1).join('–')}</b>
            <button
              className="enc-arrow if-tap"
              onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
              disabled={zoom <= 1}
              aria-label={s('zoomOut')}
            >
              <ZoomOut size={26} />
            </button>
            <button
              className="enc-arrow if-tap"
              onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
              disabled={zoom >= 3}
              aria-label={s('zoomIn')}
            >
              <ZoomIn size={26} />
            </button>
            <button className="enc-arrow if-tap" onClick={() => setZoom(0)} aria-label={s('close')}>
              <X size={28} />
            </button>
          </div>
          {/* Kattalashtirilgan varaq — qolgan qismi surib ko'riladi. */}
          <div className="mr-zoom-scroll">
            <div className="mr-zoom-inner" style={{ width: `${zoom * 100}%` }}>
              {shown.map((p) => <img key={pages[p]} src={pages[p]} alt="" draggable={false} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

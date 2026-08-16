/**
 * Havodagi mayda chang zarrachalari (INTRO sahifasi uchun).
 *
 * Bu "effekt" emas, atmosfera: bino oldida yorug'likda ko'rinib qoladigan
 * chang. Har bir zarracha o'z tezligi, o'lchami, chuqurligi va umriga ega,
 * shuning uchun ular hech qachon birga paydo bo'lib, birga yo'qolmaydi —
 * tomoshabin "animatsiya boshlandi va tugadi" degan hissiyotni sezmasligi
 * kerak.
 *
 * Zichlik ataylab past: bulut emas, ayrim uchqunlar.
 */

import { makeGlowSprite, TONE_RGB } from './sprites';

/** Sifat bosqichi bo'yicha zarrachalar soni. */
const DUST_COUNT = [78, 56, 34];
/** Chizish buferining maksimal kengligi — 4K panelda fill-rate cheklanadi. */
const MAX_BACKING_WIDTH = 2400;

interface Mote {
  /** Ekran ulushi (0…1). */
  x: number;
  y: number;
  /** Ulush/sekundda: yuqoriga sekin ko'tariladi. */
  vy: number;
  /** Gorizontal tebranish. */
  swayAmp: number;
  swayFreq: number;
  phase: number;
  size: number;
  /** 0 — uzoq va xira, 1 — yaqin va yorqinroq. */
  depth: number;
  alpha: number;
  life: number;
  maxLife: number;
  warm: boolean;
}

export interface DustField {
  /** GSAP shu qiymatni sekin o'zgartirib turadi. */
  readonly levels: { dust: number };
  step(dt: number): void;
  renderStill(): void;
  resize(): void;
  destroy(): void;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function createDustField(canvas: HTMLCanvasElement): DustField {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    return {
      levels: { dust: 1 },
      step: () => {},
      renderStill: () => {},
      resize: () => {},
      destroy: () => {},
    };
  }

  const levels = { dust: 1 };
  const sprite = {
    warm: makeGlowSprite(48, TONE_RGB.gold, 2.6),
    cool: makeGlowSprite(48, [186, 214, 255], 2.6),
  };

  let width = 1;
  let height = 1;
  let dpr = 1;
  let time = 0;
  let quality = 0;
  let motes: Mote[] = [];

  let frameEma = 12;
  let slowFrames = 0;

  /** Zarrachani (qayta) tug'diradi. `fresh` — sahna boshlanishida. */
  function spawn(mote: Mote, fresh: boolean) {
    const depth = rand(0.1, 1);
    mote.depth = depth;
    mote.x = rand(-0.02, 1.02);
    // Boshida zarrachalar butun kadr bo'ylab, keyin faqat pastdan ko'tariladi
    mote.y = fresh ? rand(0.15, 1.05) : rand(0.98, 1.08);
    mote.vy = -(0.006 + depth * 0.016) * rand(0.7, 1.4);
    mote.swayAmp = rand(0.002, 0.011);
    mote.swayFreq = rand(0.05, 0.16);
    mote.phase = Math.random() * Math.PI * 2;
    mote.size = (1.2 + depth * 3.4) * rand(0.8, 1.3);
    mote.alpha = (0.06 + depth * 0.3) * rand(0.5, 1);
    mote.maxLife = rand(6, 20);
    mote.life = fresh ? rand(0.2, 1) * mote.maxLife : mote.maxLife;
    // Ko'pchiligi iliq (bino chiroqlari), ozchiligi salqin (osmon)
    mote.warm = Math.random() < 0.72;
  }

  function build() {
    const count = DUST_COUNT[quality];
    motes = Array.from({ length: count }, () => {
      const mote = {} as Mote;
      spawn(mote, true);
      return mote;
    });
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, rect.width);
    const cssH = Math.max(1, rect.height);
    const capped = Math.min(window.devicePixelRatio || 1, 1.5, MAX_BACKING_WIDTH / cssW);
    dpr = Math.max(0.75, capped);

    width = cssW;
    height = cssH;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function render() {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, width, height);
    ctx!.globalCompositeOperation = 'lighter';

    const level = levels.dust;
    for (let i = 0; i < motes.length; i += 1) {
      const m = motes[i];
      const k = m.life / m.maxLife;
      // Tug'ilishda ochiladi, oxirida so'nadi — chekkalari ko'rinmaydi
      const fade = Math.min(1, (1 - k) * 4) * Math.min(1, k * 3);
      const alpha = m.alpha * fade * level;
      if (alpha <= 0.004) continue;

      const x = (m.x + Math.sin(time * m.swayFreq + m.phase) * m.swayAmp) * width;
      const y = m.y * height;
      const size = m.size * 4.5;

      ctx!.globalAlpha = alpha;
      ctx!.drawImage(m.warm ? sprite.warm : sprite.cool, x - size / 2, y - size / 2, size, size);
    }

    ctx!.globalAlpha = 1;
    ctx!.globalCompositeOperation = 'source-over';
  }

  function step(dt: number) {
    const clamped = Math.min(dt, 0.05);
    time += clamped;

    for (let i = 0; i < motes.length; i += 1) {
      const m = motes[i];
      m.life -= clamped;
      m.y += m.vy * clamped;
      if (m.life <= 0 || m.y < -0.08) spawn(m, false);
    }

    const t0 = performance.now();
    render();
    frameEma = frameEma * 0.94 + (performance.now() - t0) * 0.06;

    if (frameEma > 5) {
      slowFrames += 1;
      if (slowFrames > 240 && quality < 2) {
        slowFrames = 0;
        frameEma = 3;
        quality += 1;
        build();
      }
    } else if (slowFrames > 0) {
      slowFrames -= 1;
    }
  }

  resize();
  build();

  return {
    levels,
    step,
    renderStill() {
      time = 6;
      render();
    },
    resize,
    destroy() {
      motes = [];
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}

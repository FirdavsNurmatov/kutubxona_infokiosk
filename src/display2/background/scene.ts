/**
 * Canvas sahna — fon animatsiyasining "og'ir" qismi.
 *
 * Nega canvas? Ekranda bir vaqtning o'zida ~700 ta yorug'lik nuqtasi harakat
 * qiladi. Ularning har biri DOM elementi bo'lsa, brauzer layout va kompozit
 * bosqichida bo'g'ilib qoladi. Canvas'da esa hammasi bitta elementga, bitta
 * sikl ichida, oldindan tayyorlangan spraytlar orqali chiziladi.
 *
 * Sahna o'zi vaqtni boshqarmaydi: qadamni tashqaridan (GSAP ticker) `step(dt)`
 * chaqiradi. Shu sababli butun fon — DOM va canvas — bitta soatda yuradi.
 */

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TRAIL_PATHS, type TrailPath } from './paths';
import { TONE_RGB, makeGlowSprite, makeLetterSprite, makeStarSprite } from './sprites';

/* ── Sozlamalar ─────────────────────────────────────────────── */

/** Chizish buferining maksimal kengligi. 4K ekranda ham fill-rate cheklanadi. */
const MAX_BACKING_WIDTH = 2560;
/** Bitta zarrachaning izidagi namunalar soni (sifat pasayganda kamayadi). */
const TRAIL_SAMPLES = [5, 4, 3];
/** Yulduzlar soni sifat bosqichi bo'yicha. */
const STAR_COUNT = [150, 110, 70];
/** Suzuvchi harflar soni. Ataylab kam — bu bezak emas, bilim parchalari. */
const LETTER_COUNT = [13, 9, 6];
/** Poldagi yaltirash chiziqlari soni. */
const SHIMMER_COUNT = [10, 7, 5];
/** Kitobdan ko'tariladigan uchqunlar chegarasi. */
const SPARK_LIMIT = [70, 50, 32];
/** Sekundiga tug'iladigan uchqunlar. */
const SPARK_RATE = [16, 12, 8];

/**
 * Ochiq kitobning markazi (0…1 dagi ekran koordinatasi).
 *
 * AMBIENT sahifasida kitob rasmi butun ekranni egallaydi va uning sahifa
 * o'rtasi shu nuqtaga to'g'ri keladi — uchqunlar aynan shu yerdan ko'tariladi.
 */
const BOOK_ORIGIN = { x: 0.5, y: 0.67 };

/* ── Zarracha turlari ───────────────────────────────────────── */

interface Star {
  x: number;
  y: number;
  size: number;
  base: number;
  phase: number;
  twinkle: number;
  depth: number;
}

interface TrailParticle {
  /** TRAIL_PATHS indeksi. */
  path: number;
  /** Yo'l bo'ylab holat (0…1). */
  p: number;
  speed: number;
  /** Yo'ldan perpendikulyar siljish (piksel). */
  off: number;
  size: number;
  /** Yorqin "yadro" zarrachasimi. */
  hot: boolean;
  phase: number;
  fade: number;
}

interface Letter {
  /** Ekran ulushi (0…1). */
  x: number;
  y: number;
  /** Ulush/sekundda — kitobdan yuqoriga sekin ko'tariladi. */
  vx: number;
  vy: number;
  size: number;
  rot: number;
  rotSpeed: number;
  /** Yon tomonga yengil tebranish. */
  swayAmp: number;
  swayFreq: number;
  phase: number;
  /** Eng yuqori shaffoflik — juda past. */
  alpha: number;
  life: number;
  maxLife: number;
}

/** Kitob markazidagi kamdan-kam uchraydigan yorqin chaqnash. */
interface Flare {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
}

/** Pol bo'ylab sekin suriladigan yaltirash. */
interface Shimmer {
  x: number;
  y: number;
  width: number;
  speed: number;
  phase: number;
  alpha: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hot: boolean;
  /** Oltin ustunlik qiladi, oq va ko'k — kamroq. */
  tone: 'gold' | 'white' | 'blue';
}

/** GSAP shu qiymatlarni sekin o'zgartirib turadi — sahna "nafas oladi". */
export interface SceneLevels {
  trails: number;
  stars: number;
  letters: number;
  sparks: number;
  /**
   * Umumiy kuchaytirgich. "Nafas" timeline'lari yuqoridagi qatlamlarni
   * o'zgartiradi, bu esa ulardan mustaqil: AMBIENT bo'limida butun sahna
   * yorishadi, ma'lumotli bo'limlarda esa orqa fonga chekinadi.
   */
  boost: number;
}

export interface SceneEngine {
  readonly levels: SceneLevels;
  /** Bir kadr oldinga (dt — sekundlarda). */
  step(dt: number): void;
  /** Harakatsiz rejim uchun bitta kadr. */
  renderStill(): void;
  resize(): void;
  destroy(): void;
}

/* ── Yordamchilar ───────────────────────────────────────────── */

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

type RawPath = ReturnType<typeof MotionPathPlugin.getRawPath>;
interface PathSample {
  x: number;
  y: number;
  angle: number;
}

/** Yo'lni bir marta o'lchab keshlaydi — keyin har namuna arzon lerp bo'ladi. */
function prepareRawPath(d: string): RawPath {
  const raw = MotionPathPlugin.getRawPath(d);
  MotionPathPlugin.cacheRawPathMeasurements(raw, 12);
  return raw;
}

/* ── Sahna ──────────────────────────────────────────────────── */

export function createScene(canvas: HTMLCanvasElement): SceneEngine {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    // Canvas mavjud bo'lmasa fon oddiy rasm sifatida qoladi — bu jiddiy xato emas
    return {
      levels: { trails: 1, stars: 1, letters: 1, sparks: 1, boost: 1 },
      step: () => {},
      renderStill: () => {},
      resize: () => {},
      destroy: () => {},
    };
  }

  const levels: SceneLevels = { trails: 1, stars: 1, letters: 1, sparks: 1, boost: 1 };

  /* Spraytlar — bir marta tayyorlanadi */
  const sprite = {
    gold: makeGlowSprite(64, TONE_RGB.gold),
    goldHot: makeGlowSprite(64, TONE_RGB.goldHot, 1.7),
    blue: makeGlowSprite(64, TONE_RGB.blue),
    blueHot: makeGlowSprite(64, TONE_RGB.blueHot, 1.7),
    star: makeStarSprite(32, [214, 232, 255]),
    starWarm: makeStarSprite(32, TONE_RGB.gold),
    letter: makeLetterSprite('R', 72, TONE_RGB.gold),
  };

  const rawPaths: RawPath[] = TRAIL_PATHS.map((p) => prepareRawPath(p.d));

  /* Holat */
  let width = 1;
  let height = 1;
  let dpr = 1;
  let time = 0;
  let quality = 0;
  let sparkDebt = 0;
  /* Qatlamlar orasidagi siljish. Sichqoncha emas — o'ta sekin avtonom
     tebranish: kadr "tirik" tuyuladi, lekin harakat sezilmaydi. */
  const drift = { x: 0, y: 0 };

  let stars: Star[] = [];
  let trails: TrailParticle[] = [];
  let letters: Letter[] = [];
  let shimmer: Shimmer[] = [];
  const sparks: Spark[] = [];
  const flares: Flare[] = [];
  /** Keyingi chaqnashgacha qolgan vaqt (sekund) — 5…15 s oralig'ida. */
  let nextFlare = 6;

  /* Kadr vaqtini kuzatish — sekinlashsa sifat bosqichi pasayadi */
  let frameEma = 16;
  let slowFrames = 0;

  /* ── Pool qurish ─────────────────────────────────────────── */

  function buildStars() {
    const count = STAR_COUNT[quality];
    stars = Array.from({ length: count }, () => {
      // Yulduzlar osmonda — pastda kitobning nuri hukmron
      const y = Math.pow(Math.random(), 1.7) * 0.5;
      return {
        x: Math.random(),
        y,
        size: rand(1.1, 2.6),
        base: rand(0.25, 0.9),
        phase: Math.random() * Math.PI * 2,
        twinkle: rand(0.15, 0.55),
        depth: rand(0.05, 0.25),
      };
    });
  }

  function buildTrails() {
    const scale = [1, 0.72, 0.5][quality];
    const next: TrailParticle[] = [];
    TRAIL_PATHS.forEach((path, index) => {
      const count = Math.max(3, Math.round(path.density * scale));
      for (let i = 0; i < count; i += 1) {
        const hot = Math.random() < 0.22;
        next.push({
          path: index,
          // Boshlang'ich holat teng taqsimlanadi — "poyezd" effekti bo'lmasin
          p: (i + Math.random() * 0.6) / count,
          speed: path.speed * rand(0.55, 1.7),
          off: rand(-9, 9),
          size: hot ? rand(9, 16) : rand(4, 9),
          hot,
          phase: Math.random() * Math.PI * 2,
          fade: rand(0.6, 1),
        });
      }
    });
    trails = next;
  }

  /**
   * Harfni (qayta) tug'diradi: u kitob yonidan chiqib, sekin yuqoriga
   * ko'tariladi va so'nadi. `fresh` — sahna endi ochilganda, harflar butun
   * kadr bo'ylab tarqoq bo'lishi uchun.
   */
  function spawnLetter(letter: Letter, fresh: boolean) {
    const depth = rand(0.15, 1);
    const side = Math.random() < 0.5 ? -1 : 1;

    letter.x = 0.5 + side * rand(0.02, 0.26);
    letter.y = fresh ? rand(0.16, BOOK_ORIGIN.y) : BOOK_ORIGIN.y - rand(0, 0.04);
    letter.vx = side * rand(0.0015, 0.006);
    letter.vy = -rand(0.008, 0.021);
    letter.size = 11 + depth * 22;
    letter.rot = rand(-0.14, 0.14);
    letter.rotSpeed = rand(-0.03, 0.03);
    letter.swayAmp = rand(0.002, 0.009);
    letter.swayFreq = rand(0.05, 0.14);
    letter.phase = Math.random() * Math.PI * 2;
    letter.alpha = 0.03 + depth * 0.075;
    letter.maxLife = rand(8, 16);
    letter.life = fresh ? rand(0.15, 1) * letter.maxLife : letter.maxLife;
  }

  function buildLetters() {
    const count = LETTER_COUNT[quality];
    letters = Array.from({ length: count }, () => {
      const letter = {} as Letter;
      spawnLetter(letter, true);
      return letter;
    });
  }

  function buildShimmer() {
    const count = SHIMMER_COUNT[quality];
    shimmer = Array.from({ length: count }, () => ({
      x: rand(0.12, 0.88),
      // Kitob ostidagi yaltiroq pol
      y: rand(0.78, 0.95),
      width: rand(0.05, 0.18),
      speed: rand(-0.008, 0.008),
      phase: Math.random() * Math.PI * 2,
      alpha: rand(0.05, 0.16),
    }));
  }

  function buildAll() {
    buildStars();
    buildTrails();
    buildLetters();
    buildShimmer();
    sparks.length = 0;
    flares.length = 0;
    nextFlare = rand(4, 10);
  }

  function degrade() {
    if (quality >= 2) return;
    quality += 1;
    buildAll();
  }

  /* ── O'lcham ─────────────────────────────────────────────── */

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, rect.width);
    const cssH = Math.max(1, rect.height);

    // Katta ekranda buferni cheklaymiz: yog'du uchun aniqlik shart emas,
    // fill-rate esa to'g'ridan-to'g'ri FPS ga ta'sir qiladi.
    const capped = Math.min(window.devicePixelRatio || 1, 1.5, MAX_BACKING_WIDTH / cssW);
    dpr = Math.max(0.75, capped);

    width = cssW;
    height = cssH;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ── Yo'ldan namuna olish ────────────────────────────────── */

  const sampleOut: PathSample = { x: 0, y: 0, angle: 0 };

  function samplePath(index: number, progress: number, withAngle: boolean): PathSample {
    let p = progress % 1;
    if (p < 0) p += 1;
    const point = MotionPathPlugin.getPositionOnPath(rawPaths[index], p, withAngle) as {
      x: number;
      y: number;
      angle?: number;
    };
    sampleOut.x = (point.x / 1000) * width;
    sampleOut.y = (point.y / 1000) * height;
    sampleOut.angle = point.angle ?? 0;
    return sampleOut;
  }

  /* ── Chizish ─────────────────────────────────────────────── */

  function drawSprite(img: HTMLCanvasElement, x: number, y: number, size: number, alpha: number) {
    if (alpha <= 0.004 || size <= 0.3) return;
    ctx!.globalAlpha = alpha;
    const half = size / 2;
    ctx!.drawImage(img, x - half, y - half, size, size);
  }

  function drawStars(parallaxX: number, parallaxY: number) {
    const level = levels.stars * levels.boost;
    if (level <= 0.01) return;
    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i];
      const tw = 0.65 + 0.35 * Math.sin(time * s.twinkle * 2.2 + s.phase);
      drawSprite(
        i % 7 === 0 ? sprite.starWarm : sprite.star,
        s.x * width + parallaxX * s.depth,
        s.y * height + parallaxY * s.depth,
        s.size * 3.6,
        s.base * tw * level * 0.55,
      );
    }
  }

  function drawTrails(parallaxX: number, parallaxY: number) {
    const level = levels.trails * levels.boost;
    if (level <= 0.01) return;
    const samples = TRAIL_SAMPLES[quality];

    for (let i = 0; i < trails.length; i += 1) {
      const t = trails[i];
      const path: TrailPath = TRAIL_PATHS[t.path];

      const head = samplePath(t.path, t.p, true);
      const rad = (head.angle * Math.PI) / 180;
      // Perpendikulyar siljish — zarrachalar bitta chiziqqa yopishmasin
      const nx = -Math.sin(rad) * t.off;
      const ny = Math.cos(rad) * t.off;
      const px = parallaxX * path.depth;
      const py = parallaxY * path.depth;

      // Sekin so'nib-yonish: har zarracha o'z ritmida
      const pulse = 0.55 + 0.45 * Math.sin(time * 0.6 + t.phase);
      const alpha = pulse * t.fade * path.intensity * level;

      const glow = path.tone === 'gold' ? sprite.gold : sprite.blue;
      const core = path.tone === 'gold' ? sprite.goldHot : sprite.blueHot;

      // Iz: bosh nuqtadan orqaga qarab so'nib boradigan namunalar
      for (let s = samples; s >= 1; s -= 1) {
        const back = samplePath(t.path, t.p - s * 0.006, false);
        const k = 1 - s / (samples + 1);
        drawSprite(
          glow,
          back.x + nx + px,
          back.y + ny + py,
          t.size * (0.45 + k * 0.75),
          alpha * k * k * 0.42,
        );
      }

      drawSprite(glow, head.x + nx + px, head.y + ny + py, t.size * 1.9, alpha * 0.5);
      if (t.hot) {
        drawSprite(core, head.x + nx + px, head.y + ny + py, t.size * 0.55, alpha * 0.9);
      }
    }
  }

  function stepLetters(dt: number) {
    for (let i = 0; i < letters.length; i += 1) {
      const l = letters[i];
      l.life -= dt;
      l.x += l.vx * dt;
      l.y += l.vy * dt;
      l.rot += l.rotSpeed * dt;
      if (l.life <= 0 || l.y < 0.06) spawnLetter(l, false);
    }
  }

  function drawLetters(driftX: number, driftY: number) {
    const level = levels.letters * levels.boost;
    if (level <= 0.01) return;

    for (let i = 0; i < letters.length; i += 1) {
      const l = letters[i];
      const k = l.life / l.maxLife;
      // Yumshoq ochilish va so'nish — harf hech qachon "yoqilmaydi"
      const fade = Math.min(1, (1 - k) * 3.5) * Math.min(1, k * 2.5);
      const alpha = l.alpha * fade * level;
      if (alpha <= 0.004) continue;

      const x = (l.x + Math.sin(time * l.swayFreq + l.phase) * l.swayAmp) * width + driftX;
      const y = l.y * height + driftY;
      const size = l.size;

      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(l.rot);
      ctx!.globalAlpha = alpha;
      ctx!.drawImage(sprite.letter, -size, -size, size * 2, size * 2);
      ctx!.restore();
    }
  }

  /* Poldagi yaltirash: kitob va nurning aksi sekin qimirlaydi */
  function drawShimmer() {
    const level = levels.trails * levels.boost;
    if (level <= 0.01) return;

    for (let i = 0; i < shimmer.length; i += 1) {
      const sh = shimmer[i];
      const pulse = 0.4 + 0.6 * Math.sin(time * 0.23 + sh.phase);
      const alpha = sh.alpha * pulse * level;
      if (alpha <= 0.004) continue;

      const x = ((sh.x + time * sh.speed) % 1.2) * width;
      const w = sh.width * width;
      drawSprite(sprite.gold, x, sh.y * height, w, alpha * 0.35);
    }
  }

  function emitSparks(dt: number) {
    const level = levels.sparks * levels.boost;
    const limit = SPARK_LIMIT[quality];
    sparkDebt += SPARK_RATE[quality] * level * dt;

    while (sparkDebt >= 1 && sparks.length < limit) {
      sparkDebt -= 1;
      // Kitob markazidan yuqoriga va yon tomonlarga yelpig'ich shaklida
      const spread = rand(-1, 1);
      const life = rand(4, 9);
      sparks.push({
        x: BOOK_ORIGIN.x * width + spread * width * 0.055,
        y: BOOK_ORIGIN.y * height + rand(-6, 8),
        vx: spread * rand(10, 34),
        vy: -rand(20, 56),
        life,
        maxLife: life,
        size: rand(2.5, 7),
        hot: Math.random() < 0.3,
        // Oltin ustunlik qiladi; oq va ko'k zarrachalar kadrga sovuqlik beradi
        tone: Math.random() < 0.62 ? 'gold' : Math.random() < 0.6 ? 'white' : 'blue',
      });
    }
    if (sparkDebt > 4) sparkDebt = 4;
  }

  function stepSparks(dt: number) {
    for (let i = sparks.length - 1; i >= 0; i -= 1) {
      const s = sparks[i];
      s.life -= dt;
      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      // Ko'tarilgan sari sekinlashadi — havoda erigandek
      s.vy *= 1 - 0.32 * dt;
      s.vx *= 1 - 0.2 * dt;
    }
  }

  function drawSparks(parallaxX: number, parallaxY: number) {
    const level = levels.sparks * levels.boost;
    if (level <= 0.01) return;
    for (let i = 0; i < sparks.length; i += 1) {
      const s = sparks[i];
      const k = s.life / s.maxLife;
      // Tug'ilishda ochiladi, oxirida asta so'nadi
      const alpha = Math.min(1, (1 - k) * 6) * k * k * level;
      const x = s.x + parallaxX * 0.95;
      const y = s.y + parallaxY * 0.95;
      const halo =
        s.tone === 'blue' ? sprite.blue : s.tone === 'white' ? sprite.star : sprite.gold;
      const core =
        s.tone === 'blue' ? sprite.blueHot : s.tone === 'white' ? sprite.star : sprite.goldHot;

      drawSprite(halo, x, y, s.size * 4.5, alpha * 0.5);
      if (s.hot) drawSprite(core, x, y, s.size * 1.2, alpha * 0.85);
    }
  }

  /* ── Kamdan-kam chaqnash (5…15 sekundda bir marta) ───────── */

  function stepFlares(dt: number) {
    nextFlare -= dt * levels.sparks * levels.boost;
    if (nextFlare <= 0) {
      nextFlare = rand(5, 15);
      flares.push({
        x: BOOK_ORIGIN.x * width + rand(-0.06, 0.06) * width,
        y: BOOK_ORIGIN.y * height + rand(-0.03, 0.01) * height,
        life: 1.4,
        maxLife: 1.4,
        size: rand(9, 18),
      });
    }

    for (let i = flares.length - 1; i >= 0; i -= 1) {
      flares[i].life -= dt;
      if (flares[i].life <= 0) flares.splice(i, 1);
    }
  }

  function drawFlares() {
    const level = levels.sparks * levels.boost;
    for (let i = 0; i < flares.length; i += 1) {
      const f = flares[i];
      const k = f.life / f.maxLife;
      // Tez ochiladi, sekin so'nadi — "chaqnash", "portlash" emas
      const alpha = Math.min(1, (1 - k) * 8) * k * k * level;
      drawSprite(sprite.gold, f.x, f.y, f.size * 6, alpha * 0.4);
      drawSprite(sprite.goldHot, f.x, f.y, f.size * 1.6, alpha * 0.8);
    }
  }

  function render() {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, width, height);

    // Additive rejim: yorug'lik qatlamlari bir-birining ustiga qo'shiladi
    ctx!.globalCompositeOperation = 'lighter';

    const px = drift.x;
    const py = drift.y;

    // Chuqurlik tartibi: uzoqdan yaqinga
    drawStars(px * 3, py * 2);
    drawShimmer();
    drawLetters(px * 7, py * 5);
    drawTrails(px * 10, py * 7);
    drawSparks(px * 12, py * 8);
    drawFlares();

    ctx!.globalAlpha = 1;
    ctx!.globalCompositeOperation = 'source-over';
  }

  /* ── Ommaviy API ─────────────────────────────────────────── */

  function step(dt: number) {
    const clamped = Math.min(dt, 0.05); // fon yorlig'idan qaytganda sakrab ketmasin
    time += clamped;

    // Qatlamlar bir-biriga nisbatan o'ta sekin suriladi (~2 daqiqalik davr)
    drift.x = Math.sin(time * 0.052) * 0.6;
    drift.y = Math.cos(time * 0.037) * 0.35;

    for (let i = 0; i < trails.length; i += 1) {
      const t = trails[i];
      t.p += t.speed * clamped;
      if (t.p > 1) t.p -= 1;
    }

    stepLetters(clamped);
    emitSparks(clamped);
    stepSparks(clamped);
    stepFlares(clamped);

    const t0 = performance.now();
    render();
    frameEma = frameEma * 0.94 + (performance.now() - t0) * 0.06;

    // Chizish 9 ms dan oshib ketsa (60 FPS byudjetining yarmi) — sifatni pasaytiramiz
    if (frameEma > 9) {
      slowFrames += 1;
      if (slowFrames > 240) {
        slowFrames = 0;
        frameEma = 5;
        degrade();
      }
    } else if (slowFrames > 0) {
      slowFrames -= 1;
    }
  }

  function renderStill() {
    // Harakat kamaytirilgan rejim: bitta "chiroyli" kadr
    time = 8;
    stepLetters(0.5);
    emitSparks(2.5);
    stepSparks(1.6);
    render();
  }

  function destroy() {
    stars = [];
    trails = [];
    letters = [];
    shimmer = [];
    sparks.length = 0;
    flares.length = 0;
    ctx!.setTransform(1, 0, 0, 1, 0, 0);
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
  }

  resize();
  buildAll();

  return {
    levels,
    step,
    renderStill,
    resize() {
      resize();
    },
    destroy,
  };
}

/** Sinovdan o'tkazish qulay bo'lsin uchun tashqariga chiqarilgan yordamchilar. */
export const __testing = { rand, randInt };

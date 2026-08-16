/**
 * Particle Waves — WebGL to'lqin maydoni.
 *
 * OpenBackgrounds loyihasidagi `app/components/bg/ParticleWaves.vue` ning
 * React/TypeScript ga moslashtirilgan varianti (MIT):
 * https://github.com/osamatech786/openbackgrounds
 *
 * Asl mantiq saqlangan: nuqtalar to'ri, perspektiv kamera, vertex shader'da
 * hisoblanadigan to'lqin va additive yog'du. Kutubxona ekrani uchun
 * o'zgartirilgan joylar:
 *
 *   • sichqoncha/teginish bilan boshqarish butunlay olib tashlangan — bu
 *     interaktiv sayt emas, axborot ekrani;
 *   • uning o'rniga kameraning o'ta sekin, avtonom tebranishi qo'shilgan;
 *   • palitra Milliy kutubxona ranglariga o'tkazilgan (ko'k asosiy, oltin kam);
 *   • markaz tinchroq (matn va muqovalar uchun bo'sh joy);
 *   • 4K va ultra-keng panellar uchun chizish buferi cheklangan;
 *   • bo'lim almashganda sozlamalar sakramasdan bir tekis o'zgaradi.
 */

import { lookAt, multiply, perspective } from './matrix';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './shaders';
import type { WavePreset } from './presets';

/* ── Doimiy sozlamalar ──────────────────────────────────────── */

const SETTINGS = {
  /** Maydonning bazaviy o'lchami (dunyo birligida). */
  fieldBase: 420,
  /** Nuqtalar orasidagi masofa. Kattaroq qiymat — siyrakroq va tinchroq. */
  step: 12,
  baseHeight: -42,
  fov: 52,
  cameraHeight: 82,
  cameraDistance: 320,
  /* Yog'du kuchi. Asl demoda 3.2 edi — u yerda effekt asosiy qahramon.
     Bu yerda esa fon: yuqori qiymat rangni oqartirib, matnni bosib qo'yadi. */
  glow: 0.55,
  /** Piksel zichligi chegarasi. */
  maxDpr: 1.4,
  /**
   * Chizish buferidagi maksimal piksellar soni. 4K panelda to'liq zichlikda
   * chizish GPU ni behuda band qiladi — yumshoq yog'duli zarrachalar uchun
   * biroz pastroq aniqlik umuman sezilmaydi.
   */
  maxPixels: 2_500_000,
} as const;

/* ── Palitra ────────────────────────────────────────────────── */

/** #087EA4 — chuqur ko'k, asosiy rang. */
const BLUE_DEEP = [0.031, 0.494, 0.643] as const;
/** #12B8E6 — yorqin siyoh-ko'k urg'u. */
const BLUE_BRIGHT = [0.071, 0.722, 0.902] as const;
/** #D9A441 — oltin. */
const GOLD = [0.851, 0.643, 0.255] as const;
/** #F2C75C — yorqin oltin. */
const GOLD_BRIGHT = [0.949, 0.78, 0.361] as const;

/** Oltin zarrachalar ulushi. Ataylab kichik — oltin urg'u bo'lib qolishi kerak. */
const GOLD_SHARE = 0.085;

export interface WaveField {
  /** Bo'lim almashganda chaqiriladi — qiymatlar bir tekis o'zgaradi. */
  setPreset(preset: WavePreset): void;
  /** Video bo'limida chizishni to'xtatadi (GPU bo'shaydi). */
  setPaused(paused: boolean): void;
  destroy(): void;
}

/* ── Yordamchilar ───────────────────────────────────────────── */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Nuqta koordinatasidan barqaror psevdo-tasodifiy son — oltinni tanlash uchun. */
function hash(xi: number, zi: number): number {
  const n = Math.sin(xi * 127.1 + zi * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Zarracha rangi.
 *
 * Asl komponentda palitra siyoh-ko'kdan pushtiga o'tardi; bu yerda esa
 * kutubxona ohangi: ko'k gradient ustiga kam sonli oltin uchqun.
 */
function samplePalette(positionRatio: number, depthRatio: number, seed: number): number[] {
  const t = clamp01(positionRatio);
  const depth = clamp01(depthRatio);

  // Ko'kning ochiq va to'q ohanglari orasidagi yumshoq to'lqin
  const wave = Math.sin((t + depth * 0.65) * Math.PI * 1.5);
  const mixRatio = clamp01(0.3 + 0.35 * (1 - Math.abs(t - 0.5) * 2) + 0.2 * wave);

  const golden = seed < GOLD_SHARE;
  const from = golden ? GOLD : BLUE_DEEP;
  const to = golden ? GOLD_BRIGHT : BLUE_BRIGHT;

  /* Yaqindagi qatorlar so'nadi: ular ekranda katta va zich chiqadi, additive
     aralashuvda esa tez to'yinadi. Uzoqdagilari mayda — ular yorqinroq. */
  const fade = 0.42 + 0.58 * (1 - depth);
  const alpha = clamp01((golden ? 0.3 : 0.4) * (0.3 + 0.7 * (1 - depth)));

  return [
    clamp01(lerp(from[0], to[0], mixRatio) * fade),
    clamp01(lerp(from[1], to[1], mixRatio) * fade),
    clamp01(lerp(from[2], to[2], mixRatio) * fade),
    alpha,
  ];
}

/* ── Maydon ─────────────────────────────────────────────────── */

export function createWaveField(
  holder: HTMLElement,
  initial: WavePreset,
  options: { animate: boolean } = { animate: true },
): WaveField | null {
  /*
     Canvas har safar yangidan yaratiladi va `destroy()` da DOM'dan olib
     tashlanadi. Sababi: yopishda WebGL konteksti ataylab bo'shatiladi
     (`loseContext`), bo'shatilgan kontekstni esa qayta ishlatib bo'lmaydi —
     ya'ni bir xil <canvas> elementiga ikkinchi marta ulanib bo'lmaydi.
     (React StrictMode dev rejimida effektni ikki marta ishga tushiradi.)
  */
  const canvas = document.createElement('canvas');
  holder.appendChild(canvas);

  const removeCanvas = () => canvas.remove();

  /*
     Canvas ataylab shaffof emas (`alpha: false`) va qora rangga tozalanadi.
     Sababi: additive chizishda alfa kanal ham qo'shilib boradi va shaffof
     canvas tezda to'yinib, ostidagi osmonni butunlay yopib qo'yadi — kadr
     oqarib ketadi. Qora canvas esa CSS `mix-blend-mode: screen` orqali
     qo'shiladi: qora joylar hech narsani o'zgartirmaydi, yorug' nuqtalar esa
     fon ustiga qo'shiladi va hech qachon oqdan oshib ketmaydi.
  */
  const gl = (canvas.getContext('webgl', {
    alpha: false,
    antialias: true,
    preserveDrawingBuffer: false,
  }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

  if (!gl) {
    removeCanvas();
    return null;
  }

  /* ── Shader dasturi ──────────────────────────────────────── */

  function compile(type: number, source: string): WebGLShader | null {
    const shader = gl!.createShader(type);
    if (!shader) return null;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      console.error('[ParticleWaves] shader xatosi:', gl!.getShaderInfoLog(shader));
      gl!.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) {
    removeCanvas();
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    removeCanvas();
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('[ParticleWaves] dastur bog\'lanmadi:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    removeCanvas();
    return null;
  }

  gl.useProgram(program);

  const attribs = {
    position: gl.getAttribLocation(program, 'a_position'),
    color: gl.getAttribLocation(program, 'a_color'),
  };

  const uniforms = {
    time: gl.getUniformLocation(program, 'u_time'),
    speed: gl.getUniformLocation(program, 'u_speed'),
    size: gl.getUniformLocation(program, 'u_size'),
    field: gl.getUniformLocation(program, 'u_field'),
    projection: gl.getUniformLocation(program, 'u_projection'),
    glow: gl.getUniformLocation(program, 'u_glow'),
    calm: gl.getUniformLocation(program, 'u_calm'),
    intensity: gl.getUniformLocation(program, 'u_intensity'),
    horizon: gl.getUniformLocation(program, 'u_horizon'),
  };

  const positionBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(attribs.position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attribs.position);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(attribs.color, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attribs.color);

  // Additive aralashtirish — yorug'lik qatlamlari bir-biriga qo'shiladi
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.disable(gl.DEPTH_TEST);

  /* ── Holat ───────────────────────────────────────────────── */

  const matrices = {
    projection: new Float32Array(16),
    view: new Float32Array(16),
    viewProjection: new Float32Array(16),
  };
  const fieldUniform = new Float32Array([SETTINGS.fieldBase, initial.amplitude, SETTINGS.fieldBase]);

  const layout = { xCount: 0, zCount: 0, width: 0, depth: 0 };
  let pointCount = 0;

  let holderWidth = 1;
  let holderHeight = 1;
  let pixelRatio = 1;

  let frameId: number | null = null;
  let paused = false;
  let startedAt = performance.now();
  let lastFrame = startedAt;

  // Joriy va maqsad qiymatlar — bo'lim almashganda sakrash bo'lmasligi uchun
  const current: WavePreset = { ...initial };
  let target: WavePreset = { ...initial };

  /* ── To'rni qurish ───────────────────────────────────────── */

  function rebuildGrid() {
    const aspect = holderHeight === 0 ? 1 : holderWidth / holderHeight;
    const baseWidth = SETTINGS.fieldBase * Math.max(1, aspect);
    const step = SETTINGS.step;

    // Maydon ekran nisbatiga qarab kengayadi: ultra-keng panelda tasvir
    // cho'zilmaydi, shunchaki chapga va o'ngga ko'proq to'lqin sig'adi.
    const xSegments = Math.max(24, Math.round(baseWidth / step));
    const zSegments = Math.max(24, Math.round(SETTINGS.fieldBase / step));

    layout.xCount = xSegments + 1;
    layout.zCount = zSegments + 1;
    layout.width = xSegments * step;
    layout.depth = zSegments * step;

    pointCount = layout.xCount * layout.zCount;
    fieldUniform[0] = layout.width;
    fieldUniform[2] = layout.depth;

    const xMin = -layout.width * 0.5;
    const zMin = -layout.depth * 0.5;

    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 4);
    let p = 0;
    let c = 0;

    for (let xi = 0; xi < layout.xCount; xi += 1) {
      const x = xMin + xi * step;
      const t = layout.xCount > 1 ? xi / (layout.xCount - 1) : 0;

      for (let zi = 0; zi < layout.zCount; zi += 1) {
        positions[p++] = x;
        positions[p++] = SETTINGS.baseHeight;
        positions[p++] = zMin + zi * step;

        const depthT = layout.zCount > 1 ? zi / (layout.zCount - 1) : 0;
        const [r, g, b, a] = samplePalette(t, depthT, hash(xi, zi));
        colors[c++] = r;
        colors[c++] = g;
        colors[c++] = b;
        colors[c++] = a;
      }
    }

    gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
    gl!.bufferData(gl!.ARRAY_BUFFER, positions, gl!.STATIC_DRAW);

    gl!.bindBuffer(gl!.ARRAY_BUFFER, colorBuffer);
    gl!.bufferData(gl!.ARRAY_BUFFER, colors, gl!.STATIC_DRAW);
  }

  /* ── O'lcham ─────────────────────────────────────────────── */

  function handleResize() {
    const rect = holder.getBoundingClientRect();
    holderWidth = Math.max(1, rect.width);
    holderHeight = Math.max(1, rect.height);

    const dpr = Math.min(window.devicePixelRatio || 1, SETTINGS.maxDpr);
    // Katta panelda umumiy piksel byudjeti ham cheklanadi
    const budget = Math.sqrt(SETTINGS.maxPixels / (holderWidth * holderHeight));
    pixelRatio = Math.max(0.5, Math.min(dpr, budget));

    const width = Math.floor(holderWidth * pixelRatio);
    const height = Math.floor(holderHeight * pixelRatio);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl!.viewport(0, 0, width, height);
    }

    rebuildGrid();
  }

  /* ── Kadr ────────────────────────────────────────────────── */

  function draw(now: number) {
    const dt = Math.min((now - lastFrame) / 1000, 0.1);
    lastFrame = now;

    // Bo'lim sozlamalari sakramasdan, ~1.5 sekundda yangisiga o'tadi
    const chase = 1 - Math.pow(0.02, dt);
    current.amplitude = lerp(current.amplitude, target.amplitude, chase);
    current.speed = lerp(current.speed, target.speed, chase);
    current.pointSize = lerp(current.pointSize, target.pointSize, chase);
    current.intensity = lerp(current.intensity, target.intensity, chase);
    current.calm = lerp(current.calm, target.calm, chase);
    current.horizon = lerp(current.horizon, target.horizon, chase);

    const elapsed = (now - startedAt) * 0.001;
    const aspect = holderHeight === 0 ? 1 : holderWidth / holderHeight;
    perspective(matrices.projection, (SETTINGS.fov * Math.PI) / 180, aspect, 0.1, 1000);

    /* Sichqoncha o'rniga — kameraning o'ta sekin avtonom tebranishi.
       Bir tebranish ~2 daqiqa: harakat sezilmaydi, lekin kadr "tirik". */
    const sway = Math.sin(elapsed * 0.052);
    const drift = Math.cos(elapsed * 0.037);

    lookAt(
      matrices.view,
      [sway * 16, SETTINGS.cameraHeight + drift * 6, SETTINGS.cameraDistance],
      [sway * 8, SETTINGS.baseHeight, 0],
      [0, 1, 0],
    );
    multiply(matrices.viewProjection, matrices.projection, matrices.view);

    fieldUniform[1] = current.amplitude;

    gl!.clearColor(0, 0, 0, 1);
    gl!.clear(gl!.COLOR_BUFFER_BIT);

    gl!.uniform1f(uniforms.time, elapsed);
    gl!.uniform1f(uniforms.speed, current.speed);
    /* Nuqta o'lchami masofaga bo'linadi (shader'da), shuning uchun bu yerda
       koeffitsientga ko'paytiriladi — aks holda barcha nuqtalar minimal
       o'lchamda qolib, chuqurlik hissi yo'qoladi. */
    gl!.uniform1f(uniforms.size, current.pointSize * 110 * pixelRatio);
    gl!.uniform3fv(uniforms.field, fieldUniform);
    gl!.uniformMatrix4fv(uniforms.projection, false, matrices.viewProjection);
    gl!.uniform1f(uniforms.glow, SETTINGS.glow);
    gl!.uniform1f(uniforms.calm, current.calm);
    gl!.uniform1f(uniforms.intensity, current.intensity);
    gl!.uniform1f(uniforms.horizon, current.horizon);

    gl!.drawArrays(gl!.POINTS, 0, pointCount);
  }

  function renderFrame(now: number) {
    draw(now);
    frameId = requestAnimationFrame(renderFrame);
  }

  /* ── Ishga tushirish ─────────────────────────────────────── */

  handleResize();

  const resizeObserver =
    typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => handleResize()) : null;
  resizeObserver?.observe(holder);
  window.addEventListener('resize', handleResize, { passive: true });

  if (options.animate) {
    startedAt = performance.now();
    lastFrame = startedAt;
    frameId = requestAnimationFrame(renderFrame);
  } else {
    // Harakat kamaytirilgan rejim: bitta harakatsiz kadr
    Object.assign(current, target);
    draw(performance.now());
  }

  return {
    setPreset(preset) {
      target = { ...preset };
      if (!options.animate) {
        Object.assign(current, target);
        draw(performance.now());
      }
    },

    setPaused(next) {
      if (paused === next) return;
      paused = next;
      if (paused) {
        if (frameId !== null) {
          cancelAnimationFrame(frameId);
          frameId = null;
        }
        gl!.clearColor(0, 0, 0, 1);
        gl!.clear(gl!.COLOR_BUFFER_BIT);
      } else if (options.animate && frameId === null) {
        // To'xtab turgan vaqt animatsiya fazasiga qo'shilmasin
        lastFrame = performance.now();
        frameId = requestAnimationFrame(renderFrame);
      }
    },

    destroy() {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();

      gl!.deleteBuffer(positionBuffer);
      gl!.deleteBuffer(colorBuffer);
      gl!.deleteProgram(program);

      // Kontekstni ataylab bo'shatamiz: ekran sutkalab ishlaganda drayver
      // xotirasi to'planib qolmasligi kerak.
      gl!.getExtension('WEBGL_lose_context')?.loseContext();
      removeCanvas();
    },
  };
}

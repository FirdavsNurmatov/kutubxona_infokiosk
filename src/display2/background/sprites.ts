/**
 * Oldindan chizilgan yorug'lik "spraytlari".
 *
 * Har kadrda radial gradient yasash qimmat: 1000 ga yaqin zarracha uchun bu
 * protsessorni yeb qo'yadi. Shuning uchun gradient bir marta kichik offscreen
 * canvas'ga chiziladi, keyin faqat drawImage() bilan ko'chiriladi — bu GPU
 * uchun arzon va soatlab uzluksiz ishlaganda ham barqaror.
 */

export type RGB = readonly [number, number, number];

/** Oltin va ko'k ohanglar — fon rasmidagi ranglardan olingan. */
export const TONE_RGB = {
  gold: [255, 186, 88] as RGB,
  goldHot: [255, 236, 186] as RGB,
  blue: [96, 172, 255] as RGB,
  blueHot: [190, 226, 255] as RGB,
} as const;

/**
 * Yumshoq nurli nuqta. `falloff` kattaroq bo'lsa yorug'lik markazga
 * ko'proq yig'iladi (yadro yorqin, chetlari tez so'nadi).
 */
export function makeGlowSprite(size: number, rgb: RGB, falloff = 2.2): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) return c;

  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  const [red, green, blue] = rgb;

  // Gradient bosqichlari qo'lda hisoblanadi — tabiiy so'nish uchun daraja qonuni
  for (let i = 0; i <= 12; i += 1) {
    const t = i / 12;
    const alpha = Math.pow(1 - t, falloff);
    g.addColorStop(t, `rgba(${red},${green},${blue},${alpha.toFixed(4)})`);
  }

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

/** Yulduz uchun kichikroq va o'tkirroq nuqta. */
export function makeStarSprite(size: number, rgb: RGB): HTMLCanvasElement {
  return makeGlowSprite(size, rgb, 3.4);
}

/**
 * Kitobdan ko'tariladigan "R" harfi — matn chizish (fillText) har kadrda
 * qimmat bo'lgani uchun harf ham sprayt sifatida bir marta tayyorlanadi.
 * Har bir o'lcham uchun alohida sprayt kerak emas: bitta katta sprayt
 * kichraytirib chiziladi.
 */
export function makeLetterSprite(glyph: string, size: number, rgb: RGB): HTMLCanvasElement {
  const c = document.createElement('canvas');
  const pad = Math.round(size * 0.5);
  c.width = size + pad * 2;
  c.height = size + pad * 2;
  const ctx = c.getContext('2d');
  if (!ctx) return c;

  const cx = c.width / 2;
  const cy = c.height / 2;
  const [red, green, blue] = rgb;

  // Harf ortidagi yumshoq yog'du
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.width / 2);
  g.addColorStop(0, `rgba(${red},${green},${blue},0.30)`);
  g.addColorStop(0.45, `rgba(${red},${green},${blue},0.08)`);
  g.addColorStop(1, `rgba(${red},${green},${blue},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.font = `600 ${size}px Georgia, "Times New Roman", "Liberation Serif", "Noto Serif", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = `rgba(${red},${green},${blue},0.95)`;
  ctx.fillText(glyph, cx, cy + size * 0.03);

  return c;
}

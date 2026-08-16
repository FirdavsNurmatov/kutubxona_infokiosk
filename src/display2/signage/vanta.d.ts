/**
 * Vanta.js ning tip e'lonlari.
 *
 * Paket TypeScript tiplari bilan kelmaydi, shuning uchun bizga kerak bo'lgan
 * qismi shu yerda tavsiflanadi (RINGS effekti va uni tozalash usuli).
 */
declare module 'vanta/dist/vanta.rings.min' {
  export interface VantaEffect {
    destroy(): void;
    resize?(): void;
    /** three.js render qiluvchisi — piksel zichligini cheklash uchun kerak. */
    renderer?: {
      setPixelRatio(value: number): void;
      domElement?: HTMLCanvasElement;
    };
  }

  export interface VantaRingsOptions {
    el: HTMLElement;
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    color?: number;
  }

  const RINGS: (options: VantaRingsOptions) => VantaEffect;
  export default RINGS;
}

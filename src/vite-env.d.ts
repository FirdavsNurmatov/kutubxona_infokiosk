/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Brauzer nusxasi uchun backend manzili (`.env` da). */
  readonly VITE_API_URL?: string;
  /**
   * Variantli build: shu yuza uchungina yig'ilgan (`tools/surfaces.mjs`).
   * Bo'sh yoki yo'q — hamma yuza bitta bundleda (brauzer nusxasi shunday).
   */
  readonly VITE_SURFACE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Electron nusxasida `preload.cjs` shu obyektni ochadi.
 *
 * Brauzerda `window.kiosk` bo'lmaydi — shuning uchun ixtiyoriy. Kod ikkala
 * muhitda ham bir xil ishlashi kerak: brauzerda `.env`, Electron'da esa
 * exe yonidagi `config.json`.
 */
interface KioskBridgeConfig {
  /** Backend manzili. Bo'sh bo'lsa ichki (mock) ma'lumot ishlatiladi. */
  readonly apiUrl?: string;
  /** Ma'lumot necha soniyada bir yangilanadi. */
  readonly apiRefreshSeconds?: number;
  /** So'rov shuncha ms da javob bermasa — bekor qilinadi. */
  readonly apiTimeoutMs?: number;
  /** Pleylistdagi video ovozi bilan ijro etilsinmi (standart: yo'q). */
  readonly videoSound?: boolean;
  readonly debug?: boolean;
  readonly version?: string;
}

interface KioskBridge {
  readonly isElectron: true;
  readonly config: KioskBridgeConfig;
  reload(): void;
  log(level: 'info' | 'warn' | 'error', message: string): void;
  versions(): Promise<{ app: string; electron: string; chrome: string; node: string }>;
}

interface Window {
  readonly kiosk?: KioskBridge;
}

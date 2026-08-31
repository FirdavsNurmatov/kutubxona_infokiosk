/* `surfaces.mjs` uchun tiplar — uni `vite.config.ts` ham import qiladi. */

export interface SurfaceSpec {
  /** `config.json` dagi `route` qiymati. */
  route: string;
  /** SHARED_ASSETS ustiga qo'shiladigan `public/` yo'llari. */
  assets: string[];
  appId: string;
  product: string;
  slug: string;
}

export declare const SHARED_ASSETS: string[];
export declare const SURFACES: Record<string, SurfaceSpec>;
export declare const SURFACE_NAMES: string[];
export declare function requireSurface(name: string): SurfaceSpec & { name: string };

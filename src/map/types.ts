import type { LucideIcon } from 'lucide-react';
import type { Localized } from '../i18n/translations';

/** Xarita bo'limining uchta ko'rinishi. */
export type MapView = 'map' | 'about' | 'rooms';

export type FloorId = 1 | 2;

/** Xona turlari — rang, belgi va ro'yxatdagi filtr shu bo'yicha. */
export type RoomCategory =
  | 'reading'
  | 'collection'
  | 'tech'
  | 'kids'
  | 'service'
  | 'relax'
  | 'facility';

/**
 * Yorliqning rasm ustidagi o'rni — foizda (rasmning o'zi 1672x941).
 * Foiz ishlatiladi, chunki rasm ekran o'lchamiga qarab cho'ziladi.
 */
export interface Hotspot {
  /** Markazi, rasm kengligiga nisbatan %. */
  x: number;
  /** Markazi, rasm balandligiga nisbatan %. */
  y: number;
  /** Bosiladigan maydon kengligi, %. */
  w: number;
  /** Bosiladigan maydon balandligi, %. */
  h: number;
}

export interface Room {
  id: string;
  floor: FloorId;
  category: RoomCategory;
  icon: LucideIcon;
  name: Localized;
  /** Ro'yxat kartochkasi va tooltip uchun bir qatorli izoh. */
  tagline: Localized;
  description: Localized;
  /** O'rinlar soni — xizmat xonalarida bo'lmaydi. */
  seats?: number;
  /** Xonadagi imkoniyatlar (2-3 ta). */
  features?: Localized[];
  /** Kiosk turgan nuqtadan shu xonagacha qisqa yo'l ko'rsatma. */
  directions: Localized;
  hotspot: Hotspot;
}

export interface Floor {
  id: FloorId;
  /** public/ ichidagi 3D plan rasmi. */
  image: string;
  /**
   * Kiosk qurilmasining o'zi turgan joy (foizda, rasmga nisbatan).
   * Faqat kiosk joylashgan qavatda bo'ladi — bosilmaydi, mo'ljal uchun.
   */
  youAreHere?: { x: number; y: number };
  rooms: Room[];
}

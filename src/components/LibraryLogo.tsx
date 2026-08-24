import type { CSSProperties } from 'react';

/**
 * `gold` — kutubxonaning tilla lokapi, to'q fon uchun.
 * `dark`  — to'q kulrang lokap, och fon uchun.
 */
export type LogoVariant = 'gold' | 'dark';

const LOGO_SRC: Record<LogoVariant, string> = {
  gold: '/images/logo-tilla.png',
  dark: '/images/logo.png',
};

interface LibraryLogoProps {
  variant?: LogoVariant;
  className?: string;
  style?: CSSProperties;
}

/**
 * Kutubxonaning rasmiy emblemasi: bino, ochiq kitob va ostidagi nom.
 * Lokapning o'zida nom bor — yoniga nomni yana yozib qo'yish kerak emas.
 * Nisbati 1200x641 (~1.87:1), shuning uchun o'lchamni faqat bir o'q
 * bo'yicha bering, ikkinchisi `auto` qolsin.
 */
export default function LibraryLogo({ variant = 'gold', className, style }: LibraryLogoProps) {
  return (
    <img
      src={LOGO_SRC[variant]}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={style}
    />
  );
}

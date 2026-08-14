import type { CSSProperties } from 'react';

interface LibraryLogoProps {
  className?: string;
  style?: CSSProperties;
}

/** Maketdagi emblema: ochiq kitob, undan taralayotgan nurlar va tepasida yulduz. */
export default function LibraryLogo({ className, style }: LibraryLogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8CE72" />
          <stop offset="100%" stopColor="#D99418" />
        </linearGradient>
      </defs>

      {/* Nurlar */}
      <g stroke="url(#logo-gold)" strokeWidth="2.4" strokeLinecap="round" opacity="0.9">
        <line x1="50" y1="30" x2="50" y2="15" />
        <line x1="38" y1="33" x2="31" y2="20" />
        <line x1="62" y1="33" x2="69" y2="20" />
        <line x1="28" y1="41" x2="16" y2="31" />
        <line x1="72" y1="41" x2="84" y2="31" />
        <line x1="21" y1="51" x2="7" y2="46" />
        <line x1="79" y1="51" x2="93" y2="46" />
      </g>

      {/* Yulduz */}
      <path
        d="M50 2.5 L53.2 10.4 L61.5 11 L55.1 16.5 L57.1 24.7 L50 20.2 L42.9 24.7 L44.9 16.5 L38.5 11 L46.8 10.4 Z"
        fill="url(#logo-gold)"
      />

      {/* Ochiq kitob — ikki sahifa */}
      <path
        d="M50 58 C43 50 32 47 20 48 L20 84 C32 83 43 86 50 93 Z"
        stroke="url(#logo-gold)"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M50 58 C57 50 68 47 80 48 L80 84 C68 83 57 86 50 93 Z"
        stroke="url(#logo-gold)"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      {/* O'rta chok */}
      <line x1="50" y1="58" x2="50" y2="93" stroke="url(#logo-gold)" strokeWidth="3" strokeLinecap="round" />

      {/* Sahifa chiziqlari */}
      <g stroke="url(#logo-gold)" strokeWidth="1.6" strokeLinecap="round" opacity="0.55">
        <line x1="27" y1="58" x2="42" y2="61" />
        <line x1="27" y1="66" x2="42" y2="69" />
        <line x1="27" y1="74" x2="42" y2="77" />
        <line x1="58" y1="61" x2="73" y2="58" />
        <line x1="58" y1="69" x2="73" y2="66" />
        <line x1="58" y1="77" x2="73" y2="74" />
      </g>
    </svg>
  );
}

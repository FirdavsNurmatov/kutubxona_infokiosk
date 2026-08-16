import { useState } from 'react';

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * Rasm — yuklanmasa o'rniga kutubxona ohangidagi gradient qoladi.
 *
 * Ekran sutkalab ishlaydi va bitta buzuq havola tufayli bo'sh oq to'rtburchak
 * ko'rinib qolmasligi kerak.
 */
export default function Media({ src, alt = '', className }: MediaProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className={`sg-media-fallback${className ? ` ${className}` : ''}`} aria-hidden="true" />;
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}

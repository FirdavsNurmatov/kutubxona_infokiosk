import { useEffect, useRef } from 'react';
import { createWaveField, type WaveField } from './particle-waves/field';
import { WAVE_PRESETS } from './particle-waves/presets';
import type { SignageMode } from '../data/types';

interface ParticleWavesProps {
  /** Joriy bo'lim — to'lqinning kuchi va kayfiyatini belgilaydi. */
  mode: SignageMode;
  /** Video bo'limida chizish to'xtatiladi. */
  paused?: boolean;
}

/**
 * Particle Waves — ekranning global atmosferik foni.
 *
 * WebGL konteksti butun ilova davomida bitta marta yaratiladi va bo'limlar
 * almashganda qayta yaratilmaydi: brauzerda bir vaqtda ochiq bo'lgan WebGL
 * kontekstlar soni cheklangan, sutkalab ishlaydigan ekranda esa har 30
 * sekundda kontekst yaratib-yopish drayver xotirasini yeydi.
 *
 * Bo'limga moslashish `mode` orqali: qiymatlar bir tekis (sakramasdan)
 * yangisiga o'tadi.
 */
export default function ParticleWaves({ mode, paused = false }: ParticleWavesProps) {
  const holder = useRef<HTMLDivElement>(null);
  const field = useRef<WaveField | null>(null);

  useEffect(() => {
    if (!holder.current) return undefined;

    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    field.current = createWaveField(holder.current, WAVE_PRESETS[mode], { animate });

    return () => {
      field.current?.destroy();
      field.current = null;
    };
    // Maydon bir marta quriladi; bo'lim o'zgarishi quyidagi effektda hisobga olinadi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    field.current?.setPreset(WAVE_PRESETS[mode]);
  }, [mode]);

  useEffect(() => {
    field.current?.setPaused(paused);
  }, [paused]);

  // Canvas maydonning o'zi tomonidan yaratiladi va yopilishda olib tashlanadi
  return <div className="sg-waves" ref={holder} aria-hidden="true" />;
}

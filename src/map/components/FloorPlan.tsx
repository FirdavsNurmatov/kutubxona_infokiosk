import { useEffect } from 'react';
import { FLOORS } from '../data/floors';
import type { MapText } from '../mapText';
import type { Floor } from '../types';

interface FloorPlanProps {
  floor: Floor;
  text: MapText;
}

/**
 * Tanlangan qavatning 3D chizmasi.
 * Rasm faqat ko'rsatish uchun — xonalar chapdagi ro'yxatdan tanlanadi.
 * Yagona ustki qatlam — kiosk turgan joyni bildiruvchi belgi; u bosilmaydi
 * (pointer-events: none) va faqat mo'ljal olish uchun xizmat qiladi.
 */
export default function FloorPlan({ floor, text }: FloorPlanProps) {
  /* Ikkinchi qavat rasmi oldindan yuklansin — qavat almashganda kutish bo'lmaydi. */
  useEffect(() => {
    FLOORS.forEach((f) => {
      const img = new Image();
      img.src = f.image;
    });
  }, []);

  return (
    <div className="m-plan-wrap">
      {/* key — qavat almashganda rasm qayta chizilib, yumshoq paydo bo'ladi */}
      <img
        key={floor.image}
        src={floor.image}
        alt={text.floor(floor.id)}
        className="m-plan"
        draggable={false}
      />

      {floor.youAreHere && (
        <div
          className="m-here"
          style={{ left: `${floor.youAreHere.x}%`, top: `${floor.youAreHere.y}%` }}
        >
          <span className="m-here-pin" />
          <span className="m-here-label">{text.youAreHere}</span>
        </div>
      )}
    </div>
  );
}

import { Layers } from 'lucide-react';
import { FLOORS } from '../data/floors';
import type { MapText } from '../mapText';
import type { FloorId } from '../types';

interface FloorSwitchProps {
  text: MapText;
  floorId: FloorId;
  onSelect: (id: FloorId) => void;
}

export default function FloorSwitch({ text, floorId, onSelect }: FloorSwitchProps) {
  return (
    <div className="m-floors" role="group" aria-label={text.aria.selectFloor}>
      {FLOORS.map((floor) => (
        <button
          key={floor.id}
          type="button"
          className="m-floor-btn"
          aria-pressed={floorId === floor.id}
          onClick={() => onSelect(floor.id)}
        >
          <Layers size={19} strokeWidth={2} />
          {text.floor(floor.id)}
        </button>
      ))}
    </div>
  );
}

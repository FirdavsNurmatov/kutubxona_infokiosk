import { ChevronRight, Clock, Info } from 'lucide-react';
import FloorRoomList from './FloorRoomList';
import type { MapText } from '../mapText';
import type { Floor, Room } from '../types';

interface InfoColumnProps {
  text: MapText;
  floor: Floor;
  selectedId: string | null;
  onSelectRoom: (room: Room) => void;
  onOpenRooms: () => void;
}

/** Chap ustun: qisqacha yo'riqnoma, shu qavatdagi xonalar va ish vaqti. */
export default function InfoColumn({
  text,
  floor,
  selectedId,
  onSelectRoom,
  onOpenRooms,
}: InfoColumnProps) {
  return (
    <>
      <div className="m-card m-welcome">
        <div className="m-card-head">
          <span className="m-head-badge">
            <Info size={17} strokeWidth={2.2} />
          </span>
          {text.welcome.title}
        </div>
        <p className="m-welcome-body">{text.welcome.body}</p>
        <button type="button" className="m-text-btn" onClick={onOpenRooms}>
          {text.welcome.action}
          <ChevronRight size={17} />
        </button>
      </div>

      <FloorRoomList
        floor={floor}
        text={text}
        selectedId={selectedId}
        onSelect={onSelectRoom}
      />

      <div className="m-card m-hours">
        <div className="m-card-head">
          <span className="m-head-badge">
            <Clock size={17} strokeWidth={2.2} />
          </span>
          {text.hours.title}
        </div>
        <div className="m-hours-row">
          <span>{text.hours.weekdaysLabel}</span>
          <strong>{text.hours.weekdays}</strong>
        </div>
        <div className="m-hours-row">
          <span>{text.hours.sundayLabel}</span>
          <strong>{text.hours.sunday}</strong>
        </div>
        <p className="m-hours-note">{text.hours.note}</p>
      </div>
    </>
  );
}

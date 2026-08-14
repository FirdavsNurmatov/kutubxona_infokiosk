import { Armchair, LayoutList } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { CATEGORY_COLOR } from '../data/floors';
import type { MapText } from '../mapText';
import type { Floor, Room } from '../types';

interface FloorRoomListProps {
  floor: Floor;
  text: MapText;
  selectedId: string | null;
  onSelect: (room: Room) => void;
}

/**
 * Joriy qavatdagi xonalar ro'yxati — xarita ustida emas, chap ustunda turadi.
 * Nuqta rangi xona turini bildiradi (CATEGORY_COLOR bilan bir manba).
 */
export default function FloorRoomList({ floor, text, selectedId, onSelect }: FloorRoomListProps) {
  const { tr } = useI18n();

  return (
    <div className="m-card m-roomlist">
      <div className="m-card-head">
        <span className="m-head-badge">
          <LayoutList size={17} strokeWidth={2.2} />
        </span>
        {text.roomListTitle}
        <span className="m-roomlist-count">{floor.rooms.length}</span>
      </div>

      <div className="m-roomlist-scroll" role="group" aria-label={text.aria.roomList}>
        {floor.rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            className="m-roomlist-item"
            aria-pressed={selectedId === room.id}
            style={{ ['--m-tone' as string]: CATEGORY_COLOR[room.category] }}
            onClick={() => onSelect(room)}
          >
            <i className="m-roomlist-dot" />
            <span className="m-roomlist-name">{tr(room.name)}</span>
            {room.seats !== undefined && (
              <span className="m-roomlist-seats">
                <Armchair size={13} strokeWidth={2} />
                {room.seats}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

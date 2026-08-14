import { Armchair, Check, Footprints, X } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { CATEGORY_COLOR } from '../data/floors';
import type { MapText } from '../mapText';
import type { Room } from '../types';

interface RoomDetailProps {
  room: Room;
  text: MapText;
  onClose: () => void;
}

/** Tanlangan xona kartochkasi — rangi xona turiga qarab o'zgaradi. */
export default function RoomDetail({ room, text, onClose }: RoomDetailProps) {
  const { tr } = useI18n();
  const Icon = room.icon;

  return (
    <div className="m-card m-detail" style={{ ['--m-accent' as string]: CATEGORY_COLOR[room.category] }}>
      <div className="m-detail-top">
        <div className="m-detail-icon">
          <Icon size={24} strokeWidth={2} />
        </div>
        <div className="m-detail-tags">
          <span className="m-chip m-chip-solid">{text.filters[room.category]}</span>
          <span className="m-chip">{text.rooms.onFloor(room.floor)}</span>
        </div>
        <button type="button" className="m-icon-btn" aria-label={text.detail.close} onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <h2 className="m-detail-name">{tr(room.name)}</h2>
      <p className="m-detail-tagline">{tr(room.tagline)}</p>

      <div className="m-detail-scroll">
        {/* Kiosk turgan nuqtadan yo'l — tavsifdan oldin, chunki
            tashrifchiga birinchi navbatda shu kerak. */}
        <div className="m-route">
          <span className="m-route-icon">
            <Footprints size={16} strokeWidth={2.2} />
          </span>
          <div>
            <div className="m-route-title">{text.directionsTitle}</div>
            <p className="m-route-text">{tr(room.directions)}</p>
          </div>
        </div>

        <p className="m-detail-text">{tr(room.description)}</p>

        {room.seats !== undefined && (
          <div className="m-detail-seats">
            <Armchair size={18} strokeWidth={2} />
            {text.detail.seats(room.seats)}
          </div>
        )}

        {room.features && room.features.length > 0 && (
          <>
            <div className="m-detail-sub">{text.detail.features}</div>
            <ul className="m-feature-list">
              {room.features.map((feature) => (
                <li key={feature.en}>
                  <Check size={15} strokeWidth={3} />
                  {tr(feature)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

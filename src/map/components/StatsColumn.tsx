import {
  Armchair,
  BookOpen,
  ChevronRight,
  DoorOpen,
  Info,
  Landmark,
  LayoutGrid,
  Layers,
  Monitor,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FLOORS, ROOM_TOTALS } from '../data/floors';
import type { MapText } from '../mapText';
import type { FloorId, MapView } from '../types';

/** Uch xonali guruhlarga ajratilgan raqam: 125000 → 125 000 */
function group(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

interface StatsColumnProps {
  text: MapText;
  floorId: FloorId;
  onNavigate: (view: MapView) => void;
  onSelectFloor: (id: FloorId) => void;
}

/**
 * O'ng ustun: kutubxona raqamlari va bo'lim ichidagi tezkor o'tishlar.
 * Bu yerdan tashqariga (kiosk yoki devor ekraniga) havola yo'q —
 * xarita bo'limi mustaqil ishlaydi.
 */
export default function StatsColumn({ text, floorId, onNavigate, onSelectFloor }: StatsColumnProps) {
  /* Har bir qatorning o'z rangi bor — belgi shu rangning och fonida turadi. */
  const rows: { icon: LucideIcon; label: string; value: string; tone: string }[] = [
    { icon: BookOpen, label: text.stats.books, value: `${group(1000000)}+`, tone: '#3F6BE8' },
    { icon: Users, label: text.stats.readers, value: `${group(125000)}+`, tone: '#8B5CF6' },
    { icon: DoorOpen, label: text.stats.rooms, value: String(ROOM_TOTALS.rooms), tone: '#2E9E5B' },
    { icon: Armchair, label: text.stats.seats, value: group(ROOM_TOTALS.seats), tone: '#E08A1E' },
    { icon: Monitor, label: text.stats.computers, value: '50+', tone: '#0E93A6' },
  ];

  const shortcuts: { key: string; icon: LucideIcon; label: string; onClick: () => void }[] = [
    {
      key: 'about',
      icon: Info,
      label: text.nav.about,
      onClick: () => onNavigate('about'),
    },
    {
      key: 'rooms',
      icon: LayoutGrid,
      label: text.nav.rooms,
      onClick: () => onNavigate('rooms'),
    },
    ...FLOORS.filter((floor) => floor.id !== floorId).map((floor) => ({
      key: `floor-${floor.id}`,
      icon: Layers,
      label: text.rooms.onFloor(floor.id),
      onClick: () => onSelectFloor(floor.id),
    })),
  ];

  return (
    <>
      <div className="m-card m-stats">
        <div className="m-card-head">
          <span className="m-head-badge">
            <Landmark size={17} strokeWidth={2.2} />
          </span>
          {text.stats.title}
        </div>
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="m-stat-row">
              <span className="m-stat-badge" style={{ ['--m-tone' as string]: row.tone }}>
                <Icon size={18} strokeWidth={2} />
              </span>
              <div>
                <div className="m-stat-label">{row.label}</div>
                <div className="m-stat-value">{row.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="m-card m-quick">
        <div className="m-card-head">
          <span className="m-head-badge">
            <LayoutGrid size={17} strokeWidth={2.2} />
          </span>
          {text.shortcutsTitle}
        </div>
        {shortcuts.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} type="button" className="m-quick-row" onClick={item.onClick}>
              <span className="m-quick-label">
                <Icon size={16} strokeWidth={2} />
                {item.label}
              </span>
              <ChevronRight size={17} />
            </button>
          );
        })}
      </div>
    </>
  );
}

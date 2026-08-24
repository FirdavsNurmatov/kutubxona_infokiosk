import { useMemo, useState } from 'react';
import { Armchair, ChevronRight, MapPin, Search, X } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import { ALL_ROOMS, CATEGORY_COLOR } from '../data/floors';
import type { MapText } from '../mapText';
import type { Room, RoomCategory } from '../types';
import OnScreenKeyboard from '../../components/OnScreenKeyboard';

type Filter = 'all' | RoomCategory;

/* Filtr tugmalari — ma'lumotda uchraydigan turlar shu tartibda ko'rsatiladi. */
const FILTER_ORDER: RoomCategory[] = [
  'reading',
  'collection',
  'tech',
  'kids',
  'service',
  'relax',
  'facility',
];

interface RoomsViewProps {
  text: MapText;
  onShowOnMap: (room: Room) => void;
}

/** Barcha xonalar ro'yxati — qidiruv va tur bo'yicha filtr bilan. */
export default function RoomsView({ text, onShowOnMap }: RoomsViewProps) {
  const { tr } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  /* Xarita terminalida ham fizik klaviatura yo'q. */
  const [keyboard, setKeyboard] = useState(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ALL_ROOMS.filter((room) => {
      if (filter !== 'all' && room.category !== filter) return false;
      if (!needle) return true;
      return `${tr(room.name)} ${tr(room.tagline)}`.toLowerCase().includes(needle);
    });
  }, [filter, query, tr]);

  return (
    <div className="m-rooms">
      <div className="m-rooms-head">
        <h1 className="m-rooms-title">{text.rooms.title}</h1>
        <p className="m-rooms-sub">{text.rooms.subtitle}</p>
      </div>

      <div className="m-rooms-bar">
        <div className="m-filters" role="group" aria-label={text.aria.roomList}>
          <button
            type="button"
            className="m-filter"
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            {text.filters.all}
          </button>
          {FILTER_ORDER.map((category) => (
            <button
              key={category}
              type="button"
              className="m-filter"
              aria-pressed={filter === category}
              style={{ ['--m-accent' as string]: CATEGORY_COLOR[category] }}
              onClick={() => setFilter(category)}
            >
              {text.filters[category]}
            </button>
          ))}
        </div>

        <div className="m-search">
          <Search size={18} strokeWidth={2} />
          <input
            type="search"
            value={query}
            placeholder={text.rooms.searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setKeyboard(true)}
            onClick={() => setKeyboard(true)}
          />
          {query && (
            <button type="button" aria-label={text.detail.close} onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="m-rooms-empty">{text.rooms.empty}</p>
      ) : (
        <div className="m-rooms-grid">
          {visible.map((room) => {
            const Icon = room.icon;
            return (
              <button
                key={room.id}
                type="button"
                className="m-room-card"
                style={{ ['--m-accent' as string]: CATEGORY_COLOR[room.category] }}
                onClick={() => onShowOnMap(room)}
              >
                <div className="m-room-icon">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="m-room-body">
                  <div className="m-room-name">{tr(room.name)}</div>
                  <div className="m-room-meta">
                    <span>
                      <MapPin size={14} strokeWidth={2} />
                      {text.rooms.onFloor(room.floor)}
                    </span>
                    {room.seats !== undefined && (
                      <span>
                        <Armchair size={14} strokeWidth={2} />
                        {text.detail.seats(room.seats)}
                      </span>
                    )}
                  </div>
                  <p className="m-room-tagline">{tr(room.tagline)}</p>
                </div>
                <span className="m-room-go" title={text.detail.showOnMap}>
                  <ChevronRight size={18} strokeWidth={2.4} />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {keyboard && (
        <OnScreenKeyboard
          value={query}
          placeholder={text.rooms.searchPlaceholder}
          onChange={setQuery}
          onSubmit={() => setKeyboard(false)}
          onClose={() => setKeyboard(false)}
        />
      )}
    </div>
  );
}

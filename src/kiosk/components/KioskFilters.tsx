import { SlidersHorizontal, Check, RotateCcw } from 'lucide-react';
import { useI18n } from '../../i18n/context';
import type { Translation } from '../../i18n/translations';
import { SORT_KEYS, YEAR_BUCKETS, EMPTY_FILTERS, isFilterActive } from '../filterTypes';
import type { FilterState, YearBucket } from '../filterTypes';

interface CountedOption {
  value: string;
  label: string;
  count: number;
}

interface KioskFiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  /** Har bir variant yonidagi son — boshqa filtrlar qo'llangandan keyin hisoblanadi. */
  genreOptions: CountedOption[];
  yearCounts: Record<YearBucket, number>;
  availableCount: number;
}

/** Bo'lim sarlavhasi. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="k-filter-section">
      <h3 className="k-filter-heading">{title}</h3>
      {children}
    </div>
  );
}

/** Belgilanadigan qator — checkbox o'rniga katta bosish maydoni. */
function CheckRow({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button type="button" className="k-filter-row" aria-pressed={checked} onClick={onToggle}>
      <span className={`k-filter-box ${checked ? 'is-on' : ''}`}>
        {checked && <Check size={13} strokeWidth={3} color="#fff" />}
      </span>
      <span className="k-filter-label">{label}</span>
      {count !== undefined && <span className="k-filter-count">{count}</span>}
    </button>
  );
}

export default function KioskFilters({
  value,
  onChange,
  genreOptions,
  yearCounts,
  availableCount,
}: KioskFiltersProps) {
  const { t } = useI18n();
  const f = t.kiosk.filters;

  const toggleIn = <T extends string>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  return (
    <aside className="k-filters">
      <div className="k-filters-head">
        <SlidersHorizontal size={17} style={{ color: '#4F52F6' }} />
        <span className="k-filters-title">{f.title}</span>
        {isFilterActive(value) && (
          <button
            type="button"
            className="k-filter-clear btn-compact"
            onClick={() => onChange(EMPTY_FILTERS)}
          >
            <RotateCcw size={13} />
            {f.clear}
          </button>
        )}
      </div>

      <Section title={f.sort}>
        {SORT_KEYS.map((key) => (
          <CheckRow
            key={key}
            label={f.sortBy[key as keyof Translation['kiosk']['filters']['sortBy']]}
            checked={value.sort === key}
            onToggle={() => onChange({ ...value, sort: key })}
          />
        ))}
      </Section>

      <Section title={f.availableOnly}>
        <CheckRow
          label={f.availableOnly}
          count={availableCount}
          checked={value.availableOnly}
          onToggle={() => onChange({ ...value, availableOnly: !value.availableOnly })}
        />
      </Section>

      <Section title={f.genre}>
        {genreOptions.map((option) => (
          <CheckRow
            key={option.value}
            label={option.label}
            count={option.count}
            checked={value.genres.includes(option.value)}
            onToggle={() => onChange({ ...value, genres: toggleIn(value.genres, option.value) })}
          />
        ))}
      </Section>

      <Section title={f.year}>
        {YEAR_BUCKETS.map((bucket) => (
          <CheckRow
            key={bucket}
            label={f.years[bucket]}
            count={yearCounts[bucket]}
            checked={value.years.includes(bucket)}
            onToggle={() => onChange({ ...value, years: toggleIn(value.years, bucket) })}
          />
        ))}
      </Section>
    </aside>
  );
}

export type SortKey = 'relevance' | 'newest' | 'popular' | 'title';
export type YearBucket = 'recent' | 'y2010' | 'y2000' | 'older';

export interface FilterState {
  /** Tanlangan janrlar — joriy tildagi toifa nomi bo'yicha. */
  genres: string[];
  years: YearBucket[];
  availableOnly: boolean;
  sort: SortKey;
}

export const EMPTY_FILTERS: FilterState = {
  genres: [],
  years: [],
  availableOnly: false,
  sort: 'relevance',
};

export const YEAR_BUCKETS: YearBucket[] = ['recent', 'y2010', 'y2000', 'older'];
export const SORT_KEYS: SortKey[] = ['relevance', 'newest', 'popular', 'title'];

/** Nashr yili qaysi guruhga tushishini aniqlaydi. */
export function yearBucketOf(year: number): YearBucket {
  if (year >= 2020) return 'recent';
  if (year >= 2010) return 'y2010';
  if (year >= 2000) return 'y2000';
  return 'older';
}

export function isFilterActive(f: FilterState): boolean {
  return f.genres.length > 0 || f.years.length > 0 || f.availableOnly || f.sort !== 'relevance';
}

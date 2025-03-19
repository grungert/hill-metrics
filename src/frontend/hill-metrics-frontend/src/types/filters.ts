// Filter option interface for dropdown filters
export interface FilterOption {
  id: number;
  name: string;
  parentId: number | null;
}

// Filter type enum
export enum FilterType {
  ASSETS = 'assets',
  SECTOR = 'sector',
  MARKET = 'market',
  MOST_USED = 'mostUsed',
  ADVANCED = 'advanced',
  COMMON = 'common',
  SYNTHETIC = 'synthetic'
}

// Selected filters interface
export interface SelectedFilters {
  [FilterType.ASSETS]: number[];
  [FilterType.SECTOR]: number[];
  [FilterType.MARKET]: number[];
  [FilterType.MOST_USED]: number[];
  [FilterType.ADVANCED]: number[];
}

// Filter item interface for selected filter pills
export interface FilterItem {
  type: FilterType;
  label: string;
  value: string;
}

// Types for search functionality

// Category type for tabs
export interface Category {
  id: string;
  label: string;
  count: number;
}

// Result group structure
export interface ResultGroup {
  id: string;
  label: string;
  count: number;
  items: ResultItem[];
}

// Individual result item
export interface ResultItem {
  id: string;
  name: string;
  ticker: string;
  category: string;
  addedToComparison: boolean;
  addedToList: boolean;
}

// Search results structure
export interface SearchResults {
  categories: Category[];
  groups: ResultGroup[];
  loading: boolean;
  empty: boolean;
}

import { FilterOption } from '../types/filters';

// Asset filter options with hierarchical structure based on documentation
export const assetFilterOptions: FilterOption[] = [
  // Main asset categories
  {
    id: 1,
    name: 'Crypto',
    parentId: null
  },
  {
    id: 2,
    name: 'Mutual Funds',
    parentId: null
  },
  {
    id: 3,
    name: 'Stocks',
    parentId: null
  },
  {
    id: 4,
    name: 'Bonds',
    parentId: null
  },
  {
    id: 5,
    name: 'Real Estate',
    parentId: null
  },
  {
    id: 6,
    name: 'Private Equity',
    parentId: null
  },
  {
    id: 7,
    name: 'Commodities',
    parentId: null
  },
  
  // Cryptocurrency specific filters
  { id: 101, name: 'Fees', parentId: 1 },
  { id: 102, name: 'Safeness indicator', parentId: 1 },
  { id: 103, name: 'Circulating supply', parentId: 1 },
  { id: 104, name: 'Layer', parentId: 1 },
  { id: 105, name: 'Consensus', parentId: 1 },
  { id: 106, name: 'Validator / mining number', parentId: 1 },
  { id: 107, name: 'Active developper (number)', parentId: 1 },
  { id: 108, name: 'Stacking (%)', parentId: 1 },
  { id: 109, name: 'Availability', parentId: 1 },
  { id: 110, name: 'Scalabitlity', parentId: 1 },

// Mutual Funds specific filters
  { id: 201, name: 'Asset manager / issuer', parentId: 2 },
  { id: 202, name: 'Dividend (value, frequency…)', parentId: 2 },
  { id: 203, name: 'Fees', parentId: 2 },
  { id: 204, name: 'Distribution policy', parentId: 2 },
  { id: 205, name: 'Legal status', parentId: 2 },
  { id: 206, name: 'Investor type', parentId: 2 },

// Stocks specific filters
  { id: 301, name: 'Dividend', parentId: 3 },
  { id: 302, name: 'Original market', parentId: 3 },

// Bonds specific filters
  { id: 401, name: 'Asset manager / issuer', parentId: 4 },
  { id: 402, name: 'Dividend (value, frequency…)', parentId: 4 },
  { id: 403, name: 'Maturity', parentId: 4 },

// Real Estate specific filters
  { id: 501, name: 'Asset manager / issuer', parentId: 5 },
  { id: 502, name: 'Dividend (value, frequency…)', parentId: 5 },

// Commodities specific filters
  { id: 701, name: 'Original market', parentId: 7 },

// Private Equity specific filters
  { id: 601, name: 'Asset manager / issuer', parentId: 6 },
  { id: 602, name: 'Dividend', parentId: 6 },
  { id: 603, name: 'Fees', parentId: 6 }
];

// Keep these separate arrays for the AdvancedFilterPanel component
export const cryptoFilterOptions: FilterOption[] = [
  { id: 1, name: 'Fees', parentId: null },
  { id: 2, name: 'Safeness indicator', parentId: null },
  { id: 3, name: 'Circulating supply', parentId: null },
  { id: 4, name: 'Layer', parentId: null },
  { id: 5, name: 'Consensus', parentId: null },
  { id: 6, name: 'Validator / mining number', parentId: null },
  { id: 7, name: 'Active developper (number)', parentId: null },
  { id: 8, name: 'Stacking (%)', parentId: null },
  { id: 9, name: 'Availability', parentId: null },
  { id: 10, name: 'Scalabitlity', parentId: null }
];

export const mutualFundsFilterOptions: FilterOption[] = [
  { id: 1, name: 'Asset manager / issuer', parentId: null },
  { id: 2, name: 'Dividend (value, frequency…)', parentId: null },
  { id: 3, name: 'Fees', parentId: null },
  { id: 4, name: 'Distribution policy', parentId: null },
  { id: 5, name: 'Legal status', parentId: null },
  { id: 6, name: 'Investor type', parentId: null }
];

export const stocksFilterOptions: FilterOption[] = [
  { id: 1, name: 'Dividend', parentId: null },
  { id: 2, name: 'Original market', parentId: null }
];

export const bondsFilterOptions: FilterOption[] = [
  { id: 1, name: 'Asset manager / issuer', parentId: null },
  { id: 2, name: 'Dividend (value, frequency…)', parentId: null },
  { id: 3, name: 'Maturity', parentId: null }
];

export const realEstateFilterOptions: FilterOption[] = [
  { id: 1, name: 'Asset manager / issuer', parentId: null },
  { id: 2, name: 'Dividend (value, frequency…)', parentId: null }
];

export const commoditiesFilterOptions: FilterOption[] = [
  { id: 1, name: 'Original market', parentId: null }
];

export const privateEquityFilterOptions: FilterOption[] = [
  { id: 1, name: 'Asset manager / issuer', parentId: null },
  { id: 2, name: 'Dividend', parentId: null },
  { id: 3, name: 'Fees', parentId: null }
];

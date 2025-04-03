import { Category, ResultGroup, ResultItem, SearchResults } from '../types/search';

// Mock categories
const mockCategories: Category[] = [
  { id: 'all', label: 'All', count: 105 },
  { id: 'cryptocurrency', label: 'Cryptocurrency', count: 35 },
  { id: 'mutual-funds', label: 'Mutual Funds', count: 28 },
  { id: 'stocks', label: 'Stocks', count: 22 },
  { id: 'bonds', label: 'Bonds', count: 15 },
  { id: 'real-estate', label: 'Real-Estate', count: 5 },
];

// Mock result items for Bitcoin
const bitcoinItems: ResultItem[] = [
  {
    id: 'btc-1',
    name: 'Bitcoin',
    ticker: 'BTC',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'btc-cash',
    name: 'Bitcoin Cash',
    ticker: 'BCH',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'btc-sv',
    name: 'Bitcoin SV',
    ticker: 'BSV',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'btc-gold',
    name: 'Bitcoin Gold',
    ticker: 'BTG',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'btc-atom',
    name: 'Bitcoin Atom',
    ticker: 'BCA',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'btc-2',
    name: 'Bitcoin 2',
    ticker: 'BTC2',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'btc-diamond',
    name: 'Bitcoin Diamond',
    ticker: 'BCD',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
];

// Mock result items for Ethereum
const ethereumItems: ResultItem[] = [
  {
    id: 'eth-1',
    name: 'Ethereum',
    ticker: 'ETH',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'eth-classic',
    name: 'Ethereum Classic',
    ticker: 'ETC',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'eth-pow',
    name: 'Ethereum PoW',
    ticker: 'ETHW',
    category: 'cryptocurrency',
    addedToComparison: false,
    addedToList: false,
  },
];

// Mock result items for stocks
const stockItems: ResultItem[] = [
  {
    id: 'aapl',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    category: 'stocks',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'msft',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    category: 'stocks',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'googl',
    name: 'Alphabet Inc.',
    ticker: 'GOOGL',
    category: 'stocks',
    addedToComparison: false,
    addedToList: false,
  },
  {
    id: 'amzn',
    name: 'Amazon.com, Inc.',
    ticker: 'AMZN',
    category: 'stocks',
    addedToComparison: false,
    addedToList: false,
  },
];

// Mock result groups
const mockResultGroups: ResultGroup[] = [
  {
    id: 'bitcoin-group',
    label: 'Bitcoin',
    count: bitcoinItems.length,
    items: bitcoinItems,
  },
  {
    id: 'ethereum-group',
    label: 'Ethereum',
    count: ethereumItems.length,
    items: ethereumItems,
  },
  {
    id: 'stocks-group',
    label: 'Stocks',
    count: stockItems.length,
    items: stockItems,
  },
];

// Keep track of added items state
const addedItemsState: Record<string, { addedToComparison: boolean; addedToList: boolean }> = {};

/**
 * Search service to mimic backend search functionality
 */
export const mockSearchService = {
  /**
   * Search for items based on query and selected category
   * @param query The search query
   * @param category The selected category filter
   * @returns Promise with search results
   */
  search: (query: string, category: string = 'all'): Promise<SearchResults> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        if (!query.trim()) {
          resolve({
            categories: mockCategories,
            groups: [],
            loading: false,
            empty: true,
          });
          return;
        }

        const queryLower = query.toLowerCase();
        
        // Filter groups and items based on query
        const filteredGroups = mockResultGroups
          .map((group) => {
            // Filter items within each group
            const filteredItems = group.items.filter((item) => {
              // Apply category filter if not 'all'
              if (category !== 'all' && item.category !== category) {
                return false;
              }
              
              // Apply search query filter
              return (
                item.name.toLowerCase().includes(queryLower) ||
                item.ticker.toLowerCase().includes(queryLower)
              );
            });

            // Apply stored state to filtered items
            const itemsWithState = filteredItems.map(item => ({
              ...item,
              addedToComparison: addedItemsState[item.id]?.addedToComparison || item.addedToComparison,
              addedToList: addedItemsState[item.id]?.addedToList || item.addedToList
            }));

            // Return group with filtered items
            return {
              ...group,
              items: itemsWithState,
              count: itemsWithState.length
            };
          })
          .filter((group) => group.items.length > 0); // Only include groups with matching items

        // Recalculate category counts based on filtered items
        const updatedCategories = mockCategories.map((cat) => {
          if (cat.id === 'all') {
            // All items count
            return {
              ...cat,
              count: filteredGroups.reduce((acc, group) => acc + group.items.length, 0)
            };
          } else {
            // Count items for this specific category
            return {
              ...cat,
              count: filteredGroups.reduce((acc, group) => {
                return acc + group.items.filter(item => item.category === cat.id).length;
              }, 0)
            };
          }
        });

        resolve({
          categories: updatedCategories,
          groups: filteredGroups,
          loading: false,
          empty: filteredGroups.length === 0,
        });
      }, 300); // Simulate 300ms of network delay
    });
  },

  /**
   * Toggle comparison status for an item
   * @param itemId The item ID
   * @param added Whether the item is added to comparison
   */
  toggleComparison: (itemId: string, added: boolean): void => {
    if (!addedItemsState[itemId]) {
      addedItemsState[itemId] = { addedToComparison: false, addedToList: false };
    }
    addedItemsState[itemId].addedToComparison = added;
  },

  /**
   * Toggle list status for an item
   * @param itemId The item ID
   * @param added Whether the item is added to list
   */
  toggleList: (itemId: string, added: boolean): void => {
    if (!addedItemsState[itemId]) {
      addedItemsState[itemId] = { addedToComparison: false, addedToList: false };
    }
    addedItemsState[itemId].addedToList = added;
  },

  /**
   * Get initial loading state
   */
  getInitialLoadingState: (): SearchResults => ({
    categories: mockCategories,
    groups: [],
    loading: true,
    empty: false,
  }),
};

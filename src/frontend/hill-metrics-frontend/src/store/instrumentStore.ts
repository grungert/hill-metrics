import { create } from 'zustand';

// Define the types for the instruments store
interface InstrumentStoreState {
  // Instruments for comparison
  comparisonInstruments: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  
  // Instruments for lists (search results)
  listInstruments: string[];
  addToList: (id: string) => void;
  removeFromList: (id: string) => void;
  
  // Search state
  lastSearchTerm: string;
  setLastSearchTerm: (term: string) => void;
  
  // Navigation tracking
  isNavigating: boolean;
  setIsNavigating: (value: boolean) => void;
  
  // Reset state
  reset: () => void;
}

// Create a store with simple methods for adding and removing instruments
const useInstrumentStore = create<InstrumentStoreState>((set) => ({
  // Initial state
  comparisonInstruments: [],
  listInstruments: [],
  lastSearchTerm: '',
  isNavigating: false,
  
  // Comparison methods
  addToComparison: (id: string) => set((state) => ({
    comparisonInstruments: state.comparisonInstruments.includes(id) 
      ? state.comparisonInstruments 
      : [...state.comparisonInstruments, id]
  })),
  removeFromComparison: (id: string) => set((state) => ({
    comparisonInstruments: state.comparisonInstruments.filter(itemId => itemId !== id)
  })),
  
  // List methods
  addToList: (id: string) => set((state) => ({
    listInstruments: state.listInstruments.includes(id) 
      ? state.listInstruments 
      : [...state.listInstruments, id]
  })),
  removeFromList: (id: string) => set((state) => ({
    listInstruments: state.listInstruments.filter(itemId => itemId !== id)
  })),
  
  // Search term management
  setLastSearchTerm: (term: string) => set({ lastSearchTerm: term }),
  
  // Navigation state management
  setIsNavigating: (value: boolean) => set({ isNavigating: value }),
  
  // Reset all state
  reset: () => set({ 
    comparisonInstruments: [], 
    listInstruments: [],
    lastSearchTerm: '',
    isNavigating: false
  }),
}));

export default useInstrumentStore;

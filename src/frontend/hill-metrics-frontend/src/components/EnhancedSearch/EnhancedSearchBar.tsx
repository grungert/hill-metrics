import React, { useState, useEffect, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { mockSearchService } from '../../services/mockSearchService';
import { SearchResults } from '../../types/search';
import ResultsContainer from './ResultsContainer';
import useInstrumentStore from '../../store/instrumentStore';

interface EnhancedSearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
  onNavigateToComparison?: (itemId: string) => void;
  onNavigateToSearch?: (itemId: string) => void;
  onNavigateToOverview?: (itemId: string) => void;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  onSearch,
  className = '',
  placeholder = 'Search for assets...',
  onNavigateToComparison,
  onNavigateToSearch,
  onNavigateToOverview,
}) => {
  // Get state management from the instrument store
  const { lastSearchTerm, setLastSearchTerm, isNavigating } = useInstrumentStore();
  
  // Input and search state
  const [inputValue, setInputValue] = useState(lastSearchTerm || '');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults>({
    categories: [],
    groups: [],
    loading: false,
    empty: true,
  });
  
  // Store original unfiltered results
  const [originalResults, setOriginalResults] = useState<SearchResults>({
    categories: [],
    groups: [],
    loading: false,
    empty: true,
  });

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dropdown visibility state
  const [showResults, setShowResults] = useState(Boolean(lastSearchTerm));

  // Debounce search input
  const debouncedSearchTerm = useDebounce(inputValue, 120);

  // Ref to detect clicks outside the search bar
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Show results when component mounts if there's a search term
  useEffect(() => {
    if (lastSearchTerm) {
      setShowResults(true);
    }
  }, [lastSearchTerm]);
  
  // Search for results when the debounced search term changes
  useEffect(() => {
    // Don't search if no input
    if (!debouncedSearchTerm.trim()) {
      setResults({
        categories: [],
        groups: [],
        loading: false,
        empty: true,
      });
      return;
    }

    const searchForResults = async () => {
      setIsSearching(true);
      setResults({
        ...results,
        loading: true,
      });

      try {
        // Call the mock search service
        // Get full search results without category filtering
        const searchResults = await mockSearchService.search(debouncedSearchTerm, 'all');
        
        // Store original results with all categories
        setOriginalResults(searchResults);
        
        // Apply category filtering if needed
        if (selectedCategory !== 'all') {
          // Filter groups but keep original category counts
          const filteredGroups = searchResults.groups
            .map(group => ({
              ...group,
              items: group.items.filter(item => item.category === selectedCategory)
            }))
            .filter(group => group.items.length > 0);
          
          setResults({
            categories: searchResults.categories, // Keep original category counts
            groups: filteredGroups,
            loading: false,
            empty: filteredGroups.length === 0,
          });
        } else {
          setResults(searchResults);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults({
          categories: [],
          groups: [],
          loading: false,
          empty: true,
        });
      } finally {
        setIsSearching(false);
      }
    };

    searchForResults();
  }, [debouncedSearchTerm]); // Remove selectedCategory from dependencies since we filter client-side now

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setLastSearchTerm(value);

    // Show results when typing
    if (value.trim()) {
      setShowResults(true);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    // Show results if there's a search term
    if (inputValue.trim()) {
      setShowResults(true);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    if (categoryId === 'all') {
      setResults(originalResults);
    } else {
      // Filter groups but keep original category counts
      const filteredGroups = originalResults.groups
        .map(group => ({
          ...group,
          items: group.items.filter(item => item.category === categoryId)
        }))
        .filter(group => group.items.length > 0);
      
      setResults({
        categories: originalResults.categories, // Keep original category counts
        groups: filteredGroups,
        loading: false,
        empty: filteredGroups.length === 0,
      });
    }
  };

  // Handle adding items to comparison
  const handleAddToComparison = (itemId: string, added: boolean) => {
    mockSearchService.toggleComparison(itemId, added);
    // Update results with the new state
    setResults((prevResults) => {
      const updatedGroups = prevResults.groups.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === itemId ? { ...item, addedToComparison: added } : item
        ),
      }));
      return { ...prevResults, groups: updatedGroups };
    });
    
    // Navigate to comparison page with item if added and navigation handler exists
    if (added && onNavigateToComparison) {
      onNavigateToComparison(itemId);
    }
  };

  // Handle adding items to lists
  const handleAddToList = (itemId: string, added: boolean) => {
    mockSearchService.toggleList(itemId, added);
    // Update results with the new state
    setResults((prevResults) => {
      const updatedGroups = prevResults.groups.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === itemId ? { ...item, addedToList: added } : item
        ),
      }));
      return { ...prevResults, groups: updatedGroups };
    });
    
    // Navigate to search page with item if added and navigation handler exists
    if (added && onNavigateToSearch) {
      onNavigateToSearch(itemId);
    }
  };

  // Handle view item
  const handleViewItem = (itemId: string) => {
    // Navigate to overview page
    if (onNavigateToOverview) {
      onNavigateToOverview(itemId);
    } else {
      console.log('View item:', itemId);
    }
  };

  // Handle clear button click
  const handleClearInput = () => {
    setInputValue('');
    setLastSearchTerm('');
    setShowResults(false);
    setSelectedCategory('all');
  };

  // Handle clicks outside the search bar to close the results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !isNavigating // Don't close if we're navigating
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavigating]);

  // Submit the search
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div ref={searchContainerRef} className={`relative ${className}`}>
      <form
        className="flex items-center bg-white rounded-md overflow-hidden"
        onSubmit={handleSubmit}
      >
        {/* Search icon */}
        <div className="flex items-center justify-center px-3 text-slate-400">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 17.5L13.875 13.875"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Input field */}
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="flex-1 py-2 px-0 text-sm border-none outline-none hover:bg-slate-50 focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all"
        />

        {/* Clear button */}
        {inputValue && (
          <button
            type="button"
            onClick={handleClearInput}
            className="p-2 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </form>

      {/* Results dropdown */}
      {showResults && (
        <ResultsContainer
          results={results}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          onAddToComparison={handleAddToComparison}
          onAddToList={handleAddToList}
          onView={handleViewItem}
        />
      )}
    </div>
  );
};

export default EnhancedSearchBar;

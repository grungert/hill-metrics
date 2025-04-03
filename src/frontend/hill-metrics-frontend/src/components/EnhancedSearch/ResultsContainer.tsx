import React from 'react';
import { SearchResults } from '../../types/search';
import CategoryTabs from './CategoryTabs';
import ResultGroup from './ResultGroup';

interface ResultsContainerProps {
  results: SearchResults;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onAddToComparison: (itemId: string, added: boolean) => void;
  onAddToList: (itemId: string, added: boolean) => void;
  onView: (itemId: string) => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  results,
  selectedCategory,
  onSelectCategory,
  onAddToComparison,
  onAddToList,
  onView,
}) => {
  return (
    <div className="absolute z-10 w-full right-0 mt-2 bg-white border border-slate-200 rounded-md shadow-lg max-h-96 overflow-hidden flex flex-col">
      {/* Category Tabs */}
      {results.categories.length > 0 && (
        <CategoryTabs
          categories={results.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      )}

      {/* Loading State */}
      {results.loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
      )}

      {/* Empty State */}
      {!results.loading && results.empty && (
        <div className="flex flex-col items-center justify-center p-8 text-slate-500">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2 text-slate-300"
          >
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L16 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-center">No matching results found.</p>
          <p className="text-sm">Try a different search term or filter.</p>
        </div>
      )}

      {/* Results List */}
      {!results.loading && !results.empty && (
        <div className="flex-1 overflow-y-auto">
          {results.groups.length === 0 && (
            <div className="p-4 text-center text-slate-500">
              No matching items for this filter.
            </div>
          )}
          {results.groups.map((group) => (
            <ResultGroup
              key={group.id}
              group={group}
              onAddToComparison={onAddToComparison}
              onAddToList={onAddToList}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsContainer;

import React, { useState } from 'react';
import EnhancedSearchBar from '../../components/EnhancedSearch/EnhancedSearchBar';
import Header from '../../components/Header';

const SearchDemoPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search submitted:', query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header with search bar */}
      <Header onSearch={handleSearch} activeTab="search" />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Enhanced Search Bar Demo</h1>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium text-slate-800 mb-4">Search Features</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
              <li>Type to see real-time suggestions with 120ms debounce</li>
              <li>Filter results by category using the tabs</li>
              <li>Click the "X" button to clear the search</li>
              <li>Add items to comparison or list with state persistence</li>
              <li>Responsive dropdown with scrollable content</li>
            </ul>

            <div className="mb-6">
              <h3 className="text-md font-medium text-slate-800 mb-2">Try it here:</h3>
              <div className="max-w-md">
                <EnhancedSearchBar
                  placeholder="Search for Bitcoin, Ethereum, stocks..."
                  onSearch={handleSearch}
                />
              </div>
              {searchQuery && (
                <div className="mt-4 p-3 bg-slate-100 rounded text-sm">
                  <strong>Search submitted:</strong> {searchQuery}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium text-slate-800 mb-4">Usage Instructions</h2>
            <div className="space-y-4 text-slate-700">
              <p>
                <strong>Search suggestions:</strong> Type "bit" to see Bitcoin related items or "eth" for Ethereum items.
              </p>
              <p>
                <strong>Category filtering:</strong> Click on category tabs (e.g., "Cryptocurrency", "Stocks") to filter results.
              </p>
              <p>
                <strong>Actions:</strong> Click "Add to Comparison" or "Add to List" to see the button state change. This state persists as you continue searching.
              </p>
              <p>
                <strong>Loading state:</strong> The search has a simulated 300ms delay to demonstrate the loading indicator.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-slate-800 mb-4">Implementation Notes</h2>
            <div className="prose prose-slate max-w-none">
              <p>
                This demo uses mock data and services to simulate backend functionality. In a real application, the search component would connect to actual API endpoints.
              </p>
              <p>
                The component architecture is modular, with separate components for:
              </p>
              <ul>
                <li>Main search input with debouncing</li>
                <li>Category tabs for filtering</li>
                <li>Result groups and items</li>
                <li>Action buttons with state management</li>
              </ul>
              <p>
                The search results dropdown has proper keyboard navigation and accessibility features built-in.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-slate-500 text-sm">
            Enhanced Search Bar Demo © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchDemoPage;

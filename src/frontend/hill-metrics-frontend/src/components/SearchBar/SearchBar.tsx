import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string, isIsin: boolean) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isIsinSearch, setIsIsinSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, isIsinSearch);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Auto-detect if it's an ISIN code (12 alphanumeric characters, starts with 2 letters)
    const isIsin = /^[A-Z]{2}[A-Z0-9]{10}$/i.test(value);
    setIsIsinSearch(isIsin);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name or ISIN code..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="search-type">
        {searchQuery.length > 0 && (
          <span>
            Searching by: {isIsinSearch ? 'ISIN Code' : 'Name'}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

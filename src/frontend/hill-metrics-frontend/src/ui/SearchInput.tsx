import React, { useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  shortcut?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  shortcut,
  className = '',
  onSearch
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form 
      className={`flex items-center gap-2 rounded-md bg-white px-3 py-1.5 ${className}`}
      onSubmit={handleSubmit}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 17.5L13.875 13.875"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="flex-1 border-none outline-none text-sm text-slate-600"
      />
      {shortcut && (
        <div className="flex items-center justify-center rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500 font-mono">
          {shortcut}
        </div>
      )}
    </form>
  );
};

export default SearchInput;

import React from 'react';
import FilterButton from '../ui/FilterButton';

interface FilterBarProps {
  onFilterChange?: (filterType: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const handleFilterClick = (filterType: string) => {
    // In a real application, this would open a dropdown or modal
    console.log(`Filter clicked: ${filterType}`);
    if (onFilterChange) {
      onFilterChange(filterType, '');
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <FilterButton
            label="Assets"
            onClick={() => handleFilterClick('assets')}
          />
          <FilterButton
            label="Sector"
            onClick={() => handleFilterClick('sector')}
          />
          <FilterButton
            label="Market"
            onClick={() => handleFilterClick('market')}
          />
          <FilterButton
            label="Most used"
            onClick={() => handleFilterClick('mostUsed')}
          />
        </div>
        <button
          className="flex items-center gap-2 rounded bg-slate-900 px-3 py-1.5"
          onClick={() => handleFilterClick('advanced')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 5H2.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 10H4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 15H6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-white text-sm leading-6">Advanced filters</div>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;

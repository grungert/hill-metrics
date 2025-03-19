import React from 'react';
import { FilterType } from '../types/filters';

interface FilterItem {
  type: FilterType;
  label: string;
  value: string;
}

interface SelectedFiltersProps {
  filters: FilterItem[];
  onRemoveFilter: (filter: FilterItem) => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({ filters, onRemoveFilter }) => {
  if (filters.length === 0) return null;

  // Group filters by type for better organization
  const groupedFilters: Record<string, FilterItem[]> = {};
  
  filters.forEach(filter => {
    const type = filter.type;
    if (!groupedFilters[type]) {
      groupedFilters[type] = [];
    }
    groupedFilters[type].push(filter);
  });

  // Get filter type display name
  const getFilterTypeLabel = (type: FilterType): string => {
    switch (type) {
      case FilterType.ASSETS:
        return 'Assets';
      case FilterType.SECTOR:
        return 'Sector';
      case FilterType.MARKET:
        return 'Market';
      case FilterType.MOST_USED:
        return 'Most used';
      case FilterType.ADVANCED:
        return 'Advanced';
      case FilterType.COMMON:
        return 'Common';
      case FilterType.SYNTHETIC:
        return 'Synthetic';
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 px-5 py-3">
      {Object.entries(groupedFilters).map(([type, typeFilters]) => (
        typeFilters.map((filter, index) => (
          <div 
            key={`${filter.type}-${filter.value}-${index}`}
            className="flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-sm"
          >
            <span className="text-slate-600">{filter.label}:</span>
            <span className="text-slate-800 font-medium">{filter.value}</span>
            <button 
              onClick={() => onRemoveFilter(filter)}
              className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-100 ml-1"
              aria-label={`Remove ${filter.label} filter`}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 2.5L2.5 7.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.5 2.5L7.5 7.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))
      ))}
    </div>
  );
};

export default SelectedFilters;

import React, { useState, useRef } from 'react';
import FilterButton from '../ui/FilterButton';
import FilterPanel from './FilterPanel/FilterPanel';
import MostUsedFilterPanel from './MostUsedFilterPanel/MostUsedFilterPanel';
import AdvancedFilterPanel from './AdvancedFilterPanel/AdvancedFilterPanel';
import { 
  assetFilterOptions, 
  cryptoFilterOptions,
  mutualFundsFilterOptions,
  stocksFilterOptions,
  bondsFilterOptions,
  realEstateFilterOptions,
  commoditiesFilterOptions,
  privateEquityFilterOptions
} from '../data/assetFilterData';
import { sectorFilterOptions } from '../data/sectorFilterData';

// Market filter options
const marketFilterOptions = [
  { id: 1, name: 'Developed Markets', parentId: null },
  { id: 2, name: 'Emerging Markets', parentId: null },
  { id: 3, name: 'Frontier Markets', parentId: null },
  { id: 4, name: 'Europe', parentId: null },
  { id: 5, name: 'North America', parentId: null },
  { id: 6, name: 'Asia', parentId: null },
  { id: 7, name: 'Oceania', parentId: null }
];

// Most used filter options
const mostUsedFilterOptions = [
  { id: 1, name: 'Recently Viewed', parentId: null },
  { id: 2, name: 'Frequently Used', parentId: null },
  { id: 3, name: 'Favorites', parentId: null }
];
import { FilterType } from '../types/filters';

interface FilterBarProps {
  onFilterChange?: (filterType: string, selectedIds: number[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{[key in FilterType]?: any}>({});
  const [selectedAssetType, setSelectedAssetType] = useState<string>('Cryptocurrency');
  const filterButtonRefs = useRef<{[key in FilterType]?: HTMLDivElement | null}>({});
  const [filterPosition, setFilterPosition] = useState<{top: number, left: number} | null>(null);

  const handleFilterClick = (filterType: FilterType) => {
    // If the same filter is clicked again, close it
    if (activeFilter === filterType) {
      setActiveFilter(null);
      return;
    }

    // Set the active filter
    setActiveFilter(filterType);

    // Calculate position for the dropdown
    const buttonRef = filterButtonRefs.current[filterType];
    if (buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  };

  const handleFilterClose = () => {
    setActiveFilter(null);
  };

  const handleApplyFilters = (filterType: FilterType, selectedData: any) => {
    // Update the selected filters
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: selectedData
    }));

    // Call the parent component's onFilterChange callback
    if (onFilterChange) {
      // For most used filter, we pass the entire filter state
      // For other filters, we pass the selected IDs
      const dataToPass = filterType === FilterType.MOST_USED 
        ? selectedData 
        : selectedData;
      
      onFilterChange(filterType, dataToPass);
    }
  };

  // Handle asset type change in advanced filter panel
  const handleAssetTypeChange = (newAssetType: string) => {
    setSelectedAssetType(newAssetType);
  };

  // Get the count of selected filters for a specific filter type
  const getSelectedCount = (filterType: FilterType): number => {
    if (filterType === FilterType.MOST_USED) {
      // For Most Used filter, we count active indicators
      const filters = selectedFilters[filterType];
      if (!filters) return 0;
      
      // Count how many indicators are set to non-default values
      let count = 0;
      
      // Check if return criteria is set
      if (filters.returnCriteria && 
          (filters.returnCriteria.comparison !== 'Greater than' || 
           filters.returnCriteria.value !== '10%' || 
           filters.returnCriteria.period !== '1 year')) {
        count++;
      }
      
      // Check if risk level is set (default is Very Low)
      if (filters.riskLevel && filters.riskLevel !== 'Very Low') {
        count++;
      }
      
      // Check if liquidity level is set (default is Very High)
      if (filters.liquidityLevel && filters.liquidityLevel !== 'Very High') {
        count++;
      }
      
      // Check if marketcap level is set (default is Very High)
      if (filters.marketcapLevel && filters.marketcapLevel !== 'Very High') {
        count++;
      }
      
      return count;
    }
    
    // For other filter types, just count the array length
    return selectedFilters[filterType]?.length || 0;
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div ref={(el) => { filterButtonRefs.current[FilterType.ASSETS] = el; }}>
            <FilterButton
              label={`Assets${getSelectedCount(FilterType.ASSETS) > 0 ? ` (${getSelectedCount(FilterType.ASSETS)})` : ''}`}
              isActive={activeFilter === FilterType.ASSETS}
              onClick={() => handleFilterClick(FilterType.ASSETS)}
            />
          </div>
          <div ref={(el) => { filterButtonRefs.current[FilterType.SECTOR] = el; }}>
            <FilterButton
              label={`Sector${getSelectedCount(FilterType.SECTOR) > 0 ? ` (${getSelectedCount(FilterType.SECTOR)})` : ''}`}
              isActive={activeFilter === FilterType.SECTOR}
              onClick={() => handleFilterClick(FilterType.SECTOR)}
            />
          </div>
          <div ref={(el) => { filterButtonRefs.current[FilterType.MARKET] = el; }}>
            <FilterButton
              label={`Market${getSelectedCount(FilterType.MARKET) > 0 ? ` (${getSelectedCount(FilterType.MARKET)})` : ''}`}
              isActive={activeFilter === FilterType.MARKET}
              onClick={() => handleFilterClick(FilterType.MARKET)}
            />
          </div>
          <div ref={(el) => { filterButtonRefs.current[FilterType.MOST_USED] = el; }}>
            <FilterButton
              label={`Most used${getSelectedCount(FilterType.MOST_USED) > 0 ? ` (${getSelectedCount(FilterType.MOST_USED)})` : ''}`}
              isActive={activeFilter === FilterType.MOST_USED}
              onClick={() => handleFilterClick(FilterType.MOST_USED)}
            />
          </div>
        </div>
        <button
          className="flex items-center gap-2 rounded bg-slate-900 px-3 py-1.5 text-white"
          onClick={() => handleFilterClick(FilterType.ADVANCED)}
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
          <span className="text-sm leading-6">Advanced filters</span>
        </button>
      </div>

      {/* Asset Filter Panel */}
      {activeFilter === FilterType.ASSETS && filterPosition && (
        <FilterPanel
          title="Select Assets"
          options={assetFilterOptions}
          isOpen={true}
          onClose={handleFilterClose}
          onApplyFilters={(selectedIds) => handleApplyFilters(FilterType.ASSETS, selectedIds)}
          initialSelectedIds={selectedFilters[FilterType.ASSETS] || []}
          position={filterPosition}
        />
      )}

      {/* Sector Filter Panel */}
      {activeFilter === FilterType.SECTOR && filterPosition && (
        <FilterPanel
          title="Select Sectors"
          options={sectorFilterOptions}
          isOpen={true}
          onClose={handleFilterClose}
          onApplyFilters={(selectedIds) => handleApplyFilters(FilterType.SECTOR, selectedIds)}
          initialSelectedIds={selectedFilters[FilterType.SECTOR] || []}
          position={filterPosition}
        />
      )}

      {/* Market Filter Panel */}
      {activeFilter === FilterType.MARKET && filterPosition && (
        <FilterPanel
          title="Select Markets"
          options={marketFilterOptions}
          isOpen={true}
          onClose={handleFilterClose}
          onApplyFilters={(selectedIds) => handleApplyFilters(FilterType.MARKET, selectedIds)}
          initialSelectedIds={selectedFilters[FilterType.MARKET] || []}
          position={filterPosition}
        />
      )}

      {/* Most Used Filter Panel */}
      {activeFilter === FilterType.MOST_USED && filterPosition && (
        <MostUsedFilterPanel
          isOpen={true}
          onClose={handleFilterClose}
          onApplyFilters={(filters) => handleApplyFilters(FilterType.MOST_USED, filters)}
          initialFilters={selectedFilters[FilterType.MOST_USED]}
          position={filterPosition}
        />
      )}

      {/* Advanced Filter Panel */}
      {activeFilter === FilterType.ADVANCED && filterPosition && (
        <AdvancedFilterPanel
          title="Advanced Filters"
          assetType={selectedAssetType}
          cryptoFilters={cryptoFilterOptions}
          mutualFundsFilters={mutualFundsFilterOptions}
          stocksFilters={stocksFilterOptions}
          bondsFilters={bondsFilterOptions}
          realEstateFilters={realEstateFilterOptions}
          commoditiesFilters={commoditiesFilterOptions}
          privateEquityFilters={privateEquityFilterOptions}
          isOpen={true}
          onClose={handleFilterClose}
          onApplyFilters={(selectedIds) => handleApplyFilters(FilterType.ADVANCED, selectedIds)}
          onAssetTypeChange={handleAssetTypeChange}
          initialSelectedIds={selectedFilters[FilterType.ADVANCED] || []}
          position={filterPosition}
        />
      )}
    </div>
  );
};

export default FilterBar;

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import FilterButton from '../ui/FilterButton';
import FilterPanel from './FilterPanel/FilterPanel';
import MostUsedFilterPanel from './MostUsedFilterPanel/MostUsedFilterPanel';
import AdvancedFilterPanel from './AdvancedFilterPanel/AdvancedFilterPanel';
import { FilterType, FilterItem } from '../types/filters';
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

interface FilterBarProps {
  onFilterChange?: (filterType: string, selectedIds: number[]) => void;
  onFilterPillsChange?: (filterPills: FilterItem[]) => void;
  onFilterRemove?: (filterType: FilterType, filterValue: string) => void;
}

// Define the ref type
export interface FilterBarRef {
  handleFilterRemove: (filterType: FilterType, filterValue: string) => void;
}

// Define a type for the Most Used filter state
interface MostUsedFilterState {
  returnCriteria?: {
    comparison: string;
    value: string;
    period: string;
  };
  riskLevel?: string;
  liquidityLevel?: string;
  marketcapLevel?: string;
}

const FilterBar = forwardRef<FilterBarRef, FilterBarProps>((props, ref) => {
  const { onFilterChange, onFilterPillsChange } = props;
  
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{[key in FilterType]?: any}>({});
  const [selectedAssetType, setSelectedAssetType] = useState<string>('Cryptocurrency');
  const filterButtonRefs = useRef<{[key in FilterType]?: HTMLDivElement | null}>({});
  const [filterPosition, setFilterPosition] = useState<{top: number, left: number} | null>(null);
  const [filterPills, setFilterPills] = useState<FilterItem[]>([]);
  
  // Effect to notify parent of filter pills changes
  useEffect(() => {
    if (onFilterPillsChange) {
      onFilterPillsChange(filterPills);
    }
  }, [filterPills, onFilterPillsChange]);

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

  const handleApplyFilters = (filterType: FilterType, selectedIds: number[], selectedOptions?: any) => {
    // Update the selected filters
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: selectedIds
    }));

    // Create filter pills based on the selected options
    if (filterType !== FilterType.MOST_USED) {
      // For regular filter panels (Assets, Sector, Market)
      if (selectedOptions && Array.isArray(selectedOptions)) {
        // Create filter pills for each selected option
        const newPills = selectedOptions.map(option => ({
          type: filterType,
          label: getFilterTypeLabel(filterType),
          value: option.name
        }));

        // Update filter pills
        setFilterPills(prev => {
          // Remove existing pills for this filter type
          const filteredPills = prev.filter(pill => pill.type !== filterType);
          // Add new pills
          return [...filteredPills, ...newPills];
        });
      }
    } else {
      // For Most Used filter panel
      // Handle special case for Most Used filter
      const mostUsedFilters = selectedOptions as MostUsedFilterState;
      
      // Create pills for each active filter in Most Used
      const newPills: FilterItem[] = [];
      
      // Check if return criteria is set
      if (mostUsedFilters?.returnCriteria && 
          (mostUsedFilters.returnCriteria.comparison !== 'Greater than' || 
           mostUsedFilters.returnCriteria.value !== '10%' || 
           mostUsedFilters.returnCriteria.period !== '1 year')) {
        newPills.push({
          type: FilterType.COMMON,
          label: mostUsedFilters.returnCriteria.period,
          value: `${mostUsedFilters.returnCriteria.comparison} ${mostUsedFilters.returnCriteria.value}`
        });
      }
      
      // Check if risk level is set
      if (mostUsedFilters?.riskLevel && mostUsedFilters.riskLevel !== 'Very Low') {
        newPills.push({
          type: FilterType.COMMON,
          label: 'Risk',
          value: mostUsedFilters.riskLevel
        });
      }
      
      // Check if liquidity level is set
      if (mostUsedFilters?.liquidityLevel && mostUsedFilters.liquidityLevel !== 'Very High') {
        newPills.push({
          type: FilterType.COMMON,
          label: 'Liquidity',
          value: mostUsedFilters.liquidityLevel
        });
      }
      
      // Check if marketcap level is set
      if (mostUsedFilters?.marketcapLevel && mostUsedFilters.marketcapLevel !== 'Very High') {
        newPills.push({
          type: FilterType.COMMON,
          label: 'Marketcap',
          value: mostUsedFilters.marketcapLevel
        });
      }
      
      // Update filter pills
      setFilterPills(prev => {
        // Remove existing pills for this filter type
        const filteredPills = prev.filter(pill => pill.type !== FilterType.COMMON);
        // Add new pills
        return [...filteredPills, ...newPills];
      });
    }

    // Call the parent component's onFilterChange callback
    if (onFilterChange) {
      onFilterChange(filterType, selectedIds);
    }
  };
  
  // Helper function to get display name for filter types
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

  // Handle asset type change in advanced filter panel
  const handleAssetTypeChange = (newAssetType: string) => {
    setSelectedAssetType(newAssetType);
  };

  // Method to handle removing a filter when a pill is closed
  const handleFilterRemove = (filterType: FilterType, filterValue: string) => {
    if (filterType === FilterType.COMMON) {
      // Handle Most Used filter removal
      const mostUsedFilters = selectedFilters[FilterType.MOST_USED];
      if (!mostUsedFilters) return;
      
      // Create a copy of the current filters
      const updatedMostUsedFilters = { ...mostUsedFilters };
      
      // Check which property to reset based on the filter value
      if (filterValue.includes('Risk')) {
        updatedMostUsedFilters.riskLevel = 'Very Low';
      } else if (filterValue.includes('Liquidity')) {
        updatedMostUsedFilters.liquidityLevel = 'Very High';
      } else if (filterValue.includes('Marketcap')) {
        updatedMostUsedFilters.marketcapLevel = 'Very High';
      } else {
        // Assume it's a return criteria filter
        updatedMostUsedFilters.returnCriteria = {
          comparison: 'Greater than',
          value: '10%',
          period: '1 year'
        };
      }
      
      // Update the filters
      setSelectedFilters(prev => ({
        ...prev,
        [FilterType.MOST_USED]: updatedMostUsedFilters
      }));
      
      // Update the filter pills
      setFilterPills(prev => 
        prev.filter(pill => 
          !(pill.type === FilterType.COMMON && pill.value === filterValue)
        )
      );
      
      // Notify parent of filter change
      if (onFilterChange) {
        onFilterChange(FilterType.MOST_USED, []);
      }
    } else {
      // Handle regular filter removal (Assets, Sector, Market, Advanced)
      const currentFilters = selectedFilters[filterType] || [];
      
      // Find the option with the matching name
      let optionsToSearch: any[] = [];
      
      switch (filterType) {
        case FilterType.ASSETS:
          optionsToSearch = assetFilterOptions;
          break;
        case FilterType.SECTOR:
          optionsToSearch = sectorFilterOptions;
          break;
        case FilterType.MARKET:
          optionsToSearch = marketFilterOptions;
          break;
        default:
          return; // Unsupported filter type
      }
      
      // Find the option with the matching name
      const option = optionsToSearch.find(opt => opt.name === filterValue);
      if (!option) return;
      
      // Remove the option ID from the selected filters
      const updatedFilters = currentFilters.filter((id: number) => id !== option.id);
      
      // Update the filters
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: updatedFilters
      }));
      
      // Update the filter pills
      setFilterPills(prev => 
        prev.filter(pill => 
          !(pill.type === filterType && pill.value === filterValue)
        )
      );
      
      // Notify parent of filter change
      if (onFilterChange) {
        onFilterChange(filterType, updatedFilters);
      }
    }
  };
  
  // Expose the handleFilterRemove method to the parent component
  useImperativeHandle(ref, () => ({
    handleFilterRemove
  }));
  
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
          onApplyFilters={(selectedIds, selectedOptions) => handleApplyFilters(FilterType.ASSETS, selectedIds, selectedOptions)}
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
          onApplyFilters={(selectedIds, selectedOptions) => handleApplyFilters(FilterType.SECTOR, selectedIds, selectedOptions)}
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
          onApplyFilters={(selectedIds, selectedOptions) => handleApplyFilters(FilterType.MARKET, selectedIds, selectedOptions)}
          initialSelectedIds={selectedFilters[FilterType.MARKET] || []}
          position={filterPosition}
        />
      )}

      {/* Most Used Filter Panel */}
      {activeFilter === FilterType.MOST_USED && filterPosition && (
        <MostUsedFilterPanel
          isOpen={true}
          onClose={handleFilterClose}
          onApplyFilters={(filters) => {
            // Special handling for Most Used filters
            setSelectedFilters(prev => ({
              ...prev,
              [FilterType.MOST_USED]: filters
            }));
            
            // Create pills for each active filter in Most Used
            const newPills: FilterItem[] = [];
            
            // Check if return criteria is set
            if (filters.returnCriteria && 
                (filters.returnCriteria.comparison !== 'Greater than' || 
                 filters.returnCriteria.value !== '10%' || 
                 filters.returnCriteria.period !== '1 year')) {
              newPills.push({
                type: FilterType.COMMON,
                label: filters.returnCriteria.period,
                value: `${filters.returnCriteria.comparison} ${filters.returnCriteria.value}`
              });
            }
            
            // Check if risk level is set
            if (filters.riskLevel && filters.riskLevel !== 'Very Low') {
              newPills.push({
                type: FilterType.COMMON,
                label: 'Risk',
                value: filters.riskLevel
              });
            }
            
            // Check if liquidity level is set
            if (filters.liquidityLevel && filters.liquidityLevel !== 'Very High') {
              newPills.push({
                type: FilterType.COMMON,
                label: 'Liquidity',
                value: filters.liquidityLevel
              });
            }
            
            // Check if marketcap level is set
            if (filters.marketcapLevel && filters.marketcapLevel !== 'Very High') {
              newPills.push({
                type: FilterType.COMMON,
                label: 'Marketcap',
                value: filters.marketcapLevel
              });
            }
            
            // Update filter pills
            setFilterPills(prev => {
              // Remove existing pills for this filter type
              const filteredPills = prev.filter(pill => pill.type !== FilterType.COMMON);
              // Add new pills
              return [...filteredPills, ...newPills];
            });
            
            // Call the parent component's onFilterChange callback
            if (onFilterChange) {
              // For Most Used filter, we pass an empty array as selectedIds
              onFilterChange(FilterType.MOST_USED, []);
            }
          }}
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
});

export default FilterBar;

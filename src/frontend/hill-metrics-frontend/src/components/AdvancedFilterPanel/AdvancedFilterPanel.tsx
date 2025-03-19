import React, { useState, useEffect, useRef } from 'react';
import { FilterOption } from '../../types/filters';
import './AdvancedFilterPanel.css';

interface AdvancedFilterPanelProps {
  title: string;
  assetType: string;
  cryptoFilters: FilterOption[];
  mutualFundsFilters: FilterOption[];
  stocksFilters: FilterOption[];
  bondsFilters: FilterOption[];
  realEstateFilters: FilterOption[];
  commoditiesFilters: FilterOption[];
  privateEquityFilters: FilterOption[];
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (selectedIds: number[]) => void;
  onAssetTypeChange?: (assetType: string) => void;
  initialSelectedIds?: number[];
  position?: { top: number; left: number };
}

const AdvancedFilterPanel: React.FC<AdvancedFilterPanelProps> = ({
  title,
  assetType: initialAssetType,
  cryptoFilters,
  mutualFundsFilters,
  stocksFilters,
  bondsFilters,
  realEstateFilters,
  commoditiesFilters,
  privateEquityFilters,
  isOpen,
  onClose,
  onApplyFilters,
  onAssetTypeChange,
  initialSelectedIds = [],
  position
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(initialSelectedIds);
  const [searchQuery, setSearchQuery] = useState('');
  const [assetType, setAssetType] = useState(initialAssetType);
  const panelRef = useRef<HTMLDivElement>(null);

  // Reset selected options when asset type changes
  useEffect(() => {
    setSelectedOptions([]);
  }, [assetType]);

  // Get the appropriate filters based on the selected asset type
  const getFiltersForAssetType = (): FilterOption[] => {
    switch (assetType.toLowerCase()) {
      case 'cryptocurrency':
        return cryptoFilters;
      case 'mutual funds':
        return mutualFundsFilters;
      case 'stocks':
        return stocksFilters;
      case 'bonds':
        return bondsFilters;
      case 'real estate':
        return realEstateFilters;
      case 'commodities':
        return commoditiesFilters;
      case 'private equity':
        return privateEquityFilters;
      default:
        return [];
    }
  };

  // Effect to handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset selected options when initialSelectedIds changes
  useEffect(() => {
    setSelectedOptions(initialSelectedIds);
  }, [initialSelectedIds]);

  const handleOptionChange = (id: number) => {
    setSelectedOptions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((optionId) => optionId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    const allIds = getFiltersForAssetType().map((option) => option.id);
    setSelectedOptions(allIds);
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  const handleApply = () => {
    onApplyFilters(selectedOptions);
    onClose();
  };

  const handleCancel = () => {
    setSelectedOptions(initialSelectedIds);
    onClose();
  };

  // Filter options based on search query
  const filteredOptions = getFiltersForAssetType().filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  const panelStyle = position
    ? {
        position: 'absolute' as const,
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }
    : {};

  return (
    <div className="advanced-filter-panel" style={panelStyle} ref={panelRef}>
      <div className="filter-header">
        <h3>{title}</h3>
        <span className="toggle-icon" onClick={onClose}>
          ✕
        </span>
      </div>

      <div className="filter-content">
        <div className="asset-type-selector">
          <select 
            value={assetType} 
            onChange={(e) => {
              const newAssetType = e.target.value;
              setAssetType(newAssetType);
              if (onAssetTypeChange) {
                onAssetTypeChange(newAssetType);
              }
            }}
            className="asset-type-select"
          >
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Mutual Funds">Mutual Funds</option>
            <option value="Stocks">Stocks</option>
            <option value="Bonds">Bonds</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Commodities">Commodities</option>
            <option value="Private Equity">Private Equity</option>
          </select>
        </div>

        <div className="filter-section-title">
          {assetType} Specific Filters
        </div>

        <div className="filter-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <button onClick={handleSelectAll} className="select-all">
            Select All
          </button>
          <button onClick={handleClearAll} className="clear-all">
            Clear
          </button>
        </div>

        <div className="filter-options-container">
          <ul className="filter-options">
            {filteredOptions.map((option) => (
              <li key={option.id} className="filter-option">
                <div className="option-row">
                  <div className="option-label-container">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleOptionChange(option.id)}
                      className="option-checkbox"
                    />
                    <div className="option-content">
                      <span className="option-name">{option.name}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-buttons">
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleApply} className="apply-button">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterPanel;

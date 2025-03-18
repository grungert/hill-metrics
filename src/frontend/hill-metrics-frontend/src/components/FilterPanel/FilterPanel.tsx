import { useState, useEffect, useRef, useMemo } from 'react';
import { FilterOption } from '../../types/filters';
import './FilterPanel.css';

interface FilterPanelProps {
  title: string;
  options: FilterOption[];
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (selectedIds: number[]) => void;
  initialSelectedIds?: number[];
  position?: { top: number; left: number };
}

const FilterPanel = ({ 
  title, 
  options, 
  isOpen, 
  onClose, 
  onApplyFilters, 
  initialSelectedIds = [],
  position 
}: FilterPanelProps) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(initialSelectedIds);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

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

  // Initialize expanded categories - all collapsed by default
  useEffect(() => {
    if (isOpen) {
      // Start with all categories collapsed
      setExpandedCategories([]);
    }
  }, [isOpen]);

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
    const allIds = options.map((option) => option.id);
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

  // Toggle category expansion
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Enhanced filtering logic that preserves parent-child relationships
  const { filteredTopLevelOptions, filteredChildOptions } = useMemo(() => {
    if (!searchQuery.trim()) {
      // If no search query, just group by parent
      return {
        filteredTopLevelOptions: options.filter(option => !option.parentId),
        filteredChildOptions: options.filter(option => option.parentId)
      };
    }

    const query = searchQuery.toLowerCase();
    
    // Find all options that match the search query
    const matchingOptions = options.filter(option => 
      option.name.toLowerCase().includes(query)
    );
    
    // Get IDs of all matching options
    const matchingIds = new Set(matchingOptions.map(option => option.id));
    
    // Find parent IDs of matching child options
    const parentIdsOfMatchingChildren = new Set<number>();
    matchingOptions.forEach(option => {
      if (option.parentId) {
        parentIdsOfMatchingChildren.add(option.parentId);
      }
    });
    
    // Find child IDs of matching parent options
    const childIdsOfMatchingParents = new Set<number>();
    options.forEach(option => {
      if (option.parentId && matchingIds.has(option.parentId)) {
        childIdsOfMatchingParents.add(option.id);
      }
    });
    
    // Combine all relevant IDs
    const relevantIds = new Set([
      ...matchingIds,
      ...parentIdsOfMatchingChildren,
      ...childIdsOfMatchingParents
    ]);
    
    // Filter options based on relevant IDs
    const relevantOptions = options.filter(option => relevantIds.has(option.id));
    
    return {
      filteredTopLevelOptions: relevantOptions.filter(option => !option.parentId),
      filteredChildOptions: relevantOptions.filter(option => option.parentId)
    };
  }, [options, searchQuery]);

  // Check if a category has children
  const hasChildren = (categoryId: number) => {
    return filteredChildOptions.some(option => option.parentId === categoryId);
  };

  // Render options with collapsible categories
  const renderOptions = (parentId?: number | null) => {
    const optionsToRender = parentId
      ? filteredChildOptions.filter(option => option.parentId === parentId)
      : filteredTopLevelOptions;

    return (
      <ul className="filter-options">
        {optionsToRender.map(option => {
          const hasChildrenItems = hasChildren(option.id);
          const isExpanded = expandedCategories.includes(option.id);
          
          return (
            <li key={option.id} className="filter-option">
              <div className="option-row">
                <div className="option-label-container">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                    className="option-checkbox"
                  />
                  <div 
                    className="option-content"
                    onClick={() => hasChildrenItems && toggleCategory(option.id)}
                  >
                    {hasChildrenItems && (
                      <span className="expand-icon">
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    )}
                    <span className="option-name">{option.name}</span>
                  </div>
                </div>
              </div>
              
              {hasChildrenItems && isExpanded && (
                <div className="nested-options">
                  {renderOptions(option.id)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (!isOpen) return null;

  const panelStyle = position ? {
    position: 'absolute' as const,
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 1000,
    width: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  } : {};

  return (
    <div className="filter-panel" style={panelStyle} ref={panelRef}>
      <div className="filter-header">
        <h3>{title}</h3>
        <span className="toggle-icon" onClick={onClose}>✕</span>
      </div>

      <div className="filter-content">
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
            {renderOptions()}
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

export default FilterPanel;

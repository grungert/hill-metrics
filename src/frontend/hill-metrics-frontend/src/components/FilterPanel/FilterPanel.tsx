import { useState } from 'react';
import './FilterPanel.css';

interface FilterOption {
  id: number;
  name: string;
  parentId?: number | null;
}

interface FilterPanelProps {
  title: string;
  options: FilterOption[];
  onApplyFilters: (selectedIds: number[]) => void;
}

const FilterPanel = ({ title, options, onApplyFilters }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

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
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group options by parent
  const topLevelOptions = filteredOptions.filter((option) => !option.parentId);
  const childOptions = filteredOptions.filter((option) => option.parentId);

  const renderOptions = (parentId?: number | null) => {
    const optionsToRender = parentId
      ? childOptions.filter((option) => option.parentId === parentId)
      : topLevelOptions;

    return (
      <ul className="filter-options">
        {optionsToRender.map((option) => {
          const hasChildren = childOptions.some(
            (child) => child.parentId === option.id
          );

          return (
            <li key={option.id} className="filter-option">
              <div className="option-row">
                <label className="option-label">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                  />
                  <span>{option.name}</span>
                </label>
                {hasChildren && (
                  <div className="nested-options">
                    {renderOptions(option.id)}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="filter-panel">
      <div className="filter-header" onClick={togglePanel}>
        <h3>{title}</h3>
        <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
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

          {renderOptions()}

          <div className="filter-buttons">
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleApply} className="apply-button">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;

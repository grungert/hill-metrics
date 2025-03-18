import React, { useState } from 'react';
import './MostUsedFilterPanel.css';

interface MostUsedFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: MostUsedFilterState) => void;
  position?: { top: number; left: number };
  initialFilters?: MostUsedFilterState;
}

export interface MostUsedFilterState {
  returnCriteria: {
    comparison: string;
    value: string;
    period: string;
  };
  riskLevel: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  liquidityLevel: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  marketcapLevel: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
}

const MostUsedFilterPanel: React.FC<MostUsedFilterPanelProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  position,
  initialFilters
}) => {
  const [filters, setFilters] = useState<MostUsedFilterState>(
    initialFilters || {
      returnCriteria: {
        comparison: 'Greater than',
        value: '10%',
        period: '1 year'
      },
      riskLevel: 'Very Low',
      liquidityLevel: 'Very High',
      marketcapLevel: 'Very High'
    }
  );

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleReturnComparisonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      returnCriteria: {
        ...prev.returnCriteria,
        comparison: e.target.value
      }
    }));
  };

  const handleReturnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      returnCriteria: {
        ...prev.returnCriteria,
        value: e.target.value
      }
    }));
  };

  const handleReturnPeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      returnCriteria: {
        ...prev.returnCriteria,
        period: e.target.value
      }
    }));
  };

  const handleLevelChange = (
    type: 'riskLevel' | 'liquidityLevel' | 'marketcapLevel',
    value: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High'
  ) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const renderLevelSelector = (
    label: string,
    type: 'riskLevel' | 'liquidityLevel' | 'marketcapLevel',
    currentValue: string
  ) => {
    const levels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
    
    return (
      <div className="level-selector">
        <div className="level-label">
          {label}: <span className="level-value">{currentValue}</span>
        </div>
        <div className="level-options">
          {levels.map((level, index) => (
            <div 
              key={level} 
              className={`level-option ${index === 0 ? 'first' : ''} ${index === levels.length - 1 ? 'last' : ''}`}
            >
              <div 
                className={`level-checkbox ${filters[type] === level ? 'selected' : ''}`}
                onClick={() => handleLevelChange(type, level as any)}
              >
                {filters[type] === level && (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="level-labels">
          <div className="level-label-left">Very Low</div>
          <div className="level-label-center">Moderate</div>
          <div className="level-label-right">Very High</div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  const panelStyle = position
    ? {
        position: 'absolute' as const,
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000
      }
    : {};

  return (
    <div className="most-used-filter-panel" style={panelStyle}>
      <div className="filter-header">
        <h3>Return</h3>
        <span className="toggle-icon" onClick={onClose}>✕</span>
      </div>

      <div className="filter-content">
        <div className="return-criteria">
          <select 
            className="comparison-select"
            value={filters.returnCriteria.comparison}
            onChange={handleReturnComparisonChange}
          >
            <option value="Greater than">Greater than</option>
            <option value="Less than">Less than</option>
            <option value="Equal to">Equal to</option>
          </select>
          
          <input 
            type="text" 
            className="value-input"
            value={filters.returnCriteria.value}
            onChange={handleReturnValueChange}
          />
          
          <select 
            className="period-select"
            value={filters.returnCriteria.period}
            onChange={handleReturnPeriodChange}
          >
            <option value="1 year">1 year</option>
            <option value="3 years">3 years</option>
            <option value="5 years">5 years</option>
            <option value="10 years">10 years</option>
          </select>
        </div>

        {renderLevelSelector('Risk indicator', 'riskLevel', filters.riskLevel)}
        {renderLevelSelector('Liquidity indicator', 'liquidityLevel', filters.liquidityLevel)}
        {renderLevelSelector('Marketcap indicator', 'marketcapLevel', filters.marketcapLevel)}

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

export default MostUsedFilterPanel;

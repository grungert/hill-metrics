import React, { useState, useRef, useEffect } from 'react';
import { TableColumn } from '../../types/dashboard';
import './ColumnSelector.css';

interface ColumnSelectorProps {
  columns: TableColumn[];
  onColumnChange: (columns: TableColumn[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  onColumnChange,
  isOpen,
  onClose,
}) => {
  const [localColumns, setLocalColumns] = useState<TableColumn[]>([]);
  const [draggedColumn, setDraggedColumn] = useState<TableColumn | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize local columns state
  useEffect(() => {
    setLocalColumns([...columns]);
  }, [columns]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    // Handle escape key to close dropdown
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string) => {
    // Don't allow hiding the Name column
    if (columnId === 'name') return;

    const updatedColumns = localColumns.map(col => {
      if (col.id === columnId) {
        return { ...col, visible: col.visible === undefined ? false : !col.visible };
      }
      return col;
    });
    
    setLocalColumns(updatedColumns);
    onColumnChange(updatedColumns);
  };

  // Hide all columns except Name
  const hideAllColumns = () => {
    const updatedColumns = localColumns.map(col => {
      if (col.id === 'name') {
        return { ...col, visible: true };
      }
      return { ...col, visible: false };
    });
    
    setLocalColumns(updatedColumns);
    onColumnChange(updatedColumns);
  };

  // Handle drag start
  const handleDragStart = (column: TableColumn) => {
    setDraggedColumn(column);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedColumn) return;
    
    const sourceIndex = localColumns.findIndex(col => col.id === draggedColumn.id);
    if (sourceIndex === targetIndex) return;
    
    const updatedColumns = [...localColumns];
    const [removed] = updatedColumns.splice(sourceIndex, 1);
    updatedColumns.splice(targetIndex, 0, removed);
    
    // Update order property
    const columnsWithOrder = updatedColumns.map((col, idx) => ({
      ...col,
      order: idx
    }));
    
    setLocalColumns(columnsWithOrder);
    onColumnChange(columnsWithOrder);
    setDraggedColumn(null);
    setDragOverIndex(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverIndex(null);
  };

  if (!isOpen) return null;

  return (
    <div className="column-selector-dropdown" ref={dropdownRef}>
      <div className="column-selector-header">
        <span>Shown in table</span>
        <button className="hide-all-button" onClick={hideAllColumns}>Hide all</button>
      </div>
      <div className="column-selector-list">
        {localColumns.map((column, index) => (
          <div
            key={column.id}
            className={`column-selector-item ${dragOverIndex === index ? 'drag-over' : ''}`}
            draggable={true}
            onDragStart={() => handleDragStart(column)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="drag-handle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="1" fill="#64748B" />
                <circle cx="4" cy="8" r="1" fill="#64748B" />
                <circle cx="4" cy="12" r="1" fill="#64748B" />
                <circle cx="8" cy="4" r="1" fill="#64748B" />
                <circle cx="8" cy="8" r="1" fill="#64748B" />
                <circle cx="8" cy="12" r="1" fill="#64748B" />
              </svg>
            </div>
            <div className="column-name">{column.label}</div>
            <button 
              className={`visibility-toggle ${column.id === 'name' ? 'disabled' : ''}`}
              onClick={() => toggleColumnVisibility(column.id)}
              disabled={column.id === 'name'}
            >
              {column.visible === false ? (
                // Slashed eye icon for hidden columns
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2.5 2.5L17.5 17.5" 
                    stroke="#CBD5E1" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M8.82 8.82C8.52 9.12 8.33 9.52 8.33 10C8.33 10.97 9.12 11.75 10.08 11.75C10.57 11.75 10.97 11.57 11.27 11.27" 
                    stroke="#CBD5E1" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M13.53 13.53C12.25 14.48 10.83 15 10 15C6.67 15 3.83 12.77 2.5 10C3.12 8.74 4.06 7.68 5.17 6.92" 
                    stroke="#CBD5E1" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M6.67 6.33C7.67 5.67 8.83 5.33 10 5.33C13.33 5.33 16.17 7.57 17.5 10.33C17.17 10.97 16.75 11.57 16.25 12.08" 
                    stroke="#CBD5E1" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Regular eye icon for visible columns
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M10 4.37C13.3333 4.37 16.1667 6.60333 17.5 10C16.1667 13.3967 13.3333 15.63 10 15.63C6.66667 15.63 3.83333 13.3967 2.5 10C3.83333 6.60333 6.66667 4.37 10 4.37Z" 
                    stroke={column.id === 'name' ? "#0F172A" : "#0F172A"} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" 
                    stroke={column.id === 'name' ? "#0F172A" : "#0F172A"} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnSelector;

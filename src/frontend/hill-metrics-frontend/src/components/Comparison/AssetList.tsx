import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Eye, EyeOff, Trash2, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Asset, Column, columns as defaultColumns } from "./mockData";

interface AssetListProps {
  assets: Asset[];
  toggleSelection: (id: string) => void;
  toggleVisibility: (id: string) => void;
  isListCollapsed: boolean;
  toggleListCollapse: () => void;
  hideAssets?: (ids: string[]) => void;
  showAssets?: (ids: string[]) => void;
  deleteAssets?: (ids: string[]) => void;
  changeAssetColor?: (id: string, color: string) => void;
  hoveredAssetId: string | null;
  setHoveredAssetId: (id: string | null) => void;
}

export default function AssetList({ 
  assets, 
  toggleSelection, 
  toggleVisibility,
  isListCollapsed,
  toggleListCollapse,
  hideAssets = () => {},
  showAssets = () => {},
  deleteAssets = () => {},
  changeAssetColor = () => {},
  hoveredAssetId,
  setHoveredAssetId
}: AssetListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [isColumnsDropdownOpen, setIsColumnsDropdownOpen] = useState(false);
  const columnsDropdownRef = useRef<HTMLDivElement>(null);
  // Track selected rows separately from asset.selected
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // Track which row is being hovered
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  // Track if color picker is open
  const [colorPickerOpen, setColorPickerOpen] = useState<string | null>(null);

  // Handle row selection
  const handleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id) 
        : [...prev, id]
    );
  };

  // Handle action buttons
  const handleHideSelected = () => {
    if (selectedRows.length > 0) {
      hideAssets(selectedRows);
    }
  };

  const handleShowSelected = () => {
    if (selectedRows.length > 0) {
      showAssets(selectedRows);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length > 0) {
      if (window.confirm(`Are you sure you want to delete ${selectedRows.length} selected items?`)) {
        deleteAssets(selectedRows);
        setSelectedRows([]);
      }
    }
  };
  
  const itemsPerPage = 16;
  const totalItems = assets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentAssets = assets.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(columns.map(column => 
      column.id === columnId ? { ...column, visible: !column.visible } : column
    ));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnsDropdownRef.current && !columnsDropdownRef.current.contains(event.target as Node)) {
        setIsColumnsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Collapse/Expand Button - Always visible */}
      <button 
        onClick={toggleListCollapse}
        className="absolute right-4 top-4 transform translate-x-1/2 z-20 bg-white rounded-md p-1 shadow-sm border border-gray-200 text-gray-500 hover:bg-gray-50"
        aria-label={isListCollapsed ? "Expand list" : "Collapse list"}
      >
        {isListCollapsed ? (
          <div className="flex items-center text-xs">
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium">|</span>
          </div>
        ) : (
          <div className="flex items-center text-xs">
            <span className="font-medium">|</span>
            <ChevronLeft className="h-3.5 w-3.5" />
          </div>
        )}
      </button>

      {/* Content - Only visible when not collapsed */}
      {!isListCollapsed && (
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">List</h2>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="relative" ref={columnsDropdownRef}>
                <button 
                  onClick={() => setIsColumnsDropdownOpen(!isColumnsDropdownOpen)}
                  className="flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
                >
                  <span>Columns</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {/* Columns Dropdown */}
                {isColumnsDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {columns.map((column) => (
                        <div 
                          key={column.id}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => toggleColumnVisibility(column.id)}
                        >
                          <div className={`w-4 h-4 mr-2 flex items-center justify-center rounded border ${column.visible ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                            {column.visible && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>{column.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button className="flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50">
                  <span>Show all</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex border-b border-gray-200 text-sm">
            <button 
              onClick={handleHideSelected}
              disabled={selectedRows.length === 0}
              className={`flex-1 py-2 flex justify-center items-center ${
                selectedRows.length === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Eye className="h-4 w-4 mr-1" />
              <span>Hide</span>
            </button>
            <button 
              onClick={handleShowSelected}
              disabled={selectedRows.length === 0}
              className={`flex-1 py-2 flex justify-center items-center border-l border-r border-gray-200 ${
                selectedRows.length === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <EyeOff className="h-4 w-4 mr-1" />
              <span>Show</span>
            </button>
            <button 
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
              className={`flex-1 py-2 flex justify-center items-center ${
                selectedRows.length === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span>Delete</span>
            </button>
          </div>
          
          {/* Asset List with CSS Grid */}
          <div className="flex-1 overflow-auto h-0 min-h-0">
            {/* Grid Container */}
            <div className="min-w-full">
              {/* Header Row */}
              <div className="grid gap-1 bg-gray-50 border-b border-gray-200" 
                style={{ 
                  gridTemplateColumns: `
                    ${columns.find(col => col.id === 'instrument' && col.visible) ? 'minmax(200px, auto)' : '0px'} 
                    ${columns.find(col => col.id === 'date' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                    ${columns.find(col => col.id === 'nav' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                    ${columns.find(col => col.id === 'oneYear' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                    ${columns.find(col => col.id === 'sortino' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                    ${columns.find(col => col.id === 'volatility' && col.visible) ? 'minmax(100px, auto)' : '0px'} 
                    ${columns.find(col => col.id === 'ytd' && col.visible) ? 'minmax(80px, auto)' : '0px'}
                  `,
                  gridAutoFlow: 'column',
                }}
              >
                {columns.find(col => col.id === 'instrument' && col.visible) && (
                  <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instrument
                  </div>
                )}
                {columns.find(col => col.id === 'date' && col.visible) && (
                  <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </div>
                )}
                {columns.find(col => col.id === 'nav' && col.visible) && (
                  <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NAV
                  </div>
                )}
                {columns.find(col => col.id === 'oneYear' && col.visible) && (
                  <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    1Y
                  </div>
                )}
                {columns.find(col => col.id === 'sortino' && col.visible) && (
                  <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sortino
                  </div>
                )}
                {columns.find(col => col.id === 'volatility' && col.visible) && (
                  <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volatility
                  </div>
                )}
                {columns.find(col => col.id === 'ytd' && col.visible) && (
                  <div className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    YTD %
                  </div>
                )}
              </div>

              {/* Data Rows */}
              {currentAssets.map((asset) => (
                <div 
                  key={asset.id} 
                  className={`grid gap-1 border-b border-gray-200 relative group ${
                    selectedRows.includes(asset.id) 
                      ? 'bg-slate-100' // #f1f5f9
                      : 'hover:bg-slate-200' // #e2e8f0
                  }`}
                  style={{ 
                    gridTemplateColumns: `
                      ${columns.find(col => col.id === 'instrument' && col.visible) ? 'minmax(200px, auto)' : '0px'} 
                      ${columns.find(col => col.id === 'date' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                      ${columns.find(col => col.id === 'nav' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                      ${columns.find(col => col.id === 'oneYear' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                      ${columns.find(col => col.id === 'sortino' && col.visible) ? 'minmax(80px, auto)' : '0px'} 
                      ${columns.find(col => col.id === 'volatility' && col.visible) ? 'minmax(100px, auto)' : '0px'} 
                      ${columns.find(col => col.id === 'ytd' && col.visible) ? 'minmax(80px, auto)' : '0px'}
                    `,
                    gridAutoFlow: 'column',
                  }}
                  onMouseEnter={() => {
                    setHoveredRow(asset.id);
                    setHoveredAssetId(asset.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredRow(null);
                    setHoveredAssetId(null);
                  }}
                >
                  {/* Color indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: asset.color }}></div>
                  
                  {/* Hover Menu */}
                  {hoveredRow === asset.id && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-md border border-gray-200 z-10">
                      <div className="py-1">
                        <button 
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => toggleVisibility(asset.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Hide from graph
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${asset.name}?`)) {
                              deleteAssets([asset.id]);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete from list
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setColorPickerOpen(colorPickerOpen === asset.id ? null : asset.id)}
                        >
                          <div className="h-4 w-4 mr-2 rounded-full" style={{ backgroundColor: asset.color }}></div>
                          <div className="flex-1">Change color in graph</div>
                        </button>
                        {colorPickerOpen === asset.id && (
                          <div className="p-2 grid grid-cols-5 gap-1">
                            {['#F7931A', '#627EEA', '#26A17B', '#9B59B6', '#23B5E8', 
                              '#00FFA3', '#0033AD', '#E84142', '#F3BA2F', '#7D00FF'].map(color => (
                              <button
                                key={color}
                                className="w-5 h-5 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                  changeAssetColor(asset.id, color);
                                  setColorPickerOpen(null);
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Instrument column */}
                  {columns.find(col => col.id === 'instrument' && col.visible) && (
                    <div className="px-4 py-3 flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-black border-gray-300 rounded mr-3"
                        checked={selectedRows.includes(asset.id)}
                        onChange={() => handleRowSelection(asset.id)}
                      />
                      <span className="text-sm font-medium text-gray-900 mr-2">{asset.index}</span>
                      <button
                        className="text-gray-400 hover:text-gray-600 mr-3"
                        onClick={() => toggleVisibility(asset.id)}
                      >
                        {asset.visible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                      <span className="text-sm font-medium text-gray-900 truncate">{asset.name}</span>
                    </div>
                  )}
                  
                  {/* Date column */}
                  {columns.find(col => col.id === 'date' && col.visible) && (
                    <div className="px-4 py-3 text-sm text-gray-900">
                      6.35%
                    </div>
                  )}
                  
                  {/* NAV column */}
                  {columns.find(col => col.id === 'nav' && col.visible) && (
                    <div className="px-4 py-3 text-sm text-gray-900">
                      6.35%
                    </div>
                  )}
                  
                  {/* 1Y column */}
                  {columns.find(col => col.id === 'oneYear' && col.visible) && (
                    <div className="px-4 py-3 text-sm text-gray-900">
                      6.35%
                    </div>
                  )}
                  
                  {/* Sortino column */}
                  {columns.find(col => col.id === 'sortino' && col.visible) && (
                    <div className="px-4 py-3 text-sm text-gray-900">
                      6.35%
                    </div>
                  )}
                  
                  {/* Volatility column */}
                  {columns.find(col => col.id === 'volatility' && col.visible) && (
                    <div className="px-4 py-3 text-sm text-gray-900">
                      6.35%
                    </div>
                  )}
                  
                  {/* YTD % column */}
                  {columns.find(col => col.id === 'ytd' && col.visible) && (
                    <div className="px-4 py-3">
                      <span className="text-sm font-medium text-green-600">+37.02%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Add Button */}
          <div className="border-t border-gray-200 p-2">
            <button className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Quick add</span>
            </button>
          </div>
          
          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm text-gray-500">
            <div>
              Showing {startIndex + 1} - {endIndex} out of {totalItems} items
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded ${
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-6 h-6 flex items-center justify-center rounded ${
                      currentPage === pageNum
                        ? 'bg-gray-900 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded ${
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

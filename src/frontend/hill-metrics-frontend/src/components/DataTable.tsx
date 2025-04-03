import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from './EmptyState';
import ColumnSelector from './ColumnSelector/ColumnSelector';
import { TableColumn } from '../types/dashboard';
import { downloadFile, convertToCSV } from '../utils/fileDownload';

interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  isLoading?: boolean;
  onRowSelect?: (id: string | number, selected: boolean) => void;
  onSearch?: (query: string) => void;
  highlightedRowId?: string | null;
  itemsPerPage?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  columns: initialColumns,
  data,
  isLoading = false,
  onRowSelect,
  onSearch,
  highlightedRowId = null,
  itemsPerPage = 10,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total number of pages
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  
  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex);
  };
  
  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);
  
  // Handle page navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Current page data
  const currentPageData = getCurrentPageData();
  
  // Calculate showing results text
  const getShowingResultsText = () => {
    if (data.length === 0) {
      return "No results";
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + currentPageData.length - 1, data.length);
    return `Showing ${startIndex}-${endIndex} of ${data.length} results`;
  };
  const navigate = useNavigate();
  
  // Handle row click to navigate to overview page
  const handleRowClick = (id: string | number, event: React.MouseEvent) => {
    // Prevent navigation if clicking on checkbox
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    
    // Navigate to overview page with the instrument ID
    navigate(`/overview/${id}`);
  };
  // Initialize columns with visibility and order properties
  const [columns, setColumns] = useState<TableColumn[]>(() => 
    initialColumns.map((col, index) => ({
      ...col,
      visible: col.visible === undefined ? true : col.visible,
      order: col.order === undefined ? index : col.order,
      canHide: col.id !== 'name' // Name column cannot be hidden
    }))
  );
  
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const columnSelectorRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (downloadRef.current && !downloadRef.current.contains(event.target as Node)) {
        setIsDownloadOpen(false);
      }
    }

    // Handle escape key to close dropdown
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDownloadOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle column selector click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (columnSelectorRef.current && !columnSelectorRef.current.contains(event.target as Node)) {
        setIsColumnSelectorOpen(false);
      }
    }

    // Handle escape key to close dropdown
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsColumnSelectorOpen(false);
      }
    }

    if (isColumnSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isColumnSelectorOpen]);

  const toggleDownloadDropdown = () => {
    setIsDownloadOpen(!isDownloadOpen);
    if (isColumnSelectorOpen) setIsColumnSelectorOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const toggleColumnSelector = () => {
    setIsColumnSelectorOpen(!isColumnSelectorOpen);
    if (isDownloadOpen) setIsDownloadOpen(false);
  };

  // Handle column changes from the ColumnSelector
  const handleColumnChange = (updatedColumns: TableColumn[]) => {
    setColumns(updatedColumns);
  };

  const handleDownloadJSON = () => {
    // If no data, create sample data based on columns
    const dataToDownload = data.length > 0 
      ? data 
      : [columns.reduce((obj, col) => {
          if (col.id !== 'number') {
            obj[col.id] = `Sample ${col.label}`;
          }
          return obj;
        }, {} as Record<string, any>)];
    
    const jsonContent = JSON.stringify(dataToDownload, null, 2);
    downloadFile(jsonContent, 'dashboard-data.json', 'application/json');
    setIsDownloadOpen(false);
  };

  const handleDownloadCSV = () => {
    // If no data, create sample data based on columns
    const dataToDownload = data.length > 0 
      ? data 
      : [columns.reduce((obj, col) => {
          if (col.id !== 'number') {
            obj[col.id] = `Sample ${col.label}`;
          }
          return obj;
        }, {} as Record<string, any>)];
    
    const csvContent = convertToCSV(dataToDownload);
    downloadFile(csvContent, 'dashboard-data.csv', 'text/csv;charset=utf-8;');
    setIsDownloadOpen(false);
  };

  // Render star rating
  const renderRating = (rating: number) => {
    const stars = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <svg 
          key={i}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill={i <= rating ? "#64738b" : "none"} 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M8 1.33334L10.06 5.50668L14.6667 6.18001L11.3333 9.42668L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42668L1.33334 6.18001L5.94 5.50668L8 1.33334Z" 
            stroke={i <= rating ? "#64738b" : "#CBD5E1"} 
            strokeWidth="1.33333" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // Format percentage values
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Format date values
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center h-9 mb-4">
        <div className="flex items-center gap-2">
          <div className="text-slate-900 text-lg font-bold leading-6 tracking-[0.36px]">
            Matching results
          </div>
          <div className="text-slate-600 text-sm leading-4 pt-[3px]">
            ({data.length})
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex w-[212px] h-9 items-center rounded px-2 py-2.5">
            <div className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 14.0001L11.1 11.1001"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search instruments..."
                  className="text-slate-600 text-sm leading-4 outline-none w-full"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={columnSelectorRef}>
              <div
                className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-1.5 cursor-pointer"
                onClick={toggleColumnSelector}
              >
                <div className="text-slate-900 text-sm leading-6">Columns</div>
                <div className="text-slate-900 text-sm leading-6">All</div>
                <div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="#0F172A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              {isColumnSelectorOpen && (
                <ColumnSelector
                  columns={columns}
                  onColumnChange={handleColumnChange}
                  isOpen={isColumnSelectorOpen}
                  onClose={() => setIsColumnSelectorOpen(false)}
                />
              )}
            </div>
            
            <div className="relative" ref={downloadRef}>
              <div
                className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-1.5 cursor-pointer"
                onClick={toggleDownloadDropdown}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                    stroke="#0F172A"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.66669 6.66667L8.00002 10L11.3334 6.66667"
                    stroke="#0F172A"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10V2"
                    stroke="#0F172A"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-slate-900 text-sm leading-6">Download</div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#0F172A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              {isDownloadOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 shadow-md rounded-md z-10">
                  <div 
                    className="px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 cursor-pointer"
                    onClick={handleDownloadJSON}
                  >
                    JSON
                  </div>
                  <div 
                    className="px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 cursor-pointer"
                    onClick={handleDownloadCSV}
                  >
                    CSV
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 rounded border border-slate-200 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white border-bottom">
              <th className="w-10 p-3 text-left border-b border-slate-200 border-bottom">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-slate-300 bg-white rounded-sm"
                  onChange={(e) => {
                    // In a real application, this would select all rows
                    console.log("Select all:", e.target.checked);
                  }}
                />
              </th>
              {columns
                .filter(column => column.visible !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((column) => (
                <th
                  key={column.id}
                  className={`p-3 text-left border-b border-slate-200 border-bottom ${
                    column.width
                      ? `w-[${column.width}]`
                      : column.flex
                        ? "w-full"
                        : ""
                  }`}
                >
                  <div className="text-slate-900 text-xs font-bold leading-4">
                    {column.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {data.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length + 1} className="p-8 text-center">
                  <EmptyState
                    message={
                      <>
                        <span className="font-bold text-lg">Nothing to show.</span>
                        <span> Please update your filters.</span>
                      </>
                    }
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentPageData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} cursor-pointer hover:bg-slate-100 ${
                    highlightedRowId && row.id?.toString() === highlightedRowId ? 'row-highlight' : ''
                  }`}
                  onClick={(e) => handleRowClick(row.id, e)}
                >
                  <td className="p-3 border-b border-slate-200 ç">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-slate-300 bg-white rounded-sm"
                      onChange={(e) => {
                        if (onRowSelect) {
                          onRowSelect(row.id, e.target.checked);
                        }
                      }}
                    />
                  </td>
                  {columns
                    .filter(column => column.visible !== false)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((column) => (
                    <td
                      key={`${row.id}-${column.id}`}
                      className={`p-3 border-b border-slate-200 text-slate-700 text-sm leading-5 ${
                        column.id === "ytdPercentage" || column.id === "oneYearPercentage" || column.id === "threeYearPercentage" || column.id === "date"
                          ? "text-right"
                          : column.id === "risk" || column.id === "pricing" || column.id === "currency"
                            ? "text-center"
                            : ""
                      }`}
                    >
                      {column.id === "number" ? (
                        (currentPage - 1) * itemsPerPage + rowIndex + 1
                      ) : column.id === "rating" ? (
                        renderRating(row[column.id])
                      ) : column.id === "ytdPercentage" || column.id === "oneYearPercentage" || column.id === "threeYearPercentage" ? (
                        formatPercentage(row[column.id])
                      ) : column.id === "date" ? (
                        formatDate(row[column.id])
                      ) : column.id === "risk" ? (
                        <span className="font-medium">{row[column.id]}</span>
                      ) : column.id === "pricing" ? (
                        row[column.id] || "-"
                      ) : column.id === "currency" ? (
                        row[column.id]
                      ) : row[column.id] !== undefined ? (
                        row[column.id]
                      ) : (
                        "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <div className="flex justify-between items-center bg-white px-3 py-2">
          <div className="flex items-center gap-4">
            <div className="text-gray-500 text-sm leading-5 gap-2 px-0 py-2.5 rounded-[21px]">
              {getShowingResultsText()}
            </div>
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                className="flex justify-center items-center gap-2 bg-white p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-white border border-slate-200"
                onClick={goToPreviousPage}
                disabled={currentPage === 1 || data.length === 0}
                aria-label="Previous page"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="#64748B"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`flex items-center justify-center text-xs w-7 h-7 rounded-md transition-colors ${
                      currentPage === page
                        ? 'text-white bg-slate-900'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                className="flex justify-center items-center gap-2 bg-white p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-white border border-slate-200"
                onClick={goToNextPage}
                disabled={currentPage === totalPages || data.length === 0}
                aria-label="Next page"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#64748B"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;

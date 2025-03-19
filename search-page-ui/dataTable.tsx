import React from "react";
import EmptyState from "./EmptyState";
import { TableColumn } from "../../types/dashboard";
import { downloadFile, convertToCSV } from "../../utils/fileDownload";

interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  isLoading?: boolean;
  onRowSelect?: (id: string, selected: boolean) => void;
  onSearch?: (query: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  isLoading = false,
  onRowSelect,
  onSearch,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleColumnToggle = () => {
    // In a real application, this would open a dropdown to select columns
    console.log("Toggle columns");
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
          <div className="flex w-[212px] h-9 items-center rounded border border-slate-300 bg-white px-2 py-2.5">
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
            <div
              className="flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5 cursor-pointer"
              onClick={handleColumnToggle}
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
            
            <div className="relative group">
              <div
                className="flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5 cursor-pointer"
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
              
              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 shadow-md rounded-md z-10 hidden group-hover:block">
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 rounded border border-slate-200">
        <div className="flex flex-col flex-1">
          <div className="flex border border-slate-100 bg-white">
            <div className="flex items-start gap-2 border border-slate-100 p-3">
              <input
                type="checkbox"
                className="w-4 h-4 border border-slate-300 bg-white rounded-sm"
                onChange={(e) => {
                  // In a real application, this would select all rows
                  console.log("Select all:", e.target.checked);
                }}
              />
            </div>
            {columns.map((column) => (
              <div
                key={column.id}
                className={`text-slate-900 text-xs font-bold leading-4 ${
                  column.width
                    ? `w-[${column.width}]`
                    : column.flex
                      ? "flex-1"
                      : ""
                } gap-2 border border-slate-100 p-3`}
              >
                {column.label}
              </div>
            ))}
          </div>

          {data.length === 0 ? (
            <EmptyState
              message={
                <>
                  <span className="font-bold text-lg">Nothing to show.</span>
                  <span> Please update your filters.</span>
                </>
              }
            />
          ) : (
            <div className="flex-1 bg-white">
              {data.map((row, rowIndex) => (
                <div
                  key={row.id || rowIndex}
                  className="flex border-b border-slate-100"
                >
                  <div className="flex items-center gap-2 border-r border-slate-100 p-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-slate-300 bg-white rounded-sm"
                      onChange={(e) => {
                        if (onRowSelect) {
                          onRowSelect(row.id, e.target.checked);
                        }
                      }}
                    />
                  </div>
                  {columns.map((column) => (
                    <div
                      key={`${row.id}-${column.id}`}
                      className={`text-slate-700 text-sm leading-5 ${
                        column.width
                          ? `w-[${column.width}]`
                          : column.flex
                            ? "flex-1"
                            : ""
                      } border-r border-slate-100 p-3`}
                    >
                      {column.id === "number"
                        ? rowIndex + 1
                        : row[column.id] !== undefined
                          ? row[column.id]
                          : "-"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center bg-white px-3 py-2">
          <div className="flex items-center gap-4">
            <div className="text-gray-500 text-sm leading-5 gap-2 px-0 py-2.5 rounded-[21px]">
              {data.length === 0
                ? "No results"
                : `Showing ${data.length} results`}
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex justify-center items-center gap-2">
            <button
              className="flex justify-center items-center gap-2 bg-white p-1.5 rounded-lg disabled:opacity-50"
              disabled={data.length === 0}
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
            <div className="flex justify-center items-center">
              <div className="text-slate-100 text-xs leading-4 w-7 h-7 gap-2 bg-slate-900 p-2 rounded-md">
                1
              </div>
            </div>
            <button
              className="flex justify-center items-center gap-2 bg-white pl-2 pr-0 py-1.5 rounded-lg disabled:opacity-50"
              disabled={data.length === 0}
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
        </div>
      </div>
    </div>
  );
};

export default DataTable
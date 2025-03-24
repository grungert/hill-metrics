import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Asset, ChartDataPoint } from "./mockData";
import { mockAssetData } from "./mockData";
import { Calendar } from "lucide-react";

interface GraphProps {
  data: ChartDataPoint[];
  timeRange: string;
  setTimeRange: (range: string) => void;
  customStartDate?: Date | null;
  customEndDate?: Date | null;
  setCustomStartDate?: (date: Date | null) => void;
  setCustomEndDate?: (date: Date | null) => void;
  hoveredAssetId?: string | null;
}

export default function Graph({ 
  data, 
  timeRange, 
  setTimeRange,
  customStartDate,
  customEndDate,
  setCustomStartDate,
  setCustomEndDate,
  hoveredAssetId
}: GraphProps) {
  const timeRanges = ["12H", "1D", "1W", "1M", "3M", "1Y", "ALL"];
  
  // State for date picker
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isCustomRange, setIsCustomRange] = useState(timeRange === 'CUSTOM');
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // Use local state for the date picker, but sync with parent state
  const [localStartDate, setLocalStartDate] = useState<Date | null>(customStartDate || null);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(customEndDate || null);
  
  // Update local state when props change
  useEffect(() => {
    setIsCustomRange(timeRange === 'CUSTOM');
    setLocalStartDate(customStartDate || null);
    setLocalEndDate(customEndDate || null);
  }, [timeRange, customStartDate, customEndDate]);
  
  // Get visible assets for the chart
  const visibleAssets = mockAssetData.filter((asset) => asset.visible);
  
  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle date range selection
  const handleApplyDateRange = () => {
    if (localStartDate && localEndDate && setCustomStartDate && setCustomEndDate) {
      setIsCustomRange(true);
      setTimeRange('CUSTOM');
      setCustomStartDate(localStartDate);
      setCustomEndDate(localEndDate);
      setIsDatePickerOpen(false);
    }
  };
  
  // Format date for display
  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Calculate and display date range for any time range
  const getDateRangeLabel = () => {
    // For custom range, use the selected dates
    if (isCustomRange && localStartDate && localEndDate) {
      return `${formatDateForDisplay(localStartDate)} - ${formatDateForDisplay(localEndDate)}`;
    }
    
    // For preset ranges, calculate the date range
    const endDate = new Date(); // Use current date as end date
    const startDate = new Date(endDate); // Clone end date to create start date
    
    // Calculate start date based on time range
    switch (timeRange) {
      case "12H":
        startDate.setHours(endDate.getHours() - 12);
        break;
      case "1D":
        startDate.setDate(endDate.getDate() - 1);
        break;
      case "1W":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "1M":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "3M":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "1Y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      case "ALL":
        startDate.setFullYear(endDate.getFullYear() - 5); // Assuming "ALL" means 5 years
        break;
      default:
        return null;
    }
    
    return `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center mb-4">
        {/* Date Range Label - Always visible */}
        <div className="text-sm font-medium text-gray-700">
          {getDateRangeLabel()}
        </div>
        <div className="inline-flex rounded-md shadow-sm relative">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => {
                setTimeRange(range);
                setIsCustomRange(false);
              }}
              className={`px-3 py-1 text-sm font-medium ${
                timeRange === range && !isCustomRange
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } ${
                range === timeRanges[0]
                  ? "rounded-l-md"
                  : ""
              } border border-gray-300`}
            >
              {range}
            </button>
          ))}
          
          {/* Calendar Button */}
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`px-3 py-1 text-sm font-medium rounded-r-md border border-gray-300 ${
              isCustomRange
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Calendar className="h-4 w-4" />
          </button>
          
          {/* Date Range Picker Dropdown */}
          {isDatePickerOpen && (
            <div 
              ref={datePickerRef}
              className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 p-4 border border-gray-200"
              style={{ top: '100%' }}
            >
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select Date Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      value={localStartDate ? localStartDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setLocalStartDate(e.target.value ? new Date(e.target.value) : null)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input 
                      type="date" 
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      value={localEndDate ? localEndDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setLocalEndDate(e.target.value ? new Date(e.target.value) : null)}
                      min={localStartDate ? localStartDate.toISOString().split('T')[0] : ''}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsDatePickerOpen(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 mr-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleApplyDateRange}
                  disabled={!localStartDate || !localEndDate}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    !localStartDate || !localEndDate
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0" }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
            />
            {visibleAssets.map((asset) => (
              <Line
                key={asset.id}
                type="monotone"
                dataKey={asset.id}
                stroke={hoveredAssetId && hoveredAssetId !== asset.id ? "#e0e0e0" : asset.color}
                strokeWidth={hoveredAssetId === asset.id ? 3 : 2}
                dot={false}
                activeDot={{ r: 6 }}
                name={asset.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import AssetList from "./AssetList";
import Graph from "./Graph";
import AssetTags from "./AssetTags";
import { mockAssetData, generateChartData } from "./mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getInstrumentComparisonDataById } from "../../services/instrumentDetailsService";

interface ComparisonUIProps {
  addedInstrumentIds?: string[];
}

export default function ComparisonUI({ addedInstrumentIds = [] }: ComparisonUIProps) {
  const [assets, setAssets] = useState(mockAssetData);

  // Add instruments from props when they change
  useEffect(() => {
    if (addedInstrumentIds.length > 0) {
      // Process each added instrument ID
      addedInstrumentIds.forEach(id => {
        // Check if the instrument is already in the assets list
        const existingIndex = assets.findIndex(asset => asset.id === id);
        
        if (existingIndex === -1) {
          // Get the instrument data
          const instrumentData = getInstrumentComparisonDataById(id);
          
          if (instrumentData) {
            // Add the instrument to the assets list
            setAssets(prevAssets => [...prevAssets, instrumentData]);
            
            // Update the selected assets and visible assets lists
            setSelectedAssets(prev => [...prev, id]);
            setVisibleAssets(prev => [...prev, id]);
          }
        }
      });
    }
  }, [addedInstrumentIds]);
  const [selectedAssets, setSelectedAssets] = useState(
    mockAssetData.filter((asset) => asset.selected).map((asset) => asset.id)
  );
  const [visibleAssets, setVisibleAssets] = useState(
    mockAssetData.filter((asset) => asset.visible).map((asset) => asset.id)
  );
  const [timeRange, setTimeRange] = useState("1W");
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [hoveredAssetId, setHoveredAssetId] = useState<string | null>(null);

  // Generate chart data based on time range and custom dates if applicable
  const chartData = generateChartData(
    visibleAssets, 
    timeRange, 
    timeRange === 'CUSTOM' && customStartDate ? customStartDate : undefined,
    timeRange === 'CUSTOM' && customEndDate ? customEndDate : undefined
  );

  // Handle time range changes including custom date ranges
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    if (range === 'CUSTOM') {
      // Keep custom dates
    } else {
      // Reset custom dates when using preset ranges
      setCustomStartDate(null);
      setCustomEndDate(null);
    }
  };

  const toggleListCollapse = () => {
    setIsListCollapsed(!isListCollapsed);
  };

  const toggleAssetSelection = (id: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          const newSelected = !asset.selected;
          // If deselecting, also make it invisible
          return {
            ...asset,
            selected: newSelected,
            visible: newSelected ? asset.visible : false,
          };
        }
        return asset;
      })
    );

    setSelectedAssets((prev) =>
      prev.includes(id) ? prev.filter((assetId) => assetId !== id) : [...prev, id]
    );

    // If deselecting, also remove from visible
    if (selectedAssets.includes(id)) {
      setVisibleAssets((prev) => prev.filter((assetId) => assetId !== id));
    }
  };

  const toggleAssetVisibility = (id: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return { ...asset, visible: !asset.visible };
        }
        return asset;
      })
    );

    setVisibleAssets((prev) =>
      prev.includes(id) ? prev.filter((assetId) => assetId !== id) : [...prev, id]
    );
  };
  
  // Function to change asset color
  const changeAssetColor = (id: string, newColor: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return { ...asset, color: newColor };
        }
        return asset;
      })
    );
  };

  // Bulk operations for selected assets
  const hideSelectedAssets = (ids: string[]) => {
    setAssets(
      assets.map((asset) => {
        if (ids.includes(asset.id)) {
          return { ...asset, visible: false };
        }
        return asset;
      })
    );

    setVisibleAssets((prev) => prev.filter((assetId) => !ids.includes(assetId)));
  };

  const showSelectedAssets = (ids: string[]) => {
    setAssets(
      assets.map((asset) => {
        if (ids.includes(asset.id)) {
          return { ...asset, visible: true };
        }
        return asset;
      })
    );

    // Add all selected assets to visible assets if they're not already there
    const newVisibleAssets = [...visibleAssets];
    ids.forEach(id => {
      if (!newVisibleAssets.includes(id)) {
        newVisibleAssets.push(id);
      }
    });
    setVisibleAssets(newVisibleAssets);
  };

  const deleteSelectedAssets = (ids: string[]) => {
    // Remove assets from the list
    const newAssets = assets.filter(asset => !ids.includes(asset.id));
    setAssets(newAssets);
    
    // Update selected and visible assets
    setSelectedAssets(prev => prev.filter(id => !ids.includes(id)));
    setVisibleAssets(prev => prev.filter(id => !ids.includes(id)));
  };

  const removeAssetFromGraph = (id: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return { ...asset, visible: false };
        }
        return asset;
      })
    );

    setVisibleAssets((prev) => prev.filter((assetId) => assetId !== id));
  };

  const handleExportPdf = () => {
    // In a real application, this would generate and download a PDF
    alert("Exporting PDF...");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 flex flex-col p-4 mx-auto w-full max-w-[1600px] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Comparison</h1>
          <button 
            onClick={handleExportPdf}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
          >
            Export .pdf
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full min-h-[600px]">
          {/* List Panel */}
          <div 
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              isListCollapsed 
                ? 'lg:col-span-1' 
                : 'lg:col-span-4'
            }`}
          >
            <AssetList
              assets={assets}
              toggleSelection={toggleAssetSelection}
              toggleVisibility={toggleAssetVisibility}
              isListCollapsed={isListCollapsed}
              toggleListCollapse={toggleListCollapse}
              hideAssets={hideSelectedAssets}
              showAssets={showSelectedAssets}
              deleteAssets={deleteSelectedAssets}
              changeAssetColor={changeAssetColor}
              hoveredAssetId={hoveredAssetId}
              setHoveredAssetId={setHoveredAssetId}
            />
          </div>
          
          {/* Chart Panel */}
          <div 
            className={`bg-white rounded-lg shadow-sm p-4 ${
              isListCollapsed 
                ? 'lg:col-span-11' 
                : 'lg:col-span-8'
            }`}
          >
            <AssetTags
              assets={assets.filter((asset) => visibleAssets.includes(asset.id))}
              removeAsset={removeAssetFromGraph}
            />
            <div className="h-[500px]">
              <Graph 
                data={chartData} 
                timeRange={timeRange} 
                setTimeRange={handleTimeRangeChange}
                customStartDate={customStartDate}
                customEndDate={customEndDate}
                setCustomStartDate={setCustomStartDate}
                setCustomEndDate={setCustomEndDate}
                hoveredAssetId={hoveredAssetId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

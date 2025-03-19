import React, { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import DataTable from "./DataTable";
import FileDownload from "./FileDownload"; 
import { TableColumn, AssetItem } from "../../types/dashboard";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"search" | "comparison">("search");
  
  // Sample data for demonstration
  const [data, setData] = useState<AssetItem[]>([
    {
      id: 1,
      name: "Apple Inc.",
      category: "Technology",
      currency: "USD",
      rating: "AAA",
      ytdPercentage: 15.4,
      oneYearPercentage: 42.7,
      threeYearPercentage: 125.3,
      date: "2023-06-15"
    },
    {
      id: 2,
      name: "Microsoft Corporation",
      category: "Technology",
      currency: "USD",
      rating: "AAA",
      ytdPercentage: 12.8,
      oneYearPercentage: 38.2,
      threeYearPercentage: 118.7,
      date: "2023-06-15"
    }
  ]);

  // Define table columns
  const columns: TableColumn[] = [
    { id: "number", label: "#", width: "10" },
    { id: "name", label: "Name", flex: true },
    { id: "category", label: "Category", width: "305px" },
    { id: "currency", label: "Currency", width: "140px", flex: true },
    { id: "rating", label: "Rating", width: "140px" },
    { id: "ytdPercentage", label: "YTD %", width: "120px" },
    { id: "oneYearPercentage", label: "1-Year %", width: "220px" },
    { id: "threeYearPercentage", label: "3-Year %", width: "220px" },
    { id: "date", label: "Date", flex: true },
  ];

  const handleTabChange = (tab: "search" | "comparison") => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    console.log(`Filter changed: ${filterType} = ${value}`);
    // In a real application, this would update the data based on filters
  };

  const handleSearch = (query: string) => {
    console.log(`Search query: ${query}`);
    // In a real application, this would filter the data based on the search query
  };

  const sampleFileUrl = "data:text/plain;charset=utf-8," + encodeURIComponent("This is a sample text file for download demonstration.");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex flex-col flex-1 bg-slate-50">
        <FilterBar onFilterChange={handleFilterChange} />
        <div className="flex flex-col flex-1 gap-8 pt-3 pb-5 px-5">
          {/* Sample file download demonstration */}
          <div className="flex items-center gap-4 mb-4">
            <FileDownload 
              fileName="sample.txt" 
              fileUrl={sampleFileUrl} 
              label="Sample Text File" 
            />
            <p className="text-sm text-slate-600">
              ← Click to download a sample static file
            </p>
          </div>
          
          <DataTable columns={columns} data={data} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
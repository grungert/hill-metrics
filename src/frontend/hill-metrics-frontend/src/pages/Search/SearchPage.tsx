import React, { useState } from 'react';
import Header from '../../components/Header';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import { TableColumn, AssetItem } from '../../types/dashboard';

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'comparison'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  
  // Sample data for demonstration
  const [data, setData] = useState<AssetItem[]>([
    {
      id: 1,
      name: 'Apple Inc.',
      category: 'Technology',
      currency: 'USD',
      rating: 'AAA',
      ytdPercentage: 15.4,
      oneYearPercentage: 42.7,
      threeYearPercentage: 125.3,
      date: '2025-03-15'
    },
    {
      id: 2,
      name: 'Microsoft Corporation',
      category: 'Technology',
      currency: 'USD',
      rating: 'AAA',
      ytdPercentage: 12.8,
      oneYearPercentage: 38.2,
      threeYearPercentage: 118.7,
      date: '2025-03-15'
    }
  ]);

  // Define table columns
  const columns: TableColumn[] = [
    { id: 'number', label: '#', width: '10' },
    { id: 'name', label: 'Name', flex: true },
    { id: 'category', label: 'Category', width: '205px' },
    { id: 'currency', label: 'Currency', width: '140px' },
    { id: 'rating', label: 'Rating', width: '140px' },
    { id: 'ytdPercentage', label: 'YTD %', width: '120px' },
    { id: 'oneYearPercentage', label: '1-Year %', width: '120px' },
    { id: 'threeYearPercentage', label: '3-Year %', width: '120px' },
    { id: 'date', label: 'Date', width: '120px' },
  ];

  const handleTabChange = (tab: 'search' | 'comparison') => {
    setActiveTab(tab);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Search query: ${query}`);
    // In a real application, this would filter the data based on the search query
    // For now, we'll just log the query
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    console.log(`Filter changed: ${filterType} = ${value}`);
    // In a real application, this would update the data based on filters
  };

  const handleRowSelect = (id: string | number, selected: boolean) => {
    console.log(`Row ${id} selected: ${selected}`);
    // In a real application, this would update the selected rows state
  };

  const handleTableSearch = (query: string) => {
    console.log(`Table search query: ${query}`);
    // In a real application, this would filter the data in the table
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onSearch={handleSearch}
      />
      <div className="flex flex-col flex-1 bg-slate-50">
        <FilterBar onFilterChange={handleFilterChange} />
        <div className="flex flex-col flex-1 gap-8 pt-3 pb-5 px-5">
          <DataTable 
            columns={columns} 
            data={data} 
            onRowSelect={handleRowSelect}
            onSearch={handleTableSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

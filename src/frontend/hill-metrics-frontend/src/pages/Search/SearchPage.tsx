import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import SelectedFilters from '../../components/SelectedFilters';
import { TableColumn, AssetItem } from '../../types/dashboard';
import { FilterType, FilterItem } from '../../types/filters';
import useInstrumentStore from '../../store/instrumentStore';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, number[]>>({});
  const [selectedFilterPills, setSelectedFilterPills] = useState<FilterItem[]>([]);
  
  // Get access to the instrument store
  const { listInstruments } = useInstrumentStore();
  
  // Get the location to check for query parameters
  const location = useLocation();
  
  // Effect to handle instruments added to the list
  useEffect(() => {
    if (listInstruments.length > 0) {
      console.log('Instruments in list:', listInstruments);
      // In a real application, you would fetch instrument details from an API
      // and update the table data to include these instruments
      
      // For demonstration purposes, we'll log it to the console
      // In a real app, you'd update the data array with fetched details
    }
  }, [listInstruments]);
  
  // Sample data for demonstration
  const [data, setData] = useState<AssetItem[]>([
    {
      id: 3,
      name: 'Vanguard S&P 500 Index Fund',
      category: 'Index Fund',
      currency: 'EUR',
      rating: 4,
      risk: '1/7',
      ytdPercentage: 6.22,
      oneYearPercentage: 5.25,
      threeYearPercentage: 20.99,
      date: '2024-04-22'
    },
    {
      id: 6,
      name: 'USD Coin',
      category: 'Stablecoin',
      currency: 'EUR',
      rating: 3,
      risk: '1/7',
      ytdPercentage: 6.22,
      oneYearPercentage: 5.92,
      threeYearPercentage: 17.31,
      date: '2024-04-18'
    },
    {
      id: 5,
      name: 'Schwab S&P 500 Index Fund',
      category: 'Index Fund',
      currency: 'EUR',
      rating: 3,
      risk: '1/7',
      ytdPercentage: 6.22,
      oneYearPercentage: 5.92,
      threeYearPercentage: 17.31,
      date: '2024-04-18'
    },
    {
      id: 4,
      name: 'Tether',
      category: 'Stablecoin',
      currency: 'EUR',
      rating: 5,
      risk: '1/7',
      ytdPercentage: 6.22,
      oneYearPercentage: 8.27,
      threeYearPercentage: 27.98,
      date: '2024-04-22'
    },
    {
      id: 17,
      name: 'Fidelity 500 Index Fund',
      category: 'Exchange Token',
      currency: 'EUR',
      rating: 3,
      risk: '1/7',
      ytdPercentage: 6.22,
      oneYearPercentage: 5.92,
      threeYearPercentage: 17.31,
      date: '2024-04-18'
    }
  ]);

  // Define table columns
  const columns: TableColumn[] = [
    { id: 'number', label: '#', width: '10', visible: true, order: 0 },
    { id: 'name', label: 'Name', flex: true, visible: true, order: 1, canHide: false },
    { id: 'category', label: 'Category', width: '305px', visible: true, order: 2 },
    { id: 'pricing', label: 'Pricing', width: '120px', visible: true, order: 3 },
    { id: 'currency', label: 'Currency', width: '120px', visible: true, order: 4 },
    { id: 'rating', label: 'Rating', width: '140px', visible: true, order: 5 },
    { id: 'risk', label: 'Risk', width: '80px', visible: true, order: 6 },
    { id: 'ytdPercentage', label: 'YTD %', width: '100px', visible: true, order: 7 },
    { id: 'oneYearPercentage', label: '1-Year %', width: '200px', visible: true, order: 8 },
    { id: 'threeYearPercentage', label: '3-Year %', width: '200px', visible: true, order: 9 },
    { id: 'date', label: 'Date', flex: true, visible: true, order: 10 },
  ];

  // Tab change is now handled by the router in the Header component

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Search query: ${query}`);
    // In a real application, this would filter the data based on the search query
    // For now, we'll just log the query
  };

  const handleFilterChange = (filterType: string, selectedIds: number[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: selectedIds
    }));
    console.log(`Filter changed: ${filterType} = ${selectedIds.join(', ')}`);
    // In a real application, this would update the data based on filters
    
    // For demonstration purposes, filter the data if assets are selected
    if (filterType === 'assets' && selectedIds.length > 0) {
      // This is just a simple example - in a real app, you would have more complex filtering logic
      // For now, we'll just show or hide the sample data based on whether any filters are selected
      setData(selectedIds.length > 0 ? [] : [
        {
          id: 1,
          name: 'Apple Inc.',
          category: 'Technology',
          currency: 'USD',
          rating: 5,
          risk: '2/7',
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
          rating: 5,
          risk: '2/7',
          ytdPercentage: 12.8,
          oneYearPercentage: 38.2,
          threeYearPercentage: 118.7,
          date: '2025-03-15'
        }
      ]);
    }
  };

  const handleRowSelect = (id: string | number, selected: boolean) => {
    console.log(`Row ${id} selected: ${selected}`);
    // In a real application, this would update the selected rows state
  };

  const handleTableSearch = (query: string) => {
    console.log(`Table search query: ${query}`);
    // In a real application, this would filter the data in the table
  };

  // Reference to the FilterBar component
  const filterBarRef = useRef<any>(null);

  const handleRemoveFilter = (filter: FilterItem) => {
    // Remove the filter from the selected filters
    setSelectedFilterPills(prev => prev.filter(f => 
      !(f.type === filter.type && f.label === filter.label && f.value === filter.value)
    ));
    
    // Update the filter state in the FilterBar component
    if (filterBarRef.current && filterBarRef.current.handleFilterRemove) {
      filterBarRef.current.handleFilterRemove(filter.type, filter.value);
    }
    
    console.log(`Removed filter: ${filter.type} - ${filter.label}: ${filter.value}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header 
        onSearch={handleSearch}
      />
      <div className="flex flex-col flex-1 bg-slate-50">
        <FilterBar 
          ref={filterBarRef}
          onFilterChange={handleFilterChange} 
          onFilterPillsChange={setSelectedFilterPills}
        />
        <SelectedFilters 
          filters={selectedFilterPills} 
          onRemoveFilter={handleRemoveFilter} 
        />
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

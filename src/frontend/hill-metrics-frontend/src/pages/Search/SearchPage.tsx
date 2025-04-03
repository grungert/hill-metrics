import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import SelectedFilters from '../../components/SelectedFilters';
import Toast from '../../components/Toast';
import { TableColumn, AssetItem } from '../../types/dashboard';
import { FilterType, FilterItem } from '../../types/filters';
import useInstrumentStore from '../../store/instrumentStore';
import { getInstrumentSearchDataById } from '../../services/instrumentDetailsService';
import '../../components/animations.css';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, number[]>>({});
  const [selectedFilterPills, setSelectedFilterPills] = useState<FilterItem[]>([]);
  
  // Get access to the instrument store
  const { listInstruments } = useInstrumentStore();
  
  // Get the location to check for query parameters
  const location = useLocation();
  
  // Reference to keep track of added instruments to prevent duplicates
  const addedInstrumentsRef = useRef<Set<string>>(new Set());
  
  // State for highlighting newly added row
  const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null);
  
  // State for toast notifications
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'warning' | 'error' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info'
  });
  
  // Show toast notification
  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    setToast({
      visible: true,
      message,
      type
    });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      visible: false
    }));
  };
  
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
    },
    {
      id: 8,
      name: 'iShares MSCI World ETF',
      category: 'ETF',
      currency: 'EUR',
      rating: 4,
      risk: '2/7',
      ytdPercentage: 4.85,
      oneYearPercentage: 12.37,
      threeYearPercentage: 35.18,
      date: '2024-04-20'
    },
    {
      id: 9,
      name: 'Ethereum',
      category: 'Cryptocurrency',
      currency: 'USD',
      rating: 5,
      risk: '5/7',
      ytdPercentage: 21.67,
      oneYearPercentage: 95.32,
      threeYearPercentage: 312.45,
      date: '2024-04-22'
    },
    {
      id: 10,
      name: 'SPDR Gold Shares',
      category: 'Commodity ETF',
      currency: 'USD',
      rating: 3,
      risk: '2/7',
      ytdPercentage: 8.43,
      oneYearPercentage: 14.56,
      threeYearPercentage: 25.87,
      date: '2024-04-21'
    },
    {
      id: 11,
      name: 'U.S. Treasury Bond 2.5%',
      category: 'Government Bond',
      currency: 'USD',
      rating: 4,
      risk: '1/7',
      ytdPercentage: 1.25,
      oneYearPercentage: 3.48,
      threeYearPercentage: 7.92,
      date: '2024-04-20'
    },
    {
      id: 12,
      name: 'Cardano',
      category: 'Cryptocurrency',
      currency: 'USD',
      rating: 3,
      risk: '4/7',
      ytdPercentage: 12.76,
      oneYearPercentage: 54.38,
      threeYearPercentage: 178.92,
      date: '2024-04-19'
    },
    {
      id: 13,
      name: 'Invesco QQQ Trust',
      category: 'ETF',
      currency: 'USD',
      rating: 5,
      risk: '3/7',
      ytdPercentage: 8.92,
      oneYearPercentage: 32.17,
      threeYearPercentage: 89.53,
      date: '2024-04-22'
    },
    {
      id: 14,
      name: 'Solana',
      category: 'Cryptocurrency',
      currency: 'USD',
      rating: 4,
      risk: '5/7',
      ytdPercentage: 25.87,
      oneYearPercentage: 112.42,
      threeYearPercentage: 358.76,
      date: '2024-04-21'
    },
    {
      id: 15,
      name: 'Vanguard Total Bond Market ETF',
      category: 'Bond ETF',
      currency: 'USD',
      rating: 4,
      risk: '2/7',
      ytdPercentage: 2.35,
      oneYearPercentage: 5.67,
      threeYearPercentage: 10.21,
      date: '2024-04-20'
    },
    {
      id: 16,
      name: 'Binance Coin',
      category: 'Cryptocurrency',
      currency: 'USD',
      rating: 3,
      risk: '4/7',
      ytdPercentage: 18.62,
      oneYearPercentage: 75.34,
      threeYearPercentage: 243.87,
      date: '2024-04-19'
    },
    {
      id: 18,
      name: 'Amundi MSCI Emerging Markets ETF',
      category: 'ETF',
      currency: 'EUR',
      rating: 3,
      risk: '3/7',
      ytdPercentage: 3.56,
      oneYearPercentage: 8.92,
      threeYearPercentage: 23.45,
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

  // Process instruments from the store
  useEffect(() => {
    if (listInstruments.length > 0) {
      let hasNewInstruments = false;
      
      // For each instrument in the list store
      listInstruments.forEach(id => {
        // Check if we've already added this instrument
        if (!addedInstrumentsRef.current.has(id)) {
          // Get instrument data
          const instrumentData = getInstrumentSearchDataById(id);
          
          if (instrumentData) {
            // Mark this instrument as added
            addedInstrumentsRef.current.add(id);
            hasNewInstruments = true;
            
            // Add the instrument to the top of the data list
            setData(prevData => [instrumentData, ...prevData]);
            
            // Highlight the newly added row
            setHighlightedRowId(id.toString());
            
            // Clear the highlight after 600ms (0.6 seconds)
            setTimeout(() => {
              setHighlightedRowId(null);
            }, 600);
            
            // Show success toast
            showToast(`Added ${instrumentData.name} to the table`, 'success');
          }
        } else {
          // Show notification that the item is already in the table
          const instrument = data.find(item => item.id === id);
          if (instrument) {
            showToast(`${instrument.name} is already in the table`, 'info');
          } else {
            showToast(`This item is already in the table`, 'info');
          }
        }
      });
      
      if (hasNewInstruments) {
        console.log('Added new instruments to the table');
      }
    }
  }, [listInstruments, data]); // Include data to get latest instrument names

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Toast notification */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      
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
            highlightedRowId={highlightedRowId}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

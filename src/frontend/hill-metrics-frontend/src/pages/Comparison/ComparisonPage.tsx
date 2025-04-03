import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import ComparisonUI from "../../components/Comparison/ComparisonUI";
import useInstrumentStore from '../../store/instrumentStore';

const ComparisonPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'comparison'>('comparison');
  const [, setSearchQuery] = useState('');
  
  // Get access to the instrument store
  const { comparisonInstruments } = useInstrumentStore();
  
  // Get the location to check for query parameters
  const location = useLocation();
  
  // Effect to log instruments in comparison
  useEffect(() => {
    if (comparisonInstruments.length > 0) {
      console.log('Instruments in comparison:', comparisonInstruments);
      // In a real application, you would fetch instrument details from an API
      // and update the UI to show these instruments
    }
  }, [comparisonInstruments]);

  const handleTabChange = (tab: 'search' | 'comparison') => {
    setActiveTab(tab);
    // Navigation will be handled by the router in App.tsx
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Search query: ${query}`);
    // In a real application, this would filter the data based on the search query
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onSearch={handleSearch}
      />
      <div className="h-screen flex bg-[#f8f9fa] flex-col overflow-hidden">
        <ComparisonUI />
      </div>
    </div>
  );
};

export default ComparisonPage;

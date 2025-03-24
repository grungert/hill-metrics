import React, { useState } from 'react';
import Header from '../../components/Header';
import ComparisonUI from "../../components/Comparison/ComparisonUI";

const ComparisonPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'comparison'>('comparison');
  const [, setSearchQuery] = useState('');

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

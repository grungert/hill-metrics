import React, { useState } from 'react';
import Header from '../../components/Header';

const ComparisonPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'comparison'>('comparison');
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="flex flex-col flex-1 bg-slate-50 items-center justify-center">
        <div className="text-2xl font-bold text-slate-700">
          Comparison Page
        </div>
        <div className="text-slate-500 mt-2">
          This page is under construction
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;

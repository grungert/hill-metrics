import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';

// Import all the Overview components
import InstrumentHeader from '../../components/Overview/InstrumentHeader';
import Sidebar from '../../components/Overview/Sidebar';
import SpecificIndicators from '../../components/Overview/SpecificIndicators';
import SpecificCharacteristics from '../../components/Overview/SpecificCharacteristics';
import GeneralCharacteristics from '../../components/Overview/GeneralCharacteristics';
import PerformanceMetrics from '../../components/Overview/PerformanceMetrics';
import Chart from '../../components/Overview/Chart';
import MetricBars from '../../components/Overview/MetricBars';
import PerformanceRanking from '../../components/Overview/PerformanceRanking';
import CategoryComparison from '../../components/Overview/CategoryComparison';
import FeesCharacteristics from '../../components/Overview/FeesCharacteristics';
import AssetMap from '../../components/Overview/AssetMap';
import SimilarInstruments from '../../components/Overview/SimilarInstruments';

const OverviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch data for the instrument with the given ID
  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      // In a real application, this would fetch data from an API
      // For now, we'll just simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    
    loadData();
  }, [id]);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="bg-gray-50 overflow-hidden flex-1">
          <InstrumentHeader />
          
          {/* Main content wrapper with three columns */}
          <div className="flex min-h-screen">
            {/* Column 1: Navigation sidebar with white background */}
            <div className="w-[200px] flex-shrink-0 bg-white pl-4 pr-1">
              <Sidebar />
            </div>
            
            {/* Column 2: Indicators and characteristics */}
            <div className="w-[250px] flex-shrink-0 pl-4">
              {/* Specific indicators section */}
              <div>
                <SpecificIndicators />
              </div>
              
              {/* Specific characteristics section */}
              <div className="mt-4">
                <SpecificCharacteristics />
              </div>
              
              {/* General characteristics section */}
              <div className="mt-4">
                <GeneralCharacteristics />
              </div>
            </div>
            
            {/* Column 3: Main content area */}
            <div className="flex-1 px-5">
              <div className="mt-4">
                {/* Performance metrics */}
                <PerformanceMetrics />
                
                {/* Chart section */}
                <div className="mt-4">
                  <Chart />
                </div>
                
                {/* Metric bars */}
                <div className="mt-4">
                  <MetricBars />
                </div>
                
                {/* Two-column layout for Performance ranking and Category comparison */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <PerformanceRanking />
                  <CategoryComparison />
                </div>
                
                {/* Two-column layout for Fees and Asset map */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FeesCharacteristics />
                  <AssetMap />
                </div>
                
                {/* Similar instruments */}
                <div className="mt-4">
                  <SimilarInstruments />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [instrumentName, setInstrumentName] = useState<string>('');
  const navigate = useNavigate();
  
  // Fetch data for the instrument with the given ID
  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      // In a real application, this would fetch data from an API based on ID
      console.log(`Loading details for instrument ID: ${id}`);
      
      // Mock name based on ID for demonstration
      let name = 'Unknown Instrument';
      if (id === 'btc-1') name = 'Bitcoin';
      else if (id === 'eth-1') name = 'Ethereum';
      else if (id === 'btc-cash') name = 'Bitcoin Cash';
      else if (id === 'btc-sv') name = 'Bitcoin SV';
      else if (id === 'btc-gold') name = 'Bitcoin Gold';
      
      // Simulate API delay
      setTimeout(() => {
        setInstrumentName(name);
        setLoading(false);
      }, 500);
    };
    
    if (id) {
      loadData();
    } else {
      // If no ID is provided, redirect to search page
      navigate('/search');
    }
  }, [id, navigate]);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p>Loading details for instrument {id}...</p>
        </div>
      ) : (
        <div className="bg-gray-50 overflow-hidden flex-1">
          <InstrumentHeader instrumentName={instrumentName} instrumentId={id || ''} />
          
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

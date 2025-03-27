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
          <div className="w-full max-w-[1416px] mx-auto px-4">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[21%] max-md:w-full max-md:ml-0">
                <Sidebar />
              </div>
              <div className="w-[79%] ml-5 max-md:w-full max-md:ml-0">
                <div className="flex gap-6 flex-wrap mt-8 max-md:mt-10">
                  <div className="w-[228px]">
                    <SpecificIndicators />
                    <SpecificCharacteristics />
                    <div className="w-full mt-4">
                      <GeneralCharacteristics />
                    </div>
                  </div>
                  <div className="min-w-60 w-[850px] max-md:max-w-full">
                    <div className="w-full max-md:max-w-full">
                      <PerformanceMetrics />
                      <div className="flex w-full gap-6 mt-6 max-md:max-w-full">
                        <div className="min-w-60 w-full flex-1 shrink basis-[0%] max-md:max-w-full">
                          <div className="w-full max-md:max-w-full">
                            <Chart />
                          </div>
                        </div>
                      </div>
                    </div>
                    <MetricBars />
                    <div className="flex w-full gap-4 flex-wrap mt-6 max-md:max-w-full">
                      <PerformanceRanking />
                      <CategoryComparison />
                    </div>
                    <div className="flex w-full gap-4 flex-wrap mt-6 max-md:max-w-full">
                      <FeesCharacteristics />
                      <AssetMap />
                    </div>
                    <SimilarInstruments />
                  </div>
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

import React, { useState } from "react";

// Define the performance data structure
interface PerformanceData {
  period: string;
  rank: number; // 0-100 value where lower values are better (0=top, 100=bottom)
}

// Define tooltip props
interface TooltipProps {
  position: number;
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ position, visible }) => {
  if (!visible) return null;
  
  // Convert position to ranking text
  let rankText = "";
  if (position <= 25) {
    rankText = `Top ${position}`;
  } else if (position <= 50) {
    rankText = `Top ${position}`;
  } else {
    rankText = `Last ${100 - position}`;
  }
  
  return (
    <div 
      className="absolute bg-white px-2 py-1 text-xs font-medium rounded shadow-md z-10 transition-opacity duration-200 -translate-x-1/2"
      style={{
        left: "50%",
        bottom: "100%",
        marginBottom: "8px",
        opacity: visible ? 1 : 0,
        pointerEvents: 'none'
      }}
    >
      {rankText}
    </div>
  );
};

// Define the performance bar props
interface PerformanceBarProps {
  data: PerformanceData;
}

const PerformanceBar: React.FC<PerformanceBarProps> = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Calculate the fill height as a percentage (inverted so lower rank = higher bar)
  const fillHeight = `${100 - data.rank}%`;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative bg-[#F0E8FD] h-[240px] w-4 rounded-2xl"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div 
          className="absolute bottom-0 bg-[#6200EE] w-4 rounded-2xl transition-all duration-300"
          style={{ height: fillHeight }}
        />
        <Tooltip position={data.rank} visible={showTooltip} />
      </div>
      <div className="text-[#8D9092] text-center text-sm font-normal mt-4">
        {data.period}
      </div>
    </div>
  );
};

const PerformanceRanking: React.FC = () => {
  // Performance data for each time period (rank: 0=top, 100=bottom)
  const performanceData: PerformanceData[] = [
    { period: "1m", rank: 75 },    // Last 25
    { period: "3m", rank: 60 },    // Between Last 50 and Last 25
    { period: "1y", rank: 40 },    // Between Top 25 and Last 50
    { period: "3y", rank: 50 },    // Around Last 50
    { period: "5y", rank: 10 },    // Top 10
    { period: "10y", rank: 75 },   // Last 25
  ];

  return (
    <div className="min-w-60 w-full">
      <div className="w-full text-lg text-slate-700 font-medium leading-none">
        Performance ranking
      </div>
      <div className="items-stretch border border-[color:var(--slate-200,#E2E8F0)] bg-white flex h-[384px] w-full flex-col justify-center mt-4 p-4 rounded-md border-solid">
        <div className="flex gap-6">
          {/* Ranking scale labels */}
          <div className="min-h-[240px] text-sm text-[#8D9092] font-normal w-[50px] flex flex-col justify-between">
            <div>Top 50</div>
            <div>Top 25</div>
            <div>Last 50</div>
            <div>Last 25</div>
            <div>0</div>
          </div>
          
          {/* Performance bars */}
          <div className="flex flex-1 justify-between">
            {performanceData.map((data, index) => (
              <PerformanceBar key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceRanking;

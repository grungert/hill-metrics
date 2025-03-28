import React from "react";
import InfoIcon from "./InfoIcon";

interface MetricBarProps {
  title: string;
  rating: string;
  progress?: number; // 0-100 percentage value
}

const MetricBar: React.FC<MetricBarProps> = ({ title, rating, progress = 80 }) => {
  // Calculate the total number of bars to display
  const totalBars = 30;
  // Calculate which bar to highlight based on progress
  const highlightIndex = Math.floor((progress / 100) * totalBars) - 1;
  
  // Define start and end colors for the gradient
  const startColor = [212, 185, 251]; // #d4b9fb - light purple
  const endColor = [124, 40, 245];    // #7c28f5 - dark purple
  
  // Generate the bars with gradient colors
  const bars = Array.from({ length: totalBars }).map((_, index) => {
    // Calculate color for this specific bar based on its position in the gradient
    const ratio = index / (totalBars - 1);
    const r = Math.floor(startColor[0] + ratio * (endColor[0] - startColor[0]));
    const g = Math.floor(startColor[1] + ratio * (endColor[1] - startColor[1]));
    const b = Math.floor(startColor[2] + ratio * (endColor[2] - startColor[2]));
    const color = `rgb(${r}, ${g}, ${b})`;
    
    // Determine if this bar should be highlighted (taller)
    const isHighlight = index === highlightIndex;
    
    return (
      <span 
        key={index} 
        className={`block flex-grow h-5 rounded-sm transition-all duration-300 ${isHighlight ? 'h-8 -translate-y-1.5' : ''}`}
        style={{ 
          backgroundColor: color,
          height: isHighlight ? '34px' : '20px',
          transform: isHighlight ? 'translateY(-7px)' : 'none'
        }}
      />
    );
  });

  return (
    <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white self-stretch flex-1 shrink basis-[0%] my-auto px-3 py-4 rounded-md border-solid">
      <div className="flex w-full items-center gap-[40px_64px] font-normal whitespace-nowrap justify-between">
        <div className="self-stretch flex items-center gap-0.5 text-base text-slate-900 my-auto">
          <div className="self-stretch my-auto">{title}</div>
          <InfoIcon />
        </div>
        <div className="self-stretch gap-0.5 text-xs text-slate-600 leading-6 my-auto">
          {rating}
        </div>
      </div>
      <div className="items-center mt-4 px-1">
        <div className="flex gap-[3px] w-full justify-between">
          {bars}
        </div>
      </div>
    </div>
  );
};

const MetricBars: React.FC = () => {
  return (
    <div className="flex w-full items-center gap-3 flex-wrap mt-6 max-md:max-w-full">
      <MetricBar title="Liquidity" rating="Good" progress={75} />
      <MetricBar title="Marketcap" rating="Good" progress={90} />
      <MetricBar title="Performance" rating="Good" progress={65} />
      <MetricBar title="Reliability" rating="Good" progress={80} />
    </div>
  );
};

export default MetricBars;

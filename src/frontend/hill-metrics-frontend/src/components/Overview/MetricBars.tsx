import React, { useState } from "react";
import InfoIcon from "./InfoIcon";

interface MetricBarProps {
  title: string;
  rating: string;
  progress?: number; // 0-100 percentage value
}

// Tooltip component for displaying the value on hover
interface TooltipProps {
  value: number;
  position: { x: number; y: number } | null;
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ value, position, visible }) => {
  if (!visible || !position) return null;
  
  return (
    <div 
      className="absolute bg-white px-2 py-1 text-xs font-medium rounded shadow-md z-10 transition-opacity duration-200"
      style={{
        left: position.x,
        top: position.y - 30, // Position above the bar
        opacity: visible ? 1 : 0,
        pointerEvents: 'none' // Make sure it doesn't interfere with hover events
      }}
    >
      {value}%
    </div>
  );
};

const MetricBar: React.FC<MetricBarProps> = ({ title, rating, progress = 80 }) => {
  // State to track which bar is being hovered and tooltip position
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  
  // Calculate the total number of bars to display
  const totalBars = 40;
  // Calculate which bar to highlight based on progress
  const highlightIndex = Math.floor((progress / 100) * totalBars) - 1;
  
  // Define start and end colors for the gradient
  const startColor = [212, 185, 251]; // #d4b9fb - light purple
  const endColor = [124, 40, 245];    // #7c28f5 - dark purple
  
  // Handler for mouse enter on a bar
  const handleBarMouseEnter = (index: number, event: React.MouseEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget.closest('.relative')?.getBoundingClientRect() || rect;
    
    setHoveredBarIndex(index);
    setTooltipPosition({
      x: rect.left - containerRect.left + (rect.width / 2),
      y: rect.top - containerRect.top
    });
  };
  
  // Handler for mouse leave on a bar
  const handleBarMouseLeave = () => {
    setHoveredBarIndex(null);
    setTooltipPosition(null);
  };
  
  // Calculate the exact value this bar represents
  const getBarValue = (index: number) => {
    return Math.round((index + 1) / totalBars * 100);
  };
  
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
    const barValue = getBarValue(index);
    
    return (
      <span 
        key={index} 
        className={`block flex-grow h-5 rounded-sm transition-all duration-300 cursor-pointer ${isHighlight ? 'h-8 -translate-y-1.5' : ''}`}
        style={{ 
          backgroundColor: color,
          height: isHighlight ? '34px' : '20px',
          transform: isHighlight ? 'translateY(-7px)' : 'none'
        }}
        onMouseEnter={(e) => handleBarMouseEnter(index, e)}
        onMouseLeave={handleBarMouseLeave}
      />
    );
  });

  return (
    <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white self-stretch flex-1 shrink basis-[0%] my-auto px-3 py-4 rounded-md border-solid relative">
      <div className="flex w-full items-center gap-[40px_64px] font-normal whitespace-nowrap justify-between">
        <div className="self-stretch flex items-center gap-0.5 text-base text-slate-900 my-auto">
          <div className="self-stretch my-auto">{title}</div>
          <InfoIcon />
        </div>
        <div className="self-stretch gap-0.5 text-xs text-slate-600 leading-6 my-auto">
          {rating}
        </div>
      </div>
      <div className="flex items-center h-10 w-full mt-2 px-1 relative">
        <div className="flex gap-[3px] w-full justify-between">
          {bars}
        </div>
        
        {/* Tooltip that shows the value */}
        <Tooltip 
          value={hoveredBarIndex !== null ? getBarValue(hoveredBarIndex) : 0}
          position={tooltipPosition}
          visible={hoveredBarIndex !== null}
        />
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

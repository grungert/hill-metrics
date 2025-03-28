import React, { useState } from "react";

// Define the point data types
interface DataPoint {
  x: number;
  y: number;
}

// Props for data point markers
interface MarkerProps {
  size: number;
  isHovered: boolean;
}

// Tooltip component
interface TooltipProps {
  point: DataPoint;
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ point, visible }) => {
  if (!visible) return null;
  
  return (
    <div 
      className="absolute bg-white px-2 py-1 text-xs font-medium rounded shadow-md z-10 transition-opacity duration-200 -translate-x-1/2 -translate-y-full"
      style={{
        left: "50%",
        bottom: "100%",
        marginBottom: "5px",
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
        whiteSpace: 'nowrap'
      }}
    >
      x: {point.x}, y: {point.y}
    </div>
  );
};

// Triangle SVG for "This product" marker
const TriangleMarker: React.FC<MarkerProps> = ({ size, isHovered }) => (
  <svg 
    height={isHovered ? size * 1.2 : size} 
    width={isHovered ? size * 1.2 : size} 
    viewBox="0 0 10 10"
    className="transition-all duration-200"
  >
    <polygon 
      points="5,0 10,10 0,10" 
      fill="#EE6002" 
      filter={isHovered ? "drop-shadow(0 0 2px rgba(238, 96, 2, 0.5))" : "none"}
    />
  </svg>
);

// Circle SVG for "Others in category" marker
const CircleMarker: React.FC<MarkerProps> = ({ size, isHovered }) => (
  <div 
    className="transition-all duration-200"
    style={{ 
      width: isHovered ? size * 1.2 : size, 
      height: isHovered ? size * 1.2 : size, 
      borderRadius: '50%', 
      backgroundColor: '#6200EE',
      boxShadow: isHovered ? '0 0 4px rgba(98, 0, 238, 0.7)' : 'none'
    }}
  />
);

const CategoryComparison: React.FC = () => {
  // State to track which point is being hovered
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [isThisProductHovered, setIsThisProductHovered] = useState(false);
  
  // Data for the chart
  const thisProduct: DataPoint = { x: 30, y: 20 };
  
  // Data points for other products in the category
  const othersInCategory: DataPoint[] = [
    { x: 15, y: -10 },
    { x: 10, y: -15 },
    { x: 25, y: -2 },
    { x: 40, y: -5 },
    { x: 45, y: -3 },
    { x: 55, y: 9 },
    { x: 60, y: 0 },
    { x: 65, y: 15 },
    { x: 75, y: 15 },
    { x: 85, y: 10 },
    { x: 95, y: 18 },
  ];

  // Chart dimensions and boundaries
  const chartWidth = 100;
  const chartHeight = 60;
  const yMin = -30;
  const yMax = 30;
  
  // Utility function to calculate position on the chart
  const calculatePosition = (point: DataPoint) => {
    const xPercent = (point.x / chartWidth) * 100;
    // Invert the y-axis (y increases upward)
    const yPercent = 100 - ((point.y - yMin) / (yMax - yMin) * 100);
    return { xPercent, yPercent };
  };

  // Calculate positions
  const thisProductPosition = calculatePosition(thisProduct);
  
  // Handlers for hover events
  const handleThisProductHover = (isHovering: boolean) => {
    setIsThisProductHovered(isHovering);
  };
  
  const handleOtherProductHover = (index: number | null) => {
    setHoveredPointIndex(index);
  };
  
  return (
    <div className="min-w-60 w-full">
      <div className="text-slate-700 text-lg font-medium leading-none">
        Fonts vs categorie
      </div>
      <div className="items-stretch border border-[color:var(--slate-200,#E2E8F0)] bg-white flex h-[384px] w-full flex-col justify-center mt-4 p-4 rounded-md border-solid">
        <div className="flex">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between text-xs text-[#8D9092] h-[240px] pr-2">
            <div>30</div>
            <div>20</div>
            <div>10</div>
            <div>0</div>
            <div>-10</div>
            <div>-20</div>
            <div>-30</div>
          </div>
          
          {/* Chart area */}
          <div className="flex-1 relative h-[240px] border-l border-t border-gray-200">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-6 pointer-events-none">
              {/* Horizontal grid lines */}
              <div className="absolute w-full h-px bg-gray-200 top-1/6"></div>
              <div className="absolute w-full h-px bg-gray-200 top-2/6"></div>
              <div className="absolute w-full h-px bg-gray-200 top-3/6"></div>
              <div className="absolute w-full h-px bg-gray-200 top-4/6"></div>
              <div className="absolute w-full h-px bg-gray-200 top-5/6"></div>
              
              {/* Vertical grid lines */}
              <div className="absolute h-full w-px bg-gray-200 left-1/3"></div>
              <div className="absolute h-full w-px bg-gray-200 left-2/3"></div>
            </div>
            
            {/* Data points for others in category */}
            {othersInCategory.map((point, index) => {
              const { xPercent, yPercent } = calculatePosition(point);
              const isHovered = hoveredPointIndex === index;
              return (
                <div 
                  key={index}
                  className="absolute"
                  style={{ left: `${xPercent}%`, top: `${yPercent}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => handleOtherProductHover(index)}
                  onMouseLeave={() => handleOtherProductHover(null)}
                >
                  <CircleMarker size={10} isHovered={isHovered} />
                  {isHovered && <Tooltip point={point} visible={true} />}
                </div>
              );
            })}
            
            {/* Data point for this product */}
            <div 
              className="absolute"
              style={{ 
                left: `${thisProductPosition.xPercent}%`, 
                top: `${thisProductPosition.yPercent}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => handleThisProductHover(true)}
              onMouseLeave={() => handleThisProductHover(false)}
            >
              <TriangleMarker size={12} isHovered={isThisProductHovered} />
              {isThisProductHovered && <Tooltip point={thisProduct} visible={true} />}
            </div>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex pl-8 pt-2 text-xs text-[#8D9092]">
          <div className="flex-1">0</div>
          <div className="flex-1 text-center">50</div>
          <div className="flex-1 text-right">100</div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pl-2 text-xs text-slate-800">
          <div className="flex items-center gap-2">
            <TriangleMarker size={10} isHovered={false} />
            <span>This product</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleMarker size={9} isHovered={false} />
            <span>Others in category</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComparison;

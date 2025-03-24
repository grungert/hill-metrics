// Define column types
export interface Column {
  id: string;
  name: string;
  visible: boolean;
  sortable?: boolean;
}

// Define the Asset type
export interface Asset {
  id: string;
  name: string;
  symbol: string;
  color: string;
  percentage: string;
  percentageValue: number;
  selected: boolean;
  visible: boolean;
  index?: number;
  nav?: string;
  date?: string;
  oneYear?: string;
  sortino?: string;
  volatility?: string;
  ytd?: string;
}

// Define available columns
export const columns: Column[] = [
  { id: 'instrument', name: 'Instrument', visible: true, sortable: true },
  { id: 'date', name: 'Date', visible: true, sortable: true },
  { id: 'nav', name: 'NAV', visible: true, sortable: true },
  { id: 'oneYear', name: '1Y', visible: true, sortable: true },
  { id: 'sortino', name: 'Sortino', visible: true, sortable: true },
  { id: 'volatility', name: 'Volatility', visible: true, sortable: true },
  { id: 'ytd', name: 'YTD %', visible: true, sortable: true },
];

// Mock asset data based on the image
export const mockAssetData: Asset[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    color: "#F7931A",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 1
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    color: "#627EEA",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 2
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    color: "#26A17B",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 3
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    color: "#9B59B6",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 4
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    color: "#23B5E8",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 5
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    color: "#00FFA3",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 6
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    color: "#0033AD",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 7
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    color: "#E84142",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: false,
    visible: false,
    index: 9
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    color: "#F3BA2F",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 10
  },
  {
    id: "stellar",
    name: "Stellar",
    symbol: "XLM",
    color: "#7D00FF",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: false,
    visible: false,
    index: 11
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    color: "#C2A633",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 12
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    color: "#FFA409",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: false,
    visible: false,
    index: 13
  },
  {
    id: "aydinox",
    name: "Aydinox",
    symbol: "AYD",
    color: "#4CAF50",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: true,
    visible: true,
    index: 14
  },
  {
    id: "dai",
    name: "Dai",
    symbol: "DAI",
    color: "#F5AC37",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: false,
    visible: false,
    index: 15
  },
  {
    id: "somethingelse",
    name: "Somethingelse",
    symbol: "SME",
    color: "#FF5722",
    percentage: "6.35%",
    percentageValue: 6.35,
    selected: false,
    visible: false,
    index: 16
  }
];

// Interface for chart data point
export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

// Generate random chart data based on visible assets
export const generateChartData = (
  visibleAssetIds: string[], 
  timeRange: string, 
  customStartDate?: Date, 
  customEndDate?: Date
): ChartDataPoint[] => {
  const assets = mockAssetData.filter(asset => visibleAssetIds.includes(asset.id));
  const data: ChartDataPoint[] = [];
  
  // Determine number of data points based on time range
  let dataPoints = 30;
  
  // Generate dates
  const endDate = customEndDate || new Date("2023-04-30");
  const startDate = new Date(endDate);
  
  if (timeRange === 'CUSTOM' && customStartDate && customEndDate) {
    // For custom date range, calculate appropriate number of data points
    const daysDiff = Math.ceil((customEndDate.getTime() - customStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      dataPoints = 24; // Hourly for 1 day or less
    } else if (daysDiff <= 7) {
      dataPoints = daysDiff * 4; // 4 points per day for a week
    } else if (daysDiff <= 31) {
      dataPoints = daysDiff; // Daily for a month
    } else if (daysDiff <= 90) {
      dataPoints = Math.ceil(daysDiff / 2); // Every 2 days for 3 months
    } else {
      dataPoints = Math.ceil(daysDiff / 7); // Weekly for longer periods
    }
    
    // Use the custom dates
    startDate.setTime(customStartDate.getTime());
  } else {
    // Use preset ranges
    switch (timeRange) {
      case "12H":
        dataPoints = 12;
        startDate.setHours(startDate.getHours() - 12);
        break;
      case "1D":
        dataPoints = 24;
        startDate.setDate(startDate.getDate() - 1);
        break;
      case "1W":
        dataPoints = 7;
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "1M":
        dataPoints = 30;
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "3M":
        dataPoints = 90;
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "1Y":
        dataPoints = 365;
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case "ALL":
        dataPoints = 500;
        startDate.setFullYear(startDate.getFullYear() - 5);
        break;
      default:
        dataPoints = 30;
        startDate.setMonth(startDate.getMonth() - 1);
    }
  }
  
  const timeIncrement = (endDate.getTime() - startDate.getTime()) / dataPoints;
  
  // Generate base values for each asset
  const baseValues: { [key: string]: number } = {};
  assets.forEach(asset => {
    baseValues[asset.id] = 20 + Math.random() * 60; // Random value between 20 and 80
  });
  
  // Generate data points
  for (let i = 0; i < dataPoints; i++) {
    const currentDate = new Date(startDate.getTime() + timeIncrement * i);
    const formattedDate = formatDate(currentDate, timeRange);
    
    const dataPoint: ChartDataPoint = { date: formattedDate };
    
    assets.forEach(asset => {
      // Create somewhat realistic price movements
      const volatility = 0.05; // 5% volatility
      const change = (Math.random() - 0.5) * 2 * volatility;
      const prevValue = i === 0 ? baseValues[asset.id] : (data[i-1][asset.id] as number);
      dataPoint[asset.id] = Math.max(10, prevValue * (1 + change));
      
      // Add some trends based on the asset
      if (asset.id === "bitcoin") {
        dataPoint[asset.id] = (dataPoint[asset.id] as number) * (1 + (Math.sin(i/5) * 0.02));
      } else if (asset.id === "ethereum") {
        dataPoint[asset.id] = (dataPoint[asset.id] as number) * (1 + (Math.cos(i/4) * 0.015));
      }
    });
    
    data.push(dataPoint);
  }
  
  return data;
};

// Helper function to format dates based on time range
const formatDate = (date: Date, timeRange: string): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  
  if (timeRange === "12H" || timeRange === "1D") {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (timeRange === "1W" || timeRange === "1M" || timeRange === "3M") {
    return date.toLocaleDateString([], options);
  } else {
    return date.toLocaleDateString([], { ...options, year: 'numeric' });
  }
};

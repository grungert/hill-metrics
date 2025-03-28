import { sub, format, startOfMonth, eachMonthOfInterval } from 'date-fns';

// Interface for chart data points
export interface ChartDataPoint {
  date: string;
  timestamp: number;
  price: number;
  volume: number;
  marketcap: number;
  performance: number; // Percentage change from baseline
  isUp: boolean;
}

// Function to generate random price with a tendency to follow previous direction
function generatePrice(previousPrice: number, volatility: number, trend: number): number {
  const changePercent = (Math.random() - 0.5) * volatility + trend;
  return Math.max(300, Math.min(500, previousPrice * (1 + changePercent / 100)));
}

// Function to generate annual data with monthly labels
export function generateAnnualData(): ChartDataPoint[] {
  const endDate = new Date();
  const startDate = sub(endDate, { years: 1 });
  
  // Generate monthly date points for the x-axis
  const monthlyDates = eachMonthOfInterval({ start: startDate, end: endDate });
  
  let lastPrice = 400; // Starting price around $400
  const data: ChartDataPoint[] = [];
  
  // Create data points for each month
  monthlyDates.forEach((date, index) => {
    // Simulate some trends
    let trend = 0;
    if (index < 3) trend = 1.5; // Uptrend at beginning
    else if (index >= 3 && index < 6) trend = -1; // Downtrend in middle
    else if (index >= 6 && index < 9) trend = 0.5; // Recovery
    else trend = -0.5; // Slight decline at end
    
    // Generate price with some volatility
    const price = generatePrice(lastPrice, 4, trend);
    lastPrice = price;
    
    // Generate volume - higher on big price movements, but scaled down for better visualization
    const priceChange = Math.abs(price - (data[index - 1]?.price || price));
    const volumeBase = 20 + Math.random() * 30;
    // Scale down volume to fit better in the chart (max ~120px height)
    const volume = (volumeBase + (priceChange / price) * 100) / 6;
    
    // Determine if price went up or down
    const isUp = index > 0 ? price > data[index - 1].price : true;
    
    // Calculate marketcap as a function of price and volume (with some variation)
    const marketcap = price * (volume * 1000) * (1 + (Math.random() * 0.2));
    
    // Calculate performance relative to first price
    const initialPrice = data.length === 0 ? price : data[0].price;
    const performance = ((price / initialPrice) - 1) * 100;
    
    data.push({
      date: format(date, 'MMM'),
      timestamp: date.getTime(),
      price: Math.round(price * 100) / 100,
      volume: Math.round(volume),
      marketcap: Math.round(marketcap * 100) / 100,
      performance: Math.round(performance * 100) / 100,
      isUp
    });
  });
  
  return data;
}

// Function to generate monthly data with daily points
export function generateMonthlyData(): ChartDataPoint[] {
  const endDate = new Date();
  const startDate = sub(endDate, { months: 1 });
  
  // Generate 30 data points from start to end
  const days = 30;
  let lastPrice = 400; // Starting price around $400
  const data: ChartDataPoint[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = sub(endDate, { days: days - i - 1 });
    
    // Add more volatility for daily data
    const trend = Math.sin(i / 5) * 2; // Oscillating trend
    const price = generatePrice(lastPrice, 2, trend);
    lastPrice = price;
    
    // Generate volume - higher on big price movements, but scaled down for better visualization
    const priceChange = Math.abs(price - (data[i - 1]?.price || price));
    const volumeBase = 15 + Math.random() * 30;
    // Scale down volume to fit better in the chart (max ~120px height)
    const volume = (volumeBase + (priceChange / price) * 200) / 6;
    
    // Determine if price went up or down
    const isUp = i > 0 ? price > data[i - 1].price : true;
    
    // Calculate marketcap as a function of price and volume (with some variation)
    const marketcap = price * (volume * 1000) * (1 + (Math.random() * 0.2));
    
    // Calculate performance relative to first price
    const initialPrice = data.length === 0 ? price : data[0].price;
    const performance = ((price / initialPrice) - 1) * 100;
    
    data.push({
      date: format(date, 'd MMM'),
      timestamp: date.getTime(),
      price: Math.round(price * 100) / 100,
      volume: Math.round(volume),
      marketcap: Math.round(marketcap * 100) / 100,
      performance: Math.round(performance * 100) / 100,
      isUp
    });
  }
  
  return data;
}

// Function to generate weekly data with daily points
export function generateWeeklyData(): ChartDataPoint[] {
  const endDate = new Date();
  const startDate = sub(endDate, { days: 7 });
  
  // Generate 7 data points for each day of the week
  let lastPrice = 400; // Starting price around $400
  const data: ChartDataPoint[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = sub(endDate, { days: 7 - i - 1 });
    
    // Add high volatility for weekly data
    const trend = (Math.random() - 0.5) * 4; // Random trend
    const price = generatePrice(lastPrice, 3, trend);
    lastPrice = price;
    
    // Generate volume - higher on big price movements, but scaled down for better visualization
    const priceChange = Math.abs(price - (data[i - 1]?.price || price));
    const volumeBase = 20 + Math.random() * 40;
    // Scale down volume to fit better in the chart (max ~120px height)
    const volume = (volumeBase + (priceChange / price) * 250) / 6;
    
    // Determine if price went up or down
    const isUp = i > 0 ? price > data[i - 1].price : true;
    
    // Calculate marketcap as a function of price and volume (with some variation)
    const marketcap = price * (volume * 1000) * (1 + (Math.random() * 0.2));
    
    // Calculate performance relative to first price
    const initialPrice = data.length === 0 ? price : data[0].price;
    const performance = ((price / initialPrice) - 1) * 100;
    
    data.push({
      date: format(date, 'EEE'),
      timestamp: date.getTime(),
      price: Math.round(price * 100) / 100,
      volume: Math.round(volume),
      marketcap: Math.round(marketcap * 100) / 100,
      performance: Math.round(performance * 100) / 100,
      isUp
    });
  }
  
  return data;
}

// Function to generate daily data with hourly points
export function generateDailyData(): ChartDataPoint[] {
  const endDate = new Date();
  const startDate = sub(endDate, { days: 1 });
  
  // Generate 24 data points for each hour
  let lastPrice = 400; // Starting price around $400
  const data: ChartDataPoint[] = [];
  
  for (let i = 0; i < 24; i++) {
    const date = sub(endDate, { hours: 24 - i - 1 });
    
    // Add very high volatility for hourly data
    const trend = Math.sin(i / 4) * 3; // Oscillating trend
    const price = generatePrice(lastPrice, 1.5, trend);
    lastPrice = price;
    
    // Generate volume - higher on big price movements, but scaled down for better visualization
    const priceChange = Math.abs(price - (data[i - 1]?.price || price));
    const volumeBase = 10 + Math.random() * 20;
    // Scale down volume to fit better in the chart (max ~120px height)
    const volume = (volumeBase + (priceChange / price) * 300) / 6;
    
    // Determine if price went up or down
    const isUp = i > 0 ? price > data[i - 1].price : true;
    
    // Calculate marketcap as a function of price and volume (with some variation)
    const marketcap = price * (volume * 1000) * (1 + (Math.random() * 0.2));
    
    // Calculate performance relative to first price
    const initialPrice = data.length === 0 ? price : data[0].price;
    const performance = ((price / initialPrice) - 1) * 100;
    
    data.push({
      date: format(date, 'h a'),
      timestamp: date.getTime(),
      price: Math.round(price * 100) / 100,
      volume: Math.round(volume),
      marketcap: Math.round(marketcap * 100) / 100,
      performance: Math.round(performance * 100) / 100,
      isUp
    });
  }
  
  return data;
}

// Function to get data based on selected time range
export function getChartData(timeRange: string): ChartDataPoint[] {
  switch (timeRange) {
    case "1D":
      return generateDailyData();
    case "1W":
      return generateWeeklyData();
    case "1M":
      return generateMonthlyData();
    case "3M":
    case "YTD":
    case "1Y":
    case "ALL":
    default:
      return generateAnnualData();
  }
}

import { Asset } from "../components/Comparison/mockData";
import { TableColumn, AssetItem } from "../types/dashboard";

// Bitcoin Atom instrument details for Comparison page
export const getBitcoinAtomComparisonData = (): Asset => {
  return {
    id: "btc-atom",
    name: "Bitcoin Atom",
    symbol: "BCA",
    color: "#FF9F0A", // Orange color for Bitcoin Atom
    percentage: "7.25%",
    percentageValue: 7.25,
    selected: true,
    visible: true,
    index: 8, // Position in the list
    nav: "$253.47",
    date: "2025-04-01",
    oneYear: "42.8%",
    sortino: "1.21",
    volatility: "High",
    ytd: "15.7%"
  };
};

// Bitcoin Atom instrument details for Search page
export const getBitcoinAtomSearchData = (): AssetItem => {
  return {
    id: "btc-atom",
    name: "Bitcoin Atom",
    category: "Cryptocurrency",
    currency: "USD",
    rating: 4,
    risk: "3/7",
    ytdPercentage: 15.7,
    oneYearPercentage: 42.8,
    threeYearPercentage: 106.5,
    date: "2025-04-01"
  };
};

// Helper function to get instrument details by ID for Comparison page
export const getInstrumentComparisonDataById = (id: string): Asset | null => {
  if (id === "btc-atom") {
    return getBitcoinAtomComparisonData();
  }
  
  // Add more cases for other instruments as needed
  
  return null;
};

// Helper function to get instrument details by ID for Search page
export const getInstrumentSearchDataById = (id: string): AssetItem | null => {
  if (id === "btc-atom") {
    return getBitcoinAtomSearchData();
  }
  
  // Add more cases for other instruments as needed
  
  return null;
};

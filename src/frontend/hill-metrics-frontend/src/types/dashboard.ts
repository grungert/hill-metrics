export interface TableColumn {
  id: string;
  label: string;
  width?: string;
  flex?: boolean;
  visible?: boolean;
  order?: number;
  canHide?: boolean;
}

export interface AssetItem {
  id: number | string;
  name: string;
  category: string;
  pricing?: string;
  currency: string;
  rating: number; // 1-5 stars
  risk: string; // Format: "1/7" for risk level
  ytdPercentage: number;
  oneYearPercentage: number;
  threeYearPercentage: number;
  date: string;
  number?: number; // For display order
}

export interface FilterPill {
  type: string;
  label: string;
  value: string;
}

export interface TableColumn {
  id: string;
  label: string;
  width?: string;
  flex?: boolean;
}

export interface AssetItem {
  id: number | string;
  name: string;
  category: string;
  currency: string;
  rating: string;
  ytdPercentage: number;
  oneYearPercentage: number;
  threeYearPercentage: number;
  date: string;
}

import { FilterOption } from '../types/filters';

// Sector filter options with hierarchical structure
export const sectorFilterOptions: FilterOption[] = [
  // Main sector categories
  {
    id: 1,
    name: 'Energy',
    parentId: null
  },
  {
    id: 12,
    name: 'Materials',
    parentId: null
  },
  {
    id: 37,
    name: 'Industrials',
    parentId: null
  },
  {
    id: 80,
    name: 'Consumer Discretionary',
    parentId: null
  },
  {
    id: 132,
    name: 'Consumer Staples',
    parentId: null
  },
  {
    id: 154,
    name: 'Health Care',
    parentId: null
  },
  {
    id: 173,
    name: 'Financials',
    parentId: null
  },
  {
    id: 201,
    name: 'Information Technology',
    parentId: null
  },
  {
    id: 226,
    name: 'Communication Services',
    parentId: null
  },
  {
    id: 244,
    name: 'Utilities',
    parentId: null
  },
  {
    id: 257,
    name: 'Real Estate',
    parentId: null
  },
  
  // Energy subcategories
  { id: 3, name: 'Energy Equipment & Services', parentId: 1 },
  { id: 4, name: 'Oil & Gas Drilling', parentId: 3 },
  { id: 5, name: 'Oil & Gas Equipment & Services', parentId: 3 },
  { id: 6, name: 'Oil, Gas & Consumable Fuels', parentId: 1 },
  { id: 7, name: 'Integrated Oil & Gas', parentId: 6 },
  { id: 8, name: 'Oil & Gas Exploration & Production', parentId: 6 },
  { id: 9, name: 'Oil & Gas Refining & Marketing', parentId: 6 },
  { id: 10, name: 'Oil & Gas Storage & Transportation', parentId: 6 },
  { id: 11, name: 'Coal & Consumable Fuels', parentId: 6 },
  
  // Materials subcategories
  { id: 14, name: 'Chemicals', parentId: 12 },
  { id: 15, name: 'Commodity Chemicals', parentId: 14 },
  { id: 16, name: 'Diversified Chemicals', parentId: 14 },
  { id: 17, name: 'Semiconductors & Semiconductor Equipment', parentId: 12 },
  { id: 18, name: 'Fertilizers & Agricultural Chemicals', parentId: 17 },
  { id: 19, name: 'Industrial Gases', parentId: 14 },
  { id: 20, name: 'Specialty Chemicals', parentId: 14 },
  { id: 21, name: 'Construction Materials', parentId: 12 },
  { id: 22, name: 'Construction Materials', parentId: 21 },
  { id: 23, name: 'Containers & Packaging', parentId: 12 },
  { id: 24, name: 'Metal & Glass Containers', parentId: 23 },
  { id: 25, name: 'Paper Packaging', parentId: 23 },
  { id: 26, name: 'Metals & Mining', parentId: 12 },
  { id: 27, name: 'Aluminum', parentId: 26 },
  { id: 28, name: 'Diversified Metals & Mining', parentId: 26 },
  { id: 29, name: 'Copper', parentId: 26 },
  { id: 30, name: 'Gold', parentId: 26 },
  { id: 31, name: 'Precious Metals & Minerals', parentId: 26 },
  { id: 32, name: 'Silver', parentId: 26 },
  { id: 33, name: 'Steel', parentId: 26 },
  { id: 34, name: 'Paper & Forest Products', parentId: 12 },
  { id: 35, name: 'Forest Products', parentId: 34 },
  { id: 36, name: 'Paper Products', parentId: 34 },
  
  // Industrials subcategories
  { id: 38, name: 'Capital Goods', parentId: 37 },
  { id: 39, name: 'Aerospace & Defense', parentId: 38 },
  { id: 41, name: 'Building Products', parentId: 38 },
  { id: 43, name: 'Construction & Engineering', parentId: 38 },
  { id: 45, name: 'Electrical Equipment', parentId: 38 },
  { id: 46, name: 'Electrical Components & Equipment', parentId: 45 },
  { id: 47, name: 'Heavy Electrical Equipment', parentId: 45 },
  { id: 48, name: 'Industrial Conglomerates', parentId: 38 },
  { id: 50, name: 'Machinery', parentId: 38 },
  { id: 51, name: 'Construction Machinery & Heavy Trucks', parentId: 50 },
  { id: 52, name: 'Agricultural & Farm Machinery', parentId: 50 },
  { id: 53, name: 'Industrial Machinery', parentId: 50 },
  { id: 54, name: 'Trading Companies & Distributors', parentId: 38 },
  { id: 56, name: 'Commercial & Professional Services', parentId: 37 },
  { id: 57, name: 'Commercial Services & Supplies', parentId: 56 },
  { id: 58, name: 'Commercial Printing', parentId: 57 },
  { id: 59, name: 'Environmental & Facilities Services', parentId: 57 },
  { id: 60, name: 'Office Services & Supplies', parentId: 57 },
  { id: 61, name: 'Diversified Support Services', parentId: 57 },
  { id: 62, name: 'Security & Alarm Services', parentId: 57 },
  { id: 63, name: 'Professional Services', parentId: 56 },
  { id: 64, name: 'Human Resource & Employment Services', parentId: 63 },
  { id: 65, name: 'Research & Consulting Services', parentId: 63 },
  { id: 66, name: 'Transportation', parentId: 37 },
  { id: 67, name: 'Air Freight & Logistics', parentId: 66 },
  { id: 69, name: 'Airlines', parentId: 66 },
  { id: 71, name: 'Marine', parentId: 66 },
  { id: 73, name: 'Road & Rail', parentId: 66 },
  { id: 74, name: 'Railroads', parentId: 73 },
  { id: 75, name: 'Trucking', parentId: 73 },
  { id: 76, name: 'Transportation Infrastructure', parentId: 66 },
  { id: 77, name: 'Airport Services', parentId: 76 },
  { id: 78, name: 'Highways & Railtracks', parentId: 76 },
  { id: 79, name: 'Marine Ports & Services', parentId: 76 },
  
  // Consumer Discretionary subcategories
  { id: 81, name: 'Automobiles & Components', parentId: 80 },
  { id: 82, name: 'Auto Components', parentId: 81 },
  { id: 83, name: 'Auto Parts & Equipment', parentId: 82 },
  { id: 84, name: 'Tires & Rubber', parentId: 82 },
  { id: 85, name: 'Automobiles', parentId: 81 },
  { id: 86, name: 'Automobile Manufacturers', parentId: 85 },
  { id: 87, name: 'Motorcycle Manufacturers', parentId: 85 },
  { id: 88, name: 'Consumer Durables & Apparel', parentId: 80 },
  { id: 89, name: 'Household Durables', parentId: 88 },
  { id: 90, name: 'Consumer Electronics', parentId: 89 },
  { id: 91, name: 'Home Furnishings', parentId: 89 },
  { id: 92, name: 'Homebuilding', parentId: 89 },
  { id: 93, name: 'Household Appliances', parentId: 89 },
  { id: 94, name: 'Housewares & Specialties', parentId: 89 },
  { id: 95, name: 'Leisure Products', parentId: 88 },
  { id: 97, name: 'Textiles, Apparel & Luxury Goods', parentId: 88 },
  { id: 98, name: 'Apparel, Accessories & Luxury Goods', parentId: 97 },
  { id: 99, name: 'Footwear', parentId: 97 },
  { id: 100, name: 'Textiles', parentId: 97 },
  { id: 101, name: 'Consumer Services', parentId: 80 },
  { id: 102, name: 'Hotels, Restaurants & Leisure', parentId: 101 },
  { id: 103, name: 'Casinos & Gaming', parentId: 102 },
  { id: 104, name: 'Hotels, Resorts & Cruise Lines', parentId: 102 },
  { id: 105, name: 'Leisure Facilities', parentId: 102 },
  { id: 106, name: 'Restaurants', parentId: 102 },
  { id: 107, name: 'Diversified Consumer Services', parentId: 101 },
  { id: 108, name: 'Education Services', parentId: 107 },
  { id: 109, name: 'Specialized Consumer Services', parentId: 107 },
  { id: 110, name: 'Media (discontinued effective close of September 30, 2018)', parentId: 80 },
  { id: 112, name: 'Advertising (discontinued effective close of September 30, 2018)', parentId: 110 },
  { id: 113, name: 'Broadcasting (discontinued effective close of September 30, 2018)', parentId: 110 },
  { id: 114, name: 'Cable & Satellite (discontinued effective close of September 30, 2018)', parentId: 110 },
  { id: 115, name: 'Movies & Entertainment (discontinued effective close of September 30, 2018)', parentId: 110 },
  { id: 116, name: 'Publishing (discontinued effective close of September 30, 2018)', parentId: 110 },
  { id: 117, name: 'Retailing', parentId: 80 },
  { id: 118, name: 'Distributors', parentId: 117 },
  { id: 120, name: 'Internet & Direct Marketing Retail', parentId: 117 },
  { id: 122, name: 'Multiline Retail', parentId: 117 },
  { id: 123, name: 'Department Stores', parentId: 122 },
  { id: 124, name: 'General Merchandise Stores', parentId: 122 },
  { id: 125, name: 'Specialty Retail', parentId: 117 },
  { id: 126, name: 'Apparel Retail', parentId: 125 },
  { id: 127, name: 'Computer & Electronics Retail', parentId: 125 },
  { id: 128, name: 'Home Improvement Retail', parentId: 125 },
  { id: 129, name: 'Specialty Stores', parentId: 125 },
  { id: 130, name: 'Automotive Retail', parentId: 125 },
  { id: 131, name: 'Homefurnishing Retail', parentId: 125 },
  
  // Consumer Staples subcategories
  { id: 133, name: 'Food & Staples Retailing', parentId: 132 },
  { id: 135, name: 'Drug Retail', parentId: 133 },
  { id: 136, name: 'Food Distributors', parentId: 133 },
  { id: 137, name: 'Food Retail', parentId: 133 },
  { id: 138, name: 'Hypermarkets & Super Centers', parentId: 133 },
  { id: 139, name: 'Food, Beverage & Tobacco', parentId: 132 },
  { id: 140, name: 'Beverages', parentId: 139 },
  { id: 141, name: 'Brewers', parentId: 140 },
  { id: 142, name: 'Distillers & Vintners', parentId: 140 },
  { id: 143, name: 'Soft Drinks', parentId: 140 },
  { id: 144, name: 'Food Products', parentId: 139 },
  { id: 145, name: 'Agricultural Products', parentId: 144 },
  { id: 146, name: 'Packaged Foods & Meats', parentId: 144 },
  { id: 147, name: 'Tobacco', parentId: 139 },
  { id: 149, name: 'Household & Personal Products', parentId: 132 },
  { id: 150, name: 'Household Products', parentId: 149 },
  { id: 152, name: 'Personal Products', parentId: 149 },
  
  // Health Care subcategories
  { id: 155, name: 'Health Care Equipment & Services', parentId: 154 },
  { id: 156, name: 'Health Care Equipment & Supplies', parentId: 155 },
  { id: 157, name: 'Health Care Equipment', parentId: 156 },
  { id: 158, name: 'Health Care Supplies', parentId: 156 },
  { id: 159, name: 'Health Care Providers & Services', parentId: 155 },
  { id: 160, name: 'Health Care Distributors', parentId: 159 },
  { id: 161, name: 'Health Care Services', parentId: 159 },
  { id: 162, name: 'Health Care Facilities', parentId: 159 },
  { id: 163, name: 'Managed Health Care', parentId: 159 },
  { id: 164, name: 'Health Care Technology', parentId: 155 },
  { id: 165, name: 'Health Care Technology', parentId: 164 },
  { id: 166, name: 'Pharmaceuticals, Biotechnology & Life Sciences', parentId: 154 },
  { id: 167, name: 'Biotechnology', parentId: 166 },
  { id: 168, name: 'Biotechnology', parentId: 167 },
  { id: 169, name: 'Pharmaceuticals', parentId: 166 },
  { id: 170, name: 'Pharmaceuticals', parentId: 169 },
  { id: 171, name: 'Life Sciences Tools & Services', parentId: 166 },
  { id: 172, name: 'Life Sciences Tools & Services', parentId: 171 },
  
  // Financials subcategories
  { id: 174, name: 'Banks', parentId: 173 },
  { id: 175, name: 'Banks', parentId: 174 },
  { id: 176, name: 'Diversified Banks', parentId: 175 },
  { id: 177, name: 'Regional Banks', parentId: 175 },
  { id: 178, name: 'Thrifts & Mortgage Finance', parentId: 174 },
  { id: 179, name: 'Thrifts & Mortgage Finance', parentId: 178 },
  { id: 180, name: 'Diversified Financials', parentId: 173 },
  { id: 181, name: 'Diversified Financial Services', parentId: 180 },
  { id: 182, name: 'Other Diversified Financial Services', parentId: 181 },
  { id: 183, name: 'Multi-Sector Holdings', parentId: 181 },
  { id: 184, name: 'Specialized Finance', parentId: 181 },
  { id: 185, name: 'Consumer Finance', parentId: 180 },
  { id: 186, name: 'Consumer Finance', parentId: 185 },
  { id: 187, name: 'Capital Markets', parentId: 180 },
  { id: 188, name: 'Asset Management & Custody Banks', parentId: 187 },
  { id: 189, name: 'Investment Banking & Brokerage', parentId: 187 },
  { id: 190, name: 'Diversified Capital Markets', parentId: 187 },
  { id: 191, name: 'Financial Exchanges & Data', parentId: 187 },
  { id: 192, name: 'Mortgage Real Estate Investment Trusts (REITs)', parentId: 180 },
  { id: 193, name: 'Mortgage REITs', parentId: 192 },
  { id: 194, name: 'Insurance', parentId: 173 },
  { id: 195, name: 'Insurance', parentId: 194 },
  { id: 196, name: 'Insurance Brokers', parentId: 195 },
  { id: 197, name: 'Life & Health Insurance', parentId: 195 },
  { id: 198, name: 'Multi-line Insurance', parentId: 195 },
  { id: 199, name: 'Property & Casualty Insurance', parentId: 195 },
  { id: 200, name: 'Reinsurance', parentId: 195 },
  
  // Information Technology subcategories
  { id: 202, name: 'Software & Services', parentId: 201 },
  { id: 203, name: 'Internet Software & Services (discontinued effective close of September 30, 2018)', parentId: 202 },
  { id: 204, name: 'Internet Software & Services (discontinued effective close of September 30, 2018)', parentId: 203 },
  { id: 205, name: 'IT Services', parentId: 202 },
  { id: 206, name: 'IT Consulting & Other Services', parentId: 205 },
  { id: 207, name: 'Data Processing & Outsourced Services', parentId: 205 },
  { id: 208, name: 'Internet Services & Infrastructure', parentId: 205 },
  { id: 209, name: 'Software', parentId: 202 },
  { id: 210, name: 'Application Software', parentId: 209 },
  { id: 211, name: 'Systems Software', parentId: 209 },
  { id: 212, name: 'Home Entertainment Software (discontinued effective close of September 30, 2018)', parentId: 209 },
  { id: 213, name: 'Technology Hardware & Equipment', parentId: 201 },
  { id: 214, name: 'Communications Equipment', parentId: 213 },
  { id: 215, name: 'Communications Equipment', parentId: 214 },
  { id: 216, name: 'Technology Hardware, Storage & Peripherals', parentId: 213 },
  { id: 217, name: 'Technology Hardware, Storage & Peripherals', parentId: 216 },
  { id: 218, name: 'Electronic Equipment, Instruments & Components', parentId: 213 },
  { id: 219, name: 'Electronic Equipment & Instruments', parentId: 218 },
  { id: 220, name: 'Electronic Components', parentId: 218 },
  { id: 221, name: 'Electronic Manufacturing Services', parentId: 218 },
  { id: 222, name: 'Technology Distributors', parentId: 218 },
  { id: 223, name: 'Semiconductors & Semiconductor Equipment', parentId: 201 },
  { id: 224, name: 'Semiconductor Equipment', parentId: 223 },
  { id: 225, name: 'Semiconductors', parentId: 223 },
  
  // Communication Services subcategories
  { id: 227, name: 'Telecommunication Services', parentId: 226 },
  { id: 228, name: 'Diversified Telecommunication Services', parentId: 227 },
  { id: 229, name: 'Alternative Carriers', parentId: 228 },
  { id: 230, name: 'Integrated Telecommunication Services', parentId: 228 },
  { id: 231, name: 'Wireless Telecommunication Services', parentId: 227 },
  { id: 232, name: 'Wireless Telecommunication Services', parentId: 231 },
  { id: 233, name: 'Media & Entertainment', parentId: 226 },
  { id: 234, name: 'Media', parentId: 233 },
  { id: 235, name: 'Advertising', parentId: 234 },
  { id: 236, name: 'Broadcasting', parentId: 234 },
  { id: 237, name: 'Cable & Satellite', parentId: 234 },
  { id: 238, name: 'Publishing', parentId: 234 },
  { id: 239, name: 'Entertainment', parentId: 233 },
  { id: 240, name: 'Movies & Entertainment', parentId: 239 },
  { id: 241, name: 'Interactive Home Entertainment', parentId: 239 },
  { id: 242, name: 'Interactive Media & Services', parentId: 233 },
  { id: 243, name: 'Interactive Media & Services', parentId: 242 },
  
  // Utilities subcategories
  { id: 245, name: 'Utilities', parentId: 244 },
  { id: 246, name: 'Electric Utilities', parentId: 245 },
  { id: 247, name: 'Electric Utilities', parentId: 246 },
  { id: 248, name: 'Gas Utilities', parentId: 245 },
  { id: 249, name: 'Gas Utilities', parentId: 248 },
  { id: 250, name: 'Multi-Utilities', parentId: 245 },
  { id: 251, name: 'Multi-Utilities', parentId: 250 },
  { id: 252, name: 'Water Utilities', parentId: 245 },
  { id: 253, name: 'Water Utilities', parentId: 252 },
  { id: 254, name: 'Independent Power and Renewable Electricity Producers', parentId: 245 },
  { id: 255, name: 'Independent Power Producers & Energy Traders', parentId: 254 },
  { id: 256, name: 'Renewable Electricity', parentId: 254 },
  
  // Real Estate subcategories
  { id: 258, name: 'Real Estate', parentId: 257 },
  { id: 259, name: 'Equity Real Estate Investment Trusts (REITs)', parentId: 258 },
  { id: 260, name: 'Diversified REITs', parentId: 259 },
  { id: 261, name: 'Industrial REITs', parentId: 259 },
  { id: 262, name: 'Hotel & Resort REITs', parentId: 259 },
  { id: 263, name: 'Office REITs', parentId: 259 },
  { id: 264, name: 'Health Care REITs', parentId: 259 },
  { id: 265, name: 'Residential REITs', parentId: 259 },
  { id: 266, name: 'Retail REITs', parentId: 259 },
  { id: 267, name: 'Specialized REITs', parentId: 259 },
  { id: 268, name: 'Real Estate Management & Development', parentId: 258 },
  { id: 269, name: 'Diversified Real Estate Activities', parentId: 268 },
  { id: 270, name: 'Real Estate Operating Companies', parentId: 268 },
  { id: 271, name: 'Real Estate Development', parentId: 268 },
  { id: 272, name: 'Real Estate Services', parentId: 268 }
];

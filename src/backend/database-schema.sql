-- Hill Metrics Database Schema

-- Core Tables

-- InstrumentTypes
CREATE TABLE IF NOT EXISTS InstrumentTypes (
    instrument_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_type_id INT,
    FOREIGN KEY (parent_type_id) REFERENCES InstrumentTypes(instrument_type_id)
);

-- AssetCategories
CREATE TABLE IF NOT EXISTS AssetCategories (
    asset_category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Sectors
CREATE TABLE IF NOT EXISTS Sectors (
    sector_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_sector_id INT,
    FOREIGN KEY (parent_sector_id) REFERENCES Sectors(sector_id)
);

-- MarketTypes
CREATE TABLE IF NOT EXISTS MarketTypes (
    market_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Markets
CREATE TABLE IF NOT EXISTS Markets (
    market_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    market_type_id INT,
    FOREIGN KEY (market_type_id) REFERENCES MarketTypes(market_type_id)
);

-- Instruments
CREATE TABLE IF NOT EXISTS Instruments (
    instrument_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    isin_code VARCHAR(12) UNIQUE,
    instrument_type_id INT,
    category VARCHAR(255),
    price DECIMAL(18, 4),
    currency VARCHAR(10),
    rating INT,
    risk INT,
    ytd_performance DECIMAL(10, 2),
    one_year_performance DECIMAL(10, 2),
    three_year_performance DECIMAL(10, 2),
    last_updated DATETIME,
    original_market VARCHAR(255),
    asset_manager_issuer VARCHAR(255),
    dividend_value DECIMAL(18, 4),
    dividend_frequency VARCHAR(50),
    fees DECIMAL(10, 2),
    distribution_policy VARCHAR(255),
    legal_status VARCHAR(255),
    investor_type VARCHAR(255),
    FOREIGN KEY (instrument_type_id) REFERENCES InstrumentTypes(instrument_type_id)
);

-- Specific Data Tables

-- CryptoDetails
CREATE TABLE IF NOT EXISTS CryptoDetails (
    instrument_id INT PRIMARY KEY,
    fees DECIMAL(10, 2),
    safeness_indicator VARCHAR(255),
    circulating_supply BIGINT,
    layer VARCHAR(255),
    consensus_mechanism VARCHAR(255),
    validator VARCHAR(255),
    active_developers INT,
    stacking_percentage DECIMAL(10, 2),
    availability VARCHAR(255),
    scalability VARCHAR(255),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- MutualFundDetails
CREATE TABLE IF NOT EXISTS MutualFundDetails (
    instrument_id INT PRIMARY KEY,
    asset_manager_issuer VARCHAR(255),
    dividend_value DECIMAL(18, 4),
    dividend_frequency VARCHAR(50),
    fees DECIMAL(10, 2),
    distribution_policy VARCHAR(255),
    legal_status VARCHAR(255),
    investor_type VARCHAR(255),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- BondDetails
CREATE TABLE IF NOT EXISTS BondDetails (
    instrument_id INT PRIMARY KEY,
    asset_manager_issuer VARCHAR(255),
    dividend_value DECIMAL(18, 4),
    dividend_frequency VARCHAR(50),
    maturity DATE,
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- RealEstateDetails
CREATE TABLE IF NOT EXISTS RealEstateDetails (
    instrument_id INT PRIMARY KEY,
    asset_manager_issuer VARCHAR(255),
    dividend_value DECIMAL(18, 4),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- CommoditiesDetails
CREATE TABLE IF NOT EXISTS CommoditiesDetails (
    instrument_id INT PRIMARY KEY,
    original_market VARCHAR(255),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- PrivateEquityDetails
CREATE TABLE IF NOT EXISTS PrivateEquityDetails (
    instrument_id INT PRIMARY KEY,
    asset_manager_issuer VARCHAR(255),
    dividend_value DECIMAL(18, 4),
    fees DECIMAL(10, 2),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- Performance and Metrics

-- PerformanceMetrics
CREATE TABLE IF NOT EXISTS PerformanceMetrics (
    instrument_id INT PRIMARY KEY,
    performance_last_day DECIMAL(10, 2),
    performance_ytd DECIMAL(10, 2),
    performance_3_years DECIMAL(10, 2),
    volatility_ytd DECIMAL(10, 2),
    volatility_3_years DECIMAL(10, 2),
    volatility_5_years DECIMAL(10, 2),
    sharpe_ratio DECIMAL(10, 2),
    risk_notation INT,
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- QualityMetrics
CREATE TABLE IF NOT EXISTS QualityMetrics (
    instrument_id INT PRIMARY KEY,
    liquidity INT,
    marketcap INT,
    performance INT,
    reliability INT,
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- Additional Attributes

-- InstrumentAddlAttributes
CREATE TABLE IF NOT EXISTS InstrumentAddlAttributes (
    instrument_id INT PRIMARY KEY,
    currency VARCHAR(10),
    valuation_frequency VARCHAR(50),
    volume BIGINT,
    high DECIMAL(18, 4),
    low DECIMAL(18, 4),
    benchmark_category VARCHAR(255),
    inception_date DATE,
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- Graph Data

-- GraphData
CREATE TABLE IF NOT EXISTS GraphData (
    graph_data_id INT AUTO_INCREMENT PRIMARY KEY,
    instrument_id INT,
    metric VARCHAR(50),
    timestamp DATETIME,
    value DECIMAL(18, 4),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- Fees

-- FeeStructure
CREATE TABLE IF NOT EXISTS FeeStructure (
    instrument_id INT PRIMARY KEY,
    subscription_fee DECIMAL(5, 2),
    redemption_fee DECIMAL(5, 2),
    management_fee DECIMAL(5, 2),
    performance_fee DECIMAL(5, 2),
    ongoing_charges DECIMAL(5, 2),
    priips_management_fee DECIMAL(5, 2),
    transaction_fee DECIMAL(5, 2),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- Ranking

-- PerformanceRanking
CREATE TABLE IF NOT EXISTS PerformanceRanking (
    instrument_id INT PRIMARY KEY,
    one_month_ranking INT,
    three_month_ranking INT,
    one_year_ranking INT,
    three_year_ranking INT,
    five_year_ranking INT,
    ten_year_ranking INT,
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id)
);

-- Relations

-- Instrument_AssetCategories (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS Instrument_AssetCategories (
    instrument_id INT,
    asset_category_id INT,
    PRIMARY KEY (instrument_id, asset_category_id),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id),
    FOREIGN KEY (asset_category_id) REFERENCES AssetCategories(asset_category_id)
);

-- Instrument_Sectors (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS Instrument_Sectors (
    instrument_id INT,
    sector_id INT,
    PRIMARY KEY (instrument_id, sector_id),
    FOREIGN KEY (instrument_id) REFERENCES Instruments(instrument_id),
    FOREIGN KEY (sector_id) REFERENCES Sectors(sector_id)
);

-- Users

-- Users
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_instruments_name ON Instruments(name);
CREATE INDEX idx_instruments_isin ON Instruments(isin_code);
CREATE INDEX idx_instruments_type ON Instruments(instrument_type_id);
CREATE INDEX idx_instruments_price ON Instruments(price);
CREATE INDEX idx_instruments_performance ON Instruments(ytd_performance, one_year_performance, three_year_performance);
CREATE INDEX idx_graph_data_instrument_metric ON GraphData(instrument_id, metric);
CREATE INDEX idx_graph_data_timestamp ON GraphData(timestamp);

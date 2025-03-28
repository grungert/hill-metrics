import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  Line
} from "react-simple-maps";

// Define types for the react-simple-maps components
type Point = [number, number];

// Use a standard TopoJSON URL for world geography data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Convert country codes to lowercase for case-insensitive matching
// https://www.worldatlas.com/articles/top-coffee-producing-countries.html
const highlightedCountries = [
  "BRA",
  "VNM",
  "COL",
  "IDN",
  "ETH",
  "HND",
  "IND",
  "UGA",
  "MEX",
  "GTM",
  "PER",
  "NIC",
  "CHN",
  "CIV",
  "CRI",
  "KEN",
  "PNG",
  "TZA",
  "SLV",
  "ECU",
  "CMR",
  "LAO",
  "MDG",
  "GAB",
  "THA",
  "VEN",
  "DOM",
  "HTI",
  "COD",
  "RWA",
  "BDI",
  "PHL",
  "TGO",
  "GIN",
  "YEM",
  "CUB",
  "PAN",
  "BOL",
  "TLS",
  "CAF",
  "NGA",
  "GHA",
  "SLE",
  "AGO",
  "JAM",
  "PRY",
  "MWI",
  "TTO",
  "ZWE",
  "LBR"
];

function generateCircle(deg: number): Point[] {
  if (!deg)
    return [
      [-180, 0],
      [-90, 0],
      [0, 0],
      [90, 0],
      [180, 0]
    ];
  return new Array(361).fill(1).map((_, i) => {
    return [-180 + i, deg] as Point;
  });
}

const AssetMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="min-w-60 grow shrink relative">
      <div className="text-slate-700 text-lg font-medium leading-none">
        Asset Map
      </div>
      <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white w-full mt-4 py-5 px-6 rounded-md border-solid overflow-hidden">
        {/* @ts-ignore - Ignoring type errors for react-simple-maps components */}
        <ComposableMap  height={500}>
          {/* @ts-ignore */}
          {/* @ts-ignore */}
          {/* @ts-ignore */}
          <Geographies geography={geoUrl} stroke="#FFF" strokeWidth={0.5}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // The world-atlas data uses numeric IDs and stores country names in properties
                // We'll check if the country name contains any of our highlighted country names
                const countryName = geo.properties?.name || "";
                
                // Check if this country should be highlighted based on name
                const isHighlighted = highlightedCountries.some(code => {
                  // Map ISO codes to country name fragments to check for
                  switch(code) {
                    case "BRA": return countryName.includes("Brazil");
                    case "VNM": return countryName.includes("Vietnam");
                    case "COL": return countryName.includes("Colombia");
                    case "IDN": return countryName.includes("Indonesia");
                    case "ETH": return countryName.includes("Ethiopia");
                    case "HND": return countryName.includes("Honduras");
                    case "IND": return countryName.includes("India");
                    case "UGA": return countryName.includes("Uganda");
                    case "MEX": return countryName.includes("Mexico");
                    case "GTM": return countryName.includes("Guatemala");
                    case "PER": return countryName.includes("Peru");
                    case "NIC": return countryName.includes("Nicaragua");
                    case "CHN": return countryName.includes("China");
                    case "CIV": return countryName.includes("Ivory") || countryName.includes("Côte");
                    case "CRI": return countryName.includes("Costa Rica");
                    case "KEN": return countryName.includes("Kenya");
                    case "PNG": return countryName.includes("Papua");
                    case "TZA": return countryName.includes("Tanzania");
                    case "SLV": return countryName.includes("El Salvador");
                    case "ECU": return countryName.includes("Ecuador");
                    case "CMR": return countryName.includes("Cameroon");
                    case "LAO": return countryName.includes("Lao");
                    case "MDG": return countryName.includes("Madagascar");
                    case "GAB": return countryName.includes("Gabon");
                    case "THA": return countryName.includes("Thailand");
                    case "VEN": return countryName.includes("Venezuela");
                    case "DOM": return countryName.includes("Dominican");
                    case "HTI": return countryName.includes("Haiti");
                    case "COD": return countryName.includes("Congo");
                    case "RWA": return countryName.includes("Rwanda");
                    case "BDI": return countryName.includes("Burundi");
                    case "PHL": return countryName.includes("Philippines");
                    case "TGO": return countryName.includes("Togo");
                    case "GIN": return countryName.includes("Guinea") && !countryName.includes("Equatorial") && !countryName.includes("Bissau");
                    case "YEM": return countryName.includes("Yemen");
                    case "CUB": return countryName.includes("Cuba");
                    case "PAN": return countryName.includes("Panama");
                    case "BOL": return countryName.includes("Bolivia");
                    case "TLS": return countryName.includes("Timor") || countryName.includes("East Timor");
                    case "CAF": return countryName.includes("Central African");
                    case "NGA": return countryName.includes("Nigeria");
                    case "GHA": return countryName.includes("Ghana");
                    case "SLE": return countryName.includes("Sierra Leone");
                    case "AGO": return countryName.includes("Angola");
                    case "JAM": return countryName.includes("Jamaica");
                    case "PRY": return countryName.includes("Paraguay");
                    case "MWI": return countryName.includes("Malawi");
                    case "TTO": return countryName.includes("Trinidad");
                    case "ZWE": return countryName.includes("Zimbabwe");
                    case "LBR": return countryName.includes("Liberia");
                    default: return false;
                  }
                });
                return (
                  /* @ts-ignore */
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "#5f00ff" : "#e5d9f8"}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isHighlighted ? "#7d47ff" : "#e5d9f8",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      // Show the country name in the tooltip
                      setTooltipContent(name);
                    }}
                    onMouseLeave={() => setTooltipContent("")}
                    onClick={() => console.log(geo.properties.name)}
                  />
                );
              })
            }
          </Geographies>
          {/* @ts-ignore */}
         
        </ComposableMap>
      </div>
      {tooltipContent && (
        <div className="absolute top-2 left-2 bg-white p-2 border border-gray-300 rounded shadow text-sm">
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default AssetMap;

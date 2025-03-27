import React, { useState } from "react";

type ChartType = "Price" | "Volume" | "Marketcap" | "Performance";
type TimeRange = "1D" | "1W" | "1M" | "3M" | "YTD" | "1Y" | "ALL";

const Chart: React.FC = () => {
  const [activeChart, setActiveChart] = useState<ChartType>("Price");
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRange>("1W");

  const handleChartTypeChange = (type: ChartType) => {
    setActiveChart(type);
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setActiveTimeRange(range);
  };

  return (
    <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white w-full p-4 rounded-md border-solid max-md:max-w-full">
      <div className="flex w-full flex-col items-stretch max-md:max-w-full">
        <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
          <div className="text-slate-900 text-base font-semibold self-stretch my-auto">
            Graphs
          </div>
          <div className="self-stretch flex items-center gap-2.5 w-8 my-auto">
            <div className="self-stretch flex w-full items-center gap-2.5 flex-1 shrink basis-[0%] my-auto">
              <div className="justify-center items-center bg-slate-100 self-stretch flex w-8 h-8 flex-1 shrink basis-[0%] my-auto px-2 rounded-[100px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e366b09b5171d2e7f2091b6494c35f4bb94a4a4550781e8587598efb862d3cd?placeholderIfAbsent=true"
                  alt="Settings"
                  className="aspect-[1] object-contain w-4 self-stretch flex-1 shrink basis-[0%] my-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-900 font-semibold whitespace-nowrap leading-none mt-3">
          <button
            className={`items-center border ${
              activeChart === "Price"
                ? "border-[color:var(--slate-900,#0F172A)] bg-slate-900 text-white"
                : "border-[color:var(--slate-100,#F1F5F9)] bg-slate-100"
            } self-stretch flex gap-2 my-auto px-3 py-1.5 rounded-[100px] border-solid`}
            onClick={() => handleChartTypeChange("Price")}
          >
            <div className="self-stretch gap-2 my-auto">Price</div>
          </button>
          <button
            className={`items-center border ${
              activeChart === "Volume"
                ? "border-[color:var(--slate-900,#0F172A)] bg-slate-900 text-white"
                : "border-[color:var(--slate-100,#F1F5F9)] bg-slate-100"
            } self-stretch flex gap-2 my-auto px-3 py-1.5 rounded-[100px] border-solid`}
            onClick={() => handleChartTypeChange("Volume")}
          >
            <div className="self-stretch gap-2 my-auto">Volume</div>
          </button>
          <button
            className={`items-center border ${
              activeChart === "Marketcap"
                ? "border-[color:var(--slate-900,#0F172A)] bg-slate-900 text-white"
                : "border-[color:var(--slate-100,#F1F5F9)] bg-slate-100"
            } self-stretch flex gap-2 my-auto px-3 py-1.5 rounded-[100px] border-solid`}
            onClick={() => handleChartTypeChange("Marketcap")}
          >
            <div className="self-stretch gap-2 my-auto">Marketcap</div>
          </button>
          <button
            className={`items-center ${
              activeChart === "Performance"
                ? "border-[color:var(--slate-900,#0F172A)] bg-slate-900 text-white"
                : "bg-slate-100"
            } self-stretch flex gap-2 my-auto px-3 py-1.5 rounded-[100px]`}
            onClick={() => handleChartTypeChange("Performance")}
          >
            <div className="self-stretch gap-2 my-auto">Performance</div>
          </button>
        </div>
      </div>
      <div className="w-full mt-4 max-md:max-w-full">
        <div className="h-[575px] w-full max-md:max-w-full">
          <div className="flex w-full items-center gap-6 max-md:max-w-full">
            <div className="self-stretch flex min-w-60 items-center gap-[40px_190px] my-auto">
              <div className="justify-center items-center border border-[color:var(--slate-300,#CBD5E1)] bg-white self-stretch flex min-w-60 my-auto px-[5px] py-1 rounded-md border-solid">
                {(
                  ["1D", "1W", "1M", "3M", "YTD", "1Y", "ALL"] as TimeRange[]
                ).map((range) => (
                  <button
                    key={range}
                    className={`${
                      activeTimeRange === range
                        ? "rounded bg-slate-100"
                        : "bg-white"
                    } self-stretch text-sm text-slate-900 font-medium whitespace-nowrap leading-none my-auto px-3 py-1`}
                    onClick={() => handleTimeRangeChange(range)}
                  >
                    {range}
                  </button>
                ))}
                <div className="bg-white self-stretch flex w-12 my-auto px-3 py-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d48c0dbb27a82e28b4fcc98cf0ab708676b8478e6bd87b8965777a250a40c33c?placeholderIfAbsent=true"
                    alt="Calendar"
                    className="aspect-[1] object-contain w-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/61c63b42dbb214b12f1547ee8dc534d1e233a63753b2c0f69c428a6ddc15bec2?placeholderIfAbsent=true"
            alt="Bitcoin Price Chart"
            className="aspect-[1.57] object-contain w-full mt-10 max-md:max-w-full"
          />
        </div>
        <div className="text-slate-600 text-sm font-normal leading-none mt-6 max-md:max-w-full">
          Last updated: 1:10 PM, April 22, 2024
        </div>
      </div>
    </div>
  );
};

export default Chart;

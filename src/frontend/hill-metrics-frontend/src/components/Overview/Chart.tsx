import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  Cell,
  ReferenceLine,
} from "recharts";
import { getChartData, ChartDataPoint } from "./chartData";
import { format } from "date-fns";

type ChartType = "Price" | "Volume" | "Marketcap" | "Performance";
type TimeRange = "1D" | "1W" | "1M" | "3M" | "YTD" | "1Y" | "ALL";

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded shadow-md">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-sm text-slate-900 font-semibold">
          Price: ${payload[0].value.toFixed(2)}
        </p>
        <p className="text-sm text-slate-700">
          Volume: {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

const Chart: React.FC = () => {
  const [activeChart, setActiveChart] = useState<ChartType>("Price");
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRange>("1Y");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState<string>(
    format(new Date(), "h:mm a, MMMM d, yyyy")
  );

  // Update chart data when time range changes
  useEffect(() => {
    const data = getChartData(activeTimeRange);
    setChartData(data);
  }, [activeTimeRange]);

  const handleChartTypeChange = (type: ChartType) => {
    setActiveChart(type);
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setActiveTimeRange(range);
  };

  // Format number with k/M suffix
  const formatYAxis = (value: number) => {
    return `${value.toFixed(2)}`;
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
        <div className="flex items-center gap-2 text-sm text-slate-900 font-semibold whitespace-nowrap leading-none mt-3 flex-wrap">
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
            className={`items-center border ${
              activeChart === "Performance"
                ? "border-[color:var(--slate-900,#0F172A)] bg-slate-900 text-white"
                : "border-[color:var(--slate-100,#F1F5F9)] bg-slate-100"
            } self-stretch flex gap-2 my-auto px-3 py-1.5 rounded-[100px] border-solid`}
            onClick={() => handleChartTypeChange("Performance")}
          >
            <div className="self-stretch gap-2 my-auto">Performance</div>
          </button>
        </div>
      </div>
      <div className="w-full mt-4 max-md:max-w-full">
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
        
        <div className="h-[480px] w-full mt-6 max-md:max-w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === "Price" && (
              <ComposedChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  yAxisId="price"
                  orientation="right"
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  tickFormatter={formatYAxis}
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="left"
                  domain={[0, 120]} // Fixed max height to match design
                  hide={true}
                />
                <Tooltip 
                  content={(props: any) => {
                    const { active, payload, label } = props;
                    if (active && payload && payload.length) {
                      const price = Number(payload[0].value);
                      const volume = payload[1].value;
                      return (
                        <div className="bg-white p-3 border border-slate-200 rounded shadow-md">
                          <p className="text-sm font-medium text-slate-700">{label}</p>
                          <p className="text-sm text-slate-900 font-semibold">
                            Price: ${price.toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-700">
                            Volume: {volume}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {/* Line for price data */}
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6200EE" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6200EE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="price"
                  yAxisId="price"
                  fill="url(#colorPrice)"
                  stroke="#6200EE"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: "#6200EE", stroke: "#fff", strokeWidth: 2 }}
                />
                
                {/* Bars for volume data */}
                <Bar
                  dataKey="volume"
                  yAxisId="volume"
                  fill="#5EE05E"
                  maxBarSize={40}
                  barSize={6}
                  radius={[2, 2, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isUp ? "#5EE05E" : "#FF6B6B"} />
                  ))}
                </Bar>
              </ComposedChart>
            )}

            {activeChart === "Volume" && (
              <ComposedChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="right"
                  domain={[0, 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                />
                <Tooltip 
                  content={(props: any) => {
                    const { active, payload, label } = props;
                    if (active && payload && payload.length) {
                      const volume = Number(payload[0].value);
                      return (
                        <div className="bg-white p-3 border border-slate-200 rounded shadow-md">
                          <p className="text-sm font-medium text-slate-700">{label}</p>
                          <p className="text-sm text-slate-900 font-semibold">
                            Volume: {volume}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {/* Bars for volume data */}
                <Bar
                  dataKey="volume"
                  yAxisId="volume"
                  fill="#5EE05E"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isUp ? "#5EE05E" : "#FF6B6B"} />
                  ))}
                </Bar>
              </ComposedChart>
            )}

            {activeChart === "Marketcap" && (
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  orientation="right"
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  tickFormatter={(value) => {
                    if (value >= 1000000000) {
                      return `$${(value / 1000000000).toFixed(1)}B`;
                    } else if (value >= 1000000) {
                      return `$${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                      return `$${(value / 1000).toFixed(1)}K`;
                    }
                    return `$${value}`;
                  }}
                />
                <Tooltip 
                  content={(props: any) => {
                    const { active, payload, label } = props;
                    if (active && payload && payload.length) {
                      const value = Number(payload[0].value);
                      let formattedValue;
                      if (value >= 1000000000) {
                        formattedValue = `$${(value / 1000000000).toFixed(2)}B`;
                      } else if (value >= 1000000) {
                        formattedValue = `$${(value / 1000000).toFixed(2)}M`;
                      } else if (value >= 1000) {
                        formattedValue = `$${(value / 1000).toFixed(2)}K`;
                      } else {
                        formattedValue = `$${value.toFixed(2)}`;
                      }
                      
                      return (
                        <div className="bg-white p-3 border border-slate-200 rounded shadow-md">
                          <p className="text-sm font-medium text-slate-700">{label}</p>
                          <p className="text-sm text-slate-900 font-semibold">
                            Marketcap: {formattedValue}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                <Line
                  type="monotone"
                  dataKey="marketcap"
                  stroke="#31C48D"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: "#31C48D", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            )}

            {activeChart === "Performance" && (
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  orientation="right"
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                />
                <ReferenceLine y={0} stroke="#CBD5E1" />
                <Tooltip 
                  content={(props: any) => {
                    const { active, payload, label } = props;
                    if (active && payload && payload.length) {
                      const value = Number(payload[0].value);
                      return (
                        <div className="bg-white p-3 border border-slate-200 rounded shadow-md">
                          <p className="text-sm font-medium text-slate-700">{label}</p>
                          <p className="text-sm text-slate-900 font-semibold">
                            Performance: {value > 0 ? '+' : ''}{value.toFixed(2)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: "#0EA5E9", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="text-slate-600 text-sm font-normal leading-none mt-6 max-md:max-w-full">
          Last updated: {currentDateTime}
        </div>
      </div>
    </div>
  );
};

export default Chart;

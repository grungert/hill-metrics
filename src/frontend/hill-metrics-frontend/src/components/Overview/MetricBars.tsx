import React from "react";
import InfoIcon from "./InfoIcon";

interface MetricBarProps {
  title: string;
  rating: string;
}

const MetricBar: React.FC<MetricBarProps> = ({ title, rating }) => {
  return (
    <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white self-stretch flex-1 shrink basis-[0%] my-auto px-3 py-4 rounded-md border-solid">
      <div className="flex w-full items-center gap-[40px_64px] font-normal whitespace-nowrap justify-between">
        <div className="self-stretch flex items-center gap-0.5 text-base text-slate-900 my-auto">
          <div className="self-stretch my-auto">{title}</div>
          <InfoIcon />
        </div>
        <div className="self-stretch gap-0.5 text-xs text-slate-600 leading-6 my-auto">
          {rating}
        </div>
      </div>
      <div className="rotate-[3.141592653589793rad] flex w-full items-center justify-between mt-2">
        {Array.from({ length: 28 }).map((_, index) => {
          // Calculate color based on index
          const colorIndex = Math.max(0, 28 - index);
          const opacity = colorIndex / 28;
          const r = Math.round(98 + (222 - 98) * (1 - opacity));
          const g = Math.round(0 + (237 - 0) * (1 - opacity));
          const b = Math.round(238 + (255 - 238) * (1 - opacity));

          // Determine height
          let height = "h-4";
          if (index === 3) {
            height = "h-8";
          }

          return (
            <div
              key={index}
              className={`bg-[rgba(${r},${g},${b},1)] self-stretch flex w-[3px] shrink-0 ${height} my-auto rounded-sm`}
            />
          );
        })}
      </div>
    </div>
  );
};

const MetricBars: React.FC = () => {
  return (
    <div className="flex w-full items-center gap-3 flex-wrap mt-6 max-md:max-w-full">
      <MetricBar title="Liquidity" rating="Good" />
      <MetricBar title="Marketcap" rating="Good" />
      <MetricBar title="Performance" rating="Good" />
      <MetricBar title="Reliability" rating="Good" />
    </div>
  );
};

export default MetricBars;

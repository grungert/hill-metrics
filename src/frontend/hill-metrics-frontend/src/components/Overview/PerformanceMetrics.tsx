import React from "react";

interface MetricItemProps {
  label: string;
  value: string;
  isPositive?: boolean;
}

const MetricItem: React.FC<MetricItemProps> = ({
  label,
  value,
  isPositive,
}) => {
  return (
    <div className="self-stretch my-auto">
      <div className="flex w-full items-center gap-1 text-sm text-[rgba(40,40,40,1)] font-normal leading-none">
        <div className="self-stretch my-auto">{label}</div>
        <div className="self-stretch flex w-5 shrink-0 h-5 my-auto">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 13.3334V10"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6.66663H10.0083"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        className={`text-base font-bold leading-none mt-2 ${
          isPositive ? "text-[#219653]" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
};

const PerformanceMetrics: React.FC = () => {
  return (
    <div className="w-full max-md:max-w-full">
      <div className="w-full max-md:max-w-full">
        <div className="justify-between items-center border border-[color:var(--slate-200,#E2E8F0)] bg-white flex w-full gap-[40px_77px] flex-wrap px-4 py-3 rounded-md border-solid max-md:max-w-full">
          <MetricItem
            label="Performance last day"
            value="1.25%"
            isPositive={true}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8032d1033106f13765138147cc4866fac1113142ac67d5aabd28dacd563bd987?placeholderIfAbsent=true"
            alt="Divider"
            className="object-contain w-0 stroke-[1px] stroke-slate-300 self-stretch shrink-0 my-auto"
          />
          <MetricItem label="Performance YTD" value="4.87%" isPositive={true} />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6adb9b5ad7bc4cb574cd11379d712c9d2398c157dabf847854d69b510449732f?placeholderIfAbsent=true"
            alt="Divider"
            className="object-contain w-0 stroke-[1px] stroke-slate-300 self-stretch shrink-0 my-auto"
          />
          <MetricItem label="Performance YTD" value="4.87%" isPositive={true} />
        </div>

        <div className="justify-between items-center border border-[color:var(--slate-200,#E2E8F0)] bg-white flex w-full gap-[39px] flex-wrap mt-3 px-4 py-3 rounded-md border-solid max-md:max-w-full">
          <MetricItem label="Volatility 3y" value="143.78%" />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/15ec1fa232c2e01064dc8937fa093b29c026f2a0613600ac732f5a0edce6f818?placeholderIfAbsent=true"
            alt="Divider"
            className="object-contain w-0 stroke-[1px] stroke-slate-300 self-stretch shrink-0 my-auto"
          />
          <MetricItem label="Volatility 5Y" value="143.78%" />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39ddff42e005b3c241371759ccdf6fb72cea4cbe5d9eecb7a304db88d6ec7f3f?placeholderIfAbsent=true"
            alt="Divider"
            className="object-contain w-0 stroke-[1px] stroke-slate-300 self-stretch shrink-0 my-auto"
          />
          <MetricItem label="Volatility YTD" value="9.78%" />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d2687d5519e995b9b7714d74590a82058eb295c63fed97e43136241676f4a99?placeholderIfAbsent=true"
            alt="Divider"
            className="object-contain w-0 stroke-[1px] stroke-slate-300 self-stretch shrink-0 my-auto"
          />
          <MetricItem label="Sharpe" value="143.78%" />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1860bcded370f8a23302123879378a3369b4cb97b966164c2e0e838e3db7340f?placeholderIfAbsent=true"
            alt="Divider"
            className="object-contain w-0 stroke-[1px] stroke-slate-300 self-stretch shrink-0 my-auto"
          />
          <MetricItem label="Risk notation" value="6/7" />
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;

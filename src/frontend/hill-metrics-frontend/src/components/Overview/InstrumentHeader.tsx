import React from "react";

const InstrumentHeader: React.FC = () => {
  return (
    <div className="border-b-[color:var(--slate-300,#CBD5E1)] w-full pb-[13px] border-b border-solid max-md:max-w-full">
      <div className="flex w-full items-center pt-5 pb-4 px-5 max-md:max-w-full">
        <div className="self-stretch flex min-w-60 w-full items-center gap-[40px_100px] justify-between flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
          <div className="self-stretch flex min-w-60 items-center gap-4 whitespace-nowrap my-auto">
            <div className="self-stretch flex items-center gap-2 text-[22px] leading-none my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fd77a64e22b5eb09ef573db59c2ae2a186aefdfe0e1185e9c8766e8693a23ef?placeholderIfAbsent=true"
                alt="Bitcoin Logo"
                className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto"
              />
              <div className="text-slate-900 font-semibold self-stretch my-auto">
                Bitcoin
              </div>
              <div className="text-slate-500 font-normal self-stretch my-auto">
                BTC
              </div>
            </div>
            <div className="bg-slate-200 self-stretch gap-1 overflow-hidden text-sm text-slate-600 font-normal leading-none my-auto px-2 py-0.5 rounded-md">
              Crypto
            </div>
          </div>
          <div className="justify-center items-center rounded bg-slate-200 self-stretch flex gap-2 text-sm text-slate-900 font-medium leading-6 my-auto pl-3 pr-4 py-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffb1856afcb538d3238382f09c400b1ab91240c090fc357f479fe19625c5f3ca?placeholderIfAbsent=true"
              alt="Add Icon"
              className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
            />
            <div className="self-stretch my-auto">Add to comparison</div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch whitespace-nowrap justify-center pl-[60px] pr-5 py-2 max-md:max-w-full max-md:pl-5">
        <div className="flex w-full items-center gap-2.5 flex-wrap max-md:max-w-full">
          <div className="self-stretch flex min-w-60 items-center gap-[27px] flex-wrap flex-1 shrink basis-7 my-auto max-md:max-w-full">
            <div className="text-[rgba(40,40,40,1)] text-[26px] font-semibold leading-none self-stretch my-auto">
              $63,382.75
            </div>
            <div className="self-stretch flex items-center gap-2 my-auto">
              <div className="text-[rgba(0,204,61,1)] text-[26px] font-semibold leading-none self-stretch my-auto">
                +0.72%
              </div>
              <div className="text-[rgba(40,40,40,1)] text-2xl font-normal leading-none self-stretch my-auto">
                BTC
              </div>
            </div>
          </div>
          <div className="justify-center items-center rounded bg-slate-200 self-stretch flex gap-2 text-sm text-slate-900 font-normal leading-6 my-auto pl-3 pr-4 py-1">
            <div className="self-stretch my-auto">Export</div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b169af64a1e4c7f49cce225602182ffea42dae43b0a25b522d9a90e5ba69bdce?placeholderIfAbsent=true"
              alt="Export Icon"
              className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentHeader;

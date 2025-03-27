import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white w-full text-slate-900 mx-auto pt-4 pb-[1888px] px-4 max-md:mt-4 max-md:pb-[100px]">
      <div className="flex w-full items-center gap-[40px_100px] text-[22px] font-semibold whitespace-nowrap leading-none justify-between">
        <div className="self-stretch flex items-center gap-2 my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fd77a64e22b5eb09ef573db59c2ae2a186aefdfe0e1185e9c8766e8693a23ef?placeholderIfAbsent=true"
            alt="Bitcoin Logo"
            className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto"
          />
          <div className="self-stretch my-auto">Bitcoin</div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/343144e3285fdfe1d40f92baa1ab80843b30cb357f9662d909d6a7ef1cc01840?placeholderIfAbsent=true"
          alt="Menu Icon"
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
        />
      </div>
      <div className="w-full text-base font-normal leading-7 mt-10">
        <div className="w-full">
          <div className="w-full">
            <div className="justify-between items-center rounded bg-slate-200 flex w-full whitespace-nowrap py-1">
              <div className="self-stretch w-[105px] gap-2 my-auto pl-2 pr-3">
                Overview
              </div>
            </div>
            <div className="rounded flex w-full items-center whitespace-nowrap justify-between mt-2 py-1">
              <div className="self-stretch w-[105px] gap-2 my-auto pl-2 pr-3">
                Graphs
              </div>
            </div>
            <div className="rounded flex w-full items-center justify-between mt-2 py-1">
              <div className="self-stretch w-[105px] gap-2 my-auto pl-2">
                Advanced indicators
              </div>
            </div>
            <div className="rounded flex w-full items-center justify-between mt-2 py-1">
              <div className="self-stretch w-[105px] gap-2 my-auto pl-2">
                Search / News
              </div>
            </div>
            <div className="rounded flex w-full items-center justify-between mt-2 py-1">
              <div className="self-stretch w-[105px] gap-2 my-auto pl-2">
                Qualitative characteristics
              </div>
            </div>
            <div className="rounded flex w-full items-center justify-between mt-2 py-1">
              <div className="self-stretch w-[105px] gap-2 my-auto pl-2 pr-3">
                Peer group
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

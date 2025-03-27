import React from "react";

const AssetMap: React.FC = () => {
  return (
    <div className="flex flex-col relative aspect-[1.219] min-w-60 h-[211px] grow shrink w-[334px]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/df6f0571-eec9-439d-beb3-21e959754da7?placeholderIfAbsent=true"
        alt="Asset Map Background"
        className="absolute h-full w-full object-cover inset-0"
      />
      <div className="relative text-slate-700 text-lg font-medium leading-none">
        Asset map
      </div>
      <div className="relative items-center border border-[color:var(--slate-200,#E2E8F0)] bg-white flex h-64 w-full flex-col mt-4 pb-[163px] px-4 rounded-md border-solid max-md:pb-[100px]">
        <div className="flex">
          <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-slate-50 flex min-h-[216px] gap-4 py-3 rounded-lg border-solid" />
        </div>
      </div>
    </div>
  );
};

export default AssetMap;

import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white w-full h-full text-slate-900 pt-4 pb-4 pr-2 pl-0">
      <div className="flex w-full items-center justify-between mb-5">
        <div className="flex items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fd77a64e22b5eb09ef573db59c2ae2a186aefdfe0e1185e9c8766e8693a23ef?placeholderIfAbsent=true"
            alt="Bitcoin Logo"
            className="w-6 h-6 mr-2"
          />
          <span className="text-slate-900 font-medium">Bitcoin</span>
        </div>
        <span className="text-slate-500 text-lg">«</span>
      </div>
      
      <div className="text-sm">
        <div className="mb-1 font-medium">
          <div className="bg-slate-200 rounded py-1 px-2">
            <span className="text-slate-900">Overview</span>
          </div>
        </div>
        
        <div className="mb-1">
          <div className="py-1 px-2 hover:bg-slate-100">
            <span className="text-slate-600">Graphs</span>
          </div>
        </div>
        
        <div className="mb-1">
          <div className="py-1 px-2 hover:bg-slate-100">
            <span className="text-slate-600">Advanced indicators</span>
          </div>
        </div>
        
        <div className="mb-1">
          <div className="py-1 px-2 hover:bg-slate-100">
            <span className="text-slate-600">Search / News</span>
          </div>
        </div>
        
        <div className="mb-1">
          <div className="py-1 px-2 hover:bg-slate-100">
            <span className="text-slate-600">Qualitative characteristics</span>
          </div>
        </div>
        
        <div className="mb-1">
          <div className="py-1 px-2 hover:bg-slate-100">
            <span className="text-slate-600">Peer group</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

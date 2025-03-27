import React from "react";

interface PerformanceBarProps {
  period: string;
  height: string;
}

const PerformanceBar: React.FC<PerformanceBarProps> = ({ period, height }) => {
  return (
    <div className="flex flex-col items-center max-md:hidden">
      <div className="bg-slate-200 flex min-h-[203px] w-4 gap-2.5 rounded-2xl max-md:hidden">
        <div
          className={`bg-[rgba(98,0,238,1)] flex ${height} w-4 rounded-2xl`}
        />
      </div>
      <div className="text-[#8D9092] text-center text-sm font-normal mt-4">
        {period}
      </div>
    </div>
  );
};

const PerformanceRanking: React.FC = () => {
  return (
    <div className="min-w-60 w-full">
      <div className="w-full text-lg text-slate-700 font-medium leading-none">
        Performance ranking
      </div>
      <div className="items-stretch border border-[color:var(--slate-200,#E2E8F0)] bg-white flex min-h-[272px] w-full flex-col justify-center mt-4 p-4 rounded-md border-solid">
        <div className="flex gap-6">
          <div className="min-h-[203px] text-sm text-[#8D9092] font-normal w-[50px]">
            <div>Top 50</div>
            <div className="mt-6">Top 25</div>
            <div className="mt-6">Last 50</div>
            <div className="mt-6">Last 25</div>
            <div className="text-[#8d9092] mt-6">0</div>
          </div>
          <div className="flex min-w-60 gap-[38px]">
            <PerformanceBar period="1m" height="min-h-[59px]" />
            <PerformanceBar period="3m" height="min-h-[104px]" />
            <PerformanceBar period="1y" height="min-h-[152px]" />
            <PerformanceBar period="3y" height="min-h-[104px]" />

            <div className="flex flex-col items-stretch max-md:hidden">
              <div className="bg-[#F6F7F7] flex min-h-[203px] w-4 gap-2.5 rounded-2xl max-md:hidden">
                <div className="bg-[rgba(98,0,238,1)] flex min-h-[203px] w-4 rounded-2xl max-md:hidden" />
              </div>
              <div className="text-[#8D9092] text-center text-sm font-normal mt-4">
                5y
              </div>
            </div>

            <PerformanceBar period="10y" height="min-h-[59px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceRanking;

import React from "react";
import InfoIcon from "./InfoIcon";

interface IndicatorItemProps {
  label: string;
  value: string;
}

const IndicatorItem: React.FC<IndicatorItemProps> = ({ label, value }) => {
  return (
    <div className="w-full mt-4">
      <div className="flex min-h-6 w-full gap-1 text-sm text-slate-500 font-medium tracking-[-0.07px] leading-none">
        <div className="flex items-center gap-1">
          <div className="self-stretch my-auto">{label}</div>
          <InfoIcon />
        </div>
      </div>
      <div className="w-full text-base text-slate-900 font-semibold">
        {value}
      </div>
    </div>
  );
};

const SpecificIndicators: React.FC = () => {
  return (
    <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white w-full p-4 rounded-md border-solid mt-4">
      <div className="text-slate-900 text-base font-semibold">
        Specific indicators
      </div>
      <div className="w-full mt-6">
        <div className="w-full">
          <div className="flex min-h-6 w-full gap-1 text-sm text-slate-500 font-medium tracking-[-0.07px] leading-none">
            <div className="flex items-center gap-1">
              <div className="self-stretch my-auto">Safeness indicator</div>
              <InfoIcon />
            </div>
          </div>
          <div className="w-full text-base text-slate-900 font-semibold whitespace-nowrap">
            High
          </div>
        </div>

        <IndicatorItem label="Layer" value="Bitcoin Layer 2" />
        <IndicatorItem label="Circulating supply" value="19 758 687" />
        <IndicatorItem label="Consensus" value="Unknown" />
        <IndicatorItem label="Validator" value="PoS" />
        <IndicatorItem label="Acrive developper" value="1 000" />
        <IndicatorItem label="Availability" value="Very high" />
        <IndicatorItem label="Scallability" value="Very high" />
      </div>
    </div>
  );
};

export default SpecificIndicators;

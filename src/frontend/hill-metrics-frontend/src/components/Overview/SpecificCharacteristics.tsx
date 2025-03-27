import React from "react";
import InfoIcon from "./InfoIcon";

interface CharacteristicItemProps {
  label: string;
  value: string;
}

const CharacteristicItem: React.FC<CharacteristicItemProps> = ({
  label,
  value,
}) => {
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

const SpecificCharacteristics: React.FC = () => {
  return (
    <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white w-full p-4 rounded-md border-solid">
      <div className="text-slate-900 text-base font-semibold">
        Specific characteristics
      </div>
      <div className="w-full mt-6">
        <div className="w-full whitespace-nowrap">
          <div className="flex min-h-6 w-full gap-1 text-sm text-slate-500 font-medium tracking-[-0.07px] leading-none">
            <div className="flex items-center gap-1">
              <div className="self-stretch my-auto">Fees</div>
              <InfoIcon />
            </div>
          </div>
          <div className="w-full text-base text-slate-900 font-semibold">
            High
          </div>
        </div>

        <CharacteristicItem label="Lorem Ipsum" value="Bitcoin Layer 2" />
        <CharacteristicItem label="Lorem Ipsum" value="19 758 687" />
        <CharacteristicItem label="Lorem Ipsum" value="Unknown" />
        <CharacteristicItem label="Lorem Ipsum" value="PoS" />
        <CharacteristicItem label="Lorem Ipsum" value="1 000" />
      </div>
    </div>
  );
};

export default SpecificCharacteristics;

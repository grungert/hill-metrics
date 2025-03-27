import React from "react";

interface FeeItemProps {
  label: string;
  value: string;
}

const FeeItem: React.FC<FeeItemProps> = ({ label, value }) => {
  return (
    <div className="w-full max-w-[385px] mt-2">
      <div className="flex w-full items-center gap-[40px_100px] justify-between">
        <div className="text-slate-700 self-stretch my-auto">{label}</div>
        <div className="text-[rgba(98,0,238,1)] self-stretch my-auto">
          {value}
        </div>
      </div>
    </div>
  );
};

const FeesCharacteristics: React.FC = () => {
  return (
    <div className="min-w-60 grow shrink w-[334px]">
      <div className="text-slate-700 text-lg font-medium leading-none">
        General characteristics
      </div>
      <div className="items-stretch border border-[color:var(--slate-200,#E2E8F0)] bg-white flex w-full max-w-[417px] flex-col overflow-hidden text-sm font-normal leading-none justify-center mt-4 py-4 rounded-md border-solid">
        <div className="flex w-full items-center gap-4 justify-center pb-2 px-4">
          <div className="self-stretch min-w-60 w-[385px] my-auto">
            <div className="w-full max-w-[385px] text-slate-700 font-semibold">
              <div className="self-stretch w-full gap-[13px]">
                Frais maximum
              </div>
            </div>
            <div className="w-full max-w-[385px] whitespace-nowrap mt-2">
              <div className="flex w-full items-center gap-[40px_100px] justify-between">
                <div className="text-slate-700 self-stretch my-auto">
                  Souscription
                </div>
                <div className="text-[rgba(98,0,238,1)] self-stretch my-auto">
                  2,5%
                </div>
              </div>
            </div>

            <FeeItem label="Rachat" value="Neant" />
            <FeeItem label="Gestion" value="2%" />
            <FeeItem label="Superformance" value="Neant" />
            <FeeItem label="Frais courants" value="2,26%" />
            <FeeItem label="Frais de gestion PRIIPS" value="1,98%" />
            <FeeItem label="Frais de transaction" value="0,1%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesCharacteristics;

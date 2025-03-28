import React from "react";

interface FeeItemProps {
  label: string;
  value: string;
}

const FeeItem: React.FC<FeeItemProps> = ({ label, value }) => {
  return (
    <div className="w-full py-1 flex justify-between">
      <div className="text-slate-700">{label}</div>
      <div className="text-[rgba(98,0,238,1)]">{value}</div>
    </div>
  );
};

const FeesCharacteristics: React.FC = () => {
  return (
    <div className="min-w-60 grow shrink">
      <div className="text-slate-700 text-lg font-medium leading-none">
        Fees
      </div>
      <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white w-full text-sm font-normal mt-4 py-5 px-6 rounded-md border-solid">
        <div className="text-slate-700 font-semibold mb-3">
          Frais maximum
        </div>
        <FeeItem label="Souscription" value="2,5%" />
        <FeeItem label="Rachat" value="Neant" />
        <FeeItem label="Gestion" value="2%" />
        <FeeItem label="Superformance" value="Neant" />
        <FeeItem label="Frais courants" value="2,26%" />
        <FeeItem label="Frais de gestion PRIIPS" value="1,98%" />
        <FeeItem label="Frais de transaction" value="0,1%" />
      </div>
    </div>
  );
};

export default FeesCharacteristics;

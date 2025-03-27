import React from "react";

interface CharacteristicItemProps {
  label: string;
  value: string;
}

const CharacteristicItem: React.FC<CharacteristicItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="w-full mt-2">
      <div className="text-slate-700 text-sm font-medium leading-none">
        {label}
      </div>
      <div className="text-slate-900 text-base font-semibold leading-none mt-[13px]">
        {value}
      </div>
    </div>
  );
};

const GeneralCharacteristics: React.FC = () => {
  return (
    <div className="border border-[color:var(--slate-200,#E2E8F0)] bg-white w-full overflow-hidden py-4 rounded-md border-solid">
      <div className="self-stretch flex-1 shrink basis-[0%] w-full gap-2.5 text-lg text-slate-700 font-medium leading-5 px-4">
        General characteristics
      </div>
      <div className="flex w-full items-center gap-4 justify-center mt-6 pb-2 px-6 max-md:px-5">
        <div className="self-stretch w-full flex-1 shrink basis-[0%] my-auto">
          <div className="w-full">
            <div className="w-full whitespace-nowrap">
              <div className="text-slate-700 text-sm font-medium leading-none">
                Type
              </div>
              <div className="text-slate-900 text-base font-semibold leading-none mt-[13px]">
                SICAV
              </div>
            </div>

            <CharacteristicItem label="Capi/Distri" value="Capitalisation" />
            <CharacteristicItem label="Part couverte" value="Non" />
            <CharacteristicItem label="Fonds de fonds" value="Non" />
            <CharacteristicItem label="Eligible PEA" value="Non" />
            <CharacteristicItem
              label="Actif de la part EUR au 07/10/2024"
              value="2 279,12 M€"
            />
            <CharacteristicItem
              label="Variation de l'actif 3 mois"
              value="1,39%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralCharacteristics;

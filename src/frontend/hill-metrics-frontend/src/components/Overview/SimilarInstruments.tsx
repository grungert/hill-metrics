import React from "react";

interface AssetCardProps {
  name: string;
  imgSrc: string;
  value: string;
  tags: string[];
}

const AssetCard: React.FC<AssetCardProps> = ({ name, imgSrc, value, tags }) => {
  return (
    <div className="items-stretch border border-[color:var(--slate-200,#E2E8F0)] bg-white flex min-w-60 min-h-28 flex-col justify-center w-[417px] p-4 rounded-md border-solid">
      <div className="flex w-full gap-[26px]">
        <div className="min-w-60 w-full flex-1 shrink basis-[0%]">
          <div className="flex w-full items-center gap-[40px_100px] text-[rgba(40,40,40,1)] whitespace-nowrap justify-between">
            <div className="self-stretch flex items-center gap-2 text-lg font-medium leading-none my-auto">
              <img
                src={imgSrc}
                alt={`${name} Logo`}
                className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto rounded-[50%]"
              />
              <div className="self-stretch my-auto">{name}</div>
            </div>
            <div className="text-base font-normal leading-none self-stretch my-auto">
              {value}
            </div>
          </div>
          <div className="flex w-full flex-col text-sm text-slate-600 font-normal leading-none mt-6">
            <div className="flex gap-[13px]">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-slate-200 gap-1 overflow-hidden whitespace-nowrap px-2 py-0.5 rounded-md"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimilarInstruments: React.FC = () => {
  return (
    <div className="w-full mt-6 max-md:max-w-full">
      <div className="text-slate-700 text-lg font-medium leading-none max-md:max-w-full">
        Similar Instruments{" "}
      </div>
      <div className="w-full mt-4 max-md:max-w-full">
        <div className="flex gap-4 flex-wrap max-md:max-w-full">
          <AssetCard
            name="Bitcoin"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ebe2b7032181426b0132ea78a087cb3edc7af0385287eed2ba938191758c3f66?placeholderIfAbsent=true"
            value="$571.71M"
            tags={["Cryptocurrency", "Similar with higher performance"]}
          />
          <AssetCard
            name="Avalanche"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/077fc2599168828afe994952e810c763af76773cea4dce7b3a004a562922b116?placeholderIfAbsent=true"
            value="$571.71M"
            tags={["Cryptocurrency", "Similar with less fees"]}
          />
        </div>
        <div className="flex gap-4 flex-wrap mt-4 max-md:max-w-full">
          <AssetCard
            name="Etherium"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f01ba4e6aa7474f74fa63b9a6ed1beadcc3d88a975b3d587d1ccf46dbe111b2a?placeholderIfAbsent=true"
            value="$571.71M"
            tags={["Cryptocurrency", "Similar with less volatility"]}
          />
          <AssetCard
            name="Bitcoin"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ebe2b7032181426b0132ea78a087cb3edc7af0385287eed2ba938191758c3f66?placeholderIfAbsent=true"
            value="$571.71M"
            tags={["Cryptocurrency", "Similar with higher performance"]}
          />
        </div>
        <div className="flex gap-4 flex-wrap mt-4 max-md:max-w-full">
          <AssetCard
            name="Bitcoin"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ebe2b7032181426b0132ea78a087cb3edc7af0385287eed2ba938191758c3f66?placeholderIfAbsent=true"
            value="$571.71M"
            tags={["Cryptocurrency", "Similar with higher performance"]}
          />
          <AssetCard
            name="Avalanche"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/077fc2599168828afe994952e810c763af76773cea4dce7b3a004a562922b116?placeholderIfAbsent=true"
            value="$571.71M"
            tags={["Cryptocurrency", "Similar with less fees"]}
          />
        </div>
      </div>
    </div>
  );
};

export default SimilarInstruments;

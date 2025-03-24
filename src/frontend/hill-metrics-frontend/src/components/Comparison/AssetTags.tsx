import React from "react";
import { X } from "lucide-react";
import { Asset } from "./mockData";

interface AssetTagsProps {
  assets: Asset[];
  removeAsset: (id: string) => void;
}

export default function AssetTags({ assets, removeAsset }: AssetTagsProps) {
  if (assets.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Assets in graph</h3>
      <div className="flex flex-wrap gap-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
            style={{ backgroundColor: `${asset.color}20` }}
          >
            <span
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: asset.color }}
            ></span>
            <span className="text-gray-900">{asset.name}</span>
            <button
              onClick={() => removeAsset(asset.id)}
              className="ml-1.5 text-gray-500 hover:text-gray-700"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

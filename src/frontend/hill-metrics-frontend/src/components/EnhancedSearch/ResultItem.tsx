import React from 'react';
import { ResultItem as ResultItemType } from '../../types/search';

interface ResultItemProps {
  item: ResultItemType;
  onAddToComparison: (itemId: string, added: boolean) => void;
  onAddToList: (itemId: string, added: boolean) => void;
  onView: (itemId: string) => void;
}

const ResultItem: React.FC<ResultItemProps> = ({
  item,
  onAddToComparison,
  onAddToList,
  onView,
}) => {
  const handleAddToComparison = () => {
    onAddToComparison(item.id, !item.addedToComparison);
  };

  const handleAddToList = () => {
    onAddToList(item.id, !item.addedToList);
  };

  const handleView = () => {
    onView(item.id);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 hover:bg-slate-50">
      <div className="flex flex-col">
        <div className="text-sm font-medium text-slate-900">{item.name}</div>
        <div className="text-xs text-slate-500">{item.ticker}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-1 text-xs font-medium rounded-md ${
            item.addedToComparison
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          onClick={handleAddToComparison}
        >
          {item.addedToComparison ? 'Added to Comparison' : 'Add to Comparison'}
        </button>
        <button
          className={`px-3 py-1 text-xs font-medium rounded-md ${
            item.addedToList
              ? 'bg-green-100 text-green-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          onClick={handleAddToList}
        >
          {item.addedToList ? 'Added to List' : 'Add to List'}
        </button>
        <button
          className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md"
          onClick={handleView}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ResultItem;

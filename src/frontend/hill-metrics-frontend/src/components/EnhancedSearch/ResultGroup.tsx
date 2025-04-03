import React from 'react';
import { ResultGroup as ResultGroupType } from '../../types/search';
import ResultItem from './ResultItem';

interface ResultGroupProps {
  group: ResultGroupType;
  onAddToComparison: (itemId: string, added: boolean) => void;
  onAddToList: (itemId: string, added: boolean) => void;
  onView: (itemId: string) => void;
}

const ResultGroup: React.FC<ResultGroupProps> = ({ 
  group, 
  onAddToComparison, 
  onAddToList, 
  onView 
}) => {
  return (
    <div className="mb-4">
      <div className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50">
        {group.label} {group.count > 0 && <span className="text-slate-500">{group.count} items</span>}
      </div>
      <div className="border-t border-slate-200">
        {group.items.map((item) => (
          <ResultItem
            key={item.id}
            item={item}
            onAddToComparison={onAddToComparison}
            onAddToList={onAddToList}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultGroup;

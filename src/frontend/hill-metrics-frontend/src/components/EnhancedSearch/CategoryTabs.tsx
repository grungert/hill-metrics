import React from 'react';
import { Category } from '../../types/search';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex overflow-x-auto border-b border-slate-200">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap ${
            selectedCategory === category.id
              ? 'text-slate-900 border-b-2 border-slate-900'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.label}
          {category.count > 0 && (
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium text-slate-700 ${
              selectedCategory === category.id
                ? 'bg-slate-900'
                : 'bg-slate-200'
            }`}>
              {category.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;

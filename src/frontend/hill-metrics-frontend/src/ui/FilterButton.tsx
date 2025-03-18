import React from 'react';

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      className={`flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5 text-sm ${
        isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
      } ${className}`}
      onClick={onClick}
    >
      <span>{label}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke={isActive ? "#0F172A" : "#64748B"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default FilterButton;

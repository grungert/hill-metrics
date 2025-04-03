import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EnhancedSearchBar from './EnhancedSearch/EnhancedSearchBar';

interface HeaderProps {
  activeTab?: 'search' | 'comparison'; // Optional as we'll determine from route
  onTabChange?: (tab: 'search' | 'comparison') => void; // Optional as we'll use router
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab: propActiveTab, 
  onTabChange,
  onSearch
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab from route if not provided in props
  const activeTab = propActiveTab || 
    (location.pathname.includes('comparison') ? 'comparison' : 'search');
  
  // Handle tab change with router navigation
  const handleTabChange = (tab: 'search' | 'comparison') => {
    if (onTabChange) {
      onTabChange(tab);
    }
    
    // Navigate to the appropriate route
    navigate(tab === 'search' ? '/search' : '/comparison');
  };
  return (
    <header className="flex w-full h-14 justify-between items-center border border-slate-200 bg-white px-8 z-10">
      <div className="flex items-center gap-8">
        <div className="flex justify-center items-center">
          {/* "M" logo */}
          <svg width="37" height="24" viewBox="0 0 37 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.839 0.00012207L36.0714 23.9999H28.7456L19.8549 7.90632L10.9642 23.9999H3.63837L16.8708 0.00012207H22.839Z" fill="#0F172A"/>
            <path d="M0 24.0001L13.2324 0.000244141H19.2006L5.96819 24.0001H0Z" fill="#0F172A"/>
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`text-sm leading-6 gap-2 rounded px-4 py-1 cursor-pointer ${
              activeTab === 'search'
                ? 'text-slate-900 bg-slate-100'
                : 'text-slate-500'
            }`}
            onClick={() => handleTabChange('search')}
          >
            Search
          </div>
          <div
            className={`text-sm leading-6 gap-2 rounded px-4 py-1 cursor-pointer ${
              activeTab === 'comparison'
                ? 'text-slate-900 bg-slate-100'
                : 'text-slate-500'
            }`}
            onClick={() => handleTabChange('comparison')}
          >
            Comparison
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <EnhancedSearchBar
          placeholder="Search for assets..."
          className="w-[338px]"
          onSearch={onSearch}
        />
        <div className="flex items-center gap-4">
          <div className="flex w-8 h-8 justify-center items-center rounded cursor-pointer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6152_49946)">
                <path
                  d="M10 18.3332C14.6024 18.3332 18.3334 14.6022 18.3334 9.99984C18.3334 5.39746 14.6024 1.6665 10 1.6665C5.39765 1.6665 1.66669 5.39746 1.66669 9.99984C1.66669 14.6022 5.39765 18.3332 10 18.3332Z"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.57501 7.49999C7.77093 6.94304 8.15764 6.47341 8.66664 6.17426C9.17564 5.87512 9.77409 5.76577 10.356 5.86558C10.9379 5.96539 11.4657 6.26792 11.8459 6.71959C12.2261 7.17126 12.4342 7.74292 12.4333 8.33332C12.4333 9.99999 9.93335 10.8333 9.93335 10.8333"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14.1665H10.0083"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6152_49946">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex items-center justify-center text-slate-800 text-xs leading-5 w-8 h-8 bg-slate-200 rounded-full">
            NT
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

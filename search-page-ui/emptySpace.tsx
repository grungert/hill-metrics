import React from "react";

interface EmptyStateProps {
  message: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 bg-white">
      <div className="flex flex-col items-center w-[196px]">
        <div>
          <svg
            width="150"
            height="151"
            viewBox="0 0 150 151"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52.354 118.805L63.9469 110.46L94.3481 98.4682L89.6767 81.8525L12.2131 102.666L52.354 118.805Z"
              fill="#1A1A1A"
            />
            <path
              d="M70.4012 112.768H76.7189L76.0658 111.917L70.4012 109.86V112.768Z"
              fill="#1A1A1A"
            />
            <path
              d="M95.2014 106.773H101.519L100.866 105.923L95.2014 103.866V106.773Z"
              fill="#1A1A1A"
            />
            <path
              d="M119.334 45.0835V102.813L101.594 106.012L89.7039 101.275V43.5717L107.498 40.4346L119.334 45.0835Z"
              fill="white"
            />
            <path
              d="M119.334 45.0835V102.813L101.594 106.012M119.334 45.0835L101.594 48.5007M119.334 45.0835L107.498 40.4346L89.7039 43.5717M101.594 106.012V48.5007M101.594 106.012L89.7039 101.275V43.5717M101.594 48.5007L89.7039 43.5717"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
            <path
              d="M94.5307 63.0835V108.813L76.7901 112.012L64.9002 107.275V61.5717L82.6946 58.4346L94.5307 63.0835Z"
              fill="white"
            />
            <path
              d="M94.5307 63.0835V108.813L76.7901 112.012M94.5307 63.0835L76.7901 66.5007M94.5307 63.0835L82.6946 58.4346L64.9002 61.5717M76.7901 112.012V66.5007M76.7901 112.012L64.9002 107.275V61.5717M76.7901 66.5007L64.9002 61.5717"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
            <path
              d="M70.1208 81.0835V114.813L52.3801 118.012L40.4902 113.275V79.5717L58.2846 76.4346L70.1208 81.0835Z"
              fill="white"
            />
            <path
              d="M70.1208 81.0835V114.813L52.3801 118.012M70.1208 81.0835L52.3801 84.5007M70.1208 81.0835L58.2846 76.4346L40.4902 79.5717M52.3801 118.012V84.5007M52.3801 118.012L40.4902 113.275V79.5717M52.3801 84.5007L40.4902 79.5717"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
            <path
              d="M41.1054 79.464L58.0907 76.3833L69.5392 80.4631L52.4289 84.4597L41.1054 79.464Z"
              fill="#1A1A1A"
            />
            <path
              d="M65.9143 61.5152L82.8996 58.4346L94.125 63.0519L76.875 66.4269L65.9143 61.5152Z"
              fill="#1A1A1A"
            />
            <path
              d="M90.3022 43.5152L107.288 40.4346L119.25 44.6769L101.626 48.5109L90.3022 43.5152Z"
              fill="#1A1A1A"
            />
          </svg>
        </div>
        <div className="text-slate-800 text-center text-base leading-6">
          {message}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
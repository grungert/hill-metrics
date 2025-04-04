import React from "react";

interface FileDownloadProps {
  fileName: string;
  fileUrl: string;
  label?: string;
  className?: string;
}

const FileDownload: React.FC<FileDownloadProps> = ({
  fileName,
  fileUrl,
  label,
  className = "",
}) => {
  return (
    <a
      href={fileUrl}
      download={fileName}
      className={`inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5 text-slate-900 text-sm hover:bg-slate-50 transition-colors ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
          stroke="#0F172A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.66669 6.66667L8.00002 10L11.3334 6.66667"
          stroke="#0F172A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10V2"
          stroke="#0F172A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label || fileName}
    </a>
  );
};

export default FileDownload;
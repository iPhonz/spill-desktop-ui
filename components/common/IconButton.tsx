import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus ${className}`}
      aria-label={label}
    >
      {icon}
    </button>
  );
};
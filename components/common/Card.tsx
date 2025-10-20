import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`bg-panel-base border border-line-border rounded-md shadow-elev ${
        hover ? 'hover:bg-panel-elev transition-colors' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
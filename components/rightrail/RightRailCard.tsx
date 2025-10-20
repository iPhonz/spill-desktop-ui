import React from 'react';
import { Card } from '../common/Card';

interface RightRailCardProps {
  children: React.ReactNode;
  className?: string;
}

export const RightRailCard: React.FC<RightRailCardProps> = ({ children, className = '' }) => {
  return <Card className={`p-5 mb-5 ${className}`}>{children}</Card>;
};
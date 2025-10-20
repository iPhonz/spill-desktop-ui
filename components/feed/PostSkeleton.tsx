import React from 'react';
import { Card } from '../common/Card';

export const PostSkeleton: React.FC = () => {
  return (
    <Card className="p-5 animate-pulse">
      <div className="flex gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-panel-elev" />
        <div className="flex-1">
          <div className="h-4 bg-panel-elev rounded w-32 mb-2" />
          <div className="h-3 bg-panel-elev rounded w-20" />
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-panel-elev rounded w-full" />
        <div className="h-4 bg-panel-elev rounded w-5/6" />
      </div>
      <div className="flex gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-panel-elev rounded w-12" />
        ))}
      </div>
    </Card>
  );
};
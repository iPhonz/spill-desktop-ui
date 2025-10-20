import React from 'react';
import { Bookmark } from 'lucide-react';
import { Card } from '../common/Card';
import { IconButton } from '../common/IconButton';
import type { UpNextItem } from '@/lib/types';

interface UpNextListProps {
  items: UpNextItem[];
}

export const UpNextList: React.FC<UpNextListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <Card className="p-5 mb-5">
        <h2 className="text-h2 text-text-primary mb-4">Up next</h2>
        <p className="text-body text-text-secondary text-center py-4">
          Nothing up next right now.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 mb-5">
      <h2 className="text-h2 text-text-primary mb-4">Up next</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="flex-shrink-0">
              <div
                className="w-12 h-12 bg-panel-elev rounded flex items-center justify-center text-2xl"
                role="img"
                aria-label={`Thumbnail for ${item.title}`}
              >
                {item.thumbnail}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-meta text-text-tertiary" aria-hidden="true">
                  {item.source.icon}
                </span>
                <span className="text-meta text-text-tertiary">{item.source.name}</span>
              </div>
              <h3 className="text-body text-text-primary font-medium mb-1 line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 text-meta text-text-tertiary">
                <span>{item.readTime} read</span>
                <span aria-hidden="true">·</span>
                <span>{item.likes} likes</span>
                <span aria-hidden="true">·</span>
                <span>{item.comments} comments</span>
              </div>
            </div>
            <IconButton
              icon={<Bookmark size={16} className="text-text-tertiary" />}
              label="Bookmark"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
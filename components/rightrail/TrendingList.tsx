import React from 'react';
import { Card } from '../common/Card';
import type { TrendingLink } from '@/lib/types';

interface TrendingListProps {
  links: TrendingLink[];
}

export const TrendingList: React.FC<TrendingListProps> = ({ links }) => {
  if (links.length === 0) {
    return (
      <Card className="p-5">
        <h2 className="text-h2 text-text-primary mb-4">Trending</h2>
        <p className="text-body text-text-secondary text-center py-4">
          No trending links available.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-h2 text-text-primary">Trending</h2>
        <button className="text-meta text-accent-orange hover:underline focus:outline focus:outline-2 focus:outline-focus rounded">
          See all
        </button>
      </div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              className="text-body text-text-secondary hover:text-text-primary transition-colors focus:outline focus:outline-2 focus:outline-focus rounded block"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
};
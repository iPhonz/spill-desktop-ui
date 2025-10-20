import React from 'react';
import { Heart, MessageSquare, Repeat2, Share2 } from 'lucide-react';
import type { Post } from '@/lib/types';

interface PostActionsRowProps {
  actions: Post['actions'];
}

export const PostActionsRow: React.FC<PostActionsRowProps> = ({ actions }) => {
  const actionButtons = [
    { icon: Heart, count: actions.likes, label: 'Like' },
    { icon: MessageSquare, count: actions.comments, label: 'Comment' },
    { icon: Repeat2, count: actions.reposts, label: 'Repost' },
    { icon: Share2, count: actions.shares, label: 'Share' },
  ];

  return (
    <div className="flex items-center gap-8 pt-3">
      {actionButtons.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            className="flex items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors group focus:outline focus:outline-2 focus:outline-focus rounded"
            aria-label={action.label}
          >
            <Icon size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-meta">{action.count}</span>
          </button>
        );
      })}
    </div>
  );
};
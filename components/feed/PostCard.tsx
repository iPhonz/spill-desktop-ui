'use client';

import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Card } from '../common/Card';
import { IconButton } from '../common/IconButton';
import { PostActionsRow } from './PostActionsRow';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="p-5 hover:bg-panel-elev transition-colors">
      {/* Post header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar alt={`${post.author.name}'s avatar`}>{post.author.avatar}</Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-body font-semibold text-text-primary">{post.author.name}</span>
            {post.author.verified && (
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent-orange"
                title="Verified"
                aria-label="Verified user"
              />
            )}
            <span className="text-meta text-text-tertiary">· {post.timestamp}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-meta text-accent-orange hover:underline focus:outline focus:outline-2 focus:outline-focus rounded">
              Subscribe
            </button>
          </div>
        </div>
        <IconButton
          icon={<MoreVertical size={18} className="text-text-tertiary" />}
          label="More options"
        />
      </div>

      {/* Post content */}
      <div className="text-body text-text-primary whitespace-pre-line mb-2">{post.content}</div>

      {/* Post actions */}
      <PostActionsRow actions={post.actions} />
    </Card>
  );
};
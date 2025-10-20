'use client';

import React from 'react';
import { MoreVertical, Heart, MessageSquare, Repeat2, Share2, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar } from '../common/Avatar';
import { Card } from '../common/Card';
import { IconButton } from '../common/IconButton';
import { useToggleLike } from '@/lib/hooks/useToggleLike';
import { useToggleBookmark } from '@/lib/hooks/useToggleBookmark';
import { useAuth } from '@/contexts/AuthContext';
import type { SpillWithAuthor } from '@/lib/supabase/types';

interface SpillCardProps {
  spill: SpillWithAuthor;
}

export const SpillCard: React.FC<SpillCardProps> = ({ spill }) => {
  const { user } = useAuth();
  const toggleLike = useToggleLike();
  const toggleBookmark = useToggleBookmark();

  const formattedDate = format(new Date(spill.created_at), 'MMM d');

  const handleLike = () => {
    if (!user) return;
    toggleLike.mutate({
      spillId: spill.id,
      isLiked: spill.is_liked || false,
    });
  };

  const handleBookmark = () => {
    if (!user) return;
    toggleBookmark.mutate({
      spillId: spill.id,
      isBookmarked: spill.is_bookmarked || false,
    });
  };

  return (
    <Card className="p-5 hover:bg-panel-elev transition-colors">
      {/* Spill header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar alt={`${spill.author.display_name}'s avatar`}>
          {spill.author.avatar_url ? (
            <img
              src={spill.author.avatar_url}
              alt={spill.author.display_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            '👤'
          )}
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-body font-semibold text-text-primary"
              style={{
                fontFamily:
                  "'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              }}
            >
              {spill.author.display_name}
            </span>
            {spill.author.verified && (
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent-orange"
                title="Verified"
                aria-label="Verified user"
              />
            )}
            <span className="text-meta text-text-tertiary">· {formattedDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-meta text-text-tertiary">@{spill.author.handle}</span>
          </div>
        </div>
        <IconButton
          icon={<MoreVertical size={18} className="text-text-tertiary" />}
          label="More options"
        />
      </div>

      {/* Spill content */}
      <div
        className="text-body text-text-primary whitespace-pre-line mb-2"
        style={{
          fontFamily:
            "'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {spill.body}
      </div>

      {/* Spill actions */}
      <div className="flex items-center gap-8 pt-3">
        {/* Like button */}
        <button
          onClick={handleLike}
          disabled={!user}
          className={`flex items-center gap-2 transition-colors group focus:outline focus:outline-2 focus:outline-focus rounded ${
            spill.is_liked
              ? 'text-accent-orange'
              : 'text-text-tertiary hover:text-accent-orange'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={spill.is_liked ? 'Unlike' : 'Like'}
        >
          <Heart
            size={18}
            className={`group-hover:scale-110 transition-transform ${
              spill.is_liked ? 'fill-current' : ''
            }`}
          />
          <span className="text-meta">{spill.likes_count}</span>
        </button>

        {/* Comment button */}
        <button
          className="flex items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors group focus:outline focus:outline-2 focus:outline-focus rounded"
          aria-label="Comment"
          disabled
        >
          <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-meta">{spill.comments_count}</span>
        </button>

        {/* Repost button */}
        <button
          className="flex items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors group focus:outline focus:outline-2 focus:outline-focus rounded"
          aria-label="Repost"
          disabled
        >
          <Repeat2 size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-meta">0</span>
        </button>

        {/* Share button */}
        <button
          className="flex items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors group focus:outline focus:outline-2 focus:outline-focus rounded"
          aria-label="Share"
          disabled
        >
          <Share2 size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-meta">0</span>
        </button>

        {/* Bookmark button */}
        <button
          onClick={handleBookmark}
          disabled={!user}
          className={`ml-auto flex items-center gap-2 transition-colors group focus:outline focus:outline-2 focus:outline-focus rounded ${
            spill.is_bookmarked
              ? 'text-accent-orange'
              : 'text-text-tertiary hover:text-accent-orange'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={spill.is_bookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <Bookmark
            size={18}
            className={`group-hover:scale-110 transition-transform ${
              spill.is_bookmarked ? 'fill-current' : ''
            }`}
          />
        </button>
      </div>
    </Card>
  );
};
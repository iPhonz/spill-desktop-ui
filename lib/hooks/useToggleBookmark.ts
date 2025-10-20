'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SpillWithAuthor } from '@/lib/supabase/types';

interface ToggleBookmarkParams {
  spillId: string;
  isBookmarked: boolean;
}

async function toggleBookmark({
  spillId,
  userId,
  isBookmarked,
}: ToggleBookmarkParams & { userId: string }) {
  if (isBookmarked) {
    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('spill_id', spillId)
      .eq('user_id', userId);

    if (error) throw error;
  } else {
    // Add bookmark
    const { error } = await supabase.from('bookmarks').insert({
      spill_id: spillId,
      user_id: userId,
    });

    if (error) throw error;
  }
}

export function useToggleBookmark() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ToggleBookmarkParams) => {
      if (!user) throw new Error('Must be logged in to bookmark spills');
      return toggleBookmark({ ...params, userId: user.id });
    },
    onMutate: async ({ spillId, isBookmarked }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      // Snapshot previous value
      const previousFeed = queryClient.getQueryData(['feed', user?.id]);

      // Optimistically update
      queryClient.setQueryData(['feed', user?.id], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            spills: page.spills.map((spill: SpillWithAuthor) =>
              spill.id === spillId
                ? {
                    ...spill,
                    is_bookmarked: !isBookmarked,
                  }
                : spill
            ),
          })),
        };
      });

      return { previousFeed };
    },
    onError: (err, variables, context) => {
      // Revert on error
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed', user?.id], context.previousFeed);
      }
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}
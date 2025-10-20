'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SpillWithAuthor } from '@/lib/supabase/types';

interface ToggleLikeParams {
  spillId: string;
  isLiked: boolean;
}

async function toggleLike({ spillId, userId, isLiked }: ToggleLikeParams & { userId: string }) {
  if (isLiked) {
    // Unlike
    const { error } = await supabase
      .from('spill_likes')
      .delete()
      .eq('spill_id', spillId)
      .eq('user_id', userId);

    if (error) throw error;
  } else {
    // Like
    const { error } = await supabase.from('spill_likes').insert({
      spill_id: spillId,
      user_id: userId,
    });

    if (error) throw error;
  }
}

export function useToggleLike() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ToggleLikeParams) => {
      if (!user) throw new Error('Must be logged in to like spills');
      return toggleLike({ ...params, userId: user.id });
    },
    onMutate: async ({ spillId, isLiked }) => {
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
                    is_liked: !isLiked,
                    likes_count: isLiked ? spill.likes_count - 1 : spill.likes_count + 1,
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
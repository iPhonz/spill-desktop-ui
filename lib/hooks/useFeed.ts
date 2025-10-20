'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { SpillWithAuthor } from '@/lib/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

const SPILLS_PER_PAGE = 10;

interface FetchSpillsParams {
  pageParam?: string;
  userId?: string | null;
}

async function fetchSpills({ pageParam, userId }: FetchSpillsParams) {
  let query = supabase
    .from('spills')
    .select(
      `
      *,
      author:profiles!author_id(*)
    `
    )
    .order('created_at', { ascending: false })
    .limit(SPILLS_PER_PAGE);

  // Pagination: fetch spills older than the cursor
  if (pageParam) {
    query = query.lt('created_at', pageParam);
  }

  const { data: spills, error } = await query;

  if (error) throw error;

  // Fetch like counts for each spill
  const spillIds = spills.map((s) => s.id);
  const { data: likeCounts } = await supabase
    .from('spill_likes')
    .select('spill_id')
    .in('spill_id', spillIds);

  // If user is logged in, fetch their likes and bookmarks
  let userLikes: string[] = [];
  let userBookmarks: string[] = [];

  if (userId) {
    const [likesRes, bookmarksRes] = await Promise.all([
      supabase.from('spill_likes').select('spill_id').eq('user_id', userId).in('spill_id', spillIds),
      supabase.from('bookmarks').select('spill_id').eq('user_id', userId).in('spill_id', spillIds),
    ]);

    userLikes = likesRes.data?.map((l) => l.spill_id) || [];
    userBookmarks = bookmarksRes.data?.map((b) => b.spill_id) || [];
  }

  // Count likes per spill
  const likeCountMap = (likeCounts || []).reduce((acc, like) => {
    acc[like.spill_id] = (acc[like.spill_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Combine data
  const enrichedSpills: SpillWithAuthor[] = spills.map((spill) => ({
    ...spill,
    likes_count: likeCountMap[spill.id] || 0,
    comments_count: 0, // TODO: Implement comments in Phase 3
    is_liked: userLikes.includes(spill.id),
    is_bookmarked: userBookmarks.includes(spill.id),
  }));

  return {
    spills: enrichedSpills,
    nextCursor: spills.length === SPILLS_PER_PAGE ? spills[spills.length - 1].created_at : null,
  };
}

export function useFeed() {
  const { user } = useAuth();

  return useInfiniteQuery({
    queryKey: ['feed', user?.id],
    queryFn: ({ pageParam }) => fetchSpills({ pageParam, userId: user?.id }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
  });
}
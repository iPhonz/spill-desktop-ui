'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CreateSpillParams {
  body: string;
}

async function createSpill({ body, authorId }: CreateSpillParams & { authorId: string }) {
  // Validate body length
  if (body.length === 0 || body.length > 280) {
    throw new Error('Spill must be between 1 and 280 characters');
  }

  const { data, error } = await supabase
    .from('spills')
    .insert({
      author_id: authorId,
      body: body.trim(),
      media_json: [],
    })
    .select(
      `
      *,
      author:profiles!author_id(*)
    `
    )
    .single();

  if (error) throw error;
  return data;
}

export function useCreateSpill() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateSpillParams) => {
      if (!user) throw new Error('Must be logged in to create spills');
      return createSpill({ ...params, authorId: user.id });
    },
    onSuccess: () => {
      // Invalidate feed to refetch with new spill
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}
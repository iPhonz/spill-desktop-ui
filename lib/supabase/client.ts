import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types';

export const createClient = () => {
  return createClientComponentClient<Database>();
};

// Singleton client for use in client components
export const supabase = createClient();
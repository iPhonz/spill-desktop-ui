// Legacy types from Phase 1 - keeping for backwards compatibility
// New types are in lib/supabase/types.ts

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  timestamp: string;
  content: string;
  actions: {
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
  };
}

export interface UpNextItem {
  id: string;
  source: {
    name: string;
    icon: string;
  };
  title: string;
  thumbnail: string;
  readTime: string;
  likes: number;
  comments: number;
}

export interface TrendingLink {
  id: string;
  text: string;
  url: string;
}
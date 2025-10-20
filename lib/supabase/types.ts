export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          handle: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          handle: string;
          display_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          handle?: string;
          display_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      spills: {
        Row: {
          id: string;
          author_id: string;
          body: string;
          media_json: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          body: string;
          media_json?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string;
          body?: string;
          media_json?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      spill_likes: {
        Row: {
          user_id: string;
          spill_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          spill_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          spill_id?: string;
          created_at?: string;
        };
      };
      bookmarks: {
        Row: {
          user_id: string;
          spill_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          spill_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          spill_id?: string;
          created_at?: string;
        };
      };
    };
  };
}

// Helper types for application use
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Spill = Database['public']['Tables']['spills']['Row'];
export type SpillLike = Database['public']['Tables']['spill_likes']['Row'];
export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];

// Extended types with relations
export interface SpillWithAuthor extends Spill {
  author: Profile;
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;
  is_bookmarked?: boolean;
}
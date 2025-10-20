-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  handle text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SPILLS TABLE (Posts)
create table spills (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete cascade not null,
  body text not null check (char_length(body) <= 280),
  media_json jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- LIKES TABLE
create table spill_likes (
  user_id uuid references profiles(id) on delete cascade not null,
  spill_id uuid references spills(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (user_id, spill_id)
);

-- BOOKMARKS TABLE
create table bookmarks (
  user_id uuid references profiles(id) on delete cascade not null,
  spill_id uuid references spills(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (user_id, spill_id)
);

-- INDEXES for performance
create index idx_spills_created_at on spills(created_at desc);
create index idx_spills_author_id on spills(author_id);
create index idx_spill_likes_spill_id on spill_likes(spill_id);
create index idx_bookmarks_user_id on bookmarks(user_id);

-- ENABLE ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table spills enable row level security;
alter table spill_likes enable row level security;
alter table bookmarks enable row level security;

-- PROFILES RLS POLICIES
create policy "Public read profiles" 
  on profiles for select 
  using (true);

create policy "Users manage own profile" 
  on profiles for all
  using (auth.uid() = id) 
  with check (auth.uid() = id);

-- SPILLS RLS POLICIES
create policy "Public read spills" 
  on spills for select 
  using (true);

create policy "Users insert own spills" 
  on spills for insert
  with check (auth.uid() = author_id);

create policy "Users update own spills" 
  on spills for update
  using (auth.uid() = author_id) 
  with check (auth.uid() = author_id);

create policy "Users delete own spills" 
  on spills for delete
  using (auth.uid() = author_id);

-- LIKES RLS POLICIES
create policy "Read all likes" 
  on spill_likes for select 
  using (true);

create policy "Users insert own likes" 
  on spill_likes for insert
  with check (auth.uid() = user_id);

create policy "Users delete own likes" 
  on spill_likes for delete
  using (auth.uid() = user_id);

-- BOOKMARKS RLS POLICIES
create policy "Read all bookmarks" 
  on bookmarks for select 
  using (true);

create policy "Users insert own bookmarks" 
  on bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users delete own bookmarks" 
  on bookmarks for delete
  using (auth.uid() = user_id);

-- FUNCTION: Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, handle, display_name, avatar_url)
  values (
    new.id,
    split_part(new.email, '@', 1), -- Use email prefix as default handle
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- TRIGGER: Create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- FUNCTION: Update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- TRIGGERS: Auto-update timestamps
create trigger update_profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_spills_updated_at before update on spills
  for each row execute procedure update_updated_at_column();
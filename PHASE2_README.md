# SPILL Desktop UI - Phase 2: Authentication & Core Features

> Full-stack implementation with Supabase Auth, feed CRUD, and optimistic updates

## 🆕 What's New in Phase 2

Phase 2 transforms the static Phase 1 UI into a fully functional social platform with:

### ✅ Implemented Features

- **Authentication System**
  - ✅ Email magic link authentication
  - ✅ Google OAuth sign-in
  - ✅ Automatic profile creation on signup
  - ✅ Session management with Supabase
  - ✅ Secure auth state across the app

- **Database Integration**
  - ✅ Complete Supabase database schema
  - ✅ Row Level Security (RLS) policies
  - ✅ Profiles, Spills, Likes, and Bookmarks tables
  - ✅ Automatic timestamps and triggers

- **Feed Features**
  - ✅ Real-time spill feed from Supabase
  - ✅ Create new spills (text only, 280 char limit)
  - ✅ Keyset pagination with "Load more"
  - ✅ Author profiles with avatars

- **User Interactions**
  - ✅ Like/unlike spills (optimistic updates)
  - ✅ Bookmark spills (optimistic updates)
  - ✅ Real-time UI updates
  - ✅ Instant feedback with React Query

- **UI Components**
  - ✅ ComposerModal for creating spills
  - ✅ AuthModal for sign in/sign up
  - ✅ Functional LoginCard with auth state
  - ✅ SpillCard with live interactions
  - ✅ Loading/error/empty states

## 🛠️ Tech Stack

- **Next.js 14** - App Router with React Server Components
- **TypeScript** - Full type safety
- **Supabase** - Auth, Database, and Storage
  - `@supabase/auth-helpers-nextjs` ^0.8.7
  - `@supabase/supabase-js` ^2.39.0
- **React Query** (TanStack Query) - State management and caching
  - `@tanstack/react-query` ^5.17.0
- **Tailwind CSS** - Styling with design tokens
- **SF Pro** - Typography
- **date-fns** - Date formatting

## 🚀 Getting Started

### Prerequisites

1. **Node.js 18+** and **pnpm** (or npm)
2. **Supabase Account** - Sign up at [supabase.com](https://supabase.com)

### 1. Install Dependencies

```bash
cd spill-desktop-ui
pnpm install
```

### 2. Set Up Supabase Project

#### Create a New Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Name it "spill-web" (or your preference)
4. Set a strong database password
5. Choose a region close to you
6. Wait for the project to initialize (~2 minutes)

#### Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy your **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy your **anon public** API key

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Database Migrations

#### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

#### Option B: Manual SQL Execution

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
5. Click "Run"
6. Repeat for `supabase/migrations/002_storage_setup.sql`

### 5. Configure Authentication Providers

#### Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)

#### Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Follow Supabase's guide to set up Google OAuth:
   - Create a Google Cloud project
   - Configure OAuth consent screen
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for local dev)
4. Enter Client ID and Client Secret in Supabase

### 6. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 💾 Database Schema

### Tables

#### `profiles`
- User profiles with handle, display name, avatar
- Auto-created on user signup via trigger
- Public read, users can only modify their own

#### `spills`
- User posts (max 280 characters)
- References author via `author_id`
- Public read, users can only create/edit/delete their own

#### `spill_likes`
- Like relationships between users and spills
- Composite primary key (user_id, spill_id)
- Users can only like/unlike as themselves

#### `bookmarks`
- Bookmark relationships between users and spills
- Composite primary key (user_id, spill_id)
- Users can only bookmark as themselves

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

- **Public read**: Anyone can view profiles, spills, likes, and bookmarks
- **Authenticated writes**: Only authenticated users can create content
- **Owner-only modifications**: Users can only modify their own data

### Storage

- **avatars** bucket for profile pictures
- Public read access
- Users can upload/update only their own avatars
- Max file size: 200 KB
- Recommended format: 128x128 WebP

## 💻 Usage

### Authentication

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, profile, signIn, signOut } = useAuth();

  // Sign in with email
  await signIn('user@example.com');

  // Sign in with Google
  await signInWithGoogle();

  // Sign out
  await signOut();
}
```

### Creating a Spill

```tsx
import { useCreateSpill } from '@/lib/hooks/useCreateSpill';

function Composer() {
  const createSpill = useCreateSpill();

  const handleSubmit = async () => {
    await createSpill.mutateAsync({
      body: 'Hello SPILL!',
    });
  };
}
```

### Fetching the Feed

```tsx
import { useFeed } from '@/lib/hooks/useFeed';

function Feed() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useFeed();

  const spills = data?.pages.flatMap((page) => page.spills) || [];

  return (
    <div>
      {spills.map((spill) => (
        <SpillCard key={spill.id} spill={spill} />
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}
    </div>
  );
}
```

### Like/Bookmark Actions

```tsx
import { useToggleLike } from '@/lib/hooks/useToggleLike';
import { useToggleBookmark } from '@/lib/hooks/useToggleBookmark';

function SpillActions({ spill }) {
  const toggleLike = useToggleLike();
  const toggleBookmark = useToggleBookmark();

  return (
    <>
      <button
        onClick={() =>
          toggleLike.mutate({
            spillId: spill.id,
            isLiked: spill.is_liked,
          })
        }
      >
        {spill.is_liked ? 'Unlike' : 'Like'} ({spill.likes_count})
      </button>

      <button
        onClick={() =>
          toggleBookmark.mutate({
            spillId: spill.id,
            isBookmarked: spill.is_bookmarked,
          })
        }
      >
        {spill.is_bookmarked ? 'Bookmarked' : 'Bookmark'}
      </button>
    </>
  );
}
```

## 🚧 What's NOT Included (Coming in Phase 3)

- ❌ Real-time updates (Supabase Realtime)
- ❌ Comments on spills
- ❌ Repost functionality
- ❌ User profiles page
- ❌ Infinite scroll (currently "Load more" button)
- ❌ Image/media uploads
- ❌ Search functionality
- ❌ Notifications
- ❌ Direct messages

## 🐛 Troubleshooting

### "Invalid API key" Error

- Double-check your `.env.local` file
- Ensure you're using the **anon public** key, not the service role key
- Restart your dev server after changing environment variables

### "Row Level Security policy violation"

- Make sure you've run both migration files
- Verify RLS is enabled on all tables
- Check that policies were created correctly in Supabase dashboard

### Auth Redirect Not Working

- Ensure redirect URLs are configured in Supabase:
  - **Authentication** → **URL Configuration**
  - Add `http://localhost:3000/auth/callback`
  - Add your production URL when deploying

### Profile Not Created After Signup

- Check that the trigger function exists:
  ```sql
  SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
  ```
- Verify the trigger is attached:
  ```sql
  SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
  ```

## 🛡️ Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all Supabase credentials
- RLS policies ensure data security at the database level
- Authentication is handled securely by Supabase
- Optimistic updates revert automatically on error

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

## ✅ Acceptance Criteria

- [x] Users can sign in with email magic link
- [x] Users can sign in with Google OAuth
- [x] Users can sign out
- [x] Authenticated users can create spills (text only, 280 char max)
- [x] Feed renders live data from Supabase
- [x] Likes update optimistically
- [x] Bookmarks update optimistically
- [x] Public users can view feed (read-only)
- [x] All RLS policies enforced
- [x] Error/loading/empty states present
- [x] UI maintains Phase 1 design fidelity
- [x] Accessibility features preserved
- [x] SF Pro font used throughout

---

**Phase 2 Complete!** 🎉 Ready for Phase 3: Real-time updates and advanced features.

For questions or issues, check the [main README](./README.md) or create an issue on GitHub.
# SPILL Desktop UI

> Culture-first social media platform with Supabase backend

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39+-3ECF8E?logo=supabase)](https://supabase.com/)
[![React Query](https://img.shields.io/badge/React_Query-5.17+-FF4154?logo=react-query)](https://tanstack.com/query/latest)

## 🎯 Project Status

**Current Version**: Phase 2 - Authentication & Core Features ✅

- ✅ **Phase 1**: Static pixel-perfect UI ([View Details](#phase-1-static-ui))
- ✅ **Phase 2**: Supabase Auth + Feed CRUD ([View Details](./PHASE2_README.md))
- 🔜 **Phase 3**: Real-time features & advanced interactions

## 🚀 Quick Start

### Phase 2 (Current)

Full authentication and database integration with Supabase:

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations (see PHASE2_README.md)

# Start development server
pnpm dev
```

**📖 [Complete Phase 2 Setup Guide](./PHASE2_README.md)**

## ✨ Features

### Phase 2 (Current)

- **🔐 Authentication**
  - Email magic link sign-in
  - Google OAuth integration
  - Automatic profile creation
  - Secure session management

- **📱 Feed & Content**
  - Real-time spill feed from Supabase
  - Create spills (280 characters)
  - Pagination with "Load more"
  - Author profiles with avatars

- **💫 Interactions**
  - Like/unlike with optimistic updates
  - Bookmark spills
  - Instant UI feedback via React Query

- **🎨 UI Components**
  - Functional auth modals
  - Composer modal for creating content
  - Loading/error/empty states
  - Accessible and responsive design

### Phase 1 Foundation

- **🎨 Design System**
  - SF Pro typography
  - Custom Tailwind tokens
  - Dark theme (#0D0D0E)
  - Pink sidebar (#BE3B5E)
  - Orange accents (#FF6A00)

- **📐 Layout**
  - Three-column desktop layout
  - Responsive mobile design
  - Fixed sidebar navigation
  - Sticky right rail

- **♿ Accessibility**
  - WCAG 2.1 AA compliant
  - Keyboard navigation
  - ARIA attributes
  - Screen reader support

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| State Management | TanStack Query (React Query) |
| UI Components | React 18 |
| Icons | Lucide React |
| Typography | SF Pro |
| Date Handling | date-fns |

## 📁 Project Structure

```
spill-desktop-ui/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main feed page
│   ├── globals.css             # Global styles
│   └── auth/callback/route.ts  # Auth callback handler
├── components/
│   ├── auth/
│   │   └── AuthModal.tsx       # Sign in/sign up modal
│   ├── composer/
│   │   └── ComposerModal.tsx   # Create spill modal
│   ├── feed/
│   │   ├── SpillCard.tsx       # Individual spill with interactions
│   │   └── PostSkeleton.tsx    # Loading state
│   ├── sidebar/
│   │   ├── SidebarNav.tsx      # Navigation
│   │   └── CreateButton.tsx    # Composer trigger
│   ├── rightrail/
│   │   ├── LoginCard.tsx       # Auth status & actions
│   │   ├── UpNextList.tsx      # Reading queue
│   │   └── TrendingList.tsx    # Trending topics
│   └── common/                 # Reusable components
├── contexts/
│   └── AuthContext.tsx         # Auth state management
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Supabase client
│   │   ├── server.ts           # Server-side client
│   │   └── types.ts            # Database types
│   ├── hooks/
│   │   ├── useFeed.ts          # Fetch spills
│   │   ├── useCreateSpill.ts   # Create spill
│   │   ├── useToggleLike.ts    # Like/unlike
│   │   └── useToggleBookmark.ts # Bookmark actions
│   └── providers/
│       └── QueryProvider.tsx    # React Query setup
├── supabase/
│   └── migrations/              # Database schema
├── data/                        # Static seed data
└── stories/                     # Storybook stories
```

## 🗄️ Database Schema

### Core Tables

- **profiles**: User profiles with handle, display name, avatar
- **spills**: User posts (max 280 characters)
- **spill_likes**: Like relationships
- **bookmarks**: Saved spills

### Security

- Row Level Security (RLS) enabled on all tables
- Public read access
- Authenticated write access
- Owner-only modifications

**📖 [Full Database Schema](./PHASE2_README.md#-database-schema)**

## 📝 Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**📖 [Setup Guide](./PHASE2_README.md#-getting-started)**

## 🧪 Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run Storybook (Phase 1 components)
pnpm storybook

# Build for production
pnpm build

# Run production build
pnpm start

# Lint code
pnpm lint
```

## 🎨 Design Tokens

### Colors
- **Background**: `#0D0D0E` (app), `#1B1C1E` (panels)
- **Sidebar**: `#BE3B5E` (pink)
- **Accent**: `#FF6A00` (orange CTAs)
- **Text**: `#F5F5F6` (primary), `#BABBC0` (secondary), `#8D8F95` (tertiary)

### Typography (SF Pro)
- **Hero**: 28px, Bold (700)
- **H2**: 18px, Semibold (600)
- **Body**: 15px, Regular (400)
- **Meta**: 12.5px, Medium (500)
- **Button**: 14.5px, Semibold (600)

### Spacing
- 8pt grid system
- Card padding: 16-24px
- Vertical gaps: 16-20px

**📖 [Full Design System](./PHASE2_README.md#-design-tokens)**

## 🔒 Security

- Environment variables for all secrets
- Row Level Security at database level
- Secure authentication via Supabase
- No sensitive data in client code
- HTTPS-only in production

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📚 Documentation

- **[Phase 2 Setup Guide](./PHASE2_README.md)** - Complete Supabase setup and features
- **[Supabase Docs](https://supabase.com/docs)** - Database and auth documentation
- **[Next.js Docs](https://nextjs.org/docs)** - Framework documentation
- **[React Query Docs](https://tanstack.com/query/latest)** - State management guide

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure types pass: `pnpm build`
4. Ensure linting passes: `pnpm lint`
5. Open a pull request

## 📄 License

Private - SPILL, Inc. © 2024-2025

## 🙏 Acknowledgments

- Design system by SPILL design team
- SF Pro font by Apple Inc.
- Built for Series A fundraising
- Culture-first community values

---

## Phase History

### Phase 1: Static UI ✅
- Pixel-perfect implementation of SPILL desktop design
- Responsive three-column layout
- Accessible components with keyboard navigation
- Storybook component documentation
- **[View Phase 1 Details](#phase-1-static-ui)**

### Phase 2: Authentication & Core Features ✅
- Supabase authentication (email + Google OAuth)
- Feed CRUD with optimistic updates
- Like and bookmark functionality
- Profile management
- Loading/error/empty states
- **[View Phase 2 Details](./PHASE2_README.md)**

### Phase 3: Coming Soon 🔜
- Real-time updates via Supabase Realtime
- Comments system
- User profile pages
- Image uploads
- Infinite scroll
- Search functionality
- Notifications

---

**Built with ❤️ for SPILL** - The app for independent voices

For setup help, see [PHASE2_README.md](./PHASE2_README.md)

For questions or support, contact the engineering team.

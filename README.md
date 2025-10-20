# SPILL Desktop UI - Phase 1

> Pixel-accurate static implementation of the SPILL desktop experience

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-7.6+-ff4785?logo=storybook)](https://storybook.js.org/)

## Overview

This is a production-ready Next.js application that implements the SPILL desktop UI with:

- **Next.js 14+** with App Router and React Server Components
- **TypeScript** for complete type safety
- **Tailwind CSS** with custom design tokens matching SPILL's brand
- **SF Pro** font family for authentic Apple-style typography
- **Responsive 3-column layout** that adapts seamlessly to mobile
- **Accessible components** with keyboard navigation and ARIA attributes
- **Static data** (no backend integration in Phase 1)
- **Storybook** for component documentation and isolated development

## ✅ Features Implemented

### Layout Architecture
- ✅ Three-column desktop layout (sidebar, feed, right rail)
- ✅ Fixed-width left sidebar (~260px) with navigation
- ✅ Center feed column (~760-820px) with hero banner and posts
- ✅ Right rail (~320px) with login, up next, and trending modules
- ✅ Responsive design with mobile drawer navigation
- ✅ Breakpoints: ≥1280px (full), 1024-1279px (stacked), <900px (mobile)

### Components Delivered
- ✅ **SidebarNav**: Navigation with Home, Subscriptions, Chat, Activity, Explore, Profile
- ✅ **CreateButton**: Orange CTA button at sidebar bottom
- ✅ **HeroBanner**: Hero section with "Get started" and "Learn more" CTAs
- ✅ **FilterDropdownStub**: "For you" dropdown (visual only)
- ✅ **PostCard**: Complete post with author, content, and actions
- ✅ **PostActionsRow**: Like, comment, repost, share interactions
- ✅ **LoginCard**: Sign-up/sign-in module
- ✅ **UpNextList**: Reading queue with 3 articles
- ✅ **TrendingList**: 5 trending links with "See all"
- ✅ **Skeleton components**: Loading states for posts and cards
- ✅ **Drawer**: Mobile navigation drawer with body scroll lock

### Design System
- ✅ Custom Tailwind tokens matching spec exactly
- ✅ **SF Pro** font family (Text & Display variants)
- ✅ Color palette: dark backgrounds (#0D0D0E), pink sidebar (#BE3B5E), orange accents (#FF6A00)
- ✅ Typography: Hero (28px), H2 (18px), Body (15px), Meta (12.5px), Button (14.5px)
- ✅ Spacing: 8pt system, consistent 16-24px padding
- ✅ Border radius: lg (16px), md (12px), sm (10px)
- ✅ Elevation shadows for depth

### Accessibility (WCAG 2.1 AA)
- ✅ Semantic HTML: `<nav>`, `<main>`, `<aside>`, proper heading hierarchy
- ✅ Keyboard navigation with visible focus rings (purple #8B5CF6)
- ✅ ARIA attributes: `aria-current`, `aria-label`, `aria-haspopup`, `aria-modal`
- ✅ Alt text for all decorative and informative images
- ✅ Color contrast ratios meeting standards
- ✅ Focus management for drawer/modal interactions

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iPhonz/spill-desktop-ui.git
cd spill-desktop-ui

# Install dependencies with pnpm (recommended)
pnpm install

# Or with npm
npm install

# Or with yarn
yarn install
```

### Development Server

```bash
# Run Next.js development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

The page will auto-update as you edit files. TypeScript errors will appear in the console.

### Production Build

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

### Storybook

```bash
# Run Storybook for component development
pnpm storybook
```

Storybook will open at [http://localhost:6006](http://localhost:6006) with isolated component views.

```bash
# Build static Storybook
pnpm build-storybook
```

### Linting

```bash
# Run ESLint
pnpm lint
```

## 📁 Project Structure

```
spill-desktop-ui/
├── app/
│   ├── layout.tsx          # Root layout with SF Pro font
│   ├── page.tsx            # Main desktop page component
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── sidebar/
│   │   ├── SidebarNav.tsx      # Main navigation component
│   │   └── CreateButton.tsx    # Orange CTA button
│   ├── hero/
│   │   ├── HeroBanner.tsx      # Hero banner with CTAs
│   │   └── FilterDropdownStub.tsx  # "For you" filter (stub)
│   ├── feed/
│   │   ├── PostCard.tsx        # Individual post component
│   │   ├── PostActionsRow.tsx  # Like/comment/share actions
│   │   └── PostSkeleton.tsx    # Loading skeleton
│   ├── rightrail/
│   │   ├── LoginCard.tsx       # Login/signup card
│   │   ├── UpNextList.tsx      # Reading queue list
│   │   ├── TrendingList.tsx    # Trending topics list
│   │   └── RightRailCard.tsx   # Generic right rail card
│   └── common/
│       ├── Avatar.tsx          # User avatar component
│       ├── IconButton.tsx      # Reusable icon button
│       ├── Card.tsx            # Base card component
│       ├── Divider.tsx         # Horizontal divider
│       └── Drawer.tsx          # Mobile navigation drawer
├── data/
│   ├── posts.ts            # Sample post data (4 posts)
│   ├── upNext.ts           # Up next articles (3 items)
│   └── trending.ts         # Trending links (5 items)
├── lib/
│   └── types.ts            # TypeScript type definitions
├── stories/
│   ├── PostCard.stories.tsx    # PostCard Storybook stories
│   ├── SidebarNav.stories.tsx  # SidebarNav stories
│   └── RightRail.stories.tsx   # Right rail component stories
├── .storybook/
│   ├── main.ts             # Storybook configuration
│   └── preview.ts          # Global Storybook settings
├── tailwind.config.ts      # Tailwind + design tokens
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Design Tokens

All design tokens are configured in `tailwind.config.ts` and match the SPILL design system exactly:

### Typography

The app uses **SF Pro** font family for a clean, modern Apple-style aesthetic:

```typescript
fontFamily: {
  sans: [
    'SF Pro Text',
    'SF Pro Display',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
}

fontSize: {
  hero: ['28px', { lineHeight: '1.2', fontWeight: '700' }],
  h2: ['18px', { lineHeight: '1.3', fontWeight: '600' }],
  body: ['15px', { lineHeight: '1.45', fontWeight: '400' }],
  meta: ['12.5px', { lineHeight: '1.3', fontWeight: '500' }],
  btn: ['14.5px', { lineHeight: '1.2', fontWeight: '600' }],
}
```

**SF Pro** will be used automatically on Apple devices (macOS, iOS) and falls back gracefully to system fonts on other platforms.

### Colors

```typescript
colors: {
  bg: { app: '#0D0D0E' },                    // Main background
  panel: { base: '#1B1C1E', elev: '#212225' }, // Card backgrounds
  line: { divider: '#2A2B2E', border: '#2A2B2E' }, // Borders
  sidebar: { bg: '#BE3B5E', icon: '#FFFFFF' }, // Pink sidebar
  accent: {
    orange: '#FF6A00',      // CTAs, verify badge
    yellow: '#FFDA3E',      // Future badges
    primary: '#3A1B49',     // Alternative CTA
  },
  chip: { bg: '#2B2C2F', text: '#D9D9DC' }, // Chip styling
  text: {
    primary: '#F5F5F6',     // Main text
    secondary: '#BABBC0',   // Secondary text
    tertiary: '#8D8F95',    // Muted text
  },
  focus: '#8B5CF6',         // Focus ring color
}
```

### Spacing & Borders

```typescript
borderRadius: {
  lg: '16px',   // Large cards
  md: '12px',   // Standard cards
  sm: '10px',   // Small elements
}

boxShadow: {
  elev: '0 8px 24px rgba(0,0,0,0.35)', // Elevation shadow
}
```

## 📱 Responsive Behavior

The app implements three responsive breakpoints:

### Desktop (≥1280px)
- Full three-column layout
- Fixed sidebar (260px)
- Center feed (max 820px)
- Right rail (320px, sticky)

### Tablet (1024-1279px)
- Sidebar remains visible
- Right rail stacks below center feed
- Full-width layout

### Mobile (<900px)
- Sidebar collapses to hamburger menu
- Drawer navigation with scroll lock
- Single-column stacked layout
- 15px body text maintained

## ♿ Accessibility Features

### Semantic Structure
- Proper heading hierarchy (h1 → h2 → h3)
- Landmark regions: `<nav>`, `<main>`, `<aside>`
- Lists for navigation and trending items

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Visible focus indicators (2px purple outline)
- Logical tab order through the page
- Escape key closes mobile drawer

### ARIA Attributes
- `aria-current="page"` for active nav item
- `aria-label` for icon-only buttons
- `aria-haspopup="menu"` for dropdown stub
- `aria-modal="true"` for drawer overlay

### Screen Reader Support
- Alt text for avatars and thumbnails
- Hidden decorative elements (`aria-hidden="true"`)
- Semantic separators with `role="separator"`

## 🧪 Testing with Storybook

View isolated components with various states:

```bash
pnpm storybook
```

Available stories:
- **PostCard**: Default, Unverified User, Short Content
- **SidebarNav**: Desktop, Mobile
- **LoginCard**: Default state
- **UpNextList**: With items, Empty state
- **TrendingList**: With links, Empty state

## 🚫 What's NOT Included (Phase 1 Scope)

This is a static UI implementation. The following will be added in Phase 2:

- ❌ Backend API integration
- ❌ Supabase authentication
- ❌ Real-time data updates
- ❌ User interactions (functional likes, comments, etc.)
- ❌ Routing between pages
- ❌ State management (Redux, Zustand, etc.)
- ❌ Image uploads
- ❌ Infinite scroll
- ❌ Search functionality

## 🌐 Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+ (with native SF Pro support)
- Edge 90+

**Note**: SF Pro will render natively on Apple devices. Other platforms will use system font fallbacks.

## 📦 Dependencies

### Core
- `next` ^14.2.0 - React framework
- `react` ^18.3.0 - UI library
- `lucide-react` ^0.263.1 - Icon library

### Dev Dependencies
- `typescript` ^5 - Type checking
- `tailwindcss` ^3.4.0 - Styling
- `@storybook/nextjs` ^7.6.0 - Component documentation
- `eslint` ^8 - Code linting

## 🤝 Contributing

This is Phase 1 of the SPILL desktop UI. For Phase 2 features or improvements:

1. Create a feature branch
2. Make your changes
3. Ensure types pass: `pnpm build`
4. Ensure linting passes: `pnpm lint`
5. Open a pull request

## 📄 License

Private - SPILL, Inc. © 2024

## 🙏 Acknowledgments

- Design system by SPILL design team
- SF Pro font by Apple Inc.
- Built for Series A fundraising preparation
- Focused on culture-first community values

---

**Built with ❤️ for SPILL** - The app for independent voices

For questions or support, contact the engineering team.

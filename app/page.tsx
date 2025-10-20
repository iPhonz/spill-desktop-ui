'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { SidebarNav } from '@/components/sidebar/SidebarNav';
import { HeroBanner } from '@/components/hero/HeroBanner';
import { FilterDropdownStub } from '@/components/hero/FilterDropdownStub';
import { PostCard } from '@/components/feed/PostCard';
import { Divider } from '@/components/common/Divider';
import { LoginCard } from '@/components/rightrail/LoginCard';
import { UpNextList } from '@/components/rightrail/UpNextList';
import { TrendingList } from '@/components/rightrail/TrendingList';
import { Drawer } from '@/components/common/Drawer';
import { posts } from '@/data/posts';
import { upNextItems } from '@/data/upNext';
import { trendingLinks } from '@/data/trending';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-sidebar-bg z-30 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-white"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
        <span className="text-white font-bold text-xl">SPILL</span>
        <div className="w-6" />
      </div>

      {/* Mobile Drawer */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SidebarNav isMobile onClose={() => setDrawerOpen(false)} />
      </Drawer>

      {/* Desktop Layout */}
      <div className="flex max-w-[1440px] mx-auto">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 fixed h-screen bg-sidebar-bg">
          <SidebarNav />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
          <div className="flex flex-col lg:flex-row gap-5 p-5 max-w-7xl mx-auto">
            {/* Center Column */}
            <div className="flex-1 max-w-[820px]">
              <HeroBanner />
              <FilterDropdownStub />

              {/* Feed */}
              <div className="space-y-0">
                {posts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post} />
                    {index < posts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right Rail */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <LoginCard />
              <UpNextList items={upNextItems} />
              <TrendingList links={trendingLinks} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
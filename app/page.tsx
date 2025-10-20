'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { SidebarNav } from '@/components/sidebar/SidebarNav';
import { HeroBanner } from '@/components/hero/HeroBanner';
import { FilterDropdownStub } from '@/components/hero/FilterDropdownStub';
import { SpillCard } from '@/components/feed/SpillCard';
import { PostSkeleton } from '@/components/feed/PostSkeleton';
import { Divider } from '@/components/common/Divider';
import { Card } from '@/components/common/Card';
import { LoginCard } from '@/components/rightrail/LoginCard';
import { UpNextList } from '@/components/rightrail/UpNextList';
import { TrendingList } from '@/components/rightrail/TrendingList';
import { Drawer } from '@/components/common/Drawer';
import { useFeed } from '@/lib/hooks/useFeed';
import { upNextItems } from '@/data/upNext';
import { trendingLinks } from '@/data/trending';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeed();

  const spills = data?.pages.flatMap((page) => page.spills) || [];

  return (
    <div
      className="min-h-screen bg-bg-app text-text-primary"
      style={{
        fontFamily:
          "'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Desktop Layout - Always visible */}
      <div className="flex">
        {/* Left Sidebar - Desktop */}
        <aside className="w-64 fixed left-0 top-0 h-screen bg-sidebar-bg overflow-y-auto z-10">
          <SidebarNav />
        </aside>

        {/* Main Content - Offset by sidebar width */}
        <main className="flex-1 ml-64">
          <div className="flex gap-5 p-5 min-h-screen max-w-[1440px] mx-auto">
            {/* Center Column */}
            <div className="flex-1 max-w-[820px]">
              <HeroBanner />
              <FilterDropdownStub />

              {/* Feed Loading State */}
              {isLoading && (
                <div className="space-y-0">
                  {[1, 2, 3].map((i) => (
                    <React.Fragment key={i}>
                      <PostSkeleton />
                      {i < 3 && <Divider />}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Feed Error State */}
              {isError && (
                <Card className="p-12 text-center">
                  <h3 className="text-h2 text-text-primary mb-2">Couldn't load feed</h3>
                  <p className="text-body text-text-secondary">
                    Something went wrong. Please try again later.
                  </p>
                </Card>
              )}

              {/* Feed Empty State */}
              {!isLoading && !isError && spills.length === 0 && (
                <Card className="p-12 text-center">
                  <h3 className="text-h2 text-text-primary mb-2">No spills yet</h3>
                  <p className="text-body text-text-secondary">Start the conversation.</p>
                </Card>
              )}

              {/* Feed with Spills */}
              {!isLoading && !isError && spills.length > 0 && (
                <>
                  <div className="space-y-0">
                    {spills.map((spill, index) => (
                      <React.Fragment key={spill.id}>
                        <SpillCard spill={spill} />
                        {index < spills.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasNextPage && (
                    <div className="mt-5 flex justify-center">
                      <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-chip-bg text-chip-text px-8 py-3 rounded-md text-btn hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isFetchingNextPage ? 'Loading...' : 'Load more'}
                      </button>
                    </div>
                  )}

                  {/* Loading More Skeletons */}
                  {isFetchingNextPage && (
                    <div className="mt-5 space-y-0">
                      {[1, 2].map((i) => (
                        <React.Fragment key={`loading-${i}`}>
                          <PostSkeleton />
                          {i < 2 && <Divider />}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Rail */}
            <aside className="w-80 flex-shrink-0 sticky top-5 self-start">
              <LoginCard />
              <UpNextList items={upNextItems} />
              <TrendingList links={trendingLinks} />
            </aside>
          </div>
        </main>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body,
        button,
        input,
        textarea,
        select {
          font-family: 'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .bg-bg-app {
          background-color: #0d0d0e;
        }
        .bg-panel-base {
          background-color: #1b1c1e;
        }
        .bg-panel-elev {
          background-color: #212225;
        }
        .bg-line-divider {
          background-color: #2a2b2e;
        }
        .border-line-border {
          border-color: #2a2b2e;
        }
        .bg-sidebar-bg {
          background-color: #be3b5e;
        }
        .text-sidebar-icon {
          color: #ffffff;
        }
        .bg-accent-orange {
          background-color: #ff6a00;
        }
        .text-accent-orange {
          color: #ff6a00;
        }
        .bg-accent-yellow {
          background-color: #ffda3e;
        }
        .text-accent-yellow {
          color: #ffda3e;
        }
        .text-accent-yellowText {
          color: #151517;
        }
        .bg-accent-primary {
          background-color: #3a1b49;
        }
        .bg-chip-bg {
          background-color: #2b2c2f;
        }
        .text-chip-text {
          color: #d9d9dc;
        }
        .text-text-primary {
          color: #f5f5f6;
        }
        .text-text-secondary {
          color: #babbc0;
        }
        .text-text-tertiary {
          color: #8d8f95;
        }
        .text-text-inverse {
          color: #0e0e10;
        }
        .outline-focus {
          outline-color: #8b5cf6;
        }

        .rounded-lg {
          border-radius: 16px;
        }
        .rounded-md {
          border-radius: 12px;
        }
        .rounded-sm {
          border-radius: 10px;
        }

        .shadow-elev {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }

        .text-hero {
          font-size: 28px;
          line-height: 1.2;
          font-weight: 700;
        }

        .text-h2 {
          font-size: 18px;
          line-height: 1.3;
          font-weight: 600;
        }

        .text-body {
          font-size: 15px;
          line-height: 1.45;
          font-weight: 400;
        }

        .text-meta {
          font-size: 12.5px;
          line-height: 1.3;
          font-weight: 500;
        }

        .text-btn {
          font-size: 14.5px;
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
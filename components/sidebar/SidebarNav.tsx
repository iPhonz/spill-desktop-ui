'use client';

import React, { useState } from 'react';
import { Home, Rss, MessageCircle, Bell, Compass, User, X } from 'lucide-react';
import { CreateButton } from './CreateButton';

interface SidebarNavProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ isMobile = false, onClose }) => {
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Rss, label: 'Subscriptions' },
    { icon: MessageCircle, label: 'Chat' },
    { icon: Bell, label: 'Activity' },
    { icon: Compass, label: 'Explore' },
    { icon: User, label: 'Profile' },
  ];

  return (
    <div className={`h-full flex flex-col ${isMobile ? 'bg-sidebar-bg' : ''}`}>
      {isMobile && (
        <div className="flex items-center justify-between p-4">
          <span className="text-white font-bold text-xl">SPILL</span>
          <button onClick={onClose} className="text-white" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
      )}

      <nav className="flex-1 px-3 pt-6" aria-label="Main navigation">
        {/* Bookmark icon at top */}
        <div className="mb-6" aria-hidden="true">
          <div className="w-6 h-6 text-sidebar-icon">📌</div>
        </div>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                  onClick={() => {
                    setActiveItem(item.label);
                    if (isMobile && onClose) onClose();
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-colors text-left focus:outline focus:outline-2 focus:outline-focus ${
                    activeItem === item.label
                      ? 'bg-white bg-opacity-20 text-sidebar-icon'
                      : 'text-sidebar-icon hover:bg-white hover:bg-opacity-12'
                  }`}
                  aria-current={activeItem === item.label ? 'page' : undefined}
                >
                  <Icon size={20} className="text-sidebar-icon" />
                  <span className="text-btn text-sidebar-icon">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <CreateButton />
      </div>
    </div>
  );
};
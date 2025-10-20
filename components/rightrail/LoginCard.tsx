'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';

export const LoginCard: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user && profile) {
    // Logged in state
    return (
      <Card className="p-5 mb-5">
        <div className="flex items-center gap-3 mb-4">
          <Avatar size={48}>
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              '👤'
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-body font-semibold text-text-primary truncate">
              {profile.display_name}
            </div>
            <div className="text-meta text-text-tertiary truncate">@{profile.handle}</div>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full bg-chip-bg text-chip-text py-2.5 rounded-md text-btn hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus"
        >
          Sign out
        </button>
      </Card>
    );
  }

  // Logged out state
  return (
    <>
      <Card className="p-5 mb-5">
        <h2 className="text-h2 text-text-primary mb-2">Log in or sign up</h2>
        <p className="text-body text-text-secondary mb-4">
          Join the most interesting and insightful discussions.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-accent-orange text-white py-2.5 rounded-md text-btn hover:bg-opacity-90 transition-opacity focus:outline focus:outline-2 focus:outline-focus"
          >
            Get the app
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-chip-bg text-chip-text py-2.5 rounded-md text-btn hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus"
          >
            Sign in
          </button>
        </div>
      </Card>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};
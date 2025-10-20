'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ComposerModal } from '../composer/ComposerModal';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const CreateButton: React.FC = () => {
  const { user } = useAuth();
  const [showComposer, setShowComposer] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleClick = () => {
    if (user) {
      setShowComposer(true);
    } else {
      setShowAuth(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full bg-accent-orange text-white rounded-lg py-3.5 font-semibold text-[15px] hover:bg-opacity-90 transition-opacity focus:outline focus:outline-2 focus:outline-focus flex items-center justify-center gap-2"
        aria-label="Create new post"
      >
        <Plus size={20} className="inline" />
        Create
      </button>

      <ComposerModal isOpen={showComposer} onClose={() => setShowComposer(false)} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};
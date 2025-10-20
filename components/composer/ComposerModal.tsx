'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateSpill } from '@/lib/hooks/useCreateSpill';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '../common/Avatar';

interface ComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComposerModal: React.FC<ComposerModalProps> = ({ isOpen, onClose }) => {
  const [body, setBody] = useState('');
  const { profile } = useAuth();
  const createSpill = useCreateSpill();

  const characterCount = body.length;
  const maxCharacters = 280;
  const isValid = characterCount > 0 && characterCount <= maxCharacters;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      await createSpill.mutateAsync({ body });
      setBody('');
      onClose();
    } catch (error) {
      console.error('Error creating spill:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="composer-title"
      >
        <div className="bg-panel-base border border-line-border rounded-lg shadow-elev p-5 m-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 id="composer-title" className="text-h2 text-text-primary">
              Create a spill
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus"
              aria-label="Close"
            >
              <X size={20} className="text-text-tertiary" />
            </button>
          </div>

          {/* Composer Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 mb-4">
              <Avatar size={40}>
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  '👤'
                )}
              </Avatar>

              <div className="flex-1">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full bg-transparent text-body text-text-primary placeholder-text-tertiary resize-none focus:outline-none"
                  rows={4}
                  maxLength={maxCharacters}
                  autoFocus
                  style={{
                    fontFamily:
                      "'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  }}
                />
              </div>
            </div>

            {/* Character Count & Submit */}
            <div className="flex items-center justify-between">
              <div
                className={`text-meta ${
                  characterCount > maxCharacters ? 'text-red-500' : 'text-text-tertiary'
                }`}
              >
                {characterCount}/{maxCharacters}
              </div>

              <button
                type="submit"
                disabled={!isValid || createSpill.isPending}
                className="bg-accent-orange text-white px-6 py-2.5 rounded-lg text-btn hover:bg-opacity-90 transition-opacity focus:outline focus:outline-2 focus:outline-focus disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createSpill.isPending ? 'Spilling...' : 'Spill'}
              </button>
            </div>

            {/* Error Message */}
            {createSpill.isError && (
              <div className="mt-3 text-meta text-red-500">
                Failed to create spill. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
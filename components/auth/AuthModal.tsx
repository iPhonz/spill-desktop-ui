'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signInWithGoogle } = useAuth();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(email);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  const handleClose = () => {
    setEmail('');
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <div className="bg-panel-base border border-line-border rounded-lg shadow-elev p-6 m-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 id="auth-title" className="text-h2 text-text-primary">
              {isSuccess ? 'Check your email' : 'Welcome to SPILL'}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-md hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus"
              aria-label="Close"
            >
              <X size={20} className="text-text-tertiary" />
            </button>
          </div>

          {isSuccess ? (
            <div className="text-body text-text-secondary">
              We've sent you a magic link! Check your email and click the link to sign in.
            </div>
          ) : (
            <>
              {/* Email Sign In */}
              <form onSubmit={handleEmailSignIn} className="mb-4">
                <label htmlFor="email" className="block text-body text-text-secondary mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-panel-elev text-body text-text-primary placeholder-text-tertiary px-4 py-3 rounded-md border border-line-border focus:outline focus:outline-2 focus:outline-focus"
                  style={{
                    fontFamily:
                      "'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 bg-accent-orange text-white py-3 rounded-md text-btn hover:bg-opacity-90 transition-opacity focus:outline focus:outline-2 focus:outline-focus disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending link...' : 'Continue with email'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-line-divider" />
                </div>
                <div className="relative flex justify-center text-meta">
                  <span className="bg-panel-base px-2 text-text-tertiary">or</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-chip-bg text-chip-text py-3 rounded-md text-btn hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-4 text-meta text-red-500 text-center">{error}</div>
              )}

              {/* Terms */}
              <p className="mt-5 text-meta text-text-tertiary text-center">
                By continuing, you agree to SPILL's Terms of Service and Privacy Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
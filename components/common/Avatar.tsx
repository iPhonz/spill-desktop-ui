import React from 'react';

interface AvatarProps {
  size?: number;
  children: React.ReactNode;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 36, children, alt = 'User avatar' }) => {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-medium"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#BE3B5E',
        fontSize: `${size * 0.5}px`,
      }}
      role="img"
      aria-label={alt}
    >
      {children}
    </div>
  );
};
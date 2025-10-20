import React from 'react';
import { Plus } from 'lucide-react';

interface CreateButtonProps {
  onClick?: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-accent-orange text-white rounded-md py-3 font-semibold text-btn hover:bg-opacity-90 transition-opacity focus:outline focus:outline-2 focus:outline-focus"
      aria-label="Create new post"
    >
      <Plus size={18} className="inline mr-2" />
      Create
    </button>
  );
};
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const FilterDropdownStub: React.FC = () => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 mb-5 text-text-primary text-body font-semibold hover:text-text-secondary transition-colors focus:outline focus:outline-2 focus:outline-focus rounded"
      aria-label="Filter: For you"
      aria-haspopup="menu"
    >
      For you
      <ChevronDown size={16} />
    </button>
  );
};
import React from 'react';
import { Card } from '../common/Card';

export const HeroBanner: React.FC = () => {
  return (
    <Card className="p-6 mb-5">
      <h1 className="text-hero text-text-primary mb-4">The app for independent voices</h1>
      <div className="flex gap-3 flex-wrap">
        <button className="bg-accent-orange text-white px-6 py-2.5 rounded-md text-btn hover:bg-opacity-90 transition-opacity focus:outline focus:outline-2 focus:outline-focus">
          Get started
        </button>
        <button className="text-text-secondary px-6 py-2.5 rounded-md text-btn hover:text-text-primary transition-colors focus:outline focus:outline-2 focus:outline-focus">
          Learn more
        </button>
      </div>
    </Card>
  );
};
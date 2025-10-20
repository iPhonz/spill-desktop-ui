import React from 'react';
import { Card } from '../common/Card';

export const LoginCard: React.FC = () => {
  return (
    <Card className="p-5 mb-5">
      <h2 className="text-h2 text-text-primary mb-2">Log in or sign up</h2>
      <p className="text-body text-text-secondary mb-4">
        Join the most interesting and insightful discussions.
      </p>
      <div className="space-y-3">
        <button className="w-full bg-accent-orange text-white py-2.5 rounded-md text-btn hover:bg-opacity-90 transition-opacity focus:outline focus:outline-2 focus:outline-focus">
          Get the app
        </button>
        <button className="w-full bg-chip-bg text-chip-text py-2.5 rounded-md text-btn hover:bg-panel-elev transition-colors focus:outline focus:outline-2 focus:outline-focus">
          Sign in
        </button>
      </div>
    </Card>
  );
};
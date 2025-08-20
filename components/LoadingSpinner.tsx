
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
      <p className="text-amber-200 text-lg font-semibold">The AI Dungeon Master is thinking...</p>
    </div>
  );
};

export default LoadingSpinner;

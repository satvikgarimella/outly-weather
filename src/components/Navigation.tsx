
import React from 'react';
import { Home, Search } from 'lucide-react';

interface NavigationProps {
  activeTab: 'home' | 'explore';
  onTabChange: (tab: 'home' | 'explore') => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
            activeTab === 'home'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </button>
        
        <button
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
            activeTab === 'explore'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Search size={24} />
          <span className="text-xs mt-1 font-medium">Explore</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;


import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import ActivityCard from './ActivityCard';
import LocationSearch from './LocationSearch';
import { ThemeToggle } from './ThemeToggle';
import { Activity } from '../services/activityService';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomeScreenProps {
  weather: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    weather_code: number;
    uv_index: number;
    cloud_cover: number;
  };
  activities: Activity[];
  onActivityClick: (activity: Activity) => void;
  onLocationChange?: (location: { latitude: number; longitude: number; name: string }) => void;
  currentLocation?: string;
}

const HomeScreen = ({ weather, activities, onActivityClick, onLocationChange, currentLocation }: HomeScreenProps) => {
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="p-4 space-y-6">
        {/* Header with Logo and Controls */}
        <div className="pt-8 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/b36a6ad2-97e2-4da6-bbac-7a6ac5d936c3.png" 
                alt="Outly Logo" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Outly</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">What should you do today?</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLocationSearch(true)}
                className="h-10 w-10"
              >
                <Search size={20} />
              </Button>
              <ThemeToggle />
            </div>
          </div>
          
          {currentLocation && (
            <p className="text-sm text-gray-500 dark:text-gray-400">📍 {currentLocation}</p>
          )}
        </div>

        {/* Weather Card */}
        <WeatherCard weather={weather} />

        {/* Activities Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Suggested Activities</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{activities.length} ideas</span>
          </div>
          
          <div className="space-y-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onClick={() => onActivityClick(activity)}
              />
            ))}
          </div>
        </div>

        {activities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No activities match the current weather conditions.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try exploring different moods!</p>
          </div>
        )}
      </div>

      {/* Location Search Modal */}
      {showLocationSearch && (
        <LocationSearch
          onLocationSelect={(location) => {
            onLocationChange?.(location);
            setShowLocationSearch(false);
          }}
          onClose={() => setShowLocationSearch(false)}
        />
      )}
    </div>
  );
};

export default HomeScreen;

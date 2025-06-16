
import React, { useState, useEffect } from 'react';
import ActivityCard from './ActivityCard';
import { Activity, getActivityRecommendations } from '../services/activityService';

interface ExploreScreenProps {
  weather: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    weather_code: number;
    uv_index: number;
    cloud_cover: number;
  };
  onActivityClick: (activity: Activity) => void;
}

type Mood = 'chill' | 'energetic' | 'social';

const ExploreScreen = ({ weather, onActivityClick }: ExploreScreenProps) => {
  const [selectedMood, setSelectedMood] = useState<Mood>('chill');
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const recommendations = getActivityRecommendations(weather, selectedMood, 8);
    setActivities(recommendations);
  }, [weather, selectedMood]);

  const moods: { value: Mood; label: string; icon: string; color: string }[] = [
    { value: 'chill', label: 'Chill', icon: '😌', color: 'bg-blue-500' },
    { value: 'energetic', label: 'Energetic', icon: '⚡', color: 'bg-red-500' },
    { value: 'social', label: 'Social', icon: '👥', color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="pt-8 pb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Find activities that match your mood</p>
        </div>

        {/* Mood Selector */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How are you feeling?</h2>
          <div className="flex space-x-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMood === mood.value
                    ? `${mood.color} text-white border-transparent shadow-lg scale-105`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{mood.icon}</div>
                <div className="font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Activities Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Perfect for You</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{activities.length} activities</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
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
            <p className="text-gray-500 dark:text-gray-400">No {selectedMood} activities available right now.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different mood or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreScreen;

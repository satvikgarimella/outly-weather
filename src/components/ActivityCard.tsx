
import React from 'react';
import { Activity } from '../services/activityService';

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
}

const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'outdoor': return 'from-green-400 to-emerald-500';
      case 'indoor': return 'from-purple-400 to-indigo-500';
      case 'social': return 'from-pink-400 to-rose-500';
      case 'exercise': return 'from-orange-400 to-red-500';
      case 'relaxation': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getMoodBadgeColor = (mood: string) => {
    switch (mood) {
      case 'energetic': return 'bg-red-100 text-red-800';
      case 'chill': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(activity.category)} flex items-center justify-center text-2xl`}>
          {activity.icon}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodBadgeColor(activity.mood)}`}>
          {activity.mood}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500 capitalize">{activity.category}</span>
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-xs">→</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;

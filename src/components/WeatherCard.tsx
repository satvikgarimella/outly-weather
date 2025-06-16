
import React from 'react';
import { getWeatherDescription, getWeatherIcon } from '../services/weatherService';

interface WeatherCardProps {
  weather: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    weather_code: number;
    uv_index: number;
    cloud_cover: number;
  };
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getBackgroundGradient = (weatherCode: number, temperature: number) => {
    // Clear/sunny weather
    if (weatherCode <= 1) {
      return temperature > 25 
        ? 'from-yellow-400 via-orange-500 to-red-500' 
        : 'from-blue-400 via-blue-500 to-blue-600';
    }
    // Partly cloudy
    if (weatherCode === 2) {
      return 'from-blue-300 via-gray-400 to-blue-500';
    }
    // Cloudy/overcast
    if (weatherCode === 3) {
      return 'from-gray-400 via-gray-500 to-gray-600';
    }
    // Rain
    if (weatherCode >= 61 && weatherCode <= 82) {
      return 'from-gray-600 via-blue-700 to-gray-800';
    }
    // Snow
    if (weatherCode >= 71 && weatherCode <= 75) {
      return 'from-blue-200 via-white to-gray-300';
    }
    // Default
    return 'from-blue-400 via-purple-500 to-pink-500';
  };

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient(weather.weather_code, weather.temperature)} rounded-3xl p-6 text-white shadow-2xl`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm opacity-80 mb-1">Right now</p>
          <h2 className="text-4xl font-bold">{weather.temperature}°</h2>
          <p className="text-lg opacity-90">{getWeatherDescription(weather.weather_code)}</p>
        </div>
        <div className="text-6xl">
          {getWeatherIcon(weather.weather_code)}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-xs opacity-70 uppercase tracking-wide">Humidity</p>
          <p className="text-lg font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs opacity-70 uppercase tracking-wide">Wind</p>
          <p className="text-lg font-semibold">{Math.round(weather.wind_speed)} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-xs opacity-70 uppercase tracking-wide">UV Index</p>
          <p className="text-lg font-semibold">{weather.uv_index}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

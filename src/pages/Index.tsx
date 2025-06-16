
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import LoadingScreen from '../components/LoadingScreen';
import HomeScreen from '../components/HomeScreen';
import ExploreScreen from '../components/ExploreScreen';
import Navigation from '../components/Navigation';
import { 
  fetchWeatherData, 
  getCurrentLocation 
} from '../services/weatherService';
import { 
  getActivityRecommendations, 
  Activity 
} from '../services/activityService';

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  weather_code: number;
  uv_index: number;
  cloud_cover: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'explore'>('home');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const { toast } = useToast();

  const loadWeatherAndActivities = async (location?: { latitude: number; longitude: number; name?: string }) => {
    try {
      setIsLoading(true);
      console.log('Loading weather and activities...');
      
      let locationData;
      if (location) {
        locationData = location;
        setCurrentLocation(location.name || 'Custom Location');
      } else {
        locationData = await getCurrentLocation();
        setCurrentLocation('Current Location');
        console.log('Location obtained:', locationData);
      }
      
      const weatherData = await fetchWeatherData(locationData);
      console.log('Weather data received:', weatherData);
      
      setWeather(weatherData.current);
      
      const recommendations = getActivityRecommendations(weatherData.current, undefined, 5);
      console.log('Activity recommendations:', recommendations);
      setActivities(recommendations);
      
      toast({
        title: "Weather updated!",
        description: "Fresh activity recommendations loaded.",
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading weather",
        description: "Using default recommendations.",
        variant: "destructive",
      });
      
      // Fallback weather data
      const fallbackWeather: WeatherData = {
        temperature: 20,
        humidity: 60,
        wind_speed: 10,
        weather_code: 1,
        uv_index: 3,
        cloud_cover: 30
      };
      
      setWeather(fallbackWeather);
      setActivities(getActivityRecommendations(fallbackWeather, undefined, 5));
      setCurrentLocation('Toronto (Fallback)');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherAndActivities();
  }, []);

  const handleActivityClick = (activity: Activity) => {
    console.log('Activity clicked:', activity);
    toast({
      title: activity.title,
      description: activity.description,
    });
  };

  const handleLocationChange = (location: { latitude: number; longitude: number; name: string }) => {
    loadWeatherAndActivities(location);
  };

  if (isLoading || !weather) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {activeTab === 'home' ? (
        <HomeScreen 
          weather={weather}
          activities={activities}
          onActivityClick={handleActivityClick}
          onLocationChange={handleLocationChange}
          currentLocation={currentLocation}
        />
      ) : (
        <ExploreScreen 
          weather={weather}
          onActivityClick={handleActivityClick}
        />
      )}
      
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;

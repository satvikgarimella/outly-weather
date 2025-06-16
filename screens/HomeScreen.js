import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { useTheme, Text, Searchbar } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import getSuggestions from '../utils/getSuggestions';
import { fetchWeather, geocodePlace } from '../config/weatherApi';
import WeatherCard from '../components/WeatherCard';
import ActivityCard from '../components/ActivityCard';

export default function HomeScreen({ isDarkMode, setIsDarkMode }) {
  const theme = useTheme();
  const [weather, setWeather] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Toronto');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setupNotifications();
    loadWeather();
  }, []);

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  };

  const loadWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let coords = { latitude: 43.65107, longitude: -79.347015 }; // Toronto coordinates
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        coords = location.coords;
        // Get location name
        const [address] = await Location.reverseGeocodeAsync(coords);
        if (address) {
          setLocation(address.city || 'Toronto');
        }
      }
      const weatherData = await fetchWeather(coords.latitude, coords.longitude);
      setWeather(weatherData);
      setActivities(getSuggestions(weatherData.current));
      setLoading(false);
      scheduleWeatherNotification(weatherData);
    } catch (error) {
      console.error('Error loading weather:', error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    try {
      const geo = await geocodePlace(searchQuery.trim());
      if (geo) {
        setLocation(`${geo.name}, ${geo.country}`);
        const weatherData = await fetchWeather(geo.latitude, geo.longitude);
        setWeather(weatherData);
        setActivities(getSuggestions(weatherData.current));
      } else {
        setLocation('Not found');
        setWeather(null);
        setActivities([]);
      }
    } catch (e) {
      setLocation('Error');
      setWeather(null);
      setActivities([]);
    }
    setSearchLoading(false);
    Keyboard.dismiss();
  };

  const scheduleWeatherNotification = (weatherData) => {
    const { current, hourly } = weatherData;
    const nextHours = hourly.slice(0, 6);
    const isImproving = nextHours.some(hour =>
      hour.weathercode < current.weathercode &&
      hour.temperature > current.temperature
    );
    if (isImproving) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Weather Update',
          body: 'The weather is improving! Great time to head out!',
        },
        trigger: { seconds: 3600 },
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={[{ key: 'search' }, { key: 'weather' }, { key: 'title' }, ...activities.map((a, i) => ({ ...a, key: `activity-${i}` }))]}
      renderItem={({ item }) => {
        if (item.key === 'search') {
          return (
            <View style={styles.searchbarContainer}>
              <Searchbar
                placeholder="Search for a place..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                onIconPress={handleSearch}
                loading={searchLoading}
                style={styles.searchbar}
              />
            </View>
          );
        }
        if (item.key === 'weather') {
          return <View style={styles.weatherCardContainer}><WeatherCard weather={weather} location={location} /></View>;
        }
        if (item.key === 'title') {
          return <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Suggested Activities</Text>;
        }
        return <View style={styles.activityCardContainer}><ActivityCard activity={item} /></View>;
      }}
      keyExtractor={item => item.key}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: theme.colors.background }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarContainer: {
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchbar: {
    borderRadius: 16,
    elevation: 2,
  },
  weatherCardContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 32,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  activityCardContainer: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
}); 
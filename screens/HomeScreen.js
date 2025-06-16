import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Keyboard } from 'react-native';
import { useTheme, Text, Searchbar, ActivityIndicator, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import getSuggestions from '../utils/getSuggestions';
import { fetchWeather, geocodePlace } from '../config/weatherApi';
import { fetchPlaces } from '../utils/getPlaces';
import WeatherCard from '../components/WeatherCard';
import ActivityCard from '../components/ActivityCard';

const SAMPLE_ACTIVITIES = [
  {
    id: 1,
    type: 'outdoor',
    title: 'Hiking Trail',
    description: 'Enjoy a scenic hike through the local nature trail. Perfect for a sunny day!',
    duration: '2-3 hours',
    location: 'Nature Park',
  },
  {
    id: 2,
    type: 'indoor',
    title: 'Museum Visit',
    description: 'Explore the local museum and learn about the city\'s rich history.',
    duration: '1-2 hours',
    location: 'City Museum',
  },
  {
    id: 3,
    type: 'food',
    title: 'Local Cafe',
    description: 'Visit the popular local cafe for some delicious treats and coffee.',
    duration: '1 hour',
    location: 'Downtown',
  },
  {
    id: 4,
    type: 'entertainment',
    title: 'Movie Night',
    description: 'Catch the latest blockbuster at the cinema.',
    duration: '2 hours',
    location: 'Cinema Center',
  },
  {
    id: 5,
    type: 'outdoor',
    title: 'Picnic in the Park',
    description: 'Pack a lunch and enjoy a relaxing picnic.',
    duration: '1-2 hours',
    location: 'Central Park',
  },
  {
    id: 6,
    type: 'indoor',
    title: 'Art Gallery',
    description: 'View beautiful artwork from local artists.',
    duration: '1 hour',
    location: 'Art District',
  },
  {
    id: 7,
    type: 'food',
    title: 'Street Food Tour',
    description: 'Sample delicious street food from various vendors.',
    duration: '2 hours',
    location: 'Food Market',
  },
  {
    id: 8,
    type: 'entertainment',
    title: 'Live Music',
    description: 'Enjoy live music at a local venue.',
    duration: '3 hours',
    location: 'Music Hall',
  },
];

export default function HomeScreen({ isDarkMode, setIsDarkMode }) {
  const theme = useTheme();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Loading location...');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [activities, setActivities] = useState(SAMPLE_ACTIVITIES);

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
      setLoading(true);
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
      // Fetch real places for the default location
      const places = await fetchPlaces(coords.latitude, coords.longitude, 8);
      setActivities(places.length > 0 ? places : SAMPLE_ACTIVITIES);
    } catch (error) {
      console.error('Error loading weather:', error);
      setActivities(SAMPLE_ACTIVITIES);
    } finally {
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
        // Fetch real places for the searched city
        const places = await fetchPlaces(geo.latitude, geo.longitude, 8);
        setActivities(places.length > 0 ? places : SAMPLE_ACTIVITIES);
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

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topBar}>
        <View style={styles.searchbarRow}>
          <Searchbar
            placeholder="Search for a place..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            onIconPress={handleSearch}
            loading={searchLoading}
            style={styles.searchbar}
          />
          <IconButton
            icon={isDarkMode ? 'weather-night' : 'white-balance-sunny'}
            size={28}
            onPress={() => setIsDarkMode((d) => !d)}
            style={styles.themeToggle}
            iconColor={theme.colors.primary}
            accessibilityLabel="Toggle theme"
          />
        </View>
      </View>
      <View style={styles.section}>
        <WeatherCard weather={weather} location={location} />
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Suggested Activities</Text>
      <View style={styles.activitiesContainer}>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  searchbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchbarContainer: {
    display: 'none', // Hide old searchbar container
  },
  searchbar: {
    flex: 1,
    borderRadius: 16,
    elevation: 2,
  },
  themeToggle: {
    marginLeft: 8,
    backgroundColor: 'transparent',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  activitiesContainer: {
    width: '100%',
    alignItems: 'center',
  },
}); 
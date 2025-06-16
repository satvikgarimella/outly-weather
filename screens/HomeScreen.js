import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Text, Searchbar, ActivityIndicator, IconButton, SegmentedButtons } from 'react-native-paper';
import WeatherCard from '../components/WeatherCard';
import ActivityCard from '../components/ActivityCard';
import { fetchWeather, geocodePlace } from '../config/weatherApi';

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
  const [unit, setUnit] = useState('c');

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      setLoading(true);
      const weatherData = await fetchWeather(43.65107, -79.347015); // Toronto default
      setWeather(weatherData);
      setLocation('Toronto, Canada');
    } catch (error) {
      console.error('Error loading weather:', error);
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
      } else {
        setLocation('Not found');
        setWeather(null);
      }
    } catch (e) {
      setLocation('Error');
      setWeather(null);
    }
    setSearchLoading(false);
    Keyboard.dismiss();
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandingContainer}>
          <Text style={styles.branding}>Outly</Text>
        </View>
        <View style={styles.topBar}>
          <View style={styles.topBarRow}>
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
            <View style={styles.unitToggleRow}>
              <Text style={styles.unitLabel}>Units:</Text>
              <SegmentedButtons
                value={unit}
                onValueChange={setUnit}
                buttons={[
                  { value: 'c', label: '°C' },
                  { value: 'f', label: '°F' },
                ]}
                style={styles.unitToggle}
              />
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <WeatherCard weather={weather} location={location} unit={unit} />
        </View>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Suggested Activities</Text>
        <View style={styles.activitiesContainer}>
          {SAMPLE_ACTIVITIES.map((activity, idx) => (
            <ActivityCard key={activity.id || idx} activity={activity} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 32,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  branding: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#FFF',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  topBar: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 0,
  },
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  unitToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    backgroundColor: '#f2f2f7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unitLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
    color: '#888',
  },
  unitToggle: {
    height: 40,
    alignSelf: 'center',
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
  },
  brandingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    display: 'flex',
  },
}); 
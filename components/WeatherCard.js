import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getWeatherIcon = (code) => {
  switch (code) {
    case 0: return 'weather-sunny';
    case 1: return 'weather-partly-cloudy';
    case 2: return 'weather-cloudy';
    case 3: return 'weather-cloudy';
    case 45:
    case 48: return 'weather-fog';
    case 51:
    case 53:
    case 55: return 'weather-rainy';
    case 61:
    case 63:
    case 65: return 'weather-pouring';
    case 71:
    case 73:
    case 75: return 'weather-snowy';
    case 77: return 'weather-snowy-heavy';
    case 80:
    case 81:
    case 82: return 'weather-rainy';
    case 85:
    case 86: return 'weather-snowy-heavy';
    case 95:
    case 96:
    case 99: return 'weather-lightning';
    default: return 'weather-cloudy';
  }
};

export default function WeatherCard({ weather, location }) {
  const theme = useTheme();
  if (!weather) return null;

  const { current, hourly } = weather;
  const icon = getWeatherIcon(current.weathercode);

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text style={[styles.location, { color: theme.colors.text }]}>{location}</Text>
        <View style={styles.currentWeather}>
          <MaterialCommunityIcons name={icon} size={64} color={theme.colors.primary} />
          <View style={styles.temperatureContainer}>
            <Text style={[styles.temperature, { color: theme.colors.text }]}>
              {Math.round(current.temperature)}°C
            </Text>
            <Text style={[styles.feelsLike, { color: theme.colors.text }]}>
              Feels like {Math.round(current.apparent_temperature)}°C
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="water-percent" size={24} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {current.relative_humidity}%
            </Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="weather-windy" size={24} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {Math.round(current.windspeed)} km/h
            </Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="eye" size={24} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {current.visibility} km
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    elevation: 4,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperatureContainer: {
    marginLeft: 16,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 16,
    opacity: 0.7,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  detail: {
    alignItems: 'center',
  },
  detailText: {
    marginTop: 4,
    fontSize: 14,
  },
}); 
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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

const toF = (c) => (c * 9) / 5 + 32;

function formatTime(isoString) {
  if (!isoString) return '--:--';
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function WeatherCard({ weather, location, unit = 'c' }) {
  const theme = useTheme();
  if (!weather) return null;

  const { current, sunrise, sunset } = weather;
  const icon = getWeatherIcon(current.weathercode);
  const temp = unit === 'f' ? Math.round(toF(current.temperature)) : Math.round(current.temperature);
  const feelsLike = unit === 'f' ? Math.round(toF(current.apparent_temperature)) : Math.round(current.apparent_temperature);
  const tempUnit = unit === 'f' ? '°F' : '°C';

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text style={[styles.location, { color: theme.colors.text }]}>{location}</Text>
        <View style={styles.currentWeather}>
          <MaterialCommunityIcons name={icon} size={80} color={theme.colors.primary} />
          <View style={styles.temperatureContainer}>
            <Text style={[styles.temperature, { color: theme.colors.text }]}>
              {temp}{tempUnit}
            </Text>
            <Text style={[styles.feelsLike, { color: theme.colors.text }]}>
              Feels like {feelsLike}{tempUnit}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="water-percent" size={28} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {current.relative_humidity}%
            </Text>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Humidity</Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="weather-windy" size={28} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {Math.round(current.windspeed)} km/h
            </Text>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Wind</Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="eye" size={28} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {current.visibility} km
            </Text>
            <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Visibility</Text>
          </View>
        </View>
        <View style={styles.sunTimesRow}>
          <View style={styles.sunTime}>
            <MaterialCommunityIcons name="weather-sunset-up" size={24} color={theme.colors.primary} />
            <Text style={[styles.sunTimeLabel, { color: theme.colors.text }]}>Sunrise</Text>
            <Text style={[styles.sunTimeValue, { color: theme.colors.text }]}>{formatTime(sunrise)}</Text>
          </View>
          <View style={styles.sunTime}>
            <MaterialCommunityIcons name="weather-sunset-down" size={24} color={theme.colors.primary} />
            <Text style={[styles.sunTimeLabel, { color: theme.colors.text }]}>Sunset</Text>
            <Text style={[styles.sunTimeValue, { color: theme.colors.text }]}>{formatTime(sunset)}</Text>
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
    marginHorizontal: 16,
    marginVertical: 8,
  },
  location: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  temperatureContainer: {
    marginLeft: 16,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 18,
    opacity: 0.7,
    marginTop: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  detail: {
    alignItems: 'center',
  },
  detailText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  sunTimesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    marginBottom: 8,
  },
  sunTime: {
    alignItems: 'center',
  },
  sunTimeLabel: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 2,
  },
  sunTimeValue: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
}); 
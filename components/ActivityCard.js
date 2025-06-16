import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getActivityIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'outdoor':
      return 'weather-sunny';
    case 'indoor':
      return 'home';
    case 'food':
      return 'food';
    case 'entertainment':
      return 'movie';
    default:
      return 'star';
  }
};

export default function ActivityCard({ activity }) {
  const theme = useTheme();
  if (!activity) return null;

  const icon = getActivityIcon(activity.type);

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name={icon} size={32} color={theme.colors.primary} />
          <Text style={[styles.type, { color: theme.colors.primary }]}>{activity.type}</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>{activity.title}</Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>{activity.description}</Text>
        <View style={styles.details}>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="clock-outline" size={24} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>{activity.duration}</Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="map-marker" size={24} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>{activity.location}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
}); 
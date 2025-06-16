import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ActivityCard({ activity }) {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text style={[styles.title, { color: theme.colors.text }]}>{activity.title}</Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>{activity.description}</Text>
        <Card.Actions style={styles.actions}>
          <MaterialCommunityIcons name={activity.icon} size={24} color={theme.colors.primary} />
          <Text style={[styles.difficulty, { color: theme.colors.text }]}>
            Difficulty: {activity.difficulty}
          </Text>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  difficulty: {
    fontSize: 14,
    opacity: 0.7,
  },
}); 
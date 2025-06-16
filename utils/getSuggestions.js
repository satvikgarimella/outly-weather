const getActivityIcon = (type) => {
  switch (type) {
    case 'outdoor': return 'hiking';
    case 'indoor': return 'home';
    case 'water': return 'swim';
    case 'sports': return 'basketball';
    case 'relaxation': return 'spa';
    default: return 'star';
  }
};

const getActivityDifficulty = (weather) => {
  if (weather.temperature < 5) return 'Hard';
  if (weather.temperature < 10) return 'Moderate';
  return 'Easy';
};

export default function getSuggestions(weather) {
  const suggestions = [];

  // Outdoor activities
  if (weather.weathercode < 3) { // Clear or partly cloudy
    suggestions.push({
      title: 'Hiking',
      description: 'Perfect weather for a hike! Enjoy the clear skies and moderate temperatures.',
      type: 'outdoor',
      icon: getActivityIcon('outdoor'),
      difficulty: getActivityDifficulty(weather),
    });
  }

  // Water activities
  if (weather.temperature > 20 && weather.weathercode < 3) {
    suggestions.push({
      title: 'Swimming',
      description: 'Great day for a swim! The water should be comfortable.',
      type: 'water',
      icon: getActivityIcon('water'),
      difficulty: 'Easy',
    });
  }

  // Indoor activities
  if (weather.weathercode > 2) { // Cloudy or worse
    suggestions.push({
      title: 'Museum Visit',
      description: 'Perfect day to explore a museum or art gallery.',
      type: 'indoor',
      icon: getActivityIcon('indoor'),
      difficulty: 'Easy',
    });
  }

  // Sports activities
  if (weather.weathercode < 3 && weather.temperature > 15) {
    suggestions.push({
      title: 'Basketball',
      description: 'Great conditions for some outdoor sports!',
      type: 'sports',
      icon: getActivityIcon('sports'),
      difficulty: getActivityDifficulty(weather),
    });
  }

  // Relaxation activities
  if (weather.weathercode < 3 && weather.temperature > 18) {
    suggestions.push({
      title: 'Picnic',
      description: 'Perfect weather for a relaxing picnic in the park.',
      type: 'relaxation',
      icon: getActivityIcon('relaxation'),
      difficulty: 'Easy',
    });
  }

  return suggestions;
} 

interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'indoor' | 'outdoor' | 'social' | 'exercise' | 'relaxation';
  mood: 'chill' | 'energetic' | 'social';
  icon: string;
  conditions: {
    minTemp?: number;
    maxTemp?: number;
    maxWind?: number;
    minWind?: number;  // Added minWind property
    maxRain?: number;
    minUV?: number;
    maxUV?: number;
    cloudCover?: 'low' | 'medium' | 'high' | 'any';
  };
}

const activities: Activity[] = [
  // Hot Weather Activities (25°C+)
  {
    id: '1',
    title: 'Go to the beach',
    description: 'Perfect sunny weather for swimming and sunbathing',
    category: 'outdoor',
    mood: 'social',
    icon: '🏖️',
    conditions: { minTemp: 25, maxWind: 15, maxRain: 10, minUV: 4 }
  },
  {
    id: '2',
    title: 'Have a pool party',
    description: 'Hot weather calls for cooling off with friends',
    category: 'social',
    mood: 'social',
    icon: '🏊‍♂️',
    conditions: { minTemp: 28, maxWind: 20, maxRain: 5 }
  },
  {
    id: '3',
    title: 'Get ice cream',
    description: 'Cool down with a refreshing treat',
    category: 'social',
    mood: 'chill',
    icon: '🍦',
    conditions: { minTemp: 25, cloudCover: 'any' }
  },
  {
    id: '4',
    title: 'Find shade and read',
    description: 'Enjoy a book in a cool, shaded spot',
    category: 'relaxation',
    mood: 'chill',
    icon: '📖',
    conditions: { minTemp: 30, maxUV: 10 }
  },
  {
    id: '5',
    title: 'Go to an outdoor market',
    description: 'Browse local vendors in the sunshine',
    category: 'social',
    mood: 'social',
    icon: '🛒',
    conditions: { minTemp: 20, maxTemp: 32, maxWind: 25 }
  },

  // Warm Weather Activities (15-25°C)
  {
    id: '6',
    title: 'Go for a bike ride',
    description: 'Perfect temperature for cycling around the city',
    category: 'outdoor',
    mood: 'energetic',
    icon: '🚴‍♂️',
    conditions: { minTemp: 15, maxTemp: 28, maxWind: 20, maxRain: 10 }
  },
  {
    id: '7',
    title: 'Have a picnic',
    description: 'Lovely weather for outdoor dining',
    category: 'social',
    mood: 'social',
    icon: '🧺',
    conditions: { minTemp: 18, maxTemp: 26, maxWind: 15, maxRain: 5 }
  },
  {
    id: '8',
    title: 'Go hiking',
    description: 'Perfect conditions for exploring nature trails',
    category: 'exercise',
    mood: 'energetic',
    icon: '🥾',
    conditions: { minTemp: 12, maxTemp: 25, maxWind: 25, maxRain: 20 }
  },
  {
    id: '9',
    title: 'Outdoor yoga',
    description: 'Practice mindfulness in nature',
    category: 'exercise',
    mood: 'chill',
    icon: '🧘‍♀️',
    conditions: { minTemp: 16, maxTemp: 24, maxWind: 10, maxRain: 5 }
  },
  {
    id: '10',
    title: 'Visit a farmers market',
    description: 'Perfect weather to browse fresh produce',
    category: 'social',
    mood: 'chill',
    icon: '🥕',
    conditions: { minTemp: 15, maxTemp: 25, maxWind: 20, maxRain: 15 }
  },

  // Cool Weather Activities (5-15°C)
  {
    id: '11',
    title: 'Take a brisk walk',
    description: 'Crisp air perfect for a refreshing stroll',
    category: 'exercise',
    mood: 'energetic',
    icon: '🚶‍♀️',
    conditions: { minTemp: 5, maxTemp: 18, maxWind: 30 }
  },
  {
    id: '12',
    title: 'Visit a cozy café',
    description: 'Warm up with hot drinks and good atmosphere',
    category: 'social',
    mood: 'chill',
    icon: '☕',
    conditions: { maxTemp: 20, cloudCover: 'any' }
  },
  {
    id: '13',
    title: 'Go for a jog',
    description: 'Cool weather is ideal for running',
    category: 'exercise',
    mood: 'energetic',
    icon: '🏃‍♂️',
    conditions: { minTemp: 5, maxTemp: 20, maxWind: 20, maxRain: 10 }
  },
  {
    id: '14',
    title: 'Explore a bookstore',
    description: 'Browse books in a warm, quiet space',
    category: 'indoor',
    mood: 'chill',
    icon: '📚',
    conditions: { maxTemp: 25, cloudCover: 'any' }
  },
  {
    id: '15',
    title: 'Visit art galleries',
    description: 'Perfect indoor cultural activity',
    category: 'indoor',
    mood: 'chill',
    icon: '🎨',
    conditions: { cloudCover: 'any' }
  },

  // Cold Weather Activities (Below 5°C)
  {
    id: '16',
    title: 'Ice skating',
    description: 'Embrace the cold with winter sports',
    category: 'exercise',
    mood: 'energetic',
    icon: '⛸️',
    conditions: { maxTemp: 5, maxWind: 25 }
  },
  {
    id: '17',
    title: 'Hot chocolate by fireplace',
    description: 'Cozy up indoors with warm drinks',
    category: 'relaxation',
    mood: 'chill',
    icon: '🔥',
    conditions: { maxTemp: 8, cloudCover: 'any' }
  },
  {
    id: '18',
    title: 'Visit a spa',
    description: 'Warm up and relax indoors',
    category: 'relaxation',
    mood: 'chill',
    icon: '🧖‍♀️',
    conditions: { maxTemp: 10, cloudCover: 'any' }
  },
  {
    id: '19',
    title: 'Indoor rock climbing',
    description: 'Stay active regardless of cold weather',
    category: 'exercise',
    mood: 'energetic',
    icon: '🧗‍♂️',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '20',
    title: 'Cooking class',
    description: 'Learn new recipes in a warm kitchen',
    category: 'social',
    mood: 'social',
    icon: '👨‍🍳',
    conditions: { cloudCover: 'any' }
  },

  // Rainy Weather Activities
  {
    id: '21',
    title: 'Visit a museum',
    description: 'Perfect indoor activity for rainy days',
    category: 'indoor',
    mood: 'chill',
    icon: '🏛️',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '22',
    title: 'Watch movies at cinema',
    description: 'Escape the rain with entertainment',
    category: 'indoor',
    mood: 'chill',
    icon: '🎬',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '23',
    title: 'Indoor shopping',
    description: 'Browse stores while staying dry',
    category: 'social',
    mood: 'social',
    icon: '🛍️',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '24',
    title: 'Bowling',
    description: 'Fun indoor activity with friends',
    category: 'social',
    mood: 'social',
    icon: '🎳',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '25',
    title: 'Library visit',
    description: 'Quiet space perfect for reading',
    category: 'indoor',
    mood: 'chill',
    icon: '📚',
    conditions: { cloudCover: 'any' }
  },

  // Windy Weather Activities
  {
    id: '26',
    title: 'Fly a kite',
    description: 'Perfect windy conditions for kite flying',
    category: 'outdoor',
    mood: 'energetic',
    icon: '🪁',
    conditions: { minTemp: 10, maxTemp: 25, minWind: 15, maxRain: 10 }
  },
  {
    id: '27',
    title: 'Sailing',
    description: 'Great winds for water sports',
    category: 'outdoor',
    mood: 'energetic',
    icon: '⛵',
    conditions: { minTemp: 15, minWind: 20, maxRain: 15 }
  },
  {
    id: '28',
    title: 'Indoor activities',
    description: 'Stay inside when it\'s too windy',
    category: 'indoor',
    mood: 'chill',
    icon: '🏠',
    conditions: { minWind: 35 }
  },

  // Sunny/Clear Weather Activities
  {
    id: '29',
    title: 'Photography walk',
    description: 'Perfect lighting for outdoor photography',
    category: 'outdoor',
    mood: 'chill',
    icon: '📸',
    conditions: { minTemp: 10, maxWind: 20, maxRain: 5, cloudCover: 'low' }
  },
  {
    id: '30',
    title: 'Outdoor festival',
    description: 'Great weather for outdoor events',
    category: 'social',
    mood: 'social',
    icon: '🎪',
    conditions: { minTemp: 18, maxWind: 25, maxRain: 10, cloudCover: 'low' }
  },
  {
    id: '31',
    title: 'Garden visit',
    description: 'Beautiful weather to enjoy nature',
    category: 'outdoor',
    mood: 'chill',
    icon: '🌸',
    conditions: { minTemp: 15, maxWind: 20, maxRain: 15, cloudCover: 'low' }
  },
  {
    id: '32',
    title: 'Outdoor dining',
    description: 'Perfect for patio restaurants',
    category: 'social',
    mood: 'social',
    icon: '🍽️',
    conditions: { minTemp: 16, maxWind: 20, maxRain: 10 }
  },

  // Exercise Activities
  {
    id: '33',
    title: 'Gym session',
    description: 'Indoor workout regardless of weather',
    category: 'exercise',
    mood: 'energetic',
    icon: '💪',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '34',
    title: 'Swimming (indoor)',
    description: 'Great exercise for any weather',
    category: 'exercise',
    mood: 'energetic',
    icon: '🏊‍♀️',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '35',
    title: 'Tennis (outdoor)',
    description: 'Perfect conditions for outdoor sports',
    category: 'exercise',
    mood: 'energetic',
    icon: '🎾',
    conditions: { minTemp: 12, maxTemp: 30, maxWind: 20, maxRain: 5 }
  },
  {
    id: '36',
    title: 'Dance class',
    description: 'Indoor activity to stay active',
    category: 'exercise',
    mood: 'energetic',
    icon: '💃',
    conditions: { cloudCover: 'any' }
  },

  // Social Activities
  {
    id: '37',
    title: 'Board game café',
    description: 'Social indoor entertainment',
    category: 'social',
    mood: 'social',
    icon: '🎲',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '38',
    title: 'Karaoke',
    description: 'Fun activity with friends',
    category: 'social',
    mood: 'social',
    icon: '🎤',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '39',
    title: 'Mini golf',
    description: 'Light outdoor activity',
    category: 'social',
    mood: 'social',
    icon: '⛳',
    conditions: { minTemp: 10, maxWind: 25, maxRain: 20 }
  },
  {
    id: '40',
    title: 'Wine tasting',
    description: 'Sophisticated indoor social activity',
    category: 'social',
    mood: 'chill',
    icon: '🍷',
    conditions: { cloudCover: 'any' }
  },

  // Relaxation Activities
  {
    id: '41',
    title: 'Beach meditation',
    description: 'Peaceful relaxation by the water',
    category: 'relaxation',
    mood: 'chill',
    icon: '🧘‍♂️',
    conditions: { minTemp: 20, maxWind: 15, maxRain: 5 }
  },
  {
    id: '42',
    title: 'Hammock reading',
    description: 'Perfect weather for outdoor relaxation',
    category: 'relaxation',
    mood: 'chill',
    icon: '🌳',
    conditions: { minTemp: 18, maxTemp: 28, maxWind: 15, maxRain: 10 }
  },
  {
    id: '43',
    title: 'Spa day',
    description: 'Indoor relaxation and self-care',
    category: 'relaxation',
    mood: 'chill',
    icon: '🛁',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '44',
    title: 'Stargazing',
    description: 'Clear skies perfect for astronomy',
    category: 'outdoor',
    mood: 'chill',
    icon: '⭐',
    conditions: { maxTemp: 25, maxWind: 15, maxRain: 5, cloudCover: 'low' }
  },

  // Seasonal/Special Weather Activities
  {
    id: '45',
    title: 'Snow activities',
    description: 'Build snowmen or have snowball fights',
    category: 'outdoor',
    mood: 'energetic',
    icon: '⛄',
    conditions: { maxTemp: 0, maxWind: 30 }
  },
  {
    id: '46',
    title: 'Cherry blossom viewing',
    description: 'Perfect spring weather for flower viewing',
    category: 'outdoor',
    mood: 'chill',
    icon: '🌸',
    conditions: { minTemp: 12, maxTemp: 22, maxWind: 20, cloudCover: 'low' }
  },
  {
    id: '47',
    title: 'Autumn leaf walk',
    description: 'Cool weather perfect for enjoying fall colors',
    category: 'outdoor',
    mood: 'chill',
    icon: '🍂',
    conditions: { minTemp: 8, maxTemp: 18, maxWind: 25 }
  },
  {
    id: '48',
    title: 'Outdoor BBQ',
    description: 'Great weather for grilling outside',
    category: 'social',
    mood: 'social',
    icon: '🔥',
    conditions: { minTemp: 18, maxWind: 20, maxRain: 10 }
  },

  // More Indoor Options
  {
    id: '49',
    title: 'Escape room',
    description: 'Challenging indoor group activity',
    category: 'social',
    mood: 'energetic',
    icon: '🔒',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '50',
    title: 'Pottery class',
    description: 'Creative indoor activity',
    category: 'indoor',
    mood: 'chill',
    icon: '🏺',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '51',
    title: 'Aquarium visit',
    description: 'Relaxing indoor attraction',
    category: 'indoor',
    mood: 'chill',
    icon: '🐠',
    conditions: { cloudCover: 'any' }
  },
  {
    id: '52',
    title: 'Concert hall',
    description: 'Indoor musical entertainment',
    category: 'social',
    mood: 'social',
    icon: '🎼',
    conditions: { cloudCover: 'any' }
  }
];

interface WeatherConditions {
  temperature: number;
  humidity: number;
  wind_speed: number;
  weather_code: number;
  uv_index: number;
  cloud_cover: number;
  precipitation_probability?: number;
}

const getCloudCoverCategory = (cloudCover: number): 'low' | 'medium' | 'high' => {
  if (cloudCover < 30) return 'low';
  if (cloudCover < 70) return 'medium';
  return 'high';
};

const getWeatherScore = (activity: Activity, conditions: WeatherConditions): number => {
  let score = 100;
  const { conditions: req } = activity;
  const precipProb = conditions.precipitation_probability || 0;
  
  // Temperature scoring
  if (req.minTemp !== undefined) {
    if (conditions.temperature < req.minTemp) {
      score -= Math.pow(req.minTemp - conditions.temperature, 2) * 2;
    }
  }
  if (req.maxTemp !== undefined) {
    if (conditions.temperature > req.maxTemp) {
      score -= Math.pow(conditions.temperature - req.maxTemp, 2) * 2;
    }
  }
  
  // Wind scoring
  if (req.maxWind !== undefined && conditions.wind_speed > req.maxWind) {
    score -= Math.pow(conditions.wind_speed - req.maxWind, 2);
  }
  
  // Min wind scoring (for activities that need wind)
  if (req.minWind !== undefined && conditions.wind_speed < req.minWind) {
    score -= Math.pow(req.minWind - conditions.wind_speed, 2);
  }
  
  // Rain scoring
  if (req.maxRain !== undefined && precipProb > req.maxRain) {
    score -= Math.pow(precipProb - req.maxRain, 2);
  }
  
  // UV scoring
  if (req.minUV !== undefined && conditions.uv_index < req.minUV) {
    score -= Math.pow(req.minUV - conditions.uv_index, 2) * 3;
  }
  if (req.maxUV !== undefined && conditions.uv_index > req.maxUV) {
    score -= Math.pow(conditions.uv_index - req.maxUV, 2) * 3;
  }
  
  // Cloud cover scoring
  if (req.cloudCover && req.cloudCover !== 'any') {
    const currentCloudCategory = getCloudCoverCategory(conditions.cloud_cover);
    if (req.cloudCover !== currentCloudCategory) {
      score -= 20;
    }
  }
  
  // Boost for wind-specific activities
  if (req.minWind && conditions.wind_speed >= req.minWind) {
    score += 20;
  }
  
  return Math.max(0, score);
};

const activityMatchesConditions = (activity: Activity, conditions: WeatherConditions): boolean => {
  return getWeatherScore(activity, conditions) > 50;
};

export const getActivityRecommendations = (
  conditions: WeatherConditions,
  mood?: 'chill' | 'energetic' | 'social',
  limit: number = 5
): Activity[] => {
  console.log('Getting activity recommendations for conditions:', conditions, 'mood:', mood);
  
  // Score all activities
  const scoredActivities = activities.map(activity => ({
    activity,
    score: getWeatherScore(activity, conditions)
  }));
  
  // Filter by mood if specified
  let filteredActivities = scoredActivities;
  if (mood) {
    filteredActivities = scoredActivities.filter(item => item.activity.mood === mood);
  }
  
  // Sort by score (best matches first)
  filteredActivities.sort((a, b) => b.score - a.score);
  
  // Take only activities with reasonable scores
  let goodActivities = filteredActivities.filter(item => item.score > 30);
  
  // If we don't have enough good activities, include some backup indoor options
  if (goodActivities.length < limit) {
    const backupActivities = activities
      .filter(activity => 
        activity.category === 'indoor' && 
        !goodActivities.some(item => item.activity.id === activity.id)
      )
      .map(activity => ({ activity, score: 40 }));
    
    goodActivities = [...goodActivities, ...backupActivities];
  }
  
  const recommendations = goodActivities.slice(0, limit).map(item => item.activity);
  console.log('Activity recommendations with scores:', goodActivities.slice(0, limit));
  
  return recommendations;
};

export type { Activity };

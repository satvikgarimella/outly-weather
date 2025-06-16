
interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    weather_code: number;
    uv_index: number;
    cloud_cover: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };
}

interface LocationData {
  latitude: number;
  longitude: number;
}

// Weather code mappings based on WMO codes
export const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return weatherCodes[code] || 'Unknown';
};

export const getWeatherIcon = (code: number): string => {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 71 && code <= 75) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌤️';
};

// Fallback location (Toronto)
const FALLBACK_LOCATION: LocationData = {
  latitude: 43.6532,
  longitude: -79.3832
};

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          console.log('Using fallback location (Toronto)');
          resolve(FALLBACK_LOCATION);
        },
        { timeout: 10000 }
      );
    } else {
      console.log('Geolocation not supported, using fallback location');
      resolve(FALLBACK_LOCATION);
    }
  });
};

export const fetchWeatherData = async (location: LocationData): Promise<WeatherData> => {
  const { latitude, longitude } = location;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,uv_index,cloud_cover&hourly=temperature_2m,weather_code,precipitation_probability&timezone=auto&forecast_days=1`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    console.log('Weather data fetched successfully:', data);
    
    return {
      current: {
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        wind_speed: data.current.wind_speed_10m,
        weather_code: data.current.weather_code,
        uv_index: data.current.uv_index || 0,
        cloud_cover: data.current.cloud_cover
      },
      hourly: {
        time: data.hourly.time.slice(0, 12), // Next 12 hours
        temperature_2m: data.hourly.temperature_2m.slice(0, 12),
        weather_code: data.hourly.weather_code.slice(0, 12),
        precipitation_probability: data.hourly.precipitation_probability.slice(0, 12)
      }
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

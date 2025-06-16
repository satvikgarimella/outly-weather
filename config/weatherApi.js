const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenMeteo API key
const BASE_URL = 'https://api.open-meteo.com/v1';

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,visibility&hourly=temperature_2m,weathercode&timezone=auto`
    );
    const data = await response.json();
    
    // Transform the data to match our expected format
    return {
      current: {
        temperature: data.current.temperature_2m,
        apparent_temperature: data.current.apparent_temperature,
        relative_humidity: data.current.relative_humidity_2m,
        weathercode: data.current.weathercode,
        windspeed: data.current.windspeed_10m,
        visibility: data.current.visibility,
      },
      hourly: data.hourly.time.map((time, index) => ({
        time,
        temperature: data.hourly.temperature_2m[index],
        weathercode: data.hourly.weathercode[index],
      })),
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const geocodePlace = async (place) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding place:', error);
    throw error;
  }
}; 
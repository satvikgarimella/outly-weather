import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './config/theme';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <HomeScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        {/* Floating color mode toggle button */}
        <MaterialCommunityIcons
          name={isDarkMode ? 'weather-night' : 'white-balance-sunny'}
          size={32}
          color={theme.colors.primary}
          style={{
            position: 'absolute',
            top: 48,
            right: 24,
            zIndex: 100,
            backgroundColor: theme.colors.surface,
            borderRadius: 24,
            padding: 8,
            elevation: 4,
          }}
          onPress={() => setIsDarkMode((d) => !d)}
        />
      </NavigationContainer>
    </PaperProvider>
  );
} 
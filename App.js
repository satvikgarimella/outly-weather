import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from './config/theme';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <HomeScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </NavigationContainer>
    </PaperProvider>
  );
} 
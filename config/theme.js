import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5EC6D9',
    secondary: '#AEE2F8',
    accent: '#FFD166',
    background: '#AEE2F8',
    surface: '#FFFFFF',
    text: '#222B45',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#5EC6D9',
    card: '#FFFFFF',
    border: '#E5E5EA',
    notification: '#FFD166',
    gradientStart: '#AEE2F8',
    gradientEnd: '#5EC6D9',
  },
  roundness: 16,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#5EC6D9',
    secondary: '#AEE2F8',
    accent: '#FFD166',
    background: '#222B45',
    surface: '#2C2C2E',
    text: '#FFFFFF',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FF9F0A',
    info: '#5EC6D9',
    card: '#2C2C2E',
    border: '#38383A',
    notification: '#FFD166',
    gradientStart: '#222B45',
    gradientEnd: '#5EC6D9',
  },
  roundness: 16,
}; 
import {DefaultTheme, DarkTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007BFF',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#333333',
    border: '#DDDDDD',
    notification: '#FF6347',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF4500',
    background: '#121212',
    card: '#1F1F1F',
    text: '#FFFFFF',
    border: '#444444',
    notification: '#FF6347',
  },
};

import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
      paddingTop: 40,
    },
    button: {
      backgroundColor: theme.buttonBackground,
      marginVertical: 8,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.15,
      shadowRadius: 2.62,
      elevation: 4,
    },
    buttonText: {
      color: theme.buttonText,
      fontWeight: '600',
      fontSize: 16,
    },
  });

export const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  buttonBackground: '#007BFF',
  buttonText: '#FFFFFF',
};

export const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  buttonBackground: '#FF5722',
  buttonText: '#FFFFFF',
};

import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: theme.textColor,
    },
    input: {
      height: 50,
      borderColor: theme.textColor,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 15,
      backgroundColor: theme.inputBackgroundColor,
      fontSize: 16,
      color: theme.inputTextColor,
    },
    button: {
      backgroundColor: theme.buttonBackgroundColor,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: theme.buttonTextColor,
      fontWeight: 'bold',
      fontSize: 16,
    },
    linkText: {
      color: theme.linkTextColor,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
    },
  });

export const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  inputBackgroundColor: '#F5F5F5',
  inputTextColor: '#000000',
  buttonBackgroundColor: '#FF5722',
  buttonTextColor: '#FFFFFF',
  linkTextColor: '#FF5722',
};

export const darkTheme = {
  backgroundColor: '#121212',
  textColor: '#FFFFFF',
  inputBackgroundColor: '#1E1E1E',
  inputTextColor: '#FFFFFF',
  buttonBackgroundColor: '#FF5722',
  buttonTextColor: '#FFFFFF',
  linkTextColor: '#FF5722',
};

import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.backgroundColor,
    },
    listItem: {
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
    },
    listItemText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    countContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    countText: {
      fontSize: 16,
      color: theme.textColor,
    },
    addButton: {
      backgroundColor: theme.buttonBackgroundColor,
      borderRadius: 15,
      padding: 5,
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: theme.buttonTextColor,
      fontSize: 16,
    },
    modalContainer: {
      width: '80%',
      backgroundColor: theme.modalBackgroundColor,
      padding: 20,
      justifyContent: 'center',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      alignSelf: 'center',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.modalOverlayColor,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.textColor,
      textAlign: 'center',
    },
    modalDescription: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.secondaryTextColor,
      textAlign: 'center',
    },
    modalDate: {
      fontSize: 14,
      marginBottom: 20,
      color: theme.secondaryTextColor,
      textAlign: 'center',
    },
    modalCounterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: theme.counterButtonBackgroundColor,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterButton: {
      backgroundColor: theme.counterButtonBackgroundColor,
      padding: 10,
      borderRadius: 5,
    },
    counterButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    counterText: {
      fontSize: 18,
      color: theme.textColor,
    },
    addButtonFloating: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: theme.floatingButtonBackgroundColor,
      borderRadius: 30,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonFloatingText: {
      color: theme.buttonTextColor,
      fontSize: 24,
    },
  });

export const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  secondaryTextColor: '#888888',
  inputBackgroundColor: '#F5F5F5',
  inputTextColor: '#000000',
  buttonBackgroundColor: '#FF5722',
  buttonTextColor: '#FFFFFF',
  modalBackgroundColor: '#FFFFFF',
  counterButtonBackgroundColor: '#FF5722',
  floatingButtonBackgroundColor: '#FF5722',
};

export const darkTheme = {
  backgroundColor: '#121212',
  textColor: '#FFFFFF',
  secondaryTextColor: '#BBBBBB',
  inputBackgroundColor: '#1E1E1E',
  inputTextColor: '#FFFFFF',
  buttonBackgroundColor: '#FF5722',
  buttonTextColor: '#FFFFFF',
  modalBackgroundColor: '#1E1E1E',
  counterButtonBackgroundColor: '#FF5722',
  floatingButtonBackgroundColor: '#FF5722',
};

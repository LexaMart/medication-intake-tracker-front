import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearSession, logout} from '../../../store/slices/auth.slice';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {AppDispatch, RootState} from '../../../store';
import {darkTheme, getStyles, lightTheme} from './styles';

export default function CustomDrawerContent({navigation}: {navigation: any}) {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const theme = useSelector((state: RootState) => state.app.theme);

  const styles = getStyles(theme ? darkTheme : lightTheme);

  const drawerWidth = Dimensions.get('window').width * 0.5;

  const handleLogout = () => {
    dispatch(clearSession());
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, {width: drawerWidth}]}>
      {isLoggedIn ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

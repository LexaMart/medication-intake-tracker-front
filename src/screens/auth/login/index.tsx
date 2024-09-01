import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store';
import {saveSession} from '../../../store/slices/auth.slice';
import {darkTheme, getStyles, lightTheme} from './styles';

export default function LoginScreen({navigation}: {navigation: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.app.theme)
    ? darkTheme
    : lightTheme;
  const styles = getStyles(theme);

  const handleLogin = () => {
    const user = {email};
    dispatch(saveSession(user));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

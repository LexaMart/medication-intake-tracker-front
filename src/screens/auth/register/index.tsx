import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store';
import {darkTheme, getStyles, lightTheme} from './styles';
import {validateEmail} from '../../../shared/utils/validateEmail';
import {registration} from '../../../store/slices/auth.slice';
import Toast from 'react-native-toast-message';

export default function RegisterScreen({navigation}: {navigation: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.app.theme)
    ? darkTheme
    : lightTheme;
  const styles = getStyles(theme);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Toast.show({
        text1: 'Validation Error.',
        text2: 'All fields are required.',
        visibilityTime: 2000,
        type: 'error',
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        text1: 'Validation Error.',
        text2: 'Please enter a valid email address.',
        visibilityTime: 2000,
        type: 'error',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        text1: 'Validation Error.',
        text2: 'Passwords do not match.',
        visibilityTime: 2000,
        type: 'error',
      });
      return;
    }

    const user = {email, password};
    dispatch(registration(user));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

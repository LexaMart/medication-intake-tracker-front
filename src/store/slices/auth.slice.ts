import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState, User} from '../../shared/dto/store.dto';
import {AppThunk} from '..';
import {loginUser, registerUser} from '../api/auth.api';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
      AsyncStorage.removeItem('token');
    },
    loadSession: (state, action: PayloadAction<User | null>) => {
      state.isLoggedIn = !!action.payload;
      state.user = action.payload;
    },
  },
});

export const {login, logout, loadSession} = authSlice.actions;

export const registration =
  (user: Omit<User, 'id'>): AppThunk =>
  async dispatch => {
    try {
      const registeredUser = await registerUser(user);
      await AsyncStorage.setItem('@user', JSON.stringify(registeredUser));
      dispatch(login(registeredUser));
      Toast.show({
        visibilityTime: 2000,
        type: 'success',
        text1: 'Registration Successful',
      });
    } catch (e) {
      Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text1: 'Registration Failed',
      });
    }
  };

export const clearSession = (): AppThunk => async dispatch => {
  try {
    await AsyncStorage.removeItem('@user');
    dispatch(logout());
  } catch (e) {
    console.error('Failed to clear session.', e);
  }
};

export const loadUserSession = (): AppThunk => async dispatch => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    const user = jsonValue ? (JSON.parse(jsonValue) as User) : null;
    dispatch(loadSession(user));
  } catch (e) {
    console.error('Failed to load session.', e);
  }
};

export const serverSignIn =
  (userDto: Omit<User, 'id'>): AppThunk =>
  async dispatch => {
    try {
      const user = await loginUser(userDto);
      if (!user) {
        Alert.alert('Provided data is wrong');
        return;
      }
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      dispatch(login(user));
      Toast.show({
        visibilityTime: 2000,
        type: 'success',
        text1: 'Login Successful',
      });
    } catch (e) {
      Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text1: 'Login Failed',
      });
    }
  };

export default authSlice.reducer;

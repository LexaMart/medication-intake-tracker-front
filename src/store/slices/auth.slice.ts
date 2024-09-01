import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState, User} from '../../shared/dto/store.dto';
import {AppDispatch, AppThunk} from '..';

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
    },
    loadSession: (state, action: PayloadAction<User | null>) => {
      state.isLoggedIn = !!action.payload;
      state.user = action.payload;
    },
  },
});

export const {login, logout, loadSession} = authSlice.actions;

export const saveSession =
  (user: User): AppThunk =>
  async dispatch => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      dispatch(login(user));
    } catch (e) {
      console.error('Failed to save session.', e);
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

export default authSlice.reducer;

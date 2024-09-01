import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from '../../shared/dto/store.dto';
import {AppDispatch} from '..';

const initialState: AppState = {
  theme: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload;
    },
  },
});

export const {setTheme} = appSlice.actions;

export default appSlice.reducer;

export const loadTheme = () => async (dispatch: AppDispatch) => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme !== null) {
      dispatch(setTheme(JSON.parse(savedTheme)));
    }
  } catch (error) {
    console.error('Failed to load theme', error);
  }
};

export const saveTheme = (theme: boolean) => async (dispatch: AppDispatch) => {
  try {
    await AsyncStorage.setItem('theme', JSON.stringify(theme));
    dispatch(setTheme(theme));
  } catch (error) {
    console.error('Failed to save theme', error);
  }
};

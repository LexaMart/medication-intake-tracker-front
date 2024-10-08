import {MedicationDto} from './../../shared/dto/medication.dto';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from '../../shared/dto/store.dto';
import {AppDispatch, AppThunk} from '..';
import {
  addMedicationApi,
  getUserMedicationApi,
  setAmountApi,
} from '../api/medication.api';
import Toast from 'react-native-toast-message';

const initialState: AppState = {
  theme: true,
  medications: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload;
    },
    setMedicationsList: (state, action: PayloadAction<MedicationDto[]>) => {
      state.medications = action.payload;
    },
    addMedications: (state, action: PayloadAction<MedicationDto>) => {
      state.medications = [...state.medications, action.payload];
    },
    updateMedication: (state, action: PayloadAction<MedicationDto>) => {
      state.medications = state.medications.map(el => {
        if (el.id == action.payload.id) {
          el = action.payload;
        }
        return el;
      });
    },
  },
});

export const {setTheme, addMedications, updateMedication, setMedicationsList} =
  appSlice.actions;

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

export const getMedicationThunk = (): AppThunk => async dispatch => {
  try {
    const response = await getUserMedicationApi();
    dispatch(setMedicationsList(response));
  } catch (error) {
    console.error('Failed to load medications', error);
  }
};

export const addMedicationThunk =
  (medication: Omit<MedicationDto, 'id'>): AppThunk =>
  async dispatch => {
    try {
      const response = await addMedicationApi(medication);
      dispatch(addMedications(response));
      Toast.show({
        visibilityTime: 2000,
        type: 'success',
        text1: 'Medication Added To The List',
      });
    } catch (error) {
      Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text1: 'Medication Addition To The List Failed',
      });
    }
  };

export const updateMedicationThunk =
  (medication: MedicationDto): AppThunk =>
  async dispatch => {
    try {
      const response = await setAmountApi(medication);
      dispatch(updateMedication(response));
    } catch (error) {
      console.error('Failed to update medication', error);
    }
  };

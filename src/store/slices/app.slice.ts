import {MedicationDto} from './../../shared/dto/medication.dto';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from '../../shared/dto/store.dto';
import {AppDispatch, AppThunk} from '..';
import {addMedicationApi, setAmountApi} from '../api/medication.api';

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

export const {setTheme, addMedications, updateMedication} = appSlice.actions;

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

export const addMedicationThunk =
  (medication: MedicationDto): AppThunk =>
  async dispatch => {
    try {
      const response = await addMedicationApi(medication);
      dispatch(addMedications(response));
    } catch (error) {}
  };

export const updateMedicationThunk =
  (medication: MedicationDto): AppThunk =>
  async dispatch => {
    try {
      const response = await setAmountApi(
        medication.amountOfIntakes,
        medication.id,
      );
      dispatch(updateMedication(response));
    } catch (error) {}
  };

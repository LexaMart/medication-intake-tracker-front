import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import appSlice from './slices/app.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

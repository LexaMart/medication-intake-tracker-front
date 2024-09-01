import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store';
import {setTheme} from '../../../store/slices/app.slice';

export default function ThemeSwitcher() {
  const theme = useSelector((state: RootState) => state.app.theme);
  const dispatch: AppDispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(!theme));
  };

  return (
    <Icon
      name={theme ? 'dark-mode' : 'light-mode'}
      size={24}
      color={theme ? '#FFFFFF' : '#000000'}
      style={{marginRight: 15}}
      onPress={toggleTheme}
    />
  );
}

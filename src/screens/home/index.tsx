import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {logout} from '../../store/slices/auth.slice';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../shared/dto/router.dto';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Root'>;

export default function HomeScreen() {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate('Auth', {screen: 'Login'});
  };

  return (
    <SafeAreaView>
      <Text style={styles.mainWrapper}>Welcome to Home Screen</Text>
      <TouchableOpacity onPress={logoutHandler}></TouchableOpacity>
    </SafeAreaView>
  );
}

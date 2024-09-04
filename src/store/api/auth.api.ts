import axios from 'axios';
import {RegisterDto} from '../../shared/dto/register.dto';
import {generateApiLink} from '../../shared/utils/generateApiLink';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ROUTE = 'auth/';

export const registerUser = async (registerBody: RegisterDto) => {
  try {
    const response = await axios.post(
      `${generateApiLink(ROUTE)}register`,
      registerBody,
    );
    const {token, ...userData} = response.data;
    await AsyncStorage.setItem('token', token);
    return userData;
  } catch (error) {
    throw new Error('Registration Failed');
  }
};

export const loginUser = async (loginBody: RegisterDto) => {
  try {
    const response = await axios.post(
      `${generateApiLink(ROUTE)}login`,
      loginBody,
    );
    const {token, ...userData} = response.data;
    await AsyncStorage.setItem('token', token);
    return userData;
  } catch (error) {
    throw new Error('Login Failed');
  }
};

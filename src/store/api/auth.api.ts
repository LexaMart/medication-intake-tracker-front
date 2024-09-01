import axios from 'axios';
import {RegisterDto} from '../../shared/dto/register.dto';
import {generateApiLink} from '../../shared/utils/generateApiLink';

const ROUTE = 'auth/';

export const registerUser = async (registerBody: RegisterDto) => {
  try {
    const response = await axios.post(
      `${generateApiLink(ROUTE)}register`,
      registerBody,
    );
    return response.data;
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
    return response.data;
  } catch (error) {
    throw new Error('Login Failed');
  }
};

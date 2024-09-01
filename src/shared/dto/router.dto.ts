import {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootDrawerParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

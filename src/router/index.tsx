import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {loadUserSession} from '../store/slices/auth.slice';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/home';
import CustomDrawerContent from './components/customDrawerContent';
import {Dimensions, useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from '../shared/themes/themes';
import ThemeSwitcher from './components/themeSwitcher';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get('window').width * 0.5,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerRight: () => <ThemeSwitcher />,
        }}
        name="Home"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
}

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerRight: () => <ThemeSwitcher />,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => <ThemeSwitcher />,
        }}
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const theme = useSelector((state: RootState) => state.app.theme);

  useEffect(() => {
    dispatch(loadUserSession());
  }, [dispatch]);

  return (
    <NavigationContainer theme={theme ? darkTheme : lightTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="Root" component={Root} />
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

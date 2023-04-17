import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainTabNavigation from './MainTabNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Loading' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Loading' component={LoadingScreen}/>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Register' component={SignUpScreen} />
      <Stack.Screen name='Main Tab Menu' component={MainTabNavigation} />
    </Stack.Navigator>
  );
}

export default RootNavigation;

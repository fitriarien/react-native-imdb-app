import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchMovieScreen from '../screens/SearchMovieScreen';
import WatchlistStackNav from './WatchlistStackNav';
import { Ionicons, MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='In Theaters' 
        component={HomeScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          tabBarIcon: () => <MaterialCommunityIcons name="movie-open-outline" size={24} color="white" />,
          tabBarLabel: 'Home',
          tabBarStyle: {backgroundColor:'#000'}
        }}
        screenOptions={{ unmountOnBlur: false }}
      />
      <Tab.Screen 
        name='Search' 
        component={SearchMovieScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="search" size={24} color="white" />,
          tabBarStyle: {backgroundColor:'#000'}
        }}
        screenOptions={{ unmountOnBlur: false }}
      />
      <Tab.Screen 
        name='Watchlist Stack' 
        component={WatchlistStackNav}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="list" size={24} color="white" />,
          tabBarStyle: {backgroundColor:'#000'},
          tabBarLabel: 'Watchlist',
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="user" size={24} color="white" />,
          tabBarStyle: {backgroundColor:'#000'},
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigation;

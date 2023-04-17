import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WatchlistScreen from '../screens/WatchlistScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';

const Stack = createNativeStackNavigator();

const WatchlistStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Watchlist' component={WatchlistScreen} />
      <Stack.Screen name='Detail' component={MovieDetailScreen} />
      <Stack.Screen name='User Reviews' component={ReviewScreen} />
    </Stack.Navigator>
  );
}

export default WatchlistStackNav;

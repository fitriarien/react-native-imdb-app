import React, { useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({navigation}) => {
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        navigation.navigate('Main Tab Menu');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({})

export default LoadingScreen;

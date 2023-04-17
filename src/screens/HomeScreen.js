import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Alert, ScrollView, Text} from 'react-native';
import { IMDbApi, apiKey } from '../util/IMDb-api';
import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  const [ movies, setMovies ] = useState([]);

  const fetchMovies = async () => {
    try {
      const { data, status } = await IMDbApi.get(`/InTheaters/${apiKey}`);
      // console.log(data.items);
      console.log(status);
      setMovies(data.items);

      if (data.errorMessage || !data.items) {
        Alert.alert("Something error while fetching!")
      }
      console.log(data.errorMessage);

    } catch (err) {
      console.log(err);
      Alert.alert(err);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} tabName='home'/>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;

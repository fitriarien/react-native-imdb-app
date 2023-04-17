import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const MovieCard = ({movie}) => {
  return (
    <View style={styles.card}>
      <View style={styles.coverArea}>
        <Image source={{uri: movie.image}} style={styles.cover}/> 
      </View>
      <View style={styles.movieInfo}>
        <Text style={[styles.info, styles.movieTitle]}>{movie.title}</Text>
        <Text style={[styles.info, styles.movieGenre]}>{movie.genres}</Text>
        <Text style={[styles.info, styles.movieReleaseDate]}>Released on {movie.releaseState}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  coverArea: {
      paddingLeft: 15
  },
  cover: {
      width: 90,
      height: 120,
      borderRadius: 2,
  },
  movieInfo: {
    paddingHorizontal: 5,
    width: '55%'
  },
  info: {
      color: 'black',
      padding: 2,
  },
  movieTitle: {
      fontSize: 16,
      fontWeight: 'bold'
  },
  movieGenre: {
      fontSize: 15
  },
  movieReleaseDate: {
      fontSize: 15
  },
})

export default MovieCard;

import React, { useState } from 'react';
import {View, StyleSheet, Text, Image, Alert} from 'react-native';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import serverApi from '../util/server-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SearchCard = ({movie}) => {
  const [ images, setImages ] = useState([]);
  const scale = useSharedValue(0);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: Math.max(scale.value, 0)}
    ]
  }));

  const addToWatchlist = async () => {
    // console.log("masuk double tap");
    const token = await AsyncStorage.getItem('token');

    try {
      // check images from server
      const { data, status } = await serverApi.get('api/imdb/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(status);
      setImages(data);

      const isListed = data.some(listedMovie => listedMovie.id_imdb === movie.id);

      if (isListed) {
        console.log("isListed : " + isListed);
        Alert.alert("Movie has been already in watchlist");
      } else {
        // post to server and run animation
        let dataToPost = {};
        if (movie.image) {
          dataToPost = {id_imdb: movie.id, image: movie.image};
        } else {
          dataToPost = {id_imdb: movie.id, image: "https://www.filmfodder.com/reviews/images/poster-not-available.jpg"}
        }
        const { data, status } = await serverApi.post('api/imdb/', dataToPost, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(status);

        if (status === 201) {
          scale.value = withSpring(1, undefined, () => {
            scale.value = withDelay(700, withSpring(0))
          })
        } else {
          throw new Error('Something went wrong!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(images);

  return (
    <GestureHandlerRootView>
      <TapGestureHandler
        maxDelayMs={250}
        numberOfTaps={2}
        onActivated={addToWatchlist}
      >
        <View style={styles.card}>
          <View style={styles.coverArea}>
            { movie.image !== ""
            ? 
              <Image source={{uri: movie.image}} style={styles.cover}/>
            :
              <Image source={require('../assets/poster-not-available.jpg')} style={styles.cover}/>
            }
            <Text style={[styles.info, styles.movieTitle]}>{movie.title}</Text> 
          </View>
          <AnimatedImage
            source={require('../assets/heart.png')}
            style={[styles.heart, heartStyle]}
            resizeMode="contain"
          />
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 5,
    alignItems: 'center',
  },
  cover: {
    width: 120,
    height: 180,
    borderRadius: 5,
    alignSelf: 'center'
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    width: 150,
    textAlign: 'center'
  },
  heart: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 1,
    marginTop: 50
  },
})

export default SearchCard;

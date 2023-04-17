import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';

const WatchlistCard = ({listedMovie, navigation}) => {

  const goToDetails = () => {
    navigation.navigate('Detail', { id: listedMovie.id_imdb })
  }

  return (
    <GestureHandlerRootView>
      <TapGestureHandler
        numberOfTaps={1}
        onActivated={goToDetails}
      >
        <View style={styles.coverArea}>
          <Image source={{uri: listedMovie.image}} style={styles.cover}/> 
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  coverArea: {
    padding: 5,
    alignItems: 'center',
  },
  cover: {
    width: 140,
    height: 210,
    borderRadius: 5,
  },
})

export default WatchlistCard;

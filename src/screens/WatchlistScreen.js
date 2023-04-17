import React, { useState, useEffect, useCallback }  from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import serverApi from '../util/server-api';
import WatchlistCard from '../components/WatchlistCard';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistScreen = ({navigation}) => {
  const [watchlists, setWatchlists] = useState([]);

  const fetchWatchlists = async () => {
    const token = await AsyncStorage.getItem('token');
    
    try {
      let { data, status } = await serverApi.get('api/imdb/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(status);
      setWatchlists(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWatchlists();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchWatchlists();
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center'}}>
        <FlatList
          data={watchlists}
          renderItem={({item}) => {
            return (
              <View style={{margin: 5}}>
                <WatchlistCard listedMovie={item} navigation={navigation}/>
              </View>
            )
          }}
          numColumns={2}
          keyExtractor={item => item.id_imdb}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
    paddingVertical: 10,
  },
})

export default WatchlistScreen;

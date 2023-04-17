import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, FlatList, Alert, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import {IMDbApi, apiKey} from '../util/IMDb-api';
import SearchCard from '../components/SearchCard';

const SearchMovieScreen = () => {
  const [ searchInput, setSearchInput ] = useState("");
  const [ movies, setMovies ] = useState([]);
  const [ isPress, setIsPress ] = useState(false);

  const fetchMovies = async (searchInput) => {
    try {
      let { status, data } = await IMDbApi.get(`/Search/${apiKey}/${searchInput}`);
      console.log(status);
      // console.log(data);
      setMovies(data.results);

      if (data.errorMessage || !data.results) {
        Alert.alert("Something error while fetching!")
      }
      console.log(data.errorMessage);

    } catch (error) {
      console.log(error);
    }
  }

  const onPressSearch = () => {
    setIsPress(true);
    setMovies([]);
    fetchMovies(searchInput);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.textInput} 
            placeholder="inception 2010"
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)} />
        </View>
        <TouchableOpacity style={styles.searchIcon} onPress={onPressSearch}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {isPress  
      ?
        <View style={styles.text}>
          <Text style={{fontSize: 16, }}>Double tap to add to your Watchlist!</Text>
        </View>
      :
        null
      }
      <View style={styles.movieList}>
        <FlatList
          data={movies}
          renderItem={({item}) => {
            return (
              <View style={{margin: 5}}>
                <SearchCard movie={item} tabName='search'/>
              </View>
            )
          }}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  searchBar: {
    flex: 2,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: 'white',
    borderTopWidth: 2,
    backgroundColor: "black"
  },
  searchIcon: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    padding: 5
  },
  textInput: {
      color: 'black',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      margin: 5,
      padding: 5,
      borderRadius: 5,
      width: 300
  },
  inputArea: {
      alignItems: 'flex-start'
  },
  movieList: {
    flex: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 2, 
    justifyContent: 'center'
  }
})

export default SearchMovieScreen;

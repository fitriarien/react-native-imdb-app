import React, { useState, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, Alert} from 'react-native';
import { IMDbApi, apiKey } from '../util/IMDb-api';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';

const MovieDetailScreen = ({navigation, route}) => {
  const { id } = route.params;
  const [ detail, setDetail ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [ starList, setStarList ] = useState([]);
  const [ genreList, setGenreList ] = useState([]);
  const [ date, setDate] = useState("");
  const releaseDate = new Date(date);
  const formattedDate = releaseDate.toLocaleDateString('en-US', { 
    day: 'numeric',
    month: 'short',
    year: 'numeric' 
  });

  const fetchDetails = async () => {
    try {
      let { data, status } = await IMDbApi.get(`/Title/${apiKey}/${id}`);
      console.log(status);
      // console.log(data);
      setDetail(data);

      if (data.errorMessage) {
        setErrorMessage(true);
        Alert.alert("Something error while fetching!")
      }
      console.log(data.errorMessage);

      setStarList(data.actorList);
      setGenreList(data.genreList);
      setDate(data.releaseDate);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetails();
    // console.log("try fetching data...");
  }, []);

  const goToReview = () => {
    // console.log("Go to Review");
    navigation.navigate('User Reviews', { id: id });
  }

  return (
    <View style={styles.detailContainer}>
      <ScrollView>
        {!errorMessage
        ?
          <View>
            <View style={styles.titleArea}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'navy'}}>{detail.title}</Text>
            </View>
            <View style={styles.topContent}>
              <View style={styles.posterArea}>
                <Image style={styles.poster} source={{uri: detail.image}}/>
              </View>
              <View style={styles.topTextContent}>
                <View style={styles.genre}>
                  {genreList && genreList.map((genre) => {
                    return (
                      <Text key={genre.key} style={styles.genreText}>{genre.value}</Text>
                    )
                  })}
                </View>
                <View style={styles.rating}>
                  <Entypo name="star" size={24} color="orange" />
                  <Text style={styles.scoreRating}>{detail.imDbRating}</Text>
                  <Text style={styles.maxRating}>/10</Text>
                </View>
              </View>
            </View>
            <View style={styles.middleContent}>
              <View>
                <View style={styles.duration}>
                  <Ionicons name="ios-time-outline" size={23} color="black" />
                  <Text style={styles.durationText}>{detail.runtimeStr}</Text>
                </View>
                <View>
                  <Text style={styles.descText}>Released on {formattedDate}</Text>
                  <Text style={styles.descText}>{detail.plot}</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomContent}>
              <View style={styles.directorsArea}>
                <Text style={styles.directors}>Director(s):</Text>
                <Text style={styles.directorsName}>{detail.directors}</Text>
              </View>
              <View style={styles.starsArea}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Stars:</Text>
                <ScrollView horizontal={true} style={styles.listStars}>
                  {starList && starList.map((star) => {
                    return (
                      <View style={styles.stars} key={star.id}>
                        <Image style={styles.starImage} source={{uri: star.image}}/>
                        <Text style={styles.starName}>{star.name}</Text>
                        <Text style={{fontSize: 15}}>as {star.asCharacter}</Text>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
            <View style={styles.buttonArea}>
              <TouchableOpacity onPress={goToReview} style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 17, textDecorationLine: 'underline', paddingHorizontal: 3}}>Review</Text>
                <AntDesign name="arrowright" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        :
          <View></View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white'
  },
  titleArea: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center'
  },
  topContent: {
    backgroundColor: 'white',
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  posterArea: {
    paddingRight: 5,
  },
  poster: {
    width: 120,
    height: 180
  },
  topTextContent: {
    paddingHorizontal: 5
  },
  genre: {
    paddingBottom: 5,
  },
  genreText: {
    fontSize: 16,
    paddingVertical: 3,
    margin: 3,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
    width: 100
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  scoreRating: {
    fontSize: 20, 
    fontWeight: 'bold', 
    justifyContent: 'center',
    paddingHorizontal: 3
  },
  maxRating: {
    fontSize: 17,
    justifyContent: 'center',
    padding: 2
  },
  middleContent: {
    backgroundColor: 'white',
    padding: 10
  },
  duration: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  durationText: {
    fontSize: 16,
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  descText: {
    fontSize: 15, 
    textAlign: 'justify',
    paddingRight: 4,
    paddingVertical: 2,
  },
  bottomContent: {
    backgroundColor: 'white',
    padding: 10,
  },
  directorsArea: {
    marginBottom: 5,
  },
  directors: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  directorsName: {
    fontSize: 17,
    marginBottom: 4,
  },
  listStars: {
    flexDirection: 'row',
    gap: 10,
  },
  stars: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  starImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    paddingVertical: 10,
    resizeMode: 'contain',
  },
  starName: {
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 5, 
    width: 120, 
    textAlign: 'center'
  },
  buttonArea: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-end',
  },
})

export default MovieDetailScreen;

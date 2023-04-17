import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import { IMDbApi, apiKey } from '../util/IMDb-api';
import ReviewCard from '../components/ReviewCard';

const ReviewScreen = ({route}) => {
  const [ reviews, setReviews ] = useState([]);
  const [ reviewItems, setreviewItems ] = useState([]);
  const { id } = route.params;

  const fetchReview = async () => {
    try {
      let { status, data } = await IMDbApi.get(`Reviews/${apiKey}/${id}`);
      console.log(status);
      setReviews(data);
      setreviewItems(data.items);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchReview();
    // console.log("try fetching data...");
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>{reviews.title}</Text>
          <Text style={styles.yearText}>({reviews.year})</Text>
        </View>
        <View style={{marginVertical: 5}}>
          {reviewItems.map((review, i) => {
            return (
              <ReviewCard key={i} review={review}/>
            )
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  titleArea: {
    marginBottom: 2,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    paddingHorizontal: 3,
    paddingTop: 5
  },
  yearText: {
    fontSize: 18,
    color: 'navy',
    paddingHorizontal: 3,
    paddingTop: 5,
  },
})

export default ReviewScreen;

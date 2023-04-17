import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const ReviewCard = ({review}) => {
  const [showFullText, setShowFullText] = useState(false);
  const fullText = review.content;
  const charCount = fullText.length;
  const maxChars = 250;
  const textToShow = showFullText ? fullText : (fullText.substring(0, maxChars) + '...');

  const toReadMore = () => {
    setShowFullText(true);
  };

  const toShowLess = () => {
    setShowFullText(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{review.title}</Text>
      <View style={styles.topText}>
        <Text style={styles.username}>{review.username}</Text>
        <Text style={styles.date}>{review.date}</Text>
      </View>
      <View style={styles.middleText}>
        { review.rate &&
          <View style={{flexDirection: 'row'}}>
            <Entypo name="star" size={22} color="orange" />
            <Text style={{fontSize: 15}}>{review.rate}/10</Text>
          </View>
        }
        { review.warningSpoilers && <Text style={styles.spoiler}>Spoiler!</Text> }        
      </View>
      <View style={styles.reviewText}>
        { charCount < maxChars 
        ?
          <Text style={styles.userReview}>{fullText}</Text>
        :
          <View>
            <Text style={styles.userReview}>{textToShow}</Text>
            {!showFullText && (
              <TouchableOpacity onPress={toReadMore}>
                <Text style={{color: 'blue', textDecorationLine: 'underline'}}>Read More</Text>
              </TouchableOpacity>
            )}
            {showFullText && (
              <TouchableOpacity onPress={toShowLess}>
                <Text style={{color: 'blue', textDecorationLine: 'underline'}}>Show Less</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f3f4',
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 15,
    color: 'blue',
    paddingVertical: 2,
  },
  date: {
    fontSize: 14,
    paddingVertical: 2
  },
  middleText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  spoiler: {
    fontSize: 15,
    color: 'red',
    paddingVertical: 2,
    margin: 3,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
    width: 75
  },
  userReview: {
    textAlign: 'justify'
  }
})

export default ReviewCard;

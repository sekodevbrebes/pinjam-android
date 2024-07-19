import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import Rating from '../Rating';

const RoomCard = ({image, name, location, rating, number, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.desc}>{location}</Text>
          <Rating number={rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    overflow: 'hidden',
    margin: 6,
  },
  image: {
    width: 200,
    height: 140,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
  },

  starContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

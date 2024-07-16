import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Rating from '../Rating';

const ListRoom = ({image, onPress, rating, name, location}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.pageContainer}>
        <Image source={image} style={styles.imagelist} />
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.desc}>{location}</Text>
            <Rating number={rating} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListRoom;

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  CardContent: {
    flexDirection: 'row',
  },
  imagecontainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imagelist: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  desc: {
    fontSize: 14,
    marginTop: 2,
    paddingBottom: 8,
  },
});

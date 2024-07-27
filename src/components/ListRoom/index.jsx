import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Rating from '../Rating';

const ListRoom = ({image, onPress, rating, name, location}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.pageContainer}>
        <FastImage
          source={image} // Gantilah 'source' dengan uri jika image berupa URL
          style={styles.imagelist}
          resizeMode={FastImage.resizeMode.cover} // Menyusun ulang mode gambar seperti 'cover'
        />
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

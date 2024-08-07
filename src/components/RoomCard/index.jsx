import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Rating from '../Rating';

const RoomCard = ({
  image,
  text = '',
  name,
  location,
  rating,
  number,
  onPress,
}) => {
  // Pastikan `text` selalu terdefinisi dan tidak null
  const isLongText = text.length > 100;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container}>
        <FastImage
          source={image} // Gantilah 'source' dengan uri jika image berupa URL
          style={[styles.image, isLongText && styles.fullWidth]}
          resizeMode={FastImage.resizeMode.cover} // Menyusun ulang mode gambar seperti 'cover'
        />

        {/* <Image
          source={image}
          style={[styles.image, isLongText && styles.fullWidth]}
        /> */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
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
  fullWidth: {
    width: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
    flexShrink: 1,
  },
  desc: {
    fontSize: 14,
    color: '#6B6B6B',
    flexShrink: 1,
  },
  starContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

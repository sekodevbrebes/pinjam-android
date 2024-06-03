import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Aula, IcStarOff, IcStarOn} from '../../assets';

const RoomCard = ({image}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Aula</Text>
        <Text style={styles.desc}>Lantai 5 KPT</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            <IcStarOn />
            <IcStarOn />
            <IcStarOn />
            <IcStarOff />
          </View>
          <Text>4.5</Text>
        </View>
      </View>
    </View>
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
    marginRight: 16,
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
  desc: {},
  starContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

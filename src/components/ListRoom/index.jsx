import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const ListRoom = ({image, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.pageContainer}>
        <View style={styles.CardContent}>
          <Image source={image} style={styles.imagelist} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Aula</Text>
            <Text style={styles.desc}>Lantai 5</Text>
            <Text style={styles.desc}>Ukuran 100 x 30</Text>
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
});

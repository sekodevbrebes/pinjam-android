import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const ListRoom = ({image, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.imagecontainer}>
        <Image source={image} style={styles.imagelist} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Aula</Text>
          <Text style={styles.desc}>Lantai 5</Text>
          <Text style={styles.desc}>Ukuran 100 x 30</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListRoom;

const styles = StyleSheet.create({
  imagecontainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
  },
  desc: {
    fontFamily: 'Poppins-regular',
    fontSize: 14,
    color: '#8D92A3',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
});

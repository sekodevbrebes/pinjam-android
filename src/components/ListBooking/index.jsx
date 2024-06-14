import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const ListBooking = ({onPress, image}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.imagecontainer}>
        <Image source={image} style={styles.imagelist} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Aula</Text>
          <Text style={styles.status}>Status : Disetujui</Text>
          <Text style={styles.date}>Rabu, 25 Juni 2024</Text>
          <Text style={styles.activity}>
            Sosialisasi Perbub No. 16 Tahun 2024 tentang Hukuman bagi ASN
            melanggar peraturan'
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListBooking;

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
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
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
  },
});

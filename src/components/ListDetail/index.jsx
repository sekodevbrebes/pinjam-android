import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Aula, RuangBupati, RuangSekda, RuangCC} from '../../assets'; // Pastikan path gambar benar
import moment from 'moment'; // Pastikan untuk menginstal moment

const {width} = Dimensions.get('window');

const ListRoom = ({
  onPress,
  name,
  tanggal,
  created_at,
  peserta,
  Activity,
  status,
  waktu_mulai,
  waktu_selesai,
}) => {
  // Array of images for the swiper
  const images = [Aula, RuangBupati, RuangSekda, RuangCC];

  // Memeriksa apakah status adalah 'Finish' dan tanggal kegiatan telah terlewati
  const formattedDate = moment(tanggal, 'dddd, DD MMMM YYYY', 'id'); // Parsing dengan format bahasa Indonesia
  const isPastActivityDate = moment().isAfter(formattedDate);

  // Log tambahan untuk debugging
  console.log('Tanggal:', tanggal);
  console.log('Formatted Date:', formattedDate.format('YYYY-MM-DD'));
  console.log('Current Date:', moment().format('YYYY-MM-DD'));
  console.log('Hasil Is Past Activity Date:', isPastActivityDate);
  console.log('Status:', status);

  return (
    <View style={styles.container}>
      {/* Swiper for images */}
      <View style={styles.imageCard}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          showPagination
          paginationStyle={styles.pagination}
          paginationActiveColor="orange"
          paginationDefaultColor="white">
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={image} style={styles.imagelist} />
            </View>
          ))}
        </SwiperFlatList>
      </View>

      {/* Card untuk teks */}
      <View style={styles.textCard}>
        <View style={styles.textRow}>
          <Text style={styles.label}>Room Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Created Date:</Text>
          <Text style={styles.value}>{created_at}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Activity Date:</Text>
          <Text style={[styles.value, styles.valueTgl]}>{tanggal}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {waktu_mulai} - {waktu_selesai} WIB
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Participants:</Text>
          <Text style={styles.value}>{peserta} People</Text>
        </View>

        <View style={styles.textRow}>
          <Text style={styles.label}>Activity:</Text>
          <Text style={styles.value} numberOfLines={0}>
            {Activity}
          </Text>
        </View>
      </View>

      {/* Tombol */}
      {status !== 'Finish' || !isPastActivityDate ? (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Cancel My Booking</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ListRoom;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 20,

    marginBottom: 10,
    alignItems: 'center',
  },
  imageCard: {
    width: width - 40,
    marginBottom: 12,
    height: 250,
  },
  slide: {
    width: width - 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagelist: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  pagination: {
    bottom: 10,
  },
  textCard: {
    width: width - 40,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3, // Adding elevation for shadow effect
    marginBottom: 12, // Adding margin bottom to separate from button
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    flex: 1,
    color: 'grey', // Change text color to grey
  },
  value: {
    fontSize: 14,
    flex: 2,
    flexWrap: 'wrap',
    textAlign: 'right',
    color: 'grey', // Change text color to grey
  },
  valueTgl: {
    color: 'green',
  },
  button: {
    width: width - 40,
    backgroundColor: 'orange', // Changed color to grey
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

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
import moment from 'moment';
import {useSelector} from 'react-redux';

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
  roomId,
}) => {
  const rooms = useSelector(state => state.home.rooms);

  const selectedRoom = rooms.find(room => room.id === roomId);
  const images = selectedRoom ? JSON.parse(selectedRoom.image || '[]') : [];

  const formattedDate = moment(tanggal, 'dddd, DD MMMM YYYY', 'id');
  const isPastActivityDate = moment().isAfter(formattedDate);

  return (
    <View style={styles.container}>
      <View style={styles.imageCard}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          showPagination
          paginationStyle={styles.pagination}
          paginationActiveColor="orange"
          paginationDefaultColor="white">
          {images.length > 0 ? (
            images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{uri: image}} style={styles.imagelist} />
              </View>
            ))
          ) : (
            <View style={styles.slide}>
              <Text>Tidak ada gambar tersedia</Text>
            </View>
          )}
        </SwiperFlatList>
      </View>

      <View style={styles.textCard}>
        <View style={styles.textRow}>
          <Text style={styles.label}>Nama Ruangan:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Tanggal Dibuat:</Text>
          <Text style={styles.value}>{created_at}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Tanggal Kegiatan:</Text>
          <Text style={[styles.value, styles.valueTgl]}>{tanggal}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Waktu:</Text>
          <Text style={styles.value}>
            {waktu_mulai} - {waktu_selesai} WIB
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Peserta:</Text>
          <Text style={styles.value}>{peserta} Orang</Text>
        </View>
        <View style={styles.textRowBottom}>
          <Text style={styles.label}>Kegiatan:</Text>
          <Text style={styles.value} numberOfLines={0}>
            {Activity}
          </Text>
        </View>
      </View>

      {status !== 'Finish' || !isPastActivityDate ? (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Batalkan Pemesanan Saya</Text>
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
    borderRadius: 10,
    overflow: 'hidden', // Agar gambar mengikuti bentuk card
  },
  slide: {
    width: width - 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagelist: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    bottom: 50, // Menempatkan pagination lebih dekat ke bagian bawah
  },
  textCard: {
    width: width - 40,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  textRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    flex: 1,
    color: 'grey',
  },
  value: {
    fontSize: 14,
    flex: 2,
    flexWrap: 'wrap',
    textAlign: 'right',
    color: 'grey',
  },
  valueTgl: {
    color: 'green',
  },
  button: {
    width: width - 40,
    backgroundColor: 'orange',
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

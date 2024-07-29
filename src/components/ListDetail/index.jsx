import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import axios from 'axios';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import moment from 'moment';
import 'moment/locale/id';
import {useSelector} from 'react-redux';
import {getData, showMessage} from '../../utilities';
import {API_HOST} from '../../config';
import TextAreaType from '../Input/textarea';
import Gap from '../Gap';
import Button from '../Button';

const {width} = Dimensions.get('window');

const ListRoom = ({
  navigation,
  name,
  tanggal,
  created_at,
  peserta,
  Activity,
  status,
  waktu_mulai,
  waktu_selesai,
  roomId,
  id,
  alasan,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');

  // Mendapatkan data ruangan dari Redux store
  const rooms = useSelector(state => state.home.rooms);
  const selectedRoom = rooms.find(room => room.id === roomId);
  const images = selectedRoom ? JSON.parse(selectedRoom.image || '[]') : [];

  // Format tanggal menggunakan moment
  const formattedDate = moment(tanggal, 'dddd, DD MMMM YYYY', 'id');
  const isPastActivityDate = moment().isAfter(formattedDate);

  // Fungsi untuk membatalkan booking dan mengirim alasan
  const onCancel = async () => {
    if (!reason) {
      showMessage('Alasan pembatalan harus diisi.', 'danger');
      return;
    }

    const data = {
      status: 'Cancelled',
      reason: reason,
    };

    try {
      const tokenData = await getData('token');
      const token = tokenData?.value;

      console.log('Token:', token);
      console.log('Data yang dikirim untuk pembatalan:', data);

      // Mengirimkan permintaan ke endpoint untuk mengubah status menggunakan metode POST
      await axios.post(
        `${API_HOST.url}/agendas/${id}/change-status`,
        {status: 'Cancelled'},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      // Mengirimkan permintaan ke endpoint untuk mengupdate alasan menggunakan metode PUT
      await axios.put(
        `${API_HOST.url}/agendas/${id}/reason`,
        {reason},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      console.log('Response:', 'Success Cancel Booking and Update Reason!');
      setModalVisible(false);

      // Pastikan navigation.reset tersedia sebelum menggunakannya
      // if (navigation && navigation.reset) {
      //   navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      // } else {
      //   console.warn('navigation.reset is not available');
      // }
    } catch (error) {
      console.log(
        'Error response cancel: ',
        error.response ? error.response.data : error.message,
      );
      showMessage('Gagal membatalkan booking dan mengupdate alasan.', 'danger');
    }
  };

  // Log reason setiap kali reason diubah
  console.log('Current Reason:', reason);

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
          <Text style={styles.label}>ID Booking:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>
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
        <View style={styles.textRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{status}</Text>
        </View>

        {/* Menampilkan alasan jika status adalah Cancelled atau Decline */}
        {(status === 'Cancelled' || status === 'Decline') && (
          <View style={styles.textRow}>
            <Text style={styles.label}>Alasan:</Text>
            <Text style={styles.value}>{alasan}</Text>
          </View>
        )}

        <View style={styles.textRowBottom}>
          <Text style={styles.label}>Kegiatan:</Text>
          <Text style={styles.value} numberOfLines={0}>
            {Activity}
          </Text>
        </View>
      </View>

      {status !== 'Finish' &&
      status !== 'Cancelled' &&
      status !== 'Decline' &&
      !isPastActivityDate ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Cancel Booking</Text>
        </TouchableOpacity>
      ) : null}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalLebar}>
              <TextAreaType
                label="Masukkan alasan pembatalan:"
                placeholder="Alasan Pembatalan"
                value={reason}
                onChangeText={setCancellationReason}
              />
            </View>

            <Gap height={12} />
            <View style={styles.modalButtons}>
              <Button
                title="Batal"
                type="secondary"
                onPress={() => setModalVisible(false)}
              />
              <Gap width={10} />
              <Button title="Kirim" type="primary" onPress={onCancel} />
            </View>
          </View>
        </View>
      </Modal>
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
    overflow: 'hidden',
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
    bottom: 50,
  },
  modalLebar: {
    width: '95%',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
  },
});

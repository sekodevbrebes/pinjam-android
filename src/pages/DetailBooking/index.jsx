import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import 'moment/locale/id'; // Import locale bahasa Indonesia
import {Header, ListDetail} from '../../components';

const DetailBooking = ({route, navigation}) => {
  const booking = route.params;

  // Format tanggal
  const formattedTanggal = moment(booking.tanggal)
    .locale('id')
    .format('dddd, D MMMM YYYY');
  const formattedCreatedAt = moment(booking.created_at)
    .locale('id')
    .format('dddd, D MMMM YYYY');

  // Format waktu
  const formattedWaktuMulai = moment(booking.waktu_mulai, 'HH:mm:ss').format(
    'HH:mm',
  );
  const formattedWaktuSelesai = moment(
    booking.waktu_selesai,
    'HH:mm:ss',
  ).format('HH:mm');

  return (
    <View>
      <Header
        title="Details"
        subTitle="Details Your Booking"
        onPress={() => navigation.goBack()}
      />
      <View>
        <ListDetail
          name={booking.room.name}
          created_at={formattedCreatedAt}
          tanggal={formattedTanggal}
          peserta={booking.peserta}
          Activity={booking.activities}
          status={booking.status}
          waktu_mulai={formattedWaktuMulai}
          waktu_selesai={formattedWaktuSelesai}
          roomId={booking.room.id}
        />
      </View>
    </View>
  );
};

export default DetailBooking;

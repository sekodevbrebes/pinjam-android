import React, {useEffect} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import ListBooking from '../ListBooking';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress, getPastBooking} from '../../redux/action';
import moment from 'moment';
import 'moment/locale/id'; // Import locale Indonesia
import {API_HOST_IMAGE} from '../../config';
import {useNavigation} from '@react-navigation/native';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 2,
      width: 0.2,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#F2F2F2',
    }}
    tabStyle={{width: 'auto'}}
    scrollEnabled={true}
    renderLabel={({route, focused}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
          paddingLeft: 16,
        }}>
        {route.title}
      </Text>
    )}
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector(state => state.bookings);

  useEffect(() => {
    dispatch(getInProgress());
  }, [dispatch]);

  useEffect(() => {}, [inProgress]);

  if (Array.isArray(InProgress)) {
  } else {
  }

  return (
    <View style={styles.page}>
      {inProgress.map(booking => {
        // Mengubah string JSON menjadi array URL gambar
        const imageArray = JSON.parse(booking.room.image);
        // Mengambil elemen pertama dari array URL gambar
        const imageURL = imageArray[0];

        // Pastikan URL gambar valid dan tidak mengandung pengulangan
        const cleanedImageURL = imageURL.split('storage/').pop(); // Mengambil bagian setelah 'storage/'

        // Menyesuaikan URL gambar dengan domain yang sesuai
        const domain = `${API_HOST_IMAGE}`;
        const fullImageURL = `${domain}/storage/${cleanedImageURL}`;

        // Mengubah format tanggal
        const formattedDate = moment(booking.tanggal)
          .locale('id')
          .format('dddd, D MMMM YYYY');

        // Mengubah format waktu
        const formattedWaktuMulai = booking.waktu_mulai.slice(0, 5); // Mengambil bagian jam dan menit
        const formattedWaktuSelesai = booking.waktu_selesai.slice(0, 5); // Mengambil bagian jam dan menit

        return (
          <View style={styles.cardContainer} key={booking.id}>
            <ListBooking
              name={booking.room.name}
              tanggal={formattedDate}
              // waktu_mulai={formattedWaktuMulai}
              // waktu_selesai={formattedWaktuSelesai}
              image={{uri: fullImageURL}}
              activities={booking.activities}
              status={booking.status}
              user={booking.user.name}
              onPress={() => navigation.navigate('DetailBooking', booking)}
            />
          </View>
        );
      })}
    </View>
  );
};

const PastBooking = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastBookings} = useSelector(state => state.bookings);

  useEffect(() => {
    dispatch(getPastBooking());
  }, [dispatch]);

  useEffect(() => {
    console.log('State InProgress setelah update:', pastBookings); // Log state setelah update
  }, [pastBookings]);

  if (Array.isArray(InProgress)) {
    console.log('pastBookings adalah array:', pastBookings);
  } else {
    console.log('pastBookings bukan array');
  }

  return (
    <View style={styles.page}>
      {pastBookings.map(booking => {
        // Mengubah string JSON menjadi array URL gambar
        const imageArray = JSON.parse(booking.room.image);
        // Mengambil elemen pertama dari array URL gambar
        const imageURL = imageArray[0];

        // Pastikan URL gambar valid dan tidak mengandung pengulangan
        const cleanedImageURL = imageURL.split('storage/').pop(); // Mengambil bagian setelah 'storage/'

        // Menyesuaikan URL gambar dengan domain yang sesuai
        const domain = `${API_HOST_IMAGE}`;
        const fullImageURL = `${domain}/storage/${cleanedImageURL}`;

        console.log('dapat gambar :', fullImageURL);

        // Mengubah format tanggal
        const formattedDate = moment(booking.tanggal)
          .locale('id')
          .format('dddd, D MMMM YYYY');

        return (
          <View style={styles.cardContainer} key={booking.id}>
            <ListBooking
              name={booking.room.name}
              tanggal={formattedDate}
              image={{uri: fullImageURL}}
              activities={booking.activities}
              status={booking.status}
              user={booking.user.name}
              onPress={() => navigation.navigate('DetailBooking', booking)}
            />
          </View>
        );
      })}
    </View>
  );
};

const renderScene = SceneMap({
  1: InProgress,
  2: PastBooking,
});

const BookingTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'InProgress'},
    {key: '2', title: 'Past Booking'},
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default BookingTab;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 12, // Menambahkan padding atas pada halaman
  },
  cardContainer: {
    marginBottom: 10, // Menambahkan margin bawah pada setiap kartu
  },
});

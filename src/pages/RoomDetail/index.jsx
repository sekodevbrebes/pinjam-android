import React, {useEffect} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Rating from '../../components/Rating';
import {Gap, SlideShow, Button} from '../../components';
import {getData} from '../../utilities';

// Komponen DetailRuangan menerima props navigation dan route
const DetailRuangan = ({navigation, route}) => {
  // Mengambil parameter itemRoom dari route.params
  const {itemRoom} = route.params;
  // Destructuring itemRoom untuk mendapatkan detail ruangan
  const {name, location, capacity, facility, image, rate} = itemRoom;

  // Parsing URL gambar dari string JSON menjadi array
  const images = JSON.parse(image);

  // Mengubah string fasilitas menjadi array dengan memisahkan berdasarkan tag <li>
  const facilitiesArray = facility
    .replace(/<\/?ol>/g, '') // Menghapus tag <ol> dan </ol>
    .split('</li><li>') // Memisahkan berdasarkan tag </li><li>
    .map(item => item.replace(/<\/?li>/g, '')); // Menghapus tag <li> dan </li>

  // Console log untuk menampilkan nilai params di console
  console.log('Nilai Param : ', itemRoom);

  useEffect(() => {
    // Mengambil data 'userProfile' saat komponen dimount
    getData('userProfile').then(response => {
      console.log('Profile : ', response);
    });
  }, []);

  const onBooking = () => {
    // Menyiapkan data untuk proses booking
    getData('userProfile')
      .then(userProfile => {
        const data = {
          item: {
            name: name,
          },
          userProfile, // Menyertakan userProfile yang telah diambil
        };

        console.log('Data for Booking : ', data);
        // Di sini Anda dapat melanjutkan logika booking dengan menggunakan data

        navigation.navigate('Agenda', data);
      })
      .catch(error => {
        console.error('Error fetching userProfile: ', error);
        // Menghandle kasus jika pengambilan data userProfile gagal
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.container}>
          {/* Menampilkan gambar-gambar dalam swiper dengan autoplay */}
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={0}
            showPagination>
            {images.map((imgUrl, index) => (
              // Menggunakan komponen SlideShow untuk menampilkan gambar
              <SlideShow key={index} image={{uri: imgUrl}} />
            ))}
          </SwiperFlatList>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View>
              {/* Menampilkan nama ruangan */}
              <Text style={styles.title}>{name}</Text>
              {/* Menampilkan rating ruangan */}
              <Rating number={rate} />
            </View>
            <Gap height={12} />
            <View>
              {/* Menampilkan lokasi ruangan */}
              <Text style={styles.subTitle}>Location </Text>
              <Text>{location}</Text>
            </View>
            <Gap height={12} />
            <View>
              {/* Menampilkan kapasitas ruangan */}
              <Text style={styles.subTitle}>Capacity</Text>
              <Text>{capacity} orang</Text>
            </View>
            <Gap height={12} />
            <View>
              {/* Menampilkan fasilitas ruangan dalam bentuk list item berangkaian */}
              <Text style={styles.subTitle}>Facility :</Text>
              <View style={styles.listFacility}>
                {facilitiesArray.map((facility, index) => (
                  // Menampilkan setiap fasilitas dengan nomor urut
                  <Text key={index} style={styles.facilityItem}>
                    {index + 1}. {facility}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={{paddingHorizontal: 40}}>
            {/* Tombol untuk melakukan booking yang mengarahkan ke halaman Agenda */}
            <Button title="Book Now" type="primary" onPress={onBooking} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailRuangan;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'semi-bold',
  },
  listFacility: {
    margin: 14,
    paddingBottom: 24,
  },
  facilityItem: {
    marginBottom: 4, // Menambahkan jarak antar baris
  },
});

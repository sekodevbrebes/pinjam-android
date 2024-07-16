import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {Aula, ProfilUser, RuangBupati, RuangCC, RuangSekda} from '../../assets';
import RoomCard from '../../components/RoomCard';
import {Gap, HomeTab} from '../../components';
import HomeProfile from '../../components/HomeProfile';
import {setLoading} from '../../redux/reducers/globalSlice';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setHome} from '../../redux/reducers/homeSlice'; // Import action setHome
import {API_HOST} from '../../config';

const Home = ({navigation}) => {
  const dispatch = useDispatch(); // Ditambahkan
  const rooms = useSelector(state => state.home.rooms); // Ditambahkan
  // const isLoading = useSelector(state => state.global.isLoading); // Ditambahkan

  useEffect(() => {
    dispatch(setLoading({isLoading: true}));
    axios
      .get(`${API_HOST.url}/rooms`)
      .then(response => {
        console.log('response tampil room :', response.data.data);
        const data = response.data.data;
        dispatch(setHome(data)); // Mengirim data ke Redux state
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoading(false)); // Set loading menjadi false setelah fetch data selesai
      });
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.roomCardContainer}>
              {/* Mapping data 'rooms' untuk menampilkan RoomCard */}
              {rooms.map(itemRoom => {
                // const cleanImage = itemRoom.image.replace(/["[\]\\]/g, '');
                // Parsing array URL gambar dan mengambil URL gambar pertama
                const imageArray = JSON.parse(itemRoom.image); // Mengubah string JSON menjadi array
                const firstImage = imageArray[0]; // Mengambil elemen pertama dari array URL gambar

                return (
                  <RoomCard
                    key={itemRoom.id}
                    name={itemRoom.name}
                    location={itemRoom.location}
                    image={{uri: firstImage}}
                    rating={itemRoom.rate}
                    onPress={() =>
                      navigation.navigate('RoomDetail', {itemRoom})
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.pageTab}>
          <HomeTab />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  roomCardContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  halo: {
    fontSize: 18,
    fontFamily: 'Poppins-medium',
    color: '#020202',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-medium',
    color: '#020202',
  },
  instansi: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
  profil: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
});

import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import RoomCard from '../../components/RoomCard';
import {HomeTab} from '../../components';
import HomeProfile from '../../components/HomeProfile';
import {setLoading} from '../../redux/reducers/globalSlice';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setHome} from '../../redux/reducers/homeSlice';
import {API_HOST} from '../../config';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.home.rooms);

  useEffect(() => {
    dispatch(setLoading({isLoading: true}));
    axios
      .get(`${API_HOST.url}/rooms`)
      .then(response => {
        const data = response.data.data;
        dispatch(setHome(data));
      })
      .catch(error => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.roomCardContainer}>
              {rooms.map(itemRoom => {
                const imageArray = JSON.parse(itemRoom.image);
                const firstImage = imageArray[0];

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

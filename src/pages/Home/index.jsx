import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {Aula, ProfilUser, RuangBupati, RuangCC, RuangSekda} from '../../assets';
import RoomCard from '../../components/RoomCard';
import {Gap, HomeTab} from '../../components';
import HomeProfile from '../../components/HomeProfile';

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.roomCardContainer}>
              <RoomCard image={Aula} />
              <RoomCard image={RuangSekda} />
              <RoomCard image={RuangBupati} />
              <RoomCard image={RuangCC} />
              <RoomCard image={Aula} />
              <RoomCard image={RuangBupati} />
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

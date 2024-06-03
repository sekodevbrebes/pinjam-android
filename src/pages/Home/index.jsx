import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {Aula, ProfilUser, RuangBupati, RuangCC, RuangSekda} from '../../assets';
import RoomCard from '../../components/RoomCard';
import {Gap} from '../../components';

const Home = () => {
  return (
    <View>
      <View style={styles.profilContainer}>
        <Image source={ProfilUser} style={styles.profil} />
        <View>
          <Text style={styles.halo}>
            Halo, <Text style={styles.name}>Sus Hardianto</Text>
          </Text>
          <Text style={styles.instansi}>DP3KB Kabupaten Brebes</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.roomCardContainer}>
          <Gap width={16} />
          <RoomCard image={Aula} />
          <RoomCard image={RuangSekda} />
          <RoomCard image={RuangBupati} />
          <RoomCard image={RuangCC} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  profilContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  roomCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
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

import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {ProfilUser} from '../../assets';

const HomeProfile = () => {
  return (
    <View style={styles.profilContainer}>
      <Image source={ProfilUser} style={styles.profil} />
      <View>
        <Text style={styles.halo}>
          Halo, <Text style={styles.name}>Sus Hardianto</Text>
        </Text>
        <Text style={styles.instansi}>DP3KB Kabupaten Brebes</Text>
      </View>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profilContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  tabContainer: {
    flex: 1,
  },
  roomCardContainer: {
    flexDirection: 'row',
    marginVertical: 16,
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {ProfilUser} from '../../assets';
import {getData} from '../../utilities';

const HomeProfile = () => {
  const [photo, setphoto] = useState(ProfilUser);
  const [name, setName] = useState('');
  const [instansi, setInstansi] = useState('');

  useEffect(() => {
    getData('userProfile').then(response => {
      console.log('Hasil Local Storate', response);
      setName(response.name);
      setInstansi(response.instansi);
      // Get user's profile picture from API or database
      // fetch('https://randomuser.me/api/?gender=female')
      //   .then(response => response.json())
      //   .then(data => setphoto(data.profile_picture))
      //   .catch(error => console.error('Error:', error));
    });
  }, []);
  return (
    <View style={styles.profilContainer}>
      <Image source={ProfilUser} style={styles.profil} />
      <View>
        <Text style={styles.halo}>
          Halo, <Text style={styles.name}>{name}</Text>
        </Text>
        <Text style={styles.instansi}>{instansi}</Text>
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

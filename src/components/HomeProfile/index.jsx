import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {getData} from '../../utilities';
import {ProfilUser} from '../../assets';

const HomeProfile = () => {
  const [photo, setPhoto] = useState(ProfilUser); //mau disesuaikan lagi
  const [name, setName] = useState('');
  const [instansi, setInstansi] = useState('');

  useEffect(() => {
    getData('userProfile').then(response => {
      console.log('Hasil Local Storage', response);
      setName(response.name);
      setInstansi(response.instansi);
      setPhoto({uri: response.image});
    });
  }, []);

  return (
    <View style={styles.profilContainer}>
      {/* Gambar mau disesuaikan biar dinamis */}
      <Image source={photo} style={styles.profil} />
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

import React, {useEffect} from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';
import {BgFlash, LogoFlash} from '../../assets';
import {getData} from '../../utilities';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('token').then(response => {
        console.log('Masih ada Token :', response);
        if (response) {
          // Mengatur ulang stack navigasi untuk memastikan pengguna tidak dapat kembali
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
        } else {
          // Menggantikan layar saat ini dengan 'GetStarted' sehingga pengguna tidak dapat kembali
          navigation.replace('GetStarted');
        }
      });
    }, 1000);
  }, []);

  return (
    <ImageBackground source={BgFlash} style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} source={LogoFlash} />
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

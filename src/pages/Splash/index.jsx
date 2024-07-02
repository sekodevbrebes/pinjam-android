import React, {useEffect} from 'react';
import {View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import {BgFlash, Logo, LogoFlash} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 2500);
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontColor: '#000000',
    marginTop: 10,
    textAlign: 'center',
  },
});

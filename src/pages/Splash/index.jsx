import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Logo} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9736',
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontColor: '#000000',
    marginTop: 10,
    textAlign: 'center',
  },
});

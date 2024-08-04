import React from 'react';
import {Text, View, Image, StyleSheet, ImageBackground} from 'react-native';
import {BgStarted, Logo} from '../../assets';
import {Button} from '../../components';

const GetStarted = ({navigation}) => {
  return (
    <ImageBackground source={BgStarted} style={styles.page}>
      <View>
        <Image style={styles.image} source={Logo} />
        <Text style={styles.subtitle}>
          ( Sistem Ketersediaan Pinjam Tempat )
        </Text>
        <Text style={styles.subtitle}>Mudah, Cepat dan Akurat</Text>
      </View>
      <View>
        <Button
          title="Get Started"
          type="primary"
          onPress={() => navigation.navigate('SignUp')}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <View style={{height: 20}} />
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('SigIn')}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 24,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 70,
    paddingTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    paddingBottom: 150,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5733',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
});

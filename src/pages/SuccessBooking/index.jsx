import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SuccessBook} from '../../assets';
import {Button, Gap} from '../../components';

const SuccessBooking = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <View>
        <Image source={SuccessBook} style={styles.image} />
        <Text style={styles.title}>Success Booking</Text>
        <Text style={styles.desc}>
          Please wait a moment, we will review your application
        </Text>
      </View>
      <Gap height={42} />
      <View style={styles.footerButton}>
        <Button
          title="Your Booking"
          type="primary"
          onPress={() => navigation.replace('MainApp', {screen: 'Booking'})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  image: {
    width: 235,
    height: 235,
    alignSelf: 'center',
    marginTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    color: '#64B5D7',
    fontFamily: 'Poppins-bold',
  },
  desc: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Poppins-bold',
  },
  footerButton: {
    paddingHorizontal: 20,
  },
});

export default SuccessBooking;

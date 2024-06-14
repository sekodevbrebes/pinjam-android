import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Gap} from '../../components';
import {EmptyImg} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const EmptyBooking = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.pageContainer}>
      <View>
        <Image source={EmptyImg} style={styles.image} />
        <Text style={styles.title}>Empty Booking</Text>
        <Text style={styles.desc}>Please Apply for Borrowing a Place</Text>
      </View>
      <Gap height={42} />
      <View style={styles.footerButton}>
        <Button
          title="Find Room"
          type="primary"
          onPress={() => navigation.replace('MainApp')}
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
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    color: '#FF9736',
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

export default EmptyBooking;

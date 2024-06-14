import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BookingTab} from '../../components';

const Booking = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Your Booking</Text>
          <Text style={styles.subTitle}>
            This is a list of your submissions
          </Text>
        </View>
      </View>
      <View style={styles.pageTab}>
        <BookingTab />
      </View>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#020202',
  },
  pageTab: {
    flex: 1,
    paddingTop: 16,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
});

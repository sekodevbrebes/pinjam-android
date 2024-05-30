import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Booking = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Booking Page</Text>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9736',
  },
  title: {
    fontFamily: 'Poppins-bold',
    fontSize: 32,
    color: '#172B4D',
  },
});

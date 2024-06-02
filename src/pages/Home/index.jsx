import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Home = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Home Page</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poppins-bold',
    fontSize: 32,
    color: '#172B4D',
  },
});

import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="green" />
    <Text style={styles.text}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
});

export default memo(Loading);

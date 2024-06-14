import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICNext} from '../../assets';

const ListAccount = ({name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <ICNext />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'Poppins-regular',
    fontSize: 14,
    color: 'grey',
  },
});

export default ListAccount;

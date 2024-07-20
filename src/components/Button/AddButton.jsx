import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const AddButton = ({onPress}) => (
  <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
    <Text style={styles.iconPlus}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'orange',
    borderRadius: 30,
    elevation: 8,
    zIndex: 1000,
  },
  iconPlus: {
    fontSize: 24,
    color: '#FFF',
  },
});

export default AddButton;

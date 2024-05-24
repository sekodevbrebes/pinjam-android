import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const InputType = ({label, placeholder}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
};

export default InputType;

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F2F3F7',
    borderColor: '#D3D5E4',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
});

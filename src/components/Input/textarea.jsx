import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const TextAreaType = ({label, placeholder, ...rest}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        multiline={true}
        {...rest}
      />
    </View>
  );
};

export default TextAreaType;

const styles = StyleSheet.create({
  input: {
    minHeight: 100, // Ubah tinggi minimal sesuai kebutuhan
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F2F3F7',
    borderColor: '#D3D5E4',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    textAlignVertical: 'top', // Mengatur posisi teks agar berada di bagian atas textarea
    color: 'grey',
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
});

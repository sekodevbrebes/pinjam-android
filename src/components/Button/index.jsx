import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IconOnly from './iconOnly';

const Button = ({type, title, onPress, icon, style}) => {
  if (type === 'icon-only') {
    return (
      <IconOnly
        icon={icon}
        onPress={onPress}
        style={{backgroundColor: 'red'}}
      />
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.container(type), style]}>
        <Text style={styles.text(type)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'primary'
        ? 'orange'
        : type === 'danger'
        ? '#00BFFF'
        : type === 'tertiary'
        ? '#FFFFFF'
        : '#F0F0F0', // Tipe 'tertiary' dengan background putih
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: type => ({
    color: type === 'primary' || type === 'danger' ? 'white' : '#000000', // Teks hitam untuk 'tertiary'
    fontSize: 16,
  }),
});

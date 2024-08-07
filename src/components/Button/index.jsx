import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IconOnly from './iconOnly';

const Button = ({type, title, onPress, icon}) => {
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
      <View style={styles.container(type)}>
        <Text style={styles.text(type)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'primary' ? 'orange' : type === 'danger' ? '#00BFFF' : '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: type => ({
    color:
      type === 'primary' ? 'white' : type === 'danger' ? 'white' : '#000000',
    fontSize: 16,
  }),
});

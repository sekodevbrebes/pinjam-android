import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BackButton, BackButtonLight} from '../../assets';

const IconOnly = ({onPress, icon}) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <BackButton />;
    }
    if (icon === 'back-light') {
      return <BackButtonLight />;
    }
    return <BackButton />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon />
      </View>
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

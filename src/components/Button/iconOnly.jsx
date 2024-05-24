import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BackButton} from '../../assets';

const IconOnly = ({onPress, icon}) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <BackButton />;
    }
    if (icon === 'back-light') {
      return <BackButton />;
    }
    return <BackButton />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({});

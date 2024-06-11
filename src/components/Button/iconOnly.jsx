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
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({});

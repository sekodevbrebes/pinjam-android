import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NumericFormat} from 'react-number-format';

const Number = ({number}) => {
  return (
    <NumericFormat
      value={number}
      displayType="text"
      renderText={value => <Text>{value}</Text>}
      decimalSeparator="."
      type="text"
      decimalScale={1}
      fixedDecimalScale
    />
  );
};

const styles = StyleSheet.create({});

export default Number;

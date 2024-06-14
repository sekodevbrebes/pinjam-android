import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BackButton} from '../../assets/icon';
import Button from '../Button';

const Header = ({title, subTitle, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Button type="icon-only" onPress={onPress} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Poppins-medium',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: '#8D92A3',
  },
  back: {
    padding: 20,
    paddingLeft: -20,
  },
});

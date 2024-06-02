import React from 'react';
import {
  IcBookingOff,
  IcBookingOn,
  IcHomeOff,
  IcHomeOn,
  IcProfileOff,
  IcProfileOn,
} from '../../assets';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    switch (title) {
      case 'Home':
        return active ? <IcHomeOn /> : <IcHomeOff />;
      case 'Booking':
        return active ? <IcBookingOn /> : <IcBookingOff />;
      case 'Profile':
        return active ? <IcProfileOn /> : <IcProfileOff />;
      default:
        return <IcHomeOn />;
    }
  };

  //   const Icon = () => {
  //     if (title === 'Home') {
  //       <IcHomeOn />;
  //     } else {
  //       <IcHomeOff />;
  //     }
  //     if (title === 'Booking') {
  //       return active ? <IcBookingOn /> : <IcBookingOff />;
  //     }
  //     if (title === 'Profile') {
  //       return active ? <IcProfileOn /> : <IcProfileOff />;
  //     }
  //     return <IcHomeOn />;
  //   };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: active => ({
    fontFamily: 'Poppins-bold',
    fontSize: 16,
    marginTop: 5,
    color: active ? 'white' : '#FAD3CA',
  }),
});

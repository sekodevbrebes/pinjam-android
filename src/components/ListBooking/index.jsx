import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const ListBooking = ({
  onPress,
  image,
  name,
  tanggal,
  activities,
  status,
  user,
}) => {
  const getStatusStyle = status => {
    switch (status) {
      case 'Pending':
        return styles.statusPending;
      case 'Accept':
        return styles.statusAccept;
      case 'Decline':
        return styles.statusDecline;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.imagecontainer}>
        <Image source={image} style={styles.imagelist} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.statusContainer}>
            <Text>Status: </Text>
            <Text style={[styles.status, getStatusStyle(status)]}>
              {status}
            </Text>
          </View>
          <Text style={styles.date}>{tanggal}</Text>
          <Text style={styles.activity}>{activities}</Text>
          <Text style={styles.activity}>{user}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListBooking;

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
  },
  imagecontainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imagelist: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#808080',
  },
  status: {
    fontSize: 14,
  },
  statusPending: {
    color: 'orange',
  },
  statusAccept: {
    color: 'green',
  },
  statusDecline: {
    color: 'red',
  },
  statusCancelled: {
    color: 'blue',
  },
  statusDefault: {
    color: 'black',
  },
});

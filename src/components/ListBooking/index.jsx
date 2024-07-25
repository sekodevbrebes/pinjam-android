import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const ListBooking = ({
  onPress,
  image,
  name,
  tanggal,
  activities,
  status,
  waktu_mulai,
  waktu_selesai,
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
      case 'Finish': // Tambahkan case baru untuk status 'Finish'
        return styles.statusFinish;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.card}>
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
            {/* <Text style={styles.date}>
              {waktu_mulai} - {waktu_selesai} WIB
            </Text> */}
            <Text style={styles.activity}>{activities}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListBooking;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginVertical: 6,
    marginHorizontal: 16,
    padding: 12,
  },
  imagecontainer: {
    flexDirection: 'row',
  },
  imagelist: {
    width: 100,
    height: 100,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#fd46c7', // Perbaiki kode warna dari '##fd46c7' menjadi '#fd46c7'
  },
  statusFinish: {
    color: '#465dfd', // Tambahkan warna ungu untuk status 'Finish'
  },
  statusDefault: {
    color: 'black',
  },
  date: {
    fontSize: 14,
    color: '#8D92A3',
  },
  activity: {
    fontSize: 14,
    fontFamily: 'Poppin-regular',
    fontStyle: 'italic',
    color: '#8D92A3',
  },
  user: {
    fontSize: 14,
    color: '#8D92A3',
  },
});

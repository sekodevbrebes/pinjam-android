import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IceUsers, ICTime} from '../../assets';
import {formatTime} from '../../utilities';

const AgendaItem = ({agenda, onPress}) => {
  return (
    <TouchableOpacity style={styles.agendaItem} onPress={onPress}>
      <View style={styles.timeContainer}>
        <ICTime />
        <Text style={styles.time}>
          {formatTime(agenda.waktu_mulai)} - {formatTime(agenda.waktu_selesai)}{' '}
          WIB
        </Text>
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.activity}>{agenda.activities}</Text>
        <Text style={styles.peminjam}>
          Instansi {agenda.user?.instansi || 'Instansi tidak ditemukan'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  agendaItem: {
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor : '#f0f0f0'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    paddingLeft: 14,
    fontWeight:'bold'
  },
  activityContainer: {
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  activity: {
    fontFamily: 'Poppins-Regular',
        lineHeight: 24,
    fontSize: 16,
    fontWeight:'bold'
  },
  peminjam: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
  
  },
});

export default AgendaItem;

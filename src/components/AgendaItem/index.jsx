import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ICTime} from '../../assets';
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
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    paddingLeft: 14,
  },
  activityContainer: {
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  activity: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    lineHeight: 24,
  },
  peminjam: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    textDecorationLine: 'underline',
  },
});

export default AgendaItem;

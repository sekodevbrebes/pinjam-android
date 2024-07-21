import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ICTime} from '../../assets';

const AgendaList = ({selectedDate, agendaData, item}) => (
  <View style={styles.agendaContainer}>
    <Text style={styles.agendaTitle}>Room : {item.name}</Text>
    {agendaData[selectedDate].map((agenda, index) => (
      <View key={index} style={styles.agendaItem}>
        <View style={styles.timeContainer}>
          <ICTime />
          <Text style={styles.time}>
            {agenda.waktu_mulai} - {agenda.waktu_selesai}
          </Text>
        </View>
        <View style={styles.activityContainer}>
          <Text style={styles.activity}>{agenda.activities}</Text>
          {/* <Text style={styles.peminjam}>{agenda.user.instansi}</Text> */}
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  agendaContainer: {
    padding: 20,
  },
  agendaTitle: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    textAlign: 'center',
  },
  agendaItem: {
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  activity: {
    fontFamily: 'Poppins-Regular',
    color: '#222B45',
  },
  peminjam: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityContainer: {
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    paddingLeft: 14,
  },
});

export default AgendaList;

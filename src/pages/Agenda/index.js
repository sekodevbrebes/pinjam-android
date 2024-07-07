import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Button, Header} from '../../components';
import {ICTime} from '../../assets';

const initialAgendaData = {
  '2024-06-10': [
    {
      startTime: '07:00',
      endTime: '16:00',
      activity: 'Sosialisasi Produk Hukum bagi Pelaku UMKM di Kab. Brebes',
      peminjam: 'Bagian Hukum Setda Kabupaten Brebes',
    },
  ],
  '2024-06-11': [
    {
      startTime: '10:00',
      endTime: '11:00',
      activity:
        'Sosialisasi Perbub No. 16 Tahun 2024 tentang Hukuman bagi ASN melanggar peraturan',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
    {
      startTime: '14:00',
      endTime: '15:00',
      activity:
        'Pengajian Akbar dan Halal Bihalal Pegawai di Lingkungan Setda Kab. Brebes',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
    {
      startTime: '18:00',
      endTime: '22:00',
      activity:
        'Pengajian Akbar dan Halal Bihalal Pegawai di Lingkungan Setda Kab. Brebes',
      peminjam: 'Bagian Kesra Setda Kab. Brebes',
    },
  ],
  '2024-06-14': [
    {
      startTime: '09:30',
      endTime: '10:30',
      activity: 'Project Planning',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
    {
      startTime: '13:00',
      endTime: '14:00',
      activity: 'Lunch Break',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
  ],
  '2024-06-25': [
    {
      startTime: '09:30',
      endTime: '10:30',
      activity: 'Project Planning',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
    {
      startTime: '13:00',
      endTime: '14:00',
      activity: 'Lunch Break',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
  ],
  '2024-06-28': [
    {
      startTime: '09:30',
      endTime: '10:30',
      activity: 'Project Planning',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
    {
      startTime: '13:00',
      endTime: '14:00',
      activity: 'Lunch Break',
      peminjam: 'DP3KB Kabupaten Brebes',
    },
  ],
  '2024-07-02': [
    {
      startTime: '09:30',
      endTime: '10:30',
      activity: 'Project Planning',
      peminjamin: 'DP3KB Kabupaten Brebes',
    },
    {
      startTime: '13:00',
      endTime: '14:00',
      activity: 'Lunch Break',
      peminjamin: 'DP3KB Kabupaten Brebes',
    },
  ],
};

const AgendaCalendar = ({navigation}) => {
  const [agendaData, setAgendaData] = useState(initialAgendaData);
  const [selectedDate, setSelectedDate] = useState('');
  const [newAgenda, setNewAgenda] = useState({
    startTime: '',
    endTime: '',
    activity: '',
    peminjamin: '',
  });

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const handleAddAgenda = () => {
    const updatedAgenda = {...agendaData};
    if (!updatedAgenda[selectedDate]) {
      updatedAgenda[selectedDate] = [];
    }
    updatedAgenda[selectedDate].push(newAgenda);
    setAgendaData(updatedAgenda);
    setNewAgenda({startTime: '', endTime: '', activity: '', peminjamin: ''});
  };

  const markedDates = {};
  for (const date in agendaData) {
    markedDates[date] = {marked: true, selected: true, selectedColor: '#64B5D7'};
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          title="Date"
          subTitle="Select Date"
          onPress={() => navigation.goBack()}
        />
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          style={{marginTop: 14}}
        />
        {selectedDate && !agendaData[selectedDate] && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              Add New : {selectedDate}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Start Time"
              value={newAgenda.startTime}
              onChangeText={text =>
                setNewAgenda({...newAgenda, startTime: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="End Time"
              value={newAgenda.endTime}
              onChangeText={text => setNewAgenda({...newAgenda, endTime: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Activity"
              value={newAgenda.activity}
              onChangeText={text =>
                setNewAgenda({...newAgenda, activity: text})
              }
            />
            <Button title="Submit" type="primary" onPress={() => navigation.navigate('SuccessBooking')} />      
            {/* <Button title="Submit" type="primary" onPress={handleAddAgenda} /> */}
          </View>
        )}
        {selectedDate && agendaData[selectedDate] && (
          <View style={styles.agendaContainer}>
            <Text style={styles.agendaTitle}>Agenda : {selectedDate}</Text>
            {agendaData[selectedDate].map((item, index) => (
              <View key={index} style={styles.agendaItem}>
                <View style={styles.timeContainer}>
                  <ICTime />
                  <Text style={styles.time}>
                    {item.startTime} - {item.endTime}
                  </Text>
                </View>
                <View style={styles.activityContainer}>
                  <Text style={styles.activity}>{item.activity}</Text>
                  <Text style={styles.peminjam}>{item.peminjam}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor:'#fff',
  },
  agendaContainer: {
    padding: 20,
  },
  agendaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    backgroundColor:'#FFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
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

export default AgendaCalendar;

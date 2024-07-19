import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import axios from 'axios';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
import { Button, Header } from '../../components';
import { ICTime } from '../../assets';
import { setLoading } from '../../redux/reducers/globalSlice';
import '../../config/Calender';
import { API_HOST } from '../../config';
import { getData, ShowMessage } from '../../utilities';

const { width } = Dimensions.get('window');

const AgendaCalendar = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item } = route.params; // Ruangan yang dipilih
  const [agendaData, setAgendaData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [newAgenda, setNewAgenda] = useState({
    startTime: '',
    endTime: '',
    activity: '',
    peminjam: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAgendaData = async () => {
      try {
        dispatch(setLoading({ isLoading: true }));
        const tokenData = await getData('token');
        const token = tokenData?.value;

        const response = await axios.get(`${API_HOST.url}/agendas`, {
          headers: {
            Authorization: token,
          },
        });

        console.log('Room ID yang dipilih:', item.id); // Tambahkan log di sini
        
        console.log('Data agenda dari API:', response.data.data); // Cetak data dari API
        const data = response.data.data;

        // Filter data berdasarkan room_id yang dipilih
        const filteredData = data.filter(agenda => agenda.room_id === item.id);
        console.log('Data agenda setelah filter:', filteredData); // Cetak data setelah filter

        // Format data sesuai dengan tanggal
        const formattedData = filteredData.reduce((acc, agenda) => {
          const date = agenda.tanggal; // Perhatikan perubahan dari `date` menjadi `tanggal`
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(agenda);
          return acc;
        }, {});

        console.log('Data agenda yang sudah diformat:', formattedData); // Cetak data setelah diformat

        setAgendaData(formattedData); // Mengatur data ke state lokal
      } catch (error) {
        console.log(error);
        ShowMessage('Failed to load agenda data', 'danger');
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    };

    fetchAgendaData();
  }, [dispatch, item.id]); // Pastikan item.id terdeteksi jika terjadi perubahan

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const handleAddAgenda = () => {
    const updatedAgenda = { ...agendaData };
    if (!updatedAgenda[selectedDate]) {
      updatedAgenda[selectedDate] = [];
    }
    updatedAgenda[selectedDate].push(newAgenda);
    setAgendaData(updatedAgenda);
    setNewAgenda({ startTime: '', endTime: '', activity: '', peminjam: '' });
    setModalVisible(false);
  };

  const markedDates = {};
  for (const date in agendaData) {
    markedDates[date] = { marked: true, selected: true, selectedColor: 'orange' };
  }

  if (selectedDate !== '') {
    markedDates[selectedDate] = { marked: true, selected: true, selectedColor: '#08CDFE' };
  }

  return (
    <View style={{ flex: 1 }}>
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
            style={{ marginTop: 14 }}
          />
          {!agendaData[selectedDate] && (
            <View style={styles.noAgendaContainer}>
              <Text style={styles.noAgendaText}>There is no agenda for today's date.</Text>
            </View>
          )}
          {selectedDate && agendaData[selectedDate] && (
            <View style={styles.agendaContainer}>
              <Text style={styles.agendaTitle}>Room : {item.name}</Text>
              {agendaData[selectedDate].map((agenda, index) => (
                <View key={index} style={styles.agendaItem}>
                  <View style={styles.timeContainer}>
                    <ICTime />
                    <Text style={styles.time}>{agenda.waktu_mulai} - {agenda.waktu_selesai}</Text>
                  </View>
                  <View style={styles.activityContainer}>
                    <Text style={styles.activity}>{agenda.activities}</Text>
                    <Text style={styles.peminjam}>{agenda.user.instansi}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.iconPlus}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.formTitle}>
              Add New
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Start Time"
              value={newAgenda.startTime}
              onChangeText={text =>
                setNewAgenda({ ...newAgenda, startTime: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="End Time"
              value={newAgenda.endTime}
              onChangeText={text => setNewAgenda({ ...newAgenda, endTime: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Activity"
              value={newAgenda.activity}
              onChangeText={text =>
                setNewAgenda({ ...newAgenda, activity: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Peminjam"
              value={newAgenda.peminjam}
              onChangeText={text =>
                setNewAgenda({ ...newAgenda, peminjam: text })
              }
            />
            <Button title="Submit" type="primary" onPress={handleAddAgenda} />
            <Button title="Cancel" type="secondary" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noAgendaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noAgendaText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  agendaContainer: {
    padding: 20,
  },
  agendaTitle: {
    fontSize: 14,
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
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'orange',
    borderRadius: 30,
    elevation: 8,
    zIndex: 1000,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width - 40,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 10,
  },
  formTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
    fontFamily: 'Poppins-Regular',
  },
  iconPlus: {
    fontSize: 24,
    color: '#FFF',
  },
});

export default AgendaCalendar;

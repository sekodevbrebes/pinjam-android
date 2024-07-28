import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';
import {useDispatch} from 'react-redux';
import {
  AddButton,
  AgendaList,
  AgendaModal,
  Header,
  NoAgenda,
} from '../../components';
import {setLoading} from '../../redux/reducers/globalSlice';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utilities';
import useForm from '../../utilities/useForm';
import moment from 'moment';

const {width} = Dimensions.get('window');

const AgendaCalendar = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {item} = route.params;
  const [agendaData, setAgendaData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [form, setForm] = useForm({
    tanggal: '',
    waktu_mulai: '',
    waktu_selesai: '',
    peserta: '',
    activities: '',
    room_id: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [today, setToday] = useState('');

  const fetchAgendaData = useCallback(async () => {
    try {
      dispatch(setLoading({isLoading: true}));
      const tokenData = await getData('token');
      const token = tokenData?.value;

      const response = await axios.get(
        `${API_HOST.url}/agendas?status=Pending,Accept&all_users=true`,
        {
          headers: {Authorization: token},
        },
      );

      const data = response.data.data;
      const filteredData = data.filter(agenda => agenda.room_id === item.id);

      // Sort the filtered data by waktu_mulai in ascending order
      filteredData.sort((a, b) =>
        moment(a.waktu_mulai, 'HH:mm').diff(moment(b.waktu_mulai, 'HH:mm')),
      );

      const formattedData = filteredData.reduce((acc, agenda) => {
        const date = agenda.tanggal;
        if (!acc[date]) acc[date] = [];
        acc[date].push({
          ...agenda,
          status: isPastDate(agenda.tanggal) ? 'Finish' : agenda.status,
        });
        return acc;
      }, {});

      setAgendaData(formattedData);

      const todayDate = new Date()
        .toLocaleDateString('id-ID', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('/')
        .reverse()
        .join('-');
      setToday(todayDate);

      if (!selectedDate) setSelectedDate(todayDate);
    } catch (error) {
      showMessage('Failed to load agenda data', 'danger');
    } finally {
      dispatch(setLoading({isLoading: false}));
    }
  }, [dispatch, item.id, selectedDate]);

  useEffect(() => {
    fetchAgendaData();
  }, [fetchAgendaData]);

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    setForm('tanggal', day.dateString);
  };

  const handleOpenModal = () => {
    setForm('room_id', item.id);
    setModalVisible(true);
  };

  const handleAddAgenda = async () => {
    try {
      if (
        !form.waktu_mulai ||
        !form.waktu_selesai ||
        !form.activities ||
        !form.peserta
      ) {
        showMessage('All fields are required', 'danger');
        return;
      }

      const formattedStartTime = moment(form.waktu_mulai, 'HH:mm').format(
        'HH:mm:ss',
      );
      const formattedEndTime = moment(form.waktu_selesai, 'HH:mm').format(
        'HH:mm:ss',
      );

      dispatch(setLoading({isLoading: true}));
      const tokenData = await getData('token');
      const token = tokenData?.value;

      const response = await axios.post(
        `${API_HOST.url}/agendas`,
        {
          ...form,
          room_id: item.id,
          tanggal: selectedDate,
          waktu_mulai: formattedStartTime,
          waktu_selesai: formattedEndTime,
        },
        {
          headers: {Authorization: token},
        },
      );

      const updatedAgenda = {...agendaData};
      if (!updatedAgenda[selectedDate]) updatedAgenda[selectedDate] = [];
      updatedAgenda[selectedDate].push({
        ...form,
        waktu_mulai: formattedStartTime,
        waktu_selesai: formattedEndTime,
      });

      // Sort the updated agenda by waktu_mulai in ascending order
      updatedAgenda[selectedDate].sort((a, b) =>
        moment(a.waktu_mulai, 'HH:mm').diff(moment(b.waktu_mulai, 'HH:mm')),
      );

      setAgendaData(updatedAgenda);

      navigation.replace('SuccessBooking');
    } catch (error) {
      showMessage(
        error.response?.data?.message || 'Error adding agenda',
        'danger',
        5000,
      );
    } finally {
      dispatch(setLoading({isLoading: false}));
      setModalVisible(false);
    }
  };

  const markedDates = {};
  for (const date in agendaData) {
    markedDates[date] = {marked: true, selected: true, selectedColor: 'grey'};
  }

  if (selectedDate) {
    markedDates[selectedDate] = {
      marked: true,
      selected: true,
      selectedColor: '#08CDFE',
    };
  }

  if (today) {
    markedDates[today] = {...markedDates[today], dotColor: 'white'};
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Header
            title="Date"
            subTitle="Select Date"
            onPress={() => navigation.goBack()}
          />
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            style={styles.calendar}
          />
          {!agendaData[selectedDate] && <NoAgenda />}
          {selectedDate && agendaData[selectedDate] && (
            <AgendaList
              selectedDate={selectedDate}
              agendaData={agendaData}
              item={item}
            />
          )}
        </View>
      </ScrollView>
      <AddButton onPress={handleOpenModal} />
      <AgendaModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        form={form}
        setForm={(name, value) => setForm(name, value)}
        onSubmit={handleAddAgenda}
      />
    </View>
  );
};

const isPastDate = date => {
  const today = moment().startOf('day');
  const agendaDate = moment(date);
  return agendaDate.isBefore(today);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  calendar: {
    marginTop: 14,
  },
});

export default AgendaCalendar;

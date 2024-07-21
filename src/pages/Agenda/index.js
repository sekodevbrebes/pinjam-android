import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
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
import {getData, ShowMessage} from '../../utilities';
import '../../config/Calender';
import useForm from '../../utilities/useForm';

const {width} = Dimensions.get('window');

const AgendaCalendar = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {item} = route.params; // Mendapatkan data ruangan yang dipilih dari route params
  const [agendaData, setAgendaData] = useState({}); // State untuk menyimpan data agenda
  const [selectedDate, setSelectedDate] = useState(''); // State untuk menyimpan tanggal yang dipilih
  const [form, setForm] = useForm({
    tanggal: '',
    waktu_mulai: '',
    waktu_selesai: '',
    peserta: '',
    activities: '',
    room_id: '',
  });

  // State untuk menyimpan data agenda baru
  const [modalVisible, setModalVisible] = useState(false); // State untuk mengatur visibilitas modal
  const [today, setToday] = useState(''); // State untuk tanggal hari ini

  // Effect untuk mengambil data agenda saat komponen dimuat
  useEffect(() => {
    const fetchAgendaData = async () => {
      try {
        dispatch(setLoading({isLoading: true})); // Mengaktifkan loading
        const tokenData = await getData('token'); // Mengambil token dari storage
        const token = tokenData?.value;

        // Mengambil data agenda dari API
        const response = await axios.get(`${API_HOST.url}/agendas`, {
          headers: {
            Authorization: token,
          },
        });

        // Harus dihapus nanti
        console.log('Room ID yang dipilih:', item.id); // Log ID ruangan yang dipilih
        console.log('Data agenda dari API:', response.data.data); // Log data agenda dari API
        const data = response.data.data;

        // Filter data berdasarkan room_id yang dipilih
        const filteredData = data.filter(agenda => agenda.room_id === item.id);
        console.log('Data agenda setelah filter:', filteredData); // Log data agenda setelah filter

        // Format data sesuai dengan tanggal
        const formattedData = filteredData.reduce((acc, agenda) => {
          const date = agenda.tanggal; // Perhatikan perubahan dari `date` menjadi `tanggal`
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(agenda);
          return acc;
        }, {});

        console.log('Data agenda yang sudah diformat:', formattedData); // Log data agenda setelah diformat

        setAgendaData(formattedData); // Mengatur data ke state lokal

        // Menetapkan tanggal hari ini
        const todayDate = new Date()
          .toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .split('/')
          .reverse()
          .join('-'); // Mengubah format menjadi YYYY-MM-DD
        console.log('Tanggal hari ini:', todayDate); // Log untuk memastikan `todayDate` benar
        setToday(todayDate);

        // Mengatur tanggal yang dipilih ke hari ini jika belum ada yang dipilih
        if (!selectedDate) {
          setSelectedDate(todayDate);
        }
      } catch (error) {
        console.log(error);
        ShowMessage('Failed to load agenda data', 'danger'); // Menampilkan pesan error jika gagal memuat data
      } finally {
        dispatch(setLoading({isLoading: false})); // Mematikan loading
      }
    };

    fetchAgendaData(); // Memanggil fungsi untuk mengambil data
  }, [dispatch, item.id]); // Dependencies: fetch ulang jika dispatch atau item.id berubah

  // Fungsi untuk menangani klik pada hari tertentu di kalender
  const handleDayPress = day => {
    setSelectedDate(day.dateString); // Mengatur tanggal yang dipilih
    //Harus di Hapus
    console.log('Tanggal yang dipilih:', day.dateString); // Log tanggal yang dipilih
    setForm('tanggal', day.dateString); // Mengatur tanggal ke form
  };

    // Fungsi untuk membuka modal dan mengatur room_id ke dalam form
    const handleOpenModal = () => {
      setForm('room_id', item.id); // Mengatur room_id ke dalam form
      setModalVisible(true);
    };
  

  const handleAddAgenda = () => {
    console.log('Isi Form Input : ', form);
  };
  // Fungsi untuk menambah agenda baru
  // const handleAddAgenda = async () => {
  //   // Validasi data agenda baru
  //   if (
  //     !newAgenda.startTime ||
  //     !newAgenda.endTime ||
  //     !newAgenda.activity ||
  //     !newAgenda.peserta
  //   ) {
  //     ShowMessage('All fields are required', 'danger');
  //     return;
  //   }

  //   try {
  //     dispatch(setLoading({isLoading: true})); // Mengaktifkan loading
  //     const tokenData = await getData('token'); // Mengambil token dari storage
  //     const token = tokenData?.value;

  //     // Kirimkan data agenda baru ke server
  //     await axios.post(
  //       `${API_HOST.url}/agendas`,
  //       {
  //         ...newAgenda,
  //         room_id: item.id,
  //         tanggal: selectedDate,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       },
  //     );

  //     // Update state dengan agenda baru
  //     const updatedAgenda = {...agendaData};
  //     if (!updatedAgenda[selectedDate]) {
  //       updatedAgenda[selectedDate] = [];
  //     }
  //     updatedAgenda[selectedDate].push(newAgenda); // Menambahkan agenda baru ke tanggal yang dipilih
  //     setAgendaData(updatedAgenda); // Mengatur agenda data yang diperbarui

  //     ShowMessage('Agenda added successfully', 'success'); // Menampilkan pesan sukses
  //   } catch (error) {
  //     console.log(error);
  //     ShowMessage('Failed to add agenda', 'danger'); // Menampilkan pesan error jika gagal menambah agenda
  //   } finally {
  //     dispatch(setLoading({isLoading: false})); // Mematikan loading
  //     setNewAgenda({startTime: '', endTime: '', activity: '', peserta: ''}); // Mengatur ulang data agenda baru
  //     setModalVisible(false); // Menutup modal
  //   }
  // };

  // Menandai tanggal-tanggal yang memiliki agenda
  const markedDates = {};
  for (const date in agendaData) {
    markedDates[date] = {marked: true, selected: true, selectedColor: 'orange'};
  }

  // Menandai tanggal yang sedang dipilih
  if (selectedDate !== '') {
    markedDates[selectedDate] = {
      marked: true,
      selected: true,
      selectedColor: '#08CDFE',
    };
  }

  // Menandai tanggal hari ini
  if (today) {
    markedDates[today] = {
      ...markedDates[today],
      dotColor: 'white', // Menambahkan titik berwarna merah pada tanggal hari ini
    };
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1}}>
          {/* Header dengan judul dan tombol kembali */}
          <Header
            title="Date"
            subTitle="Select Date"
            onPress={() => navigation.goBack()}
          />
          {/* Kalender untuk memilih tanggal */}
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            style={{marginTop: 14}}
          />
          {/* Menampilkan pesan jika tidak ada agenda untuk tanggal yang dipilih */}
          {!agendaData[selectedDate] && <NoAgenda />}
          {/* Menampilkan daftar agenda jika ada agenda untuk tanggal yang dipilih */}
          {selectedDate && agendaData[selectedDate] && (
            <AgendaList
              selectedDate={selectedDate}
              agendaData={agendaData}
              item={item}
            />
          )}
        </View>
      </ScrollView>

      {/* Tombol untuk membuka modal tambah agenda */}
      {/* <AddButton onPress={() => setModalVisible(true)} /> */}
      <AddButton onPress={handleOpenModal} />

      {/* Modal untuk menambah agenda baru */}
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

export default AgendaCalendar;

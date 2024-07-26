import axios from 'axios';
import { getData } from '../../utilities';
import { API_HOST } from '../../config';
import { setBookings, setInProgress, setPastBookings } from '../reducers/bookingSlice';
import { showMessage } from '../../utilities'; // Misalnya, jika Anda memiliki utilitas showMessage

export const getBooking = () => dispatch => {
  getData('token').then(resToken => {
    axios
      .get(`${API_HOST.url}/agendas`, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(response => {
        const sortedData = response.data.data.sort((a, b) => b.id - a.id); // Urutan dari id terbesar ke terkecil
        dispatch(setBookings(sortedData));
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        showMessage('Terjadi kesalahan saat mengambil data booking. Silakan coba lagi nanti.'); // Menampilkan notifikasi kepada pengguna
      });
  });
};

export const getInProgress = () => dispatch => {
  getData('token').then(resToken => {
    const pendingRequest = axios.get(`${API_HOST.url}/agendas?status=Pending`, {
      headers: {
        Authorization: resToken.value,
      },
    });

    const acceptRequest = axios.get(`${API_HOST.url}/agendas?status=Accept`, {
      headers: {
        Authorization: resToken.value,
      },
    });

    axios
      .all([pendingRequest, acceptRequest])
      .then(
        axios.spread((pendingResponse, acceptResponse) => {
          const pendingData = Array.isArray(pendingResponse.data.data) ? pendingResponse.data.data : [];
          const acceptData = Array.isArray(acceptResponse.data.data) ? acceptResponse.data.data : [];

          const now = new Date(); // Waktu saat ini

          // Filter data Accept berdasarkan tanggal booking dan waktu_mulai/waktu_selesai
          const filteredAcceptData = acceptData.filter(item => {
            const bookingDate = new Date(item.tanggal);
            const waktuMulai = new Date(`${item.tanggal}T${item.waktu_mulai}`);
            const waktuSelesai = new Date(`${item.tanggal}T${item.waktu_selesai}`);
            // Periksa jika booking sedang berlangsung
            if (bookingDate.toDateString() === now.toDateString() && now >= waktuMulai && now <= waktuSelesai) {
              item.status = 'Ongoing'; // Ubah status menjadi Ongoing
            }
            return bookingDate >= now; // Hanya menyertakan booking yang belum lewat
          });

          // Gabungkan data dan urutkan
          const combinedData = [...pendingData, ...filteredAcceptData].sort((a, b) => b.id - a.id); // Urutan dari id terbesar ke terkecil
          dispatch(setInProgress(combinedData)); // Dispatch dengan payload dari API
        }),
      )
      .catch(err => {
        console.error('Error fetching in-progress bookings:', err);
        showMessage('Terjadi kesalahan saat mengambil data booking yang sedang diproses. Silakan coba lagi nanti.'); // Menampilkan notifikasi kepada pengguna
      });
  });
};


export const getPastBooking = () => dispatch => {
  getData('token').then(resToken => {
    const cancelledRequest = axios.get(`${API_HOST.url}/agendas?status=Cancelled`, {
      headers: {
        Authorization: resToken.value,
      },
    });

    const declineRequest = axios.get(`${API_HOST.url}/agendas?status=Decline`, {
      headers: {
        Authorization: resToken.value,
      },
    });

    const acceptRequest = axios.get(`${API_HOST.url}/agendas?status=Accept`, {
      headers: {
        Authorization: resToken.value,
      },
    });

    axios
      .all([cancelledRequest, declineRequest, acceptRequest])
      .then(
        axios.spread((cancelledResponse, declineResponse, acceptResponse) => {
          const cancelledData = Array.isArray(cancelledResponse.data.data) ? cancelledResponse.data.data : [];
          const declineData = Array.isArray(declineResponse.data.data) ? declineResponse.data.data : [];
          const acceptData = Array.isArray(acceptResponse.data.data) ? acceptResponse.data.data : [];

          console.log('Cancelled Data:', cancelledData);
          console.log('Decline Data:', declineData);
          console.log('Accept Data:', acceptData);

          const today = new Date(); // Tanggal hari ini

          // Filter data Accept berdasarkan tanggal booking
          const pastAcceptData = acceptData.filter(item => {
            const bookingDate = new Date(item.tanggal); // Menggunakan field tanggal
            return bookingDate < today; // Menyertakan booking yang sudah lewat
          });

          console.log('Past Accept Data:', pastAcceptData);

          // Gabungkan data dan ubah status Accept menjadi Finish untuk display
          const combinedData = [
            ...cancelledData,
            ...declineData,
            ...pastAcceptData.map(item => ({ ...item, status: 'Finish' })) // Ubah status menjadi Finish untuk tampilan
          ].sort((a, b) => b.id - a.id); // Urutan dari id terbesar ke terkecil

          console.log('Combined Data:', combinedData);

          dispatch(setPastBookings(combinedData)); // Dispatch dengan payload dari API
        }),
      )
      .catch(err => {
        console.error('Error fetching past bookings:', err);
        showMessage('Terjadi kesalahan saat mengambil data booking yang sudah lewat. Silakan coba lagi nanti.'); // Menampilkan notifikasi kepada pengguna
      });
  });
};

import axios from 'axios';
import {getData} from '../../utilities';
import {API_HOST} from '../../config';
import {
  setBookings,
  setInProgress,
  setPastBookings,
} from '../reducers/bookingSlice';
import {showMessage} from '../../utilities'; 

export const getBooking = () => dispatch => {
  getData('token').then(resToken => {
    axios
      .get(`${API_HOST.url}/agendas`, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(response => {
        const sortedData = response.data.data.sort((a, b) => b.id - a.id);
        dispatch(setBookings(sortedData));
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        showMessage(
          'Terjadi kesalahan saat mengambil data booking. Silakan coba lagi nanti.',
        ); 
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
          const pendingData = Array.isArray(pendingResponse.data.data)
            ? pendingResponse.data.data
            : [];
          const acceptData = Array.isArray(acceptResponse.data.data)
            ? acceptResponse.data.data
            : [];

          const now = new Date();

          const filteredAcceptData = acceptData.filter(item => {
            const bookingDate = new Date(item.tanggal);
            const waktuMulai = new Date(`${item.tanggal}T${item.waktu_mulai}`);
            const waktuSelesai = new Date(
              `${item.tanggal}T${item.waktu_selesai}`,
            );
  
            if (
              bookingDate.toDateString() === now.toDateString() &&
              now >= waktuMulai &&
              now <= waktuSelesai
            ) {
              item.status = 'Ongoing'; 
            }
            return bookingDate >= now; 
          });
    
          const combinedData = [...pendingData, ...filteredAcceptData].sort(
            (a, b) => b.id - a.id,
          ); 
          dispatch(setInProgress(combinedData));
        }),
      )
      .catch(err => {
        console.error('Error fetching in-progress bookings:', err);
        showMessage(
          'Terjadi kesalahan saat mengambil data booking yang sedang diproses. Silakan coba lagi nanti.',
        );
      });
  });
};

export const getPastBooking = () => dispatch => {
  getData('token').then(resToken => {
    const cancelledRequest = axios.get(
      `${API_HOST.url}/agendas?status=Cancelled`,
      {
        headers: {
          Authorization: resToken.value,
        },
      },
    );

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
          const cancelledData = Array.isArray(cancelledResponse.data.data)
            ? cancelledResponse.data.data
            : [];
          const declineData = Array.isArray(declineResponse.data.data)
            ? declineResponse.data.data
            : [];
          const acceptData = Array.isArray(acceptResponse.data.data)
            ? acceptResponse.data.data
            : [];

          const today = new Date(); 

          const pastAcceptData = acceptData.filter(item => {
            const bookingDate = new Date(item.tanggal);
            return bookingDate < today; 
          });

          const combinedData = [
            ...cancelledData,
            ...declineData,
            ...pastAcceptData.map(item => ({...item, status: 'Finish'})), 
          ].sort((a, b) => b.id - a.id); 
          dispatch(setPastBookings(combinedData)); 
        }),
      )
      .catch(err => {
        console.error('Error fetching past bookings:', err);
        showMessage(
          'Terjadi kesalahan saat mengambil data booking yang sudah lewat. Silakan coba lagi nanti.',
        ); 
      });
  });
};

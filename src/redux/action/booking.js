import axios from 'axios';
import { getData } from '../../utilities';
import { API_HOST } from '../../config';
import { setBookings, setInProgress, setPastBookings } from '../reducers/bookingSlice';

export const getBooking = () => dispatch => {
  getData('token').then(resToken => {
    axios
      .get(`${API_HOST.url}/agendas`, {
        headers: {
          Authorization: resToken.value,
        },
      })
      .then(response => {
        console.log('Data Booking dari API :', response.data);
        const sortedData = response.data.data.sort((a, b) => b.id - a.id); // Urutan dari id terbesar ke terkecil
        dispatch(setBookings(sortedData));
      })
      .catch(err => {
        console.log('Error Get Booking :', err);
      });
  });
};

// Aksi untuk mendapatkan booking dengan status "InProgress"
export const getInProgress = () => dispatch => {
  getData('token').then(resToken => {
    console.log('Token:', resToken.value); // Log token sebelum request

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
          console.log('Data dari API sebelum dispatch:', pendingResponse.data, acceptResponse.data); // Log data dari kedua API sebelum dispatch
          const pendingData = Array.isArray(pendingResponse.data.data) ? pendingResponse.data.data : [];
          const acceptData = Array.isArray(acceptResponse.data.data) ? acceptResponse.data.data : [];
          const combinedData = [...pendingData, ...acceptData].sort((a, b) => b.id - a.id); // Urutan dari id terbesar ke terkecil
          console.log('Data yang akan didispatch:', combinedData); // Log data yang akan didispatch
          dispatch(setInProgress(combinedData)); // Dispatch dengan payload dari API
        }),
      )
      .catch(err => {
        console.log('Error Get In Progress:', err);
      });
  });
};

export const getPastBooking = () => dispatch => {
  getData('token').then(resToken => {
    console.log('Token:', resToken.value); // Log token sebelum request

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

    axios
      .all([cancelledRequest, declineRequest])
      .then(
        axios.spread((cancelledResponse, declineResponse) => {
          console.log('Data API Cancelled Booking:', cancelledResponse.data);
          console.log('Data API Decline Booking:', declineResponse.data);

          const cancelledData = Array.isArray(cancelledResponse.data.data) ? cancelledResponse.data.data : [];
          const declineData = Array.isArray(declineResponse.data.data) ? declineResponse.data.data : [];
          const combinedData = [...cancelledData, ...declineData].sort((a, b) => b.id - a.id); // Urutan dari id terbesar ke terkecil

          console.log('Data yang akan didispatch:', combinedData); // Log data yang akan didispatch
          dispatch(setPastBookings(combinedData)); // Dispatch dengan payload dari API
        }),
      )
      .catch(err => {
        console.log('Error Get Past Booking:', err);
      });
  });
};

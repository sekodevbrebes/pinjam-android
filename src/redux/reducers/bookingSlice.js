import { createSlice } from '@reduxjs/toolkit';

// Inisialisasi state awal
const initialState = {
  bookings: [],
  inProgress: [],
  pastBookings: [],
};

// Membuat slice untuk state 'booking'
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // Reducer untuk mengubah state 'booking'
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    // Reducer untuk mengubah state 'inProgress'
    setInProgress: (state, action) => {
      console.log('Payload diterima di reducer:', action.payload); // Log payload diterima di reducer
      state.inProgress = Array.isArray(action.payload) ? action.payload : [];
    },
    // Reducer untuk mengubah state 'pastBookings'
    setPastBookings(state, action) {
      state.pastBookings = action.payload;
    },
  },
});

// Ekspor actions
export const { setPendingBooking, setBookings, setInProgress, setPastBookings } = bookingSlice.actions;

// Ekspor reducer dari slice 'booking'
export default bookingSlice.reducer;

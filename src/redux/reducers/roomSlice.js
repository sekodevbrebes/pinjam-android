import { createSlice } from '@reduxjs/toolkit';

// Inisialisasi state awal
const initialState = {
  rooms: [],
  popularRooms: [],
  recommendedRooms: [],
  loading: false,
  error: null,
  page: 1,
};

// Membuat slice untuk state 'rooms'
const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // Reducer untuk memulai permintaan
    fetchRoomsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    // Reducer untuk menyimpan data ruangan yang berhasil diambil
    fetchRoomsSuccess(state, action) {
      const { rooms, page, type } = action.payload;
      state.loading = false;
      if (type === 'Popular') {
        state.popularRooms = page === 1 ? rooms : [...state.popularRooms, ...rooms];
      } else if (type === 'Recommended') {
        state.recommendedRooms = page === 1 ? rooms : [...state.recommendedRooms, ...rooms];
      } else {
        state.rooms = page === 1 ? rooms : [...state.rooms, ...rooms];
      }
      state.page = page;
    },
    // Reducer untuk menangani kesalahan
    fetchRoomsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Ekspor actions
export const { fetchRoomsRequest, fetchRoomsSuccess, fetchRoomsFailure } = roomSlice.actions;

// Ekspor reducer dari slice 'rooms'
export default roomSlice.reducer;

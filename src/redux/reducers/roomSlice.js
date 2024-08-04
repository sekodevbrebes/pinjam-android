import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  popularRooms: [],
  recommendedRooms: [],
  loading: false,
  error: null,
  page: 1,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    fetchRoomsRequest(state) {
      state.loading = true;
      state.error = null;
    },
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
    fetchRoomsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRoomsRequest, fetchRoomsSuccess, fetchRoomsFailure } = roomSlice.actions;
export default roomSlice.reducer;

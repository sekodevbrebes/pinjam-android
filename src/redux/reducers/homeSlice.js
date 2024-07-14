import { createSlice } from '@reduxjs/toolkit';

// Inisialisasi state awal
const initialState = {
    rooms: []
};

// Membuat slice untuk state 'home'
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // Reducer untuk mengubah state 'room'
    setHome(state, action) {
      state.rooms = action.payload;
    },
  },
});

// Ekspor action 'setHome'
export const { setHome } = homeSlice.actions;

// Ekspor reducer dari slice 'home'
export default homeSlice.reducer;

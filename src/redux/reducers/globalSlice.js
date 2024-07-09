// reducers/globalSlice.js
import { createSlice } from '@reduxjs/toolkit';

// State awal untuk slice global
const initialState = {
  isError: true,
  message: 'Error',
  isLoading: false, // Tambahkan state awal untuk isLoading
};

// Membuat slice reducer untuk global state
const globalSlice = createSlice({
  name: 'global', // Nama slice, akan digunakan sebagai nama properti di state global
  initialState, // State awal untuk slice ini
  reducers: {
    // Action untuk mengatur status error dan pesan
    setError(state, action) {
      state.isError = action.payload.isError;
      state.message = action.payload.message;
    },
    // Action untuk membersihkan error dan pesan
    clearError(state) {
      state.isError = false;
      state.message = '';
    },
    // Action untuk mengatur status loading
    setLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

// Ekspor actions dari slice reducer
export const { setError, clearError, setLoading } = globalSlice.actions;
// Ekspor reducer untuk slice global
export default globalSlice.reducer;
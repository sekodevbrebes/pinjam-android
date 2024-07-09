// reducers/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

// State awal untuk slice registrasi
const initialState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

// Membuat slice reducer untuk registrasi
const registerSlice = createSlice({
  name: 'register', // Nama slice, akan digunakan sebagai nama properti di state global
  initialState, // State awal untuk slice ini
  reducers: {
    // Action untuk mengatur informasi registrasi
    setRegister(state, action) {
      const { name, email, password, password_confirmation } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      state.password_confirmation = password_confirmation;
    },
    // Action untuk mengatur informasi alamat dan kontak
    // setAddress(state, action) {
    //   const { address, instansi, telephone, alamat } = action.payload;
    //   state.address = address;
    //   state.instansi = instansi;
    //   state.telephone = telephone;
    //   state.alamat = alamat;
    // },
    // Action untuk menghapus semua data registrasi
    clearRegisterState(state) {
      state.name = '';
      state.email = '';
      state.password = '';
      state.password_confirmation = '';
    },
  },
});

// Ekspor actions dari slice reducer
export const { setRegister, setAddress, clearRegisterState } = registerSlice.actions;
// Ekspor reducer untuk slice registrasi
export default registerSlice.reducer;
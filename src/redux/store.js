// store.js
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerSlice'; // Import reducer untuk slice registrasi
import globalReducer from './reducers/globalSlice'; // Import reducer untuk slice global

// Konfigurasi store dengan menggunakan combineReducers untuk menggabungkan semua reducer
const store = configureStore({
  reducer: {
    register: registerReducer, // Tambahkan reducer untuk slice registrasi
    global: globalReducer, // Tambahkan reducer untuk slice global
  },
});

// Ekspor store yang telah dikonfigurasi
export default store;

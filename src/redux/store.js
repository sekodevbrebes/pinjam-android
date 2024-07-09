import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Impor rootReducer yang sudah didefinisikan

// Konfigurasi store Redux
const store = configureStore({
  reducer: rootReducer, // Menggunakan rootReducer sebagai reducer utama
});

export default store;

import {combineReducers} from 'redux'; // Import combineReducers untuk menggabungkan beberapa reducer
import authReducer from '/registerSlice'; // Impor untuk manajemen auth/register
import globalReducer from '/globalSlice'; // Impor reducer untuk state global seperti settings atau UI state


// Definisi root reducer yang menggabungkan semua reducer ke dalam satu root reducer
const rootReducer = combineReducers({
  register: authReducer, // Menyimpan state dan reducers terkait registrasi dan autentikasi
  global: globalReducer, // Menyimpan state dan reducers terkait dengan state global aplikasi
});

export default rootReducer;

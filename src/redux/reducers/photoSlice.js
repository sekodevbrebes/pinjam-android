// reducers/photoSlice.js
import { createSlice } from '@reduxjs/toolkit';

// State awal untuk slice foto
const initialState = {
  uri: '',
  type: '',
  name: '',
  isUploadPhoto: false,
};

// Membuat slice reducer untuk foto
const photoSlice = createSlice({
  name: 'photo', // Nama slice
  initialState, // State awal
  reducers: {
    setPhoto(state, action) {
      state.uri = action.payload.uri;
      state.type = action.payload.type;
      state.name = action.payload.name;
    },
    setUploadStatus(state, action) {
      state.isUploadPhoto = action.payload;
    },
  },
});

// Ekspor actions dari slice reducer
export const { setPhoto, setUploadStatus } = photoSlice.actions;
// Ekspor reducer untuk slice foto
export default photoSlice.reducer;

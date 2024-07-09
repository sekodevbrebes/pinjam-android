import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uri: '',
  type: '',
  name: '',
  isUploadPhoto: false,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhoto(state, action) {
      const { uri, type, name } = action.payload;
      state.uri = uri;
      state.type = type;
      state.name = name;
    },
    setUploadStatus(state, action) {
      state.isUploadPhoto = action.payload;
    },
  },
});

export const { setPhoto, setUploadStatus } = photoSlice.actions;
export default photoSlice.reducer;

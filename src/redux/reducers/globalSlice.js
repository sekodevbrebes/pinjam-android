import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: true,
  message: 'Error',
  isLoading: false,
};



const globalSlice = createSlice({
  name: 'global', 
  initialState,
  reducers: {
    setError(state, action) {
      state.isError = action.payload.isError;
      state.message = action.payload.message;
    },
    clearError(state) {
      state.isError = false;
      state.message = '';
    },
    setLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setError, clearError, setLoading } = globalSlice.actions;
export default globalSlice.reducer;

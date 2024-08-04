import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: []
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHome(state, action) {
      state.rooms = action.payload;
    },
  },
});

export const { setHome } = homeSlice.actions;

export default homeSlice.reducer;

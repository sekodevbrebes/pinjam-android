import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegister(state, action) {
      const { name, email, password, password_confirmation } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      state.password_confirmation = password_confirmation;
    },
    clearRegisterState(state) {
      state.name = '';
      state.email = '';
      state.password = '';
      state.password_confirmation = '';
    },
  },
});

export const { setRegister, clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;

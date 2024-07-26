import { combineReducers } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import photoReducer from './photoSlice';
import globalReducer from './globalSlice';
import homeReducer from './homeSlice';
import bookingReducer from './bookingSlice';
import roomReducer from './roomSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  photo: photoReducer,
  global: globalReducer,
  home: homeReducer,
  bookings: bookingReducer,
  room: roomReducer
});

export default rootReducer;

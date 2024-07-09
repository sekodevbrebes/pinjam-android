import { combineReducers } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import photoReducer from './photoSlice';
import globalReducer from './globalSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  photo: photoReducer,
  global: globalReducer,
});

export default rootReducer;

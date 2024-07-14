import { combineReducers } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import photoReducer from './photoSlice';
import globalReducer from './globalSlice';
import homeReducer from './homeSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  photo: photoReducer,
  global: globalReducer,
  home: homeReducer,
});

export default rootReducer;

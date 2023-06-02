import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  middleware: (getDefault)=>getDefault().concat(logger) 
});

export default store;

export * from './authSlice';



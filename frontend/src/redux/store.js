import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productReducer from './productSlice';

export default configureStore({
  reducer: {
    products: productReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});
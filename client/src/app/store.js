import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsSlice';
import queryInputReducer from '../features/queryInputSlice';

export const store = configureStore({
  reducer: {
    productStore: productReducer,
    queryInputs: queryInputReducer
  }
});


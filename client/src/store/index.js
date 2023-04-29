import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/productSlice';
import { countReducer } from './slices/countSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    count: countReducer,
  },
});

export * from './thunks/fetchProducts';
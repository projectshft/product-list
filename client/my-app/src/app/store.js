import { configureStore } from '@reduxjs/toolkit';
import reducer from '../features/product/productSlice';

const store = configureStore({
  reducer: {
    inventory: reducer
  }
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import {productsApiSlice} from '../features/api/apiSlice';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApiSlice.middleware),
});

setupListeners(store.dispatch);
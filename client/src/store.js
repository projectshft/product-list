import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './features/category/categorySlice' 
import pageReducer from './features/page/pageSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    page: pageReducer
  }
  
});


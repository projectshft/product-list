import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../slices/resultsSlice';

export default configureStore({
  reducer: {
    results: resultsReducer
  }
});

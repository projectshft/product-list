import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../slices/resultsSlice';
import searchReducer from '../slices/searchSlice';

export default configureStore({
  reducer: {
    results: resultsReducer,
    search: searchReducer
  }
});

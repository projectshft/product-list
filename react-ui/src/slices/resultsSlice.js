import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Makes an API request for all products when page initially loads
 *
 * @return {array} Array of unique person objects
 */
export const fetchProducts = createAsyncThunk(
  'results/fetchProducts',
  async () => {
    const url = 'http://localhost:8000/products';
    const response = await axios.get(url);
    return response.data;
  }
);

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    status: 'idle',
    error: null,
    results: []
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default resultsSlice.reducer;

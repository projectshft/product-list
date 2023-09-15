import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Makes an API request for all products when page initially loads
 *
 * @return {object} Object containing number of products and array
 * of product objects
 */
export const fetchProducts = createAsyncThunk(
  'results/fetchProducts',
  async (searchParameters) => {
    let url = `http://localhost:8000/products?page=${searchParameters.page}`;

    if (searchParameters.query) {
      url += `&query=${searchParameters.query}`;
    }
    if (searchParameters.category) {
      url += `&category=${searchParameters.category}`;
    }
    if (searchParameters.price) {
      url += `&price=${searchParameters.price}`;
    }

    const response = await axios.get(url);
    return response.data;
  }
);

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    status: 'idle',
    error: null,
    numResults: null,
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
        state.numResults = action.payload.numResults;
        state.results = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default resultsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page) => {
    const requestUrl = 'http://localhost:8000/products';
    let queryParams = '';

    if (page) {
      queryParams += `?page=${page}`;
    }

    // console.log('query params: ', !!queryParams, { queryParams });

    if (queryParams) {
      // Get all products
      const response = await axios.get(requestUrl + queryParams);

      return response.data;
    }

    // Get all products
    const response = await axios.get(requestUrl);

    return response.data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    resultsLimited: [],
    resultsCount: null,
    activePage: '1',
    totalPages: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resultsLimited = action.payload.resultsLimited;
        state.activePage = action.payload.page;
        state.resultsCount = action.payload.resultsCount;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

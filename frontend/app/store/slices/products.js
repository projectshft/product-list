import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { getState }) => {
    const state = getState();
    const { page = state.activePage, search = '' } = params;
    const requestUrl = 'http://localhost:8000/products';
    const queryParams = [];

    if (page) {
      queryParams.push(`page=${page}`);
    }

    if (search) {
      queryParams.push(`query=${search}`);
    }

    // Build queryString based on what parameters are dispatched to the asyncThunk
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    // console.log({ queryString });

    // Get all products
    const response = await axios.get(requestUrl + queryString);

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
    searchValue: '',
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
        state.searchValue = action.payload.query;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

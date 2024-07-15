import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { getState }) => {
    const state = await getState();
    const {
      page = '',
      search = '',
    } = params;
    const requestUrl = 'http://localhost:8000/products';
    const queryParams = [];
    const { category, price } = state.products;

    if (category) {
      queryParams.push(`category=${category}`);
    }

    if (page) {
      queryParams.push(`page=${page}`);
    }

    if (search) {
      queryParams.push(`query=${search}`);
    }

    if (price) {
      queryParams.push(`price=${price}`);
    }

    // Build queryString based on what parameters are dispatched to the asyncThunk
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    console.log({ queryString });

    // Get all products
    const response = await axios.get(requestUrl + queryString);

    return response.data;
  },
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const requestUrl = 'http://localhost:8000/products/categories';

    // Get all categories
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
    searchValue: '',
    categories: [],
    category: '',
    price: '',
    error: null,
  },
  reducers: {
    categorySelected(state, action) {
      state.category = action.payload;
    },
    priceSelected(state, action) {
      state.price = action.payload;
    },
  },
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
        state.category = action.payload.category;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { categorySelected, priceSelected } = productsSlice.actions;

export default productsSlice.reducer;

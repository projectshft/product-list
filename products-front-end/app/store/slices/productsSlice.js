'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Async thunk to fetch products from the database
 */
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page, searchQuery, sortPrice, sortCategory }) => {
  try {
    /**
     * Makes a GET request to the server with optional page, search, price and category options
     */
    const response = await axios.get(`http://localhost:8000/products?page=${page}&query=${searchQuery}&price=${sortPrice}&category=${sortCategory}`, {
      "Access-Control-Allow-Origin": "*"
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

/**
 * Initial state for the products slice
 */
const initialState = {
  products: [],
  loading: 'idle',
  error: null,
};

/**
 * Creates a products slice
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Sets products state
     */
    setProducts: (state, action) => {
      state.products = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
      /**
       * Handles the fulfilled state when products and count are fetched successfully
       */
      .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.products = action.payload.products;
      state.count = action.payload.count;
    })
      .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

/**
 * Exports setProducts action creator and products slice reducer
 */
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
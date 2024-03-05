'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { set } from 'mongoose';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async (page) => {
  let url = `http://localhost:8000/api/products?page=${page}`;
  const response = await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
  return response.data.products;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
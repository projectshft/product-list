import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ page = 1, category = 'All' }) => {
    const url = category === 'All'
      ? `http://localhost:8000/products?page=${page}`
      : `http://localhost:8000/products?page=${page}&category=${category}`;

    const response = await axios.get(url);

    console.log(response.data.products, 'response data products 1st fetch');
    return response.data.products;
  }
);

export const getCount = createAsyncThunk(
  'products/getCount',
  async () => {
    const response = await axios.get('http://localhost:8000/products');
    console.log(response.data.count, 'response data count 2nd fetch');
    return response.data.count;
  }
);

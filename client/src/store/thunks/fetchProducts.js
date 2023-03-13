import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ page = 1, category = 'All', price = '', query = '' }) => {
    let url = `http://localhost:8000/products?page=${page}`;
    
    if (category !== 'All') {
      url += `&category=${category}`;
    }
    if (price === 'lowest') {
      url += '&sort=price&order=asc';
    } else if (price === 'highest') {
      url += '&sort=price&order=desc';
    }
    if (query) {
      url += `&query=${query}`;
    }

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

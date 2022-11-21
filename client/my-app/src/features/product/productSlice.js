import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/products';

const initialState = {
  categories: [],
  currentPage: null || 1,
  products: [],
  status: 'idle', //'idle | 'loading' | 'succeded' | 'failed'
  error: null
};

export const fetchProducts = createAsyncThunk('inventory/fetchProducts', async      (query) => {
  try {
    if(!query) {
      const response = await axios.get(baseUrl);
      return response.data;
    }
    const response = await axios.get(`${baseUrl}?${query.key}=${query.value}`);
    return response.data;
  } catch (err) {
      return err.message;
    }
  });

export const fetchCategories = createAsyncThunk('inventory/fetchCategories', async() => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    return err.message;
  }
})

const productSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    goToPage: (state, action) => {
      state.currentPage = action.payload;
    },
    sortByPrice: (state, action) => {
      if (action.payload === "lowest"){
        state.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if(action.payload === "highest"){
          state.products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = [...action.payload.products];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const categoriesWithDuplicates = action.payload.products.map(product => product.category);
        state.categories = [...new Set(categoriesWithDuplicates)];
    })
  }
})

export const { actions, reducer } = productSlice;
export default reducer;
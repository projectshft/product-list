// refactor from weather

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// defining initial state. This will be used in the Slice below
const initialState = {
  query: {
    query: '',
    price: '',
    category: '',
    page: 1
  },
  categories: [],
  products: [],
  count: 0,
  invalidSearch: false
}
const url = 'http://127.0.0.1:8000'

  // API call using coordinates stored in state.cities, referenced from the city name stored in state.currentCity
export const fetchCategories = createAsyncThunk('/categories', async (_, { getState }) => {
    try {
        const queryUrl = `${url}/categories`
        const data = await axios.get(queryUrl)
        return(data.data);
      }
    catch (err) {
      return err.message;
    }})
  
export const fetchProducts = createAsyncThunk('/products', async (_, { getState }) => {
  
  const state = getState();
  const query = state.query;
  const searchTerm = query.query;
  const price = query.price;
  const category = query.category;
  const page = query.page
  try {
    const queryUrl = `${url}/products?category=${category}&price=${price}&query=${searchTerm}&page=${page}`
    const data = await axios.get(queryUrl)
    return data.data;
  }
  catch (err) {
    return(err);
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory : (state, action) => {state.query.category = action.payload}, 
    setPrice: (state, action) => {state.query.price = action.payload},
    setPage: (state, action) => {state.query.page = action.payload},
    setQuery: (state, action) => {state.query.query = action.payload},
    setCategories : (state, action) => {state.categories = action.payload},
    setProducts : (state, action) => {state.products = action.payload}, 
    setCount: (state, action) => {state.count = action.payload},
    setInvalidSearch: (state, action) => {state.invalidSearch = action.payload}
  }
})

export const { setCategory, setPage, setPrice, setQuery, setCategories, setProducts, setCount, setInvalidSearch } = productsSlice.actions

export default productsSlice.reducer
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:8000/products'
const initialState = [];

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  try {
   
   const response = await fetch(baseUrl).then(response => response.json());
   return response;
    
  }
  catch (err) {
    return err
  }
})

export const filterByCategory = createAsyncThunk('products/filterByCategory', async (category) => {
  try {
    const response = await fetch(baseUrl + "?category=" + category).then(response => response.json());
    return response
  }
  catch (err) {
    return err
  }
})

export const paginate = createAsyncThunk('products/paginate', async (paramsObj) => {
  try {
    const response = await fetch(baseUrl + "?page=" + paramsObj.pageClicked + "&category=" + paramsObj.category + "&query=" + paramsObj.query + "&sort=" + paramsObj.sort).then(response => response.json());
    return response;
  }
  catch (err) {
    return err;
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      return action.payload
    })
    .addCase(filterByCategory.fulfilled, (state, action) => {
      return action.payload
    })
    .addCase(paginate.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const {setSearch} = productsSlice.actions;
export default productsSlice.reducer
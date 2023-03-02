import { fetchProducts } from './productAPI';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
  category: '',
  price: 'Highest',
  page: '',
  name: '',
  reset: '',
  resultsCount: 'n/a'
};

export const fetchProductsAsync = createAsyncThunk('productsSlice/fetchProducts', async (queryData) => {
  const {category, name, price, page, reset} = queryData;
  //console.log('fetchProductsAsync', name)
  const { data } = await fetchProducts(category, name, price, page, reset)
  //console.log('data', data)
  //console.log('data.length', data.length)
  return data    //whatever data returns is payload
})

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.category = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updatePrice: (state, action) => {
      state.price = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    resetData: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProductsAsync.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data = action.payload;          //data that is returned
      state.resultsCount = action.payload.length > 0 ? 'Found': 'None';
    })
  }
});  
  
export const { updateCategory, updateName, updatePrice,  updatePage, resetData } = productsSlice.actions;
export default productsSlice.reducer;
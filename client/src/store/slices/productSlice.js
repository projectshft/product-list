import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../thunks/fetchProducts';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
  },
  extraReducers(builder) {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(action.payload, 'action payload')
    });
  }
});


export const productsReducer = productsSlice.reducer;
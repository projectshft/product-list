import { createSlice } from '@reduxjs/toolkit';
import { getCount } from '../thunks/fetchProducts';

const countSlice = createSlice({
  name: 'product count',
  initialState: {
    count: 0
  },
  extraReducers(builder) {
    builder.addCase(getCount.fulfilled, (state, action) => {
      state.count = action.payload;
      console.log(action.payload, 'action payload count')
    });
  }
});

export const countReducer = countSlice.reducer;
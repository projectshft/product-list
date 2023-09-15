import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    category: null,
    price: null
  },
  reducers: {
    setSearchParameters: (state, action) => {
      state.query = action.payload.query;
      state.category = action.payload.category;
      state.price = action.payload.price;
    }
  }
});

export const { setSearchParameters } = searchSlice.actions;

export default searchSlice.reducer;

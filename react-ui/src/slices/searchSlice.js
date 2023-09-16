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
    },
    changeDropdown: (state, action) => {
      if (action.payload.type === 'filterByCategory') {
        state.category = action.payload.value;
      } else {
        state.price = action.payload.value;
      }
    }
  }
});

export const { setSearchParameters, changeDropdown } = searchSlice.actions;

export default searchSlice.reducer;

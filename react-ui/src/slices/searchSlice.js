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
        state.category =
          action.payload.value !== 'Filter by category'
            ? action.payload.value
            : null;
      } else {
        state.price =
          action.payload.value !== 'Sort by price'
            ? action.payload.value
            : null;
      }
    }
  }
});

export const { setSearchParameters, changeDropdown } = searchSlice.actions;

export default searchSlice.reducer;

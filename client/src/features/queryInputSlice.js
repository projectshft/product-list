import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: '',
  name: '',
  category: '',
  price: null,
}

const queryInputSlice = createSlice({
  name: "queryInputs",
  initialState,
  reducers:{
    keywordSearch: (state, action) => {
      state.keyword = action.payload;
      state.name = '';
      state.category = '';
    },
    nameSearch: (state, action) => {
      state.name = action.payload;
      state.keyword = '';
    },
    categorySearch: (state, action) => {
      state.category = action.payload;
      state.keyword = '';
    },
    priceSort: (state, action) => {
      state.category = action.payload;
    }
  },
});

export default queryInputSlice.reducer
export const { keywordSearch, nameSearch, categorySearch, priceSort } = queryInputSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: '',
  name: '',
  category: '',
  price: null,
  page: null,
}

const queryInputSlice = createSlice({
  name: "queryInputs",
  initialState,
  reducers:{
    keywordSearch: (state, action) => {
      state.keyword = action.payload;
      state.name = '';
      state.category = '';
      state.page = null
    },
    nameSearch: (state, action) => {
      state.name = action.payload;
      state.keyword = '';
      state.page = null
    },
    categorySearch: (state, action) => {
      state.category = action.payload;
      state.keyword = '';
      state.page = null
    },
    priceSort: (state, action) => {
      state.price = action.payload;
      state.page = null
    },
    pageChange: (state, action) => {
      state.page = action.payload;
    }
  },
});

export default queryInputSlice.reducer
export const { keywordSearch, nameSearch, categorySearch, priceSort, pageChange } = queryInputSlice.actions;
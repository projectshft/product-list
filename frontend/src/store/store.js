import { configureStore } from "@reduxjs/toolkit";
import searchTermReducer from '../slices/searchSlice'
import categoryFilterReducer from '../slices/categoryFilterSlice'
import priceFilterReducer from "../slices/priceFilterSlice";
import paginationReducer from "../slices/paginationSlice";

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    categoryFilter: categoryFilterReducer,
    priceFilter: priceFilterReducer,
    pagination: paginationReducer,
  },

});
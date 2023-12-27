import { configureStore } from "@reduxjs/toolkit";
import  productsSlice  from "./reducer/slice";
const store = configureStore({
  reducer: productsSlice
})

export default store;
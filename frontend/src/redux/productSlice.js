import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [{ products: [], count: 0 }];

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async (params) => {
    const response = await axios.get("http://localhost:8000/products", {
      params,
    });

    return { response };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //don't really need this for the current project
    addProduct: (state, action) => {
      const newProduct = {
        id: action.payload._id,
        name: action.payload.name,
        category: action.payload.category,
        price: action.payload.price,
        image: action.payload.image,
      };
      state.push(newProduct);
    },
  },
  extraReducers: {
    [getProductsAsync.fulfilled]: (state, action) => {
      return action.payload.response.data;
    },
  },
});

export const { addProduct, clearState } = productSlice.actions;

export default productSlice.reducer;

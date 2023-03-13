import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//action
export const fetchProductsAction = createAsyncThunk("products/fetch", async(queryInput, rejectWithValue) => {
  const { keyword, name, category, price, page } = queryInput;

  try {
    const { data } = await axios.get(`http://localhost:8000/products?query=${keyword}&name=${name}&category=${category}&price=${price}&page=${page}`);

    return data
  } catch (error) {
    if(!error?.response){
      throw error
    }
    return rejectWithValue(error?.response?.data);
  }
});

const initialState = {
  products: [],
}

const productsSlice = createSlice({
  name: "productStore",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.products = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = undefined;
      state.error = action?.payload;
    });
  }
});

export default productsSlice.reducer

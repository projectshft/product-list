import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductCount = createAsyncThunk(
  "getProductCount",
  async (query) => {
    const response = await axios.get(
      `http://localhost:8000/products/count${query}`
    );
    return response.data;
  }
);

export const countSlice = createSlice({
  name: "count",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getProductCount.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default countSlice.reducer;

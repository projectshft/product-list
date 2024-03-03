import { createSlice } from "@reduxjs/toolkit";

export const priceFilterSlice = createSlice({
  name: 'priceFilter',
  initialState: '',
  reducers: {
    setPrice: (state, action) => action.payload,
  }
});

export const { setPrice } = priceFilterSlice.actions;
export default priceFilterSlice.reducer;
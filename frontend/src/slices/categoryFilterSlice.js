import { createSlice } from "@reduxjs/toolkit";

export const categoryFilterSlice = createSlice({
  name: 'categoryFilter',
  initialState: '',
  reducers: {
    setCategory: (state, action) => action.payload,
  }
});

export const { setCategory } = categoryFilterSlice.actions;
export default categoryFilterSlice.reducer;
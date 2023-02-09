import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryResults: [],
  isLoading: true,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
});

//console.log(categorySlice);

export default categorySlice.reducer;
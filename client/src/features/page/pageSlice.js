import { createSlice } from '@reduxjs/toolkit';
  

const initialState = {
   currentPage: 1,
}
    
export const pageSlice = createSlice({
  name: 'page',
  initialState , 
  reducers: {
    next(state) {
      state.currentPage++
    },
    back(state) {
      state.currentPage--
    },
   
  }, 
   
});

export const { next, back } = pageSlice.actions
export default pageSlice.reducer;



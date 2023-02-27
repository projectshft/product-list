import { configureStore, createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice ({
  name: 'category',
  initialState: [],
  reducers: {
    pickCategory(state, action){
      state.push(action.payload)
    }
  }
})


const store = configureStore({
  reducer: {
    dropDown: categorySlice.reducer
  }
});

export { store };
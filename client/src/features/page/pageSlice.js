import { createSlice } from '@reduxjs/toolkit';
import products from '../../products'
  

const initialState = {
    products: products,
    page: 1,
    isLoading: true,
  };
 

  export const pageSlice = createSlice({
    name: 'page',
    initialState    
  });

  //console.log(pageSlice);

  export default pageSlice.reducer;



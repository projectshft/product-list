import { createSlice } from '@reduxjs/toolkit';
import products from '../../products';

const initialState = {
    products: products,
    pageNum: 1
  };
 

  export const productSlice = createSlice({
    name: 'products',
    initialState,     
    reducers: {
      getProduct:(state, action) => {   //getproduct is action, product is payload   GET_PRODUCT
        const product = action.payload
        state.products[products.name] = product
        console.log(product)
      },
      getCategory:(state, action)=>{
        const category = action.payload
        state.products[products.category] = category
        console.log(category)
      },
      sortPrice:(state, action)=>{
        const price = action.payload
        state.products[products.price] = price
        console.log(price)
      }, 
    
    }
      
      
}
)
        

  console.log(productSlice);

  export const {getProduct, getCategory, sortPrice, nextPage, previousPage } = productSlice.actions;

  export default productSlice.reducer;



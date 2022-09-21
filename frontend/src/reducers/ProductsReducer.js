import { 
  GET_PRODUCTS, 
  GET_PRODUCT_BY_ID, 
  } from "../actions/actions";

const initialState = {
  products: []
}

const productsReducer = (state = initialState, action) =>{
  switch (action.type){
    case GET_PRODUCTS:
      const allProducts = action.payload
      return [allProducts]
  
    case GET_PRODUCT_BY_ID:
      const oneProduct = action.payload
      return [oneProduct, ...state]
      
    default:
      return state
  }
}

export default productsReducer
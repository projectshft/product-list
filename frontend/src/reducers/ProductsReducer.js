import { 
  GET_PRODUCTS, 
  GET_PRODUCT_BY_ID, 
  DELETE_PRODUCT_BY_ID, 
  ADD_NEW_PRODUCT 
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
      
    case DELETE_PRODUCT_BY_ID:
      return state

    case ADD_NEW_PRODUCT:
      const newProduct = action.payload
      return [newProduct, ...state]
      
    default:
      return state
  }
}

export default productsReducer
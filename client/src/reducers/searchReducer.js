import { PRODUCTS } from "../actions";


const productReducer = function(state = [], action) {
  switch(action.type) {
    case PRODUCTS: 
      return action.payload.data
    default: 
      return state;  
  }
}

export default productReducer



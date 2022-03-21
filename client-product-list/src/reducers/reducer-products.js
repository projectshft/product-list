import { FETCH_PRODUCTS} from "../actions";


const productsReducer = function(state = [], action) {

  switch (action.type) {
    case FETCH_PRODUCTS:      
      return action.payload.data.products;
    default:
      return state;
  }
}

export default productsReducer; 
import { FETCH_PRODUCTS} from "../actions";


const totalReducer = function(state = null, action) {

  switch (action.type) {
    case FETCH_PRODUCTS:      
      return action.payload.data.total;
    default:
      return state;
  }
}

export default totalReducer; 
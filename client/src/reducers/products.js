
import { FETCH_PRODUCTS_SUCCESS, SET_ERROR } from "../actions";


const productReducer =  (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:  {
    return  action.payload
  }
    case SET_ERROR: {
      alert(action.payload.response.message);
      break;
    }

    default:
      return state;
  };
}



export default productReducer;
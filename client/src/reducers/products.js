
import { FETCH_PRODUCTS_SUCCESS, SET_ERROR } from "../actions";

const initialState = {
  products: [],
};

const productReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: [
          { ...action.payload},
        ],
      };
    }

    case SET_ERROR: {
      alert(action.payload.response.message);
      break;
    }

    default:
      return state;
  }
};



export default productReducer;
import { UPDATE_CATEGORY } from "../actions/index";

const initialState = []

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return {
        // ...state,
        products: action.payload,
      };
    default:
      return {
      // state;
      products: action.payload,
      }
    }
  }

export default categoryReducer;




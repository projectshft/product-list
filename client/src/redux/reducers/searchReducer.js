import { SEARCH_PRODUCT } from "../actions/index";

const initialState = []

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT:
      return {
        products: action.payload,
      }     
      // console.log(action.payload);
      // const test = action.payload
      // console.log('Test:', test);
      // return test; 
    default:
      return state;
    }
  }

export default searchReducer;



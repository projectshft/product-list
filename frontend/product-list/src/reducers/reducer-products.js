import { SEARCH_PRODUCTS, FETCH_PRODUCTS, SET_CATEGORY } from "../actions";

const DEFAULT_STATE = {
  products: [],
  pageSelected: 1,
  categorySelected: '',
  sortSelected:'',
  query:'',
}

const productsReducer = function (state = DEFAULT_STATE, action) {

  switch(action.type) {
    case FETCH_PRODUCTS:
      if (action.payload){
        return {
          ...state,
          products: action.payload.data
        };
      } else {
        return state;
      }

    case SET_CATEGORY:
      if (action.payload=="All Products"){
        return {
          ...state,
          categorySelected: ''
        };
      } else if (action.payload){
        return {
          ...state,
          categorySelected: action.payload
        };
      } else {
        return state;
      }

    case SEARCH_PRODUCTS:
      if (action.payload){
        return {
          ...state,
          query: action.payload
        };
      } else {
        return state;
      }
    
    default: 
      return state;
  };  
};

export default productsReducer;
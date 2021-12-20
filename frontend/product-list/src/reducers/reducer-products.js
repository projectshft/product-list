import { fetchProducts, FETCH_PRODUCTS, SET_CATEGORY } from "../actions";

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
        state.products = action.payload.data;
        return state;
      } else {
        return state;
      }

    case SET_CATEGORY:
      if (action.payload){
        state.categorySelected = action.payload;
        // console.log(state);
        return state;
      } else {
        return state;
      }
    
    default: 
      return state;
  };  
};

export default productsReducer;
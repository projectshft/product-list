import { SET_CATEGORY_FILTER, SET_PRICE_SORT, SET_SEARCH_TERM } from "../actions";

//create default Params object to represent initial state
const defaultParams = {
  category: '',
  price: '',
  search: ''
};

export default function(state = defaultParams, action) {
  //user can enter or clear a category filter 
  switch (action.type){
    case SET_CATEGORY_FILTER: {
      return {...state, category: action.payload};
    }
    
    case SET_PRICE_SORT: {
      return {...state, price: action.payload};
    }
    
    case SET_SEARCH_TERM: {
      return {...state, search: action.payload};
    }

    default: {
      return state;
    }
  }  
}
  
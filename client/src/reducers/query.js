import { PRICE_QUERY, CATEGORY_SORT, QUERY_SORT } from "../actions";


const initialState = {
  price: '',
  category: '',
  query: ''
}


const queryReducer = (state = initialState, action) => {
  switch (action.type) {
   case PRICE_QUERY: 
    return  {
      ...state,
      price: action.payload
  }
  case CATEGORY_SORT: 
    return  {
      ...state,
      category: action.payload
  }

  case QUERY_SORT: 
    return  {
      ...state,
      query: action.payload
  }
    default:
      return state;
  };
}



export default queryReducer;
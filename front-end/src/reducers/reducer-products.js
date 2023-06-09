import _ from 'lodash';
import { FETCH_PRODUCTS_SUCCESS } from '../actions';

const DEFAULT_STATE = [];

// const DEFAULT_STATE = {
//   products: []
//   //maybe we need to have state.props for current page/category/price-sort method?Also, maybe the clickevent for next/previous page needs to have category and price-sort params included whenever the next page action is dispatched. Using the count from the backend when it gets passed into the state may help with that as well for mapping out how many pages in the pagination JSX
// }

const productsReducer = function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_SUCCESS: {
      console.log('action.payload.products: ', action.payload.products)
      return action.payload.products;    
      // return {
      //   products: [action.payload]
      // }
    }


    default:
      return state;
  }
}

export default productsReducer;
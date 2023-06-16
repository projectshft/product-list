import { CHANGE_PAGE_SUCCESS, FETCH_PRODUCTS_SUCCESS, FETCH_QUERY_SUCCESS, FILTER_CATEGORY_SUCCESS, SORT_BY_PRICE_SUCCESS } from '../actions';

const DEFAULT_STATE = {
  products: [],
  productCount: '',
  categoryParam: '',
  sortParam: '',
  queryParam: ''
};

const productsReducer = function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_SUCCESS: 
      
      return {
        products: action.payload.products,
        productCount: action.payload.productCount
      }
    case FILTER_CATEGORY_SUCCESS:
      
      return {
        products: action.payload.products,
        productCount: action.payload.productCount,
        categoryParam: action.payload.category,
        sortParam: action.payload.sort,
        queryParam: action.payload.query
      };
    case SORT_BY_PRICE_SUCCESS:
      
      return {
        products: action.payload.products,
        productCount: action.payload.productCount,
        categoryParam: action.payload.category,
        sortParam: action.payload.sort,
        queryParam: action.payload.query
      };
    case CHANGE_PAGE_SUCCESS:
      
      return {
        products: action.payload.products,
        productCount: action.payload.productCount,
        categoryParam: action.payload.category,
        sortParam: action.payload.sort,
        queryParam: action.payload.query
      }
    case FETCH_QUERY_SUCCESS:
      
      return {
        products: action.payload.products,
        productCount: action.payload.productCount,
        categoryParam: action.payload.category,
        sortParam: action.payload.sort,
        queryParam: action.payload.query
      }
    default:
      return state;
  }
}

export default productsReducer;
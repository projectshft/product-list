import { SEARCH_PRODUCTS, FETCH_PRODUCTS, SET_CATEGORY, SET_SORT ,SET_PAGE, SELECT_PRODUCT, DELETE_REVIEW, ADD_PRODUCT, ADD_REVIEW, DELETE_PRODUCT} from "../actions";

const DEFAULT_STATE = {
  products: [],
  pageSelected: 1,
  categorySelected: '',
  sortSelected:'',
  query:'',
  totalProductsReturned:0,
  productSelected: {},
}

const productsReducer = function (state = DEFAULT_STATE, action) {

  switch(action.type) {
    case FETCH_PRODUCTS:
      if (action.payload){
        return {
          ...state,
          totalProductsReturned: action.payload.data.totalCount,
          products: action.payload.data.products
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
          categorySelected: action.payload,
          pageSelected: 1
        };
      } else {
        return state;
      }

    case SEARCH_PRODUCTS:
      if (action.payload){
        return {
          ...state,
          query: action.payload,
          pageSelected: 1
        };
      } else {
        return state;
      }

    case SET_SORT:  
      if (action.payload){
        return {
          ...state,
          sortSelected: action.payload,
          pageSelected: 1
        };
      } else {
        return state;
      }

    case SET_PAGE:
      if (action.payload){
        return {
          ...state,
          pageSelected: action.payload
        };
      } else {
        return state;
      }

    case SELECT_PRODUCT:
      if (action.payload){
        return {
          ...state,
          productSelected: action.payload.data
        }
      } else {
        return state;
      }

    case DELETE_REVIEW:
      if (action.payload){
        return {
          state,
        }
      } else {
        return state;
      }

    case ADD_PRODUCT:
      return {
      ...state,
      productSelected: action.payload.data
      }

    case ADD_REVIEW:
      return {
      ...state,
      productSelected: action.payload.data
      }

    case DELETE_PRODUCT:
      return state

    default: 
      return state;
  };  
};

export default productsReducer;
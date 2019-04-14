import { combineReducers } from 'redux';
import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  SET_CATEGORY,
  SET_PRICE_SORT,
  SET_PAGE
} from '../actions/index';

// const initialState = {
//   products: {
//     products: [],
//     count: null
//   },
//   categories: [],
//   currentCategory: '',
//   currentPriceSort: '',
//   currentPage: 1
// };

const productsReducer = (state = { products: [], count: null }, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        products: action.payload.data.products
      });
    default:
      return state;
  }
};

const countReducer = (state, action) => {
  //Stuff and things
};

const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, { categories: action.payload.data });
    default:
      return state;
  }
};

const categoryReducer = (state = { currentCategory: '' }, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return Object.assign({}, state, { currentCategory: action.payload });
    default:
      return state;
  }
};

const priceSortReducer = (state = { currentPriceSort: '' }, action) => {
  switch (action.type) {
    case SET_PRICE_SORT:
      return Object.assign({}, state, { currentPriceSort: action.payload });
    default:
      return state;
  }
};

const pageReducer = (state = { currentPage: 1 }, action) => {
  switch (action.type) {
    case SET_PAGE:
      return Object.assign({}, state, { currentPage: action.payload });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  currentCategory: categoryReducer,
  currentPriceSort: priceSortReducer,
  currentPage: pageReducer
});

export default rootReducer;

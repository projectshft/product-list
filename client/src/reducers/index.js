import { combineReducers } from 'redux';
import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  SET_CATEGORY,
  SET_PRICE_SORT,
  SET_PAGE
} from '../actions/index';

const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        products: action.payload.data.products
      });
    default:
      return state;
  }
};

const countReducer = (state = { count: null }, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        count: action.payload.data.count
      });
    default:
      return state;
  }
};

const categoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, { categories: action.payload.data });
    default:
      return state;
  }
};

const categoryReducer = (state = { currentCategory: 'All' }, action) => {
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
  count: countReducer,
  categories: categoriesReducer,
  currentCategory: categoryReducer,
  currentPriceSort: priceSortReducer,
  currentPage: pageReducer
});

export default rootReducer;

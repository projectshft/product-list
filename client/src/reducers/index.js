import { combineReducers } from 'redux';
import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  SET_CATEGORY,
  SET_PRICE_SORT
} from '../actions/index';

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
};

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload.data;
    default:
      return state;
  }
};

const categoryReducer = (state = '', action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

const priceSortReducer = (state = '', action) => {
  switch (action.type) {
    case SET_PRICE_SORT:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  currentCategory: categoryReducer,
  currentPriceSort: priceSortReducer
});

export default rootReducer;

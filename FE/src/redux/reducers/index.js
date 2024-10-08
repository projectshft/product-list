// src/redux/reducers/index.js

import { combineReducers } from 'redux';
// Import your individual reducers
import productsReducer from './productsReducer'; // Adjust the path to your product reducer

const rootReducer = combineReducers({
  products: productsReducer,
  // Add other reducers here as needed
});

export default rootReducer;

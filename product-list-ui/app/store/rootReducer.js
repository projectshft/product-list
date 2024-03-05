'use client';
import { combineReducers } from 'redux';
import productReducer from './slices/productSlice';

const rootReducer = combineReducers({
  product: productReducer
});

export default rootReducer;
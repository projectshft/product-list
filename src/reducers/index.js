import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import ProductReducer from './reducer-product';
import ReviewReducer from './reducer-reviews';

const rootReducer = combineReducers({
    products: ProductsReducer,
    product: ProductReducer,
    reviews: ReviewReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import ProductReducer from './reducer-product';

const rootReducer = combineReducers({
    products: ProductsReducer,
    product: ProductReducer
});

export default rootReducer;
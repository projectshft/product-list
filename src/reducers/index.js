import { combineReducers } from 'redux';
import ProductsReducer from './reducer-products';
import ProductReducer from './reducer-product';
import AllProductsReducer from './reducer-all-products';

const rootReducer = combineReducers({
    products: ProductsReducer,
    product: ProductReducer,
    allProducts: AllProductsReducer
});

export default rootReducer;
import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer';
import PageReducer from './PageReducer';


const rootReducer = combineReducers({
    products: ProductReducer,
    page: PageReducer
});

export default rootReducer;

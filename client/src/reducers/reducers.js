import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer';
import PageReducer from './PageReducer';
import CategoryReducer from './CategoryReducer';


const rootReducer = combineReducers({
    products: ProductReducer,
    page: PageReducer,
    CategoryReducer,
});

export default rootReducer;

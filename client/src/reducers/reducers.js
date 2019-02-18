import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer';
import PageReducer from './PageReducer';
import CategoryReducer from './CategoryReducer';
import PriceReducer from './PriceReducer';


const rootReducer = combineReducers({
    products: ProductReducer,
    page: PageReducer,
    category:CategoryReducer,
    price: PriceReducer
});

export default rootReducer;

import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer';
import PageReducer from './PageReducer';
import CategoryReducer from './CategoryReducer';
import PriceReducer from './PriceReducer';

// Root Reducer - passed as the first argument to createStore.This is the only part of the reducer logic that must have the(state, action) -> newState signature.
const rootReducer = combineReducers({
    // slice reducer: a reducer that is being used to handle updates to one specific slice of the state tree, usually done by passing it to combineReducers
    products: ProductReducer,
    page: PageReducer,
    category:CategoryReducer,
    price: PriceReducer
});

export default rootReducer;

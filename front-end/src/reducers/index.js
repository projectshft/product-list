import { combineReducers } from 'redux';
import products from './products-reducer';

// combines all our reducers into one
const rootReducer = combineReducers({
    products: products

})

export default rootReducer;
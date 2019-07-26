import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    products: productsReducer
})

export default rootReducer;
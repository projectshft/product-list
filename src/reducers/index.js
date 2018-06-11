import { combineReducers } from 'redux';
import requestConfigReducer from './requestConfigReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    requestConfig: requestConfigReducer,
    products: productReducer
});

export default rootReducer;
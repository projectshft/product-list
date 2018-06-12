import { combineReducers } from 'redux';
import requestConfigReducer from './requestConfigReducer';
import productReducer from './productReducer';
import pageCountReducer from './pageCountReducer';

const rootReducer = combineReducers({
    requestConfig: requestConfigReducer,
    products: productReducer,
    pageCount: pageCountReducer
});

export default rootReducer;
import { combineReducers } from "redux";
import requestConfigReducer from './requestConfigReducer'

const rootReducer = combineReducers({
    requestConfig: requestConfigReducer
});

export default rootReducer;
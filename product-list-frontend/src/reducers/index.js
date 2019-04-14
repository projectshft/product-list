import { combineReducers } from "redux";
import ProductReducer from './product-reducer';
import PageReducer from './pagestate-reducer';
import SortReducer from './sort-reducer';
import CategoryReducer from './category-reducer';

const rootReducer = combineReducers({
    products: ProductReducer,
    page: PageReducer,
    category: CategoryReducer,
    sort: SortReducer
});

export default rootReducer;
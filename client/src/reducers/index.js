import { combineReducers } from 'redux';
import ProductsReducer from './products-reducer';
import CategoryReducer from './category-reducer';
import SortReducer from './sort-reducer'

const rootReducer = combineReducers({
    products: ProductsReducer,
    category: CategoryReducer,
    sort: SortReducer
})

export default rootReducer;
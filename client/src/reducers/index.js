import { combineReducers } from 'redux';
import ProductsReducer from './productsReducer';
import CategoryReducer from './categoryReducer';
import SortReducer from './sortReducer';
import PageReducer from './pageReducer'

const rootReducer = combineReducers({
    products: ProductsReducer,
    category: CategoryReducer,
    sort: SortReducer,
    page: PageReducer
})

export default rootReducer;
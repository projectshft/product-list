import { combineReducers } from 'redux';
import products from './products-reducer';
import page from './page-reducer';
import search from './search-reducer';
import category from './category-reducer';
import sort from './sort-reducer';

// combines all our reducers into one
const rootReducer = combineReducers({
    products: products,
    page: page,
    search: search,
    category: category,
    sort: sort
})

export default rootReducer;
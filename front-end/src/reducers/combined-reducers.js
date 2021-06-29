import { combineReducers } from 'redux';
import { ProductsReducer } from './products-reducer';
import { FilterReducer } from './filter-reducer';


// combines products and filtered state
const RootReducer = combineReducers({
  products: ProductsReducer,
  filterData: FilterReducer
});

export default RootReducer
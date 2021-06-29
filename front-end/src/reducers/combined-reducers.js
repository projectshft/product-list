import { combineReducers } from 'redux';
import { ProductsReducer } from './products-reducer';
import { FilterReducer } from './filter-reducer';



const RootReducer = combineReducers({
  products: ProductsReducer,
  filterData: FilterReducer
});

export default RootReducer
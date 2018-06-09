import { combineReducers } from "redux";
import MenuReducer from './menus'
import ProductsReducer from './products'
import TotalReducer from './total';

const rootReducer = combineReducers({
    menu: MenuReducer,
    products: ProductsReducer,
    total: TotalReducer
});

export default rootReducer;

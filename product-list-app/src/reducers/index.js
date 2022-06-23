import { FETCH_PRODUCTS} from "../actions";
import { SORT_PREVIOUSLY_FETCHED_PRODUCTS } from "../actions";

const productsReducer = (state, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            let foundProducts = action.payload;
            return foundProducts;
        case SORT_PREVIOUSLY_FETCHED_PRODUCTS:
            if(action.payload === 'asc') {
                return state.slice().sort((a, b) => a.price > b.price);
            } else {
                return state.slice().sort((a, b) => a.price < b.price);
            }
        default:
            return state;
    }
}

export default productsReducer;
// import { FETCH_PRODUCTS, FILTER_PREVIOUSLY_FETCHED_PRODUCTS, SORT_PREVIOUSLY_FETCHED_PRODUCTS} from "../actions";
import { FETCH_PRODUCTS} from "../actions";
const DEFAULT_STATE = [];

const productsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            let foundProducts = action.payload.data;
            return foundProducts;
        default:
            return state;
    }
}

export default productsReducer;
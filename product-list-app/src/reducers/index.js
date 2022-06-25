// import { FETCH_PRODUCTS, FILTER_PREVIOUSLY_FETCHED_PRODUCTS, SORT_PREVIOUSLY_FETCHED_PRODUCTS} from "../actions";
import { FETCH_PRODUCTS} from "../actions";
const DEFAULT_STATE = [];

const productsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            let foundProducts = action.payload;
            return foundProducts;
        // case SORT_PREVIOUSLY_FETCHED_PRODUCTS:
        //     if(action.payload === 'asc') {
        //         return state.slice().sort((a, b) => a.price > b.price);
        //     } else {
        //         return state.slice().sort((a, b) => a.price < b.price);
        //     }
        // case FILTER_PREVIOUSLY_FETCHED_PRODUCTS:
        //     return state.filter(product => product.category === action.payload)
        default:
            return state;
    }
}

export default productsReducer;
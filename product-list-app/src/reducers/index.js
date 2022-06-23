import { FETCH_PRODUCTS} from "../actions";

const productsReducer = (state, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            let foundProducts = action.payload;
            return foundProducts;
        default:
            return state;
    }
}

export default productsReducer;
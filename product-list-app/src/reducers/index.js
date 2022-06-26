import { FETCH_PRODUCTS} from "../actions";
const DEFAULT_STATE = {
    options: {},
    products: []
};

const productsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            let foundProducts = action.payload.data.products;
            let updatedOptions = action.payload.data.options;
            return {
                options: updatedOptions,
                products: foundProducts
            };
        default:
            return state;
    }
}

export default productsReducer;

import { FETCH_ALL_PRODUCTS } from '../actions/fetch-all-products';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return {allProducts: action.payload.data}
        default:
            return state
    }
}
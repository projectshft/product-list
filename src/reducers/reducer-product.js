import { FETCH_PRODUCT } from '../actions/fetch-product';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCT:
            return {product: action.payload.data}
        default:
            return state
    }
}
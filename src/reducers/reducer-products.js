import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {products: action.payload.data}
        default:
            return state
    }
}
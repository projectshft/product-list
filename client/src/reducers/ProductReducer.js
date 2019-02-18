import { FETCH_PRODUCTS, FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_BY_PAGE, FILTER_BY_CATEGORY } from '../actions/actions';

export default function (state = [], action) {
    
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload.data;

        case FETCH_PRODUCTS_BY_PAGE:
            return action.payload.data;

        case FILTER_BY_CATEGORY:
            return action.payload.data;

        case FETCH_PRODUCTS_FAIL:
            return "error";

        default:
            return state;
    }
}
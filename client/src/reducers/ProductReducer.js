import { FETCH_PRODUCTS, FETCH_PRODUCTS_FAIL } from '../actions/actions';
import _ from 'lodash';

export default function (state = [], action) {
    
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload.data;

        case FETCH_PRODUCTS_FAIL:
            return "error";

        default:
            return state;
    }
}
import { FETCH_PRODUCTS } from '../actions/index';
import { CATEGORY_SORT } from '../actions/index';
import { PRICE_SORT } from '../actions/index';
import _ from "lodash";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS: //get to api with search query passed in
            return ([action.payload.data, ...state]);
        case CATEGORY_SORT: //get to api with search query and category
            return ([action.payload.data, ...state]);
        case PRICE_SORT: //get to api with query, catefory and price passed in
            return ([action.payload.data, ...state]);
        default: 
            return state;
            
    }
}
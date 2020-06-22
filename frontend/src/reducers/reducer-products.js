import { FETCH_PRODUCTS } from '../actions/index';
import { CATEGORY_SORT } from '../actions/index';
import { PRICE_SORT } from '../actions/index';
import _ from "lodash";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            // console.log('Inside reducer',action.payload.data);
            // console.log(_.mapKeys(action.payload.data, "id"))
            // return _.mapKeys(action.payload.data, "id");
            return ([action.payload.data, ...state]);
        case CATEGORY_SORT:
            return ([action.payload.data, ...state]);
        case PRICE_SORT:
            return ([action.payload.data, ...state]);
        default: 
            // console.log(state)
            return state;
            
    }
}
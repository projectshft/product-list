import _ from "lodash";
import { FETCH_PRODUCTS } from "../actions";

//This reducer takes state maps through all the key values 
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return _.map(action.payload.data.products, "category");
        default:
            return state;
    }
}

// Not sure if this is setup correctly, would love to sit down with 
//someone and understand the right way to do this. 
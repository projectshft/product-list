import _ from "lodash";
import { FETCH_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
    products: [],
    sort: '',
    category: '',
    count: 0,
    page: 1,
    numberOfPages: 1
};

// Not sure if I'm using default state correctly 

//This reducer takes state maps through all the key values 
export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return _.mapKeys(action.payload.data.products, "_id");
        default:
            return state;
    }
}
import _ from "lodash";
import { FETCH_PRODUCTS } from "../actions";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            console.log(action.payload.data)
            return _.mapKeys(action.payload.data.products, "_id");

        default:
            return state;
    }
}
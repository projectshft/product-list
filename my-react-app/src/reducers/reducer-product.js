import { FETCH_PRODUCT } from "../actions/index"
import _ from "lodash"

export default function(state=[], action){
    switch (action.type) {
        case FETCH_PRODUCT:
            return action.payload.data;
        default:
            return state;
        }
    
}
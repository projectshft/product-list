//import _ from "lodash";
import { FETCH_PRODUCTS, CHANGE_CATEGORY, CHANGE_SORT } from "../actions";

const DEFAULT_STATE = {
    products:[],
    sort: '',
    category:'',
    count: 0,
    page: 1
};

export default function(state = DEFAULT_STATE, action) {
    console.log(action.payload);
    switch (action.type) {
    case FETCH_PRODUCTS:
        if(action.payload) {
        let updatedState = Object.assign({}, state);
        console.log(updatedState);
        updatedState.products= action.payload.data.products
        updatedState.count= action.payload.data.count
        console.log(updatedState);
        return updatedState;
        }
        console.log(state);
        return state;

    case CHANGE_CATEGORY:
        return Object.assign({}, state, {category: action.payload})
    
    case CHANGE_SORT:
        return Object.assign({}, state, {sort: action.payload})
    
    default:
        return state;
    }
}
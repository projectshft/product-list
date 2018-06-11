import {FETCH_PRODUCTS} from '../actions/fetch'

// This reducer handles all fetchs.
export default function(state = {}, action){
    switch(action.type){
        case FETCH_PRODUCTS:
            return {...state, query: action.payload.data};
        default:
            return state;
    }    
}
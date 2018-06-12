import {FETCH_PRODUCTS} from '../actions/fetch'

// This reducer handles all fetchs.
export default function(state = [], action){
    switch(action.type){
        case FETCH_PRODUCTS:
            if(!action.payload.data){
                return state;
            }
            return action.payload.data.products
        default:
            return state;
    }    
}
import {FETCH_PRODUCTS} from '../actions/fetch'

// This reducer handles all fetchs.
export default function(state = null, action){
    switch(action.type){
        case FETCH_PRODUCTS:
            if(!action.payload.data){
                return 1;
            }
            return action.payload.data.pageCount
        default:
            return state;
    }    
}
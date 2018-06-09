import {FETCH_PRODUCTS} from '../actions'

export default function(state = null, action){
    switch(action.type){
        case FETCH_PRODUCTS:
            return action.payload.data.total;
        default:
            return state;
    }    
}
import {FETCH_PRODUCTS} from '../actions'

export default function(state = null, action){
    switch(action.type){
        case FETCH_PRODUCTS:
            console.log(action.payload)
            return action.payload.data.products; 
        default:
            return state;
    }    
}
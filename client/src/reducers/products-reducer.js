import { FETCH_PRODUCTS } from '../actions'

//set product-reducer which returns the products data from the api 
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            console.log(action.payload);
            state = action.payload.data
            return state
        default:
            return state;
    }
}
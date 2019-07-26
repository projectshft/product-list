import { FETCH_PRODUCTS } from '../actions'

//set product-reducer which returns the products data from the api 
export default function(state = [], action) {
    console.log('The beginning of my reducer',state,action)
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload.data
        default:
            return state;
    }
}
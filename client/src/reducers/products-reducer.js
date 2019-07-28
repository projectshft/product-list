import { FETCH_PRODUCTS } from '../actions'

//set product-reducer which returns the products data from the api 
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            // let newState = []
            // let count = action.payload.data.pop();
            // newState.push(action.payload.data);
            // newState.push(count);
            let newState = action.payload.data
            return newState;

        default:
            return state;
    }
}
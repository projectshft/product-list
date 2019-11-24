import { FETCH_PRODUCTS } from "../actions";



//This reducer takes state maps through all the key values 
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            console.log('Hello Hello', action.payload.data)
            return action.payload.data
        default:
            return state;
    }
}
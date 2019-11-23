import { FETCH_PRODUCTS } from "../actions";



//This reducer takes state maps through all the key values 
export default function (state = 0, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload.data.pages
        default:
            return state;
    }
}